export const SITE = {
  name: 'Webcam Test',
  domain: 'webcamtestlive.com',
  url: 'https://webcamtestlive.com',
  tagline: 'Test your webcam online, instantly and privately.',
  description:
    'Free online webcam test. Check your camera, microphone and speakers in your browser, resolution, FPS, bitrate and image quality. Nothing is uploaded.',
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
  { href: '/video-recorder', label: 'Video Recorder' },
  { href: '/mic-test', label: 'Mic Test' },
  { href: '/keyboard-test', label: 'Keyboard Test' },
  { href: '/screen-test', label: 'Screen Test' },
  { href: '/speaker-test', label: 'Speaker Test' },
  { href: '/troubleshooting', label: 'Fix Issues' },
];

export const FOOTER_LINKS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Tools & Utilities',
    items: [
      { href: '/', label: 'Webcam Test' },
      { href: '/video-recorder', label: 'Online Video Recorder' },
      { href: '/webcam-recorder', label: 'Webcam Recorder' },
      { href: '/mic-test', label: 'Microphone & Echo Test' },
      { href: '/keyboard-test', label: 'Keyboard Key Tester' },
      { href: '/screen-test', label: 'Screen & Color Test' },
      { href: '/dead-pixel-test', label: 'Dead Pixel Checker' },
      { href: '/speaker-test', label: 'Speaker Sound Test' },
      { href: '/mirror', label: 'Webcam Mirror' },
      { href: '/take-photo', label: 'Take Photo Online' },
      { href: '/resolution', label: 'Resolution Test' },
      { href: '/fps', label: 'FPS Test' },
      { href: '/widget', label: 'Embed Widget Generator' },
    ],
  },
  {
    title: 'Devices & Apps',
    items: [
      { href: '/mac', label: 'Mac & FaceTime Test' },
      { href: '/windows', label: 'Windows 11/10 Test' },
      { href: '/chromebook', label: 'Chromebook Camera Test' },
      { href: '/zoom', label: 'Zoom Meeting Test' },
      { href: '/google-meet', label: 'Google Meet Test' },
      { href: '/teams', label: 'Microsoft Teams Test' },
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
