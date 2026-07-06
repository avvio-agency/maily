import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export type TourStep = {
  target: string;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

type TourProps = {
  steps: TourStep[];
  storageKey?: string;
};

function getCoords(target: string) {
  const el = document.querySelector(target);
  if (!el) return null;
  return el.getBoundingClientRect();
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function Tour({ steps, storageKey = 'maily-tour-done' }: TourProps) {
  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState(0);
  const [coords, setCoords] = useState<DOMRect | null>(null);

  useEffect(() => {
    const done = localStorage.getItem(storageKey);
    if (!done) {
      setActive(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!active) return;
    const step = steps[current];
    if (!step) return;

    const update = () => setCoords(getCoords(step.target));
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [active, current, steps]);

  const finish = useCallback(() => {
    localStorage.setItem(storageKey, '1');
    setActive(false);
  }, [storageKey]);

  const step = steps[current];
  const isLast = current === steps.length - 1;

  const tooltipStyle = useMemo(() => {
    if (!coords || !step) return {};

    const gap = 12;
    const pos = step.position || 'bottom';
    const tooltipWidth = 320;
    const tooltipHeight = 140;

    let top = 0;
    let left = 0;

    if (pos === 'bottom') {
      top = coords.bottom + gap;
      left = coords.left + coords.width / 2 - tooltipWidth / 2;
    } else if (pos === 'top') {
      top = coords.top - gap - tooltipHeight;
      left = coords.left + coords.width / 2 - tooltipWidth / 2;
    } else if (pos === 'left') {
      top = coords.top + coords.height / 2 - tooltipHeight / 2;
      left = coords.left - gap - tooltipWidth;
    } else {
      top = coords.top + coords.height / 2 - tooltipHeight / 2;
      left = coords.right + gap;
    }

    return {
      top: clamp(top, 16, window.innerHeight - tooltipHeight - 16),
      left: clamp(left, 16, window.innerWidth - tooltipWidth - 16),
    };
  }, [coords, step]);

  if (!active || !step || !coords) return null;

  const spotlightPadding = 8;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={finish}
        role="presentation"
      />

      <svg
        className="pointer-events-none absolute inset-0 size-full"
        style={{ filter: 'drop-shadow(0 0 0 transparent)' }}
      >
        <defs>
          <mask id="spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={coords.left - spotlightPadding}
              y={coords.top - spotlightPadding}
              width={coords.width + spotlightPadding * 2}
              height={coords.height + spotlightPadding * 2}
              fill="black"
              rx={8}
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.5)"
          mask="url(#spotlight-mask)"
        />
      </svg>

      <div
        className="pointer-events-none absolute rounded-lg border-2 border-white"
        style={{
          top: coords.top - spotlightPadding,
          left: coords.left - spotlightPadding,
          width: coords.width + spotlightPadding * 2,
          height: coords.height + spotlightPadding * 2,
        }}
      />

      <div
        className="absolute z-10 w-80 rounded-xl bg-white p-5 shadow-2xl"
        style={tooltipStyle}
      >
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-400">
            {current + 1} / {steps.length}
          </span>
          <button
            className="flex size-6 cursor-pointer items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            onClick={finish}
            type="button"
          >
            <XIcon className="size-4" />
          </button>
        </div>
        <h3 className="mb-1 text-sm font-semibold text-gray-900">
          {step.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-600">
          {step.description}
        </p>
        <div className="flex items-center justify-between">
          <button
            className="cursor-pointer text-sm text-gray-400 hover:text-gray-600"
            onClick={finish}
            type="button"
          >
            Skip
          </button>
          <div className="flex items-center gap-2">
            {current > 0 && (
              <button
                className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setCurrent((c) => c - 1)}
                type="button"
              >
                <ChevronLeftIcon className="size-4" />
                Back
              </button>
            )}
            {isLast ? (
              <button
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-black px-4 py-1.5 text-sm text-white hover:bg-gray-800"
                onClick={finish}
                type="button"
              >
                Done
              </button>
            ) : (
              <button
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-black px-4 py-1.5 text-sm text-white hover:bg-gray-800"
                onClick={() => setCurrent((c) => c + 1)}
                type="button"
              >
                Next
                <ChevronRightIcon className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
