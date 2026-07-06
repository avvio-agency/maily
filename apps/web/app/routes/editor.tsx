import { useMemo, useRef, useState } from 'react';
import type { Route } from './+types/editor';
import { EmailEditorSandbox, type EmailEditorSandboxHandle } from '~/components/email-editor-sandbox';
import { EditorLayout } from '~/components/editor-layout';
import { Tour, type TourStep } from '~/components/tour';
import { TemplatePicker } from '~/components/template-picker';
import {
  ALargeSmallIcon,
  AlignHorizontalSpaceAroundIcon,
  AlignVerticalSpaceAroundIcon,
  MenuIcon,
  RectangleHorizontalIcon,
  RotateCwIcon,
  SquareRoundCornerIcon,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '~/lib/classname';
import { ColorPicker } from '~/components/skeleton/color-picker';
import { SelectNative } from '~/components/skeleton/select-native';
import {
  DEFAULT_EDITOR_THEME,
  DEFAULT_FONT,
  allowedFallbackFonts,
  getMailyCssVariables,
  loadFont,
  type EditorThemeOptions,
  type FallbackFont,
  type FontFormat,
} from '@maily-to/shared';
import { HexColorInput } from 'react-colorful';
import { mergeRouteModuleMeta } from '~/lib/merge-meta';

export const meta = mergeRouteModuleMeta(() => {
  const title = 'Editor | Avvio';
  const description =
    'Try out Avvio, the Open-source editor for crafting emails.';

  return [
    { title: title },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'og:title',
      content: title,
    },
    {
      name: 'og:description',
      content: description,
    },
  ];
});

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="toolbar"]',
    title: 'Toolbar',
    description:
      'Configure your Resend API key, preview your email, copy the HTML, or send a test email — all from here.',
  },
  {
    target: '[data-tour="subject"]',
    title: 'Subject Line',
    description:
      'Set your email subject line. This is the first thing recipients see in their inbox.',
  },
  {
    target: '[data-tour="from"]',
    title: 'From Address',
    description:
      'Enter the sender name and email address. This must match a domain verified in your Resend account.',
  },
  {
    target: '[data-tour="to"]',
    title: 'Recipients',
    description:
      'Add recipient email addresses. You can send to multiple recipients by separating with commas.',
  },
  {
    target: '[data-tour="preview-text"]',
    title: 'Preview Text',
    description:
      'This snippet appears below the subject line in most email clients. Use it to give a sneak peek of your content.',
  },
  {
    target: '[data-tour="editor"]',
    title: 'Email Editor',
    description:
      'Craft your email using drag-and-drop blocks. Add text, images, buttons, columns, and more.',
    position: 'top' as const,
  },
];

const loadedFonts: Set<string> = new Set();

const FONTS: {
  fontFamily: string;
  webFont: { url: string; format: FontFormat };
}[] = [
  {
    fontFamily: 'Inter',
    webFont: {
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@latest/latin-wght-normal.woff2',
      format: 'woff2',
    },
  },
  {
    fontFamily: 'Roboto',
    webFont: {
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/roboto:vf@latest/latin-wght-normal.woff2',
      format: 'woff2',
    },
  },
  {
    fontFamily: 'Open Sans',
    webFont: {
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/open-sans:vf@latest/latin-wght-normal.woff2',
      format: 'woff2',
    },
  },
  {
    fontFamily: 'Lato',
    webFont: {
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/lato@latest/latin-400-normal.woff2',
      format: 'woff2',
    },
  },
  {
    fontFamily: 'Montserrat',
    webFont: {
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/montserrat:vf@latest/latin-wght-normal.woff2',
      format: 'woff2',
    },
  },
  {
    fontFamily: 'Poppins',
    webFont: {
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/poppins@latest/latin-400-normal.woff2',
      format: 'woff2',
    },
  },
  {
    fontFamily: 'Raleway',
    webFont: {
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/raleway:vf@latest/latin-wght-normal.woff2',
      format: 'woff2',
    },
  },
  {
    fontFamily: 'Ubuntu',
    webFont: {
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/ubuntu@latest/latin-400-normal.woff2',
      format: 'woff2',
    },
  },
];

