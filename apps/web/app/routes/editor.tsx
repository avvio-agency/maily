import { useMemo, useRef, useState } from 'react';
import type { Route } from './+types/editor';
import { EmailEditorSandbox, type EmailEditorSandboxHandle } from '~/components/email-editor-sandbox';
import { EditorLayout } from '~/components/editor-layout';
import { Tour, type TourStep } from '~/components/tour';
import {
  DEFAULT_EDITOR_THEME,
  getMailyCssVariables,
  type EditorThemeOptions,
} from '@maily-to/shared';
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

export default function EditorPage(props: Route.ComponentProps) {
  const sandboxRef = useRef<EmailEditorSandboxHandle>(null);
  const [editorTheme, setEditorTheme] = useState<EditorThemeOptions>(
    DEFAULT_EDITOR_THEME
  );

  const cssVariables = useMemo(
    () => getMailyCssVariables(editorTheme),
    [editorTheme]
  );

  return (
    <div style={cssVariables}>
      <EditorLayout>
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
