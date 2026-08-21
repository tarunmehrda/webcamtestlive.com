export const SITE = {
  name: 'Webcam Test',
  domain: 'webcamtestlive.com',
  url: 'https://webcamtestlive.com',
  tagline: 'Test your webcam online — instantly and privately.',
  description:
    'Free online webcam test. Check your camera, microphone and speakers in your browser — resolution, FPS, bitrate and image quality. Nothing is uploaded.',
  twitter: '@webcamtestlive',
  /** Change this to the mailbox you actually monitor. */
  email: 'hello@webcamtestlive.com',
} as const;

export interface NavItem {
  href: string;
  label: string;
}

export const NAV: NavItem[] = [
  { href: '/', label: 'Webcam Test' },
  { href: '/resolution', label: 'Resolution' },
  { href: '/fps', label: 'FPS' },
  { href: '/mic-test', label: 'Mic Test' },
  { href: '/troubleshooting', label: 'Fix Issues' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
];

export const FOOTER_LINKS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Tools',
    items: [
      { href: '/', label: 'Webcam Test' },
      { href: '/resolution', label: 'Resolution Test' },
      { href: '/fps', label: 'FPS Test' },
      { href: '/mic-test', label: 'Microphone Test' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { href: '/troubleshooting', label: 'Camera Not Working' },
      { href: '/troubleshooting#permissions', label: 'Allow Camera Access' },
      { href: '/troubleshooting#quality', label: 'Improve Video Quality' },
      { href: '/mic-test#setup', label: 'Microphone Setup' },
      { href: '/faq', label: 'Webcam Test FAQ' },
    ],
  },
  {
    title: 'Site',
    items: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];