export default function EditorPage(props: Route.ComponentProps) {
  const sandboxRef = useRef<EmailEditorSandboxHandle>(null);
  const [editorTheme, setEditorTheme] = useState<EditorThemeOptions>(
    DEFAULT_EDITOR_THEME
  );

  const cssVariables = useMemo(
    () => getMailyCssVariables(editorTheme),
    [editorTheme]
  );

  const sidebar = (
    <div className="space-y-8 p-5">
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Templates
        </h3>
        <TemplatePicker
          onSelect={(template) => sandboxRef.current?.loadTemplate(template)}
        />
      </div>
      <div>
        <TypographySettings
          fontTheme={editorTheme.font}
          setFontTheme={(fontTheme) =>
            setEditorTheme({ ...editorTheme, font: fontTheme })
          }
        />
      </div>
      <div>
        <LayoutSettings
          containerTheme={editorTheme.container}
          setContainerTheme={(containerTheme) =>
            setEditorTheme({ ...editorTheme, container: containerTheme })
          }
          bodyTheme={editorTheme.body}
          setBodyTheme={(bodyTheme) =>
            setEditorTheme({ ...editorTheme, body: bodyTheme })
          }
        />
      </div>
      <div>
        <ButtonSettings
          buttonTheme={editorTheme.button}
          setButtonTheme={(buttonTheme) =>
            setEditorTheme({ ...editorTheme, button: buttonTheme })
          }
        />
      </div>
      <div>
        <LinkSettings
          linkTheme={editorTheme.link}
          setLinkTheme={(linkTheme) =>
            setEditorTheme({ ...editorTheme, link: linkTheme })
          }
        />
      </div>
    </div>
  );

  return (
    <div style={cssVariables}>
      <EditorLayout sidebar={sidebar}>
        <EmailEditorSandbox
          ref={sandboxRef}
          showSaveButton={false}
          autofocus={false}
        />
      </EditorLayout>
      <Tour steps={tourSteps} />
    </div>
  );
}

type TypographySettingsProps = {
  fontTheme: EditorThemeOptions['font'];
  setFontTheme: (fontTheme: EditorThemeOptions['font']) => void;
};

function TypographySettings(props: TypographySettingsProps) {
  const { fontTheme, setFontTheme } = props;

  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Typography
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-20 shrink-0 text-sm text-gray-600">Font</div>
          <Select
            icon={ALargeSmallIcon}
            value={fontTheme?.fontFamily ?? ''}
            onChange={async (value) => {
              if (value === 'Default') {
                setFontTheme(null);
              } else {
                const font = FONTS.find((f) => f.fontFamily === value);
                if (!font) return;
                const newFont = {
                  fontFamily: value,
                  fallbackFontFamily:
                    fontTheme?.fallbackFontFamily ??
                    DEFAULT_FONT.fallbackFontFamily,
                  webFont: font.webFont,
                };
                const key = JSON.stringify(newFont);
                if (!loadedFonts.has(key)) {
                  loadedFonts.add(key);
                  loadFont(newFont);
                }
                setFontTheme(newFont);
              }
            }}
            options={[
              { value: 'Default', label: 'Default' },
              ...FONTS.map((f) => ({
                value: f.fontFamily,
                label: f.fontFamily,
              })),
            ]}
          />
        </div>
        {fontTheme?.fontFamily && (
          <div className="flex items-center gap-2">
            <div className="w-20 shrink-0 text-sm text-gray-600">Fallback</div>
            <Select
              icon={RotateCwIcon}
              value={fontTheme?.fallbackFontFamily ?? ''}
              onChange={(value) =>
                setFontTheme({
                  fontFamily:
                    fontTheme?.fontFamily ?? DEFAULT_FONT.fontFamily,
                  fallbackFontFamily: value as FallbackFont,
                })
              }
              options={allowedFallbackFonts.map((f) => ({
                value: f,
                label: f,
              }))}
            />
          </div>
        )}
      </div>
    </div>
  );
}

