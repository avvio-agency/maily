import type { Route } from './+types/_index';
import { Link } from 'react-router';
import {
  PaintbrushIcon,
  EyeIcon,
  CodeIcon,
  SendIcon,
  VariableIcon,
  SmartphoneIcon,
  MailIcon,
  ZapIcon,
} from 'lucide-react';

export function headers(_: Route.HeadersArgs) {
  return {
    'Cache-Control': 'max-age=3600, s-maxage=86400',
  };
}

export default function Home(props: Route.ComponentProps) {
  const features = [
    {
      icon: <PaintbrushIcon className="size-5" />,
      title: 'Drag-and-drop editor',
      desc: 'Build emails visually with pre-designed blocks. No coding required.',
    },
    {
      icon: <EyeIcon className="size-5" />,
      title: 'Live preview',
      desc: 'See exactly how your email looks before hitting send.',
    },
    {
      icon: <CodeIcon className="size-5" />,
      title: 'Copy HTML',
      desc: 'Export clean, responsive HTML that works across all email clients.',
    },
    {
      icon: <SendIcon className="size-5" />,
      title: 'Send test emails',
      desc: 'Test your emails with any provider via Resend integration.',
    },
    {
      icon: <VariableIcon className="size-5" />,
      title: 'Dynamic variables',
      desc: 'Personalize emails with dynamic content and custom variables.',
    },
    {
      icon: <SmartphoneIcon className="size-5" />,
      title: 'Mobile-ready',
      desc: 'Every template is responsive and looks great on any device.',
    },
  ];

  const components = [
    'Logo',
    'Buttons',
    'Text',
    'Image',
    'Divider',
    'Spacer',
    'Footer',
    'List',
    'Quote',
    'Columns',
    'Repeat',
    'Show / Hide',
    'Social Links',
    'Variables',
    'Code Block',
    'Section',
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Choose a template',
      desc: 'Start from scratch or use pre-designed components to build your email.',
    },
    {
      step: '02',
      title: 'Customize with drag & drop',
      desc: 'Add, remove, and rearrange blocks. Edit text, images, and styles inline.',
    },
    {
      step: '03',
      title: 'Preview and send',
      desc: 'Preview your email, send a test, and copy the HTML when you are ready.',
    },
  ];

  return (
    <>
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-[1050px] items-center justify-between px-7 py-4 sm:px-10">
          <Link className="flex items-center gap-2" to="/">
            <img
              alt="Avvio"
              className="size-8"
              src="/brand/avatar-light.png"
            />
            <span className="text-xl font-bold tracking-tight">avvio</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              className="text-sm font-medium text-gray-600 hover:text-black"
              to="/editor"
            >
              Editor
            </Link>
            <Link
              className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              to="/editor"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-[1050px] px-7 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm text-gray-600">
              <ZapIcon className="size-4 text-amber-500" />
              Free email builder — no account required
            </div>
            <h1 className="mb-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Build beautiful emails{' '}
              <span className="text-amber-500">in minutes</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              Avvio is a free, open-source email editor that lets you design,
              preview, and export responsive emails — no coding or account
              needed.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-black px-8 text-lg font-medium text-white transition-colors hover:bg-gray-800"
                to="/editor"
              >
                <MailIcon className="size-5" />
                Open the Editor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 py-20 sm:py-28">
        <div className="mx-auto max-w-[1050px] px-7 sm:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Everything you need to craft the perfect email
            </h2>
            <p className="text-lg text-gray-600">
              A set of powerful features packed into a simple, intuitive
              interface.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                className="rounded-xl border border-gray-200 p-6"
                key={f.title}
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                  {f.icon}
                </div>
                <h3 className="mb-1.5 font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 py-20 sm:py-28">
        <div className="mx-auto max-w-[1050px] px-7 sm:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Pre-designed components
            </h2>
            <p className="text-lg text-gray-600">
              A growing library of components to build any email layout.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {components.map((c) => (
              <span
                className="rounded-xl border-2 border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800"
                key={c}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 py-20 sm:py-28">
        <div className="mx-auto max-w-[1050px] px-7 sm:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              How it works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to go from blank canvas to sent email.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div className="text-center" key={item.step}>
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-700">
                  {item.step}
                </div>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-[1050px] px-7 text-center sm:px-10">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to build your next email?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            No sign-ups, no downloads. Just open the editor and start creating.
          </p>
          <Link
            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-black px-8 text-lg font-medium text-white transition-colors hover:bg-gray-800"
            to="/editor"
          >
            <MailIcon className="size-5" />
            Open the Editor
          </Link>
        </div>
      </section>

      <footer className="bg-black py-10 text-white">
        <div className="mx-auto max-w-[1050px] px-7 sm:px-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Avvio. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                className="text-sm text-gray-400 hover:text-white"
                to="/editor"
              >
                Editor
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
