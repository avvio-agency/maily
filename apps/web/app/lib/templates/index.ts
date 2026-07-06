import welcome from './welcome.json';
import newsletter from './newsletter.json';
import promotion from './promotion.json';
import followUp from './follow-up.json';
import thankYou from './thank-you.json';
import launch from './launch.json';

export type Template = {
  id: string;
  name: string;
  description: string;
  subject: string;
  content: Record<string, unknown>;
};

export const templates: Template[] = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    description: 'A warm welcome for new subscribers or clients.',
    subject: 'Welcome to Avvio',
    content: welcome,
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Monthly update with tips, insights, and news.',
    subject: 'Monthly Update — Avvio',
    content: newsletter,
  },
  {
    id: 'promotion',
    name: 'Service Promotion',
    description: 'Promote your web development services with a clear CTA.',
    subject: 'Launch Your Website in 2 Weeks',
    content: promotion,
  },
  {
    id: 'follow-up',
    name: 'Meeting Follow-Up',
    description: 'Follow up after a client meeting or discovery call.',
    subject: 'Great meeting you',
    content: followUp,
  },
  {
    id: 'thank-you',
    name: 'Thank You',
    description: 'Show appreciation after a completed project.',
    subject: 'Thank you for your trust',
    content: thankYou,
  },
  {
    id: 'launch',
    name: 'Launch Announcement',
    description: 'Announce a new website, product, or service launch.',
    subject: "We're live!",
    content: launch,
  },
];
