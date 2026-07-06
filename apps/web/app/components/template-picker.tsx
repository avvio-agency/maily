import { LayoutTemplateIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { templates, type Template } from '~/lib/templates';

type TemplatePickerProps = {
  onSelect: (template: Template) => void;
};

export function TemplatePicker({ onSelect }: TemplatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="flex items-center rounded-md bg-white px-2 py-1 text-sm text-black hover:bg-gray-100"
        onClick={() => setOpen(true)}
        type="button"
      >
        <LayoutTemplateIcon className="mr-1 inline-block size-4" />
        Templates
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold">Choose a template</h2>
              <button
                className="flex size-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                onClick={() => setOpen(false)}
                type="button"
              >
                <XIcon className="size-5" />
              </button>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <button
                  className="group flex flex-col rounded-xl border-2 border-gray-200 bg-white p-5 text-left transition-all hover:border-gray-900 hover:shadow-md"
                  key={template.id}
                  onClick={() => {
                    onSelect(template);
                    setOpen(false);
                  }}
                  type="button"
                >
                  <h3 className="mb-1 font-semibold text-gray-900 group-hover:text-black">
                    {template.name}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-gray-500">
                    {template.description}
                  </p>
                  <div className="mt-auto text-xs font-medium text-gray-400 group-hover:text-gray-600">
                    {countBlocks(template.content)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function countBlocks(content: Record<string, unknown>): string {
  const blocks = content.content as unknown[] | undefined;
  if (!blocks) return '0 blocks';
  const count = blocks.length;
  return `${count} block${count !== 1 ? 's' : ''}`;
}