type LayoutSettingsProps = {
  containerTheme: EditorThemeOptions['container'];
  setContainerTheme: (
    containerTheme: EditorThemeOptions['container']
  ) => void;
  bodyTheme: EditorThemeOptions['body'];
  setBodyTheme: (bodyTheme: EditorThemeOptions['body']) => void;
};

function LayoutSettings(props: LayoutSettingsProps) {
  const { containerTheme, setContainerTheme, bodyTheme, setBodyTheme } = props;

  const bodyPaddingTop = parseInt(String(bodyTheme?.paddingTop ?? '0'));
  const bodyPaddingRight = parseInt(String(bodyTheme?.paddingRight ?? '0'));
  const paddingTop = parseInt(String(containerTheme?.paddingTop ?? '0'));
  const paddingRight = parseInt(String(containerTheme?.paddingRight ?? '0'));
  const borderRadius = parseInt(String(containerTheme?.borderRadius ?? '0'));
  const borderWidth = parseInt(String(containerTheme?.borderWidth ?? '0'));

  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Layout
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-20 shrink-0 text-sm text-gray-600">Body</div>
          <ColorInput
            value={bodyTheme?.backgroundColor ?? '#000000'}
            onChange={(value) =>
              setBodyTheme({ ...bodyTheme, backgroundColor: value })
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 shrink-0 text-sm text-gray-600">Padding</div>
          <div className="flex gap-1.5">
            <NumberInput
              value={paddingTop}
              onChange={(value) => {
                const p = `${value}px`;
                setContainerTheme({
                  ...containerTheme,
                  paddingTop: p,
                  paddingBottom: p,
                });
              }}
              icon={AlignVerticalSpaceAroundIcon}
            />
            <NumberInput
              value={paddingRight}
              onChange={(value) => {
                const p = `${value}px`;
                setContainerTheme({
                  ...containerTheme,
                  paddingRight: p,
                  paddingLeft: p,
                });
              }}
              icon={AlignHorizontalSpaceAroundIcon}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 shrink-0 text-sm text-gray-600">Gutter</div>
          <div className="flex gap-1.5">
            <NumberInput
              value={bodyPaddingTop}
              onChange={(value) => {
                const p = `${value}px`;
                setBodyTheme({
                  ...bodyTheme,
                  paddingTop: p,
                  paddingBottom: p,
                });
              }}
              icon={AlignVerticalSpaceAroundIcon}
            />
            <NumberInput
              value={bodyPaddingRight}
              onChange={(value) => {
                const p = `${value}px`;
                setBodyTheme({
                  ...bodyTheme,
                  paddingRight: p,
                  paddingLeft: p,
                });
              }}
              icon={AlignHorizontalSpaceAroundIcon}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 shrink-0 text-sm text-gray-600">Container</div>
          <ColorInput
            value={containerTheme?.backgroundColor ?? '#000000'}
            onChange={(value) =>
              setContainerTheme({
                ...containerTheme,
                backgroundColor: value,
              })
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 shrink-0 text-sm text-gray-600">Radius</div>
          <NumberInput
            value={borderRadius}
            onChange={(value) =>
              setContainerTheme({
                ...containerTheme,
                borderRadius: `${value}px`,
              })
            }
            icon={SquareRoundCornerIcon}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 shrink-0 text-sm text-gray-600">Border</div>
          <div className="flex gap-1.5">
            <NumberInput
              value={borderWidth}
              onChange={(value) =>
                setContainerTheme({
                  ...containerTheme,
                  borderWidth: `${value}px`,
                })
              }
              icon={MenuIcon}
            />
            <ColorInput
              value={containerTheme?.borderColor ?? '#000000'}
              onChange={(value) =>
                setContainerTheme({
                  ...containerTheme,
                  borderColor: value,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type ButtonSettingsProps = {
  buttonTheme: EditorThemeOptions['button'];
  setButtonTheme: (buttonTheme: EditorThemeOptions['button']) => void;
};

function ButtonSettings(props: ButtonSettingsProps) {
  const { buttonTheme, setButtonTheme } = props;

  const sizes: Record<string, { paddingX: number; paddingY: number }> =
    useMemo(
      () => ({
        small: { paddingX: 24, paddingY: 6 },
        medium: { paddingX: 32, paddingY: 10 },
        large: { paddingX: 40, paddingY: 14 },
      }),
      []
    );

  const size = useMemo(() => {
    const { paddingRight, paddingTop } = buttonTheme ?? {};
    return Object.entries(sizes).find(
      ([, { paddingX, paddingY }]) =>
        parseInt(String(paddingRight ?? '0')) === paddingX &&
        parseInt(String(paddingTop ?? '0')) === paddingY
    )?.[0];
  }, [buttonTheme, sizes]);

  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Button
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-20 shrink-0 text-sm text-gray-600">Background</div>
          <ColorInput
            value={buttonTheme?.backgroundColor ?? '#000000'}
            onChange={(value) =>
              setButtonTheme({ ...buttonTheme, backgroundColor: value })
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 shrink-0 text-sm text-gray-600">Text</div>
          <ColorInput
            value={buttonTheme?.color ?? '#000000'}
            onChange={(value) =>
              setButtonTheme({ ...buttonTheme, color: value })
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 shrink-0 text-sm text-gray-600">Size</div>
          <Select
            icon={RectangleHorizontalIcon}
            value={size ?? 'medium'}
            onChange={(value) => {
              setButtonTheme({
                ...buttonTheme,
                paddingTop: `${sizes[value].paddingY}px`,
                paddingRight: `${sizes[value].paddingX}px`,
                paddingBottom: `${sizes[value].paddingY}px`,
                paddingLeft: `${sizes[value].paddingX}px`,
              });
            }}
            options={[
              { value: 'small', label: 'Small' },
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

type LinkSettingsProps = {
  linkTheme: EditorThemeOptions['link'];
  setLinkTheme: (linkTheme: EditorThemeOptions['link']) => void;
};

function LinkSettings(props: LinkSettingsProps) {
  const { linkTheme, setLinkTheme } = props;

  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Link
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-20 shrink-0 text-sm text-gray-600">Color</div>
          <ColorInput
            value={linkTheme?.color ?? '#000000'}
            onChange={(value) => setLinkTheme({ ...linkTheme, color: value })}
          />
        </div>
      </div>
    </div>
  );
}

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  icon?: LucideIcon;
  className?: string;
};

function NumberInput(props: NumberInputProps) {
  const { value, onChange, icon: Icon, className } = props;

  return (
    <div className="relative max-w-[72px]">
      <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center justify-center px-1">
        {Icon && <Icon className="size-3 text-gray-500" />}
      </div>
      <input
        className={cn(
          'hide-number-controls w-full appearance-none rounded-md border border-gray-200 py-1 pl-7 pr-1.5 text-sm hover:border-gray-300 focus:outline-none',
          className
        )}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

type ColorInputProps = {
  value: string;
  onChange: (value: string) => void;
};

function ColorInput(props: ColorInputProps) {
  const { value, onChange } = props;

  return (
    <div className="flex w-full items-center rounded-md border border-gray-200 px-2">
      <ColorPicker color={value} onColorChange={onChange} />
      <HexColorInput
        className="w-full appearance-none px-1.5 py-1 text-sm hover:border-gray-300 focus:outline-none"
        color={value}
        onChange={onChange}
        prefixed
      />
    </div>
  );
}

type SelectProps = {
  icon?: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

function Select(props: SelectProps) {
  const { value, onChange, options, icon: Icon } = props;

  return (
    <div className="relative w-full">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-2 z-20 flex items-center">
          <Icon className="size-3.5 text-gray-500" />
        </div>
      )}
      <SelectNative
        className="h-7 w-full pl-7 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectNative>
    </div>
  );
}
