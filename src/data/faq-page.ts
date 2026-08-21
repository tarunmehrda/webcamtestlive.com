import type { Faq } from './faqs';

export interface FaqGroup {
  /** Anchor id, used for deep links from the on-page contents list. */
  id: string;
  title: string;
  intro?: string;
  items: Faq[];
}

/**
 * The long-tail FAQ hub. Several target queries are the same question reworded,
 * so each one is answered from a different angle — a page of near-identical
 * answers reads as padding to both people and search engines.
 */
export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'how-to-test',
    title: 'How to test a webcam',
    intro:
      'The short answer to all of these is the same: open this page, press Start test, and allow camera access. Each question below covers a different part of that.',
    items: [
      {
        q: 'How to test webcam',
        a: 'Open a webcam test page in your browser, press Start test, and choose Allow when the browser asks for camera permission. Your live picture appears within a second or two, alongside the resolution, frame rate and lighting readings. There is nothing to download and no account to create.',
      },
      {
        q: 'How to test my webcam',
        a: 'Start the test, then check that the correct device is selected in the camera dropdown. Laptops with a docking station, a capture card, or software such as OBS often present several cameras, and the default is frequently not the one you mean to use. Step through the list until you see yourself.',
      },
      {
        q: 'How to test a webcam',
        a: 'For a webcam you have just bought or borrowed, plug it directly into the computer rather than through a hub, wait a few seconds for the system to detect it, then reload the page and pick it from the camera dropdown. Check the maximum supported resolution to confirm you are getting the quality you paid for.',
      },
      {
        q: 'How to test your webcam',
        a: 'Run the test a few minutes before you are due on camera. Confirm the right camera is selected, the picture is sharp and well lit, and your microphone level responds when you speak. Doing it beforehand means you fix problems in private rather than while a room full of people waits.',
      },
      {
        q: 'How test webcam',
        a: 'Press Start test and allow access. That is the whole process — about ten seconds. If your face appears, the camera works.',
      },
      {
        q: 'How to test the webcam',
        a: 'On a shared or work computer, be aware that the camera may be governed by policies you cannot change. If the test reports that access is blocked and the browser settings look correct, your IT department may have disabled the camera at the device level, and they will need to unblock it.',
      },
      {
        q: 'How do I test my webcam?',
        a: 'Start the test and read the results, not just the picture. Resolution tells you how sharp you look, frame rate how smooth, and the lighting check flags a picture that is too dark or blown out. Each health check that fails comes with the specific change that fixes it.',
      },
      {
        q: 'How can I test my webcam?',
        a: 'The quickest way is a browser-based test like this one, because it uses the same camera API that video calls use and needs no software. You can also open the Camera app on Windows or Photo Booth on a Mac, though neither reports resolution, frame rate or bitrate.',
      },
      {
        q: 'Can I test my webcam?',
        a: 'Yes, provided you have a working camera, a modern browser, and a page served over HTTPS. Browsers refuse camera access to pages on plain http:// no matter what permission you grant, which is the single most common reason a test appears to do nothing.',
      },
      {
        q: 'Can I test my webcam online?',
        a: 'Yes. An online webcam test runs entirely in the browser, so there is nothing to install and nothing to remove afterwards. On this site the video is processed on your own device and never uploaded, which is worth confirming before you point a camera at any website.',
      },
    ],
  },
  {
    id: 'by-device',
    title: 'Testing a webcam on Windows, Mac, PC and laptop',
    items: [
      {
        q: 'How to test webcam on Mac',
        a: 'Any browser test works on macOS. If the camera does not start, open System Settings → Privacy & Security → Camera and make sure your browser is listed and switched on. macOS requires the browser to be quit completely — not just the window closed — before the change takes effect.',
      },
      {
        q: 'How to test webcam Windows 11',
        a: 'Open this page in Chrome, Edge, Firefox or another modern browser and press Start test. Windows 11 needs no driver or app for a browser-based test; the browser talks to the camera directly, exactly as Teams or Zoom would in a browser tab.',
      },
      {
        q: 'How to test webcam on Windows 11',
        a: 'As well as a browser test, Windows 11 ships with a Camera app: press Start, type “Camera” and open it. That confirms the hardware works at the system level, which is a useful second opinion if a browser test fails — but it will not tell you your resolution, frame rate or bitrate.',
      },
      {
        q: 'How to test my webcam on Windows 11',
        a: 'If the camera works in the Camera app but not in your browser, the block is in Windows privacy settings. Open Settings → Privacy & security → Camera and turn on “Camera access”, “Let apps access your camera”, and “Let desktop apps access your camera” — browsers count as desktop apps, and that third switch is the one people miss.',
      },
      {
        q: 'How to test webcam Windows 10',
        a: 'The browser test is identical on Windows 10. For the system permissions, the path is slightly different from Windows 11: open Settings → Privacy → Camera, then allow camera access for the device and confirm that desktop apps are permitted to use it.',
      },
      {
        q: 'How to test webcam on PC',
        a: 'On a desktop PC the camera is almost always external, so start with the physical connection: plug it straight into a port on the machine rather than a monitor or hub, and avoid long extension cables. Then run the test and select the camera from the dropdown.',
      },
      {
        q: 'How to test webcam on laptop',
        a: 'Laptops have a built-in camera, so the usual culprits are a privacy shutter sliding over the lens, a function key that disables the camera, or another app holding it. Check the lens first — a black picture with the camera light on is nearly always something covering it.',
      },
    ],
  },
  {
    id: 'logitech',
    title: 'Testing a Logitech webcam',
    items: [
      {
        q: 'How to test Logitech webcam',
        a: 'A Logitech webcam tests like any other: plug it in, start the test, and select it from the camera dropdown — it will usually appear under its model name, such as C920 or Brio. No Logitech software is required for the camera to work in a browser.',
      },
      {
        q: 'How to test my Logitech webcam',
        a: 'If the picture looks wrong rather than absent, Logitech’s own software may be applying settings. Logi Options+, G HUB and Logitech Capture can each hold zoom, exposure or a virtual background, and Capture also creates a separate virtual camera. Close them, or pick the physical camera rather than the virtual one, then test again.',
      },
    ],
  },
  {
    id: 'webcam-and-mic',
    title: 'Testing a webcam and microphone together',
    items: [
      {
        q: 'How to test webcam & microphone',
        a: 'Start the camera test and the microphone meter runs alongside it, so you can check both in one pass. Speak normally: the bar should move well into the middle of its range. A dedicated microphone test with a speaker tone check is also available if audio is all you need.',
      },
    ],
  },
  {
    id: 'what-is',
    title: 'What a webcam test is',
    items: [
      {
        q: 'What is a webcam test?',
        a: 'A webcam test is a quick check that your camera is connected, permitted and producing a usable picture. A good one goes further than showing a preview: it measures resolution, frame rate, aspect ratio and lighting, and tells you whether the result is good enough for a video call.',
      },
      {
        q: 'What is a camera test?',
        a: '“Camera test” is used interchangeably with “webcam test” for computers, and also covers phone and tablet cameras. In every case the aim is the same — confirm the device is detected and permitted, then judge the quality of the image it produces.',
      },
      {
        q: 'What are webcams used for?',
        a: 'Video calls and meetings, remote interviews and lessons, telehealth appointments, live streaming and content creation, recording video messages, and identity verification. They are also used for monitoring — a home or pet camera is the same hardware with different software behind it.',
      },
    ],
  },
  {
    id: 'safety',
    title: 'Are webcam tests safe?',
    items: [
      {
        q: 'Are webcam tests safe?',
        a: 'A webcam test is safe when the video is processed in your browser and never sent anywhere. Before granting access to any test site, check three things: the address begins with https, nothing asks you to download or install software, and the site states plainly what happens to your video. Revoke access from the address-bar icon when you are done.',
      },
      {
        q: 'Is WebcamTests.com safe to use?',
        a: 'WebcamTests.com is a different, unaffiliated website, so we are not in a position to vouch for how it handles your data — judge it against the criteria above and read its own privacy policy. What we can state is how this site works: it is a set of static files with no endpoint that could receive video, so your camera feed is never uploaded, and any snapshot or clip stays on your device unless you choose to download it.',
      },
    ],
  },
  {
    id: 'what-it-sees',
    title: 'Seeing what your webcam sees',
    items: [
      {
        q: 'How do I test what my webcam sees?',
        a: 'Start the test and the live preview shows the camera’s view. Bear in mind the preview is mirrored, as most video apps mirror your self-view. To see yourself the way other people do, use the call preview, which renders your feed un-mirrored at the sizes a real meeting uses.',
      },
      {
        q: 'How to check camera view?',
        a: 'Watch the edges of the frame, not the middle. Leave a little headroom above you, keep your eyes near the upper third of the picture, and check that nothing distracting sits behind you. Turning on the framing guides overlays rule-of-thirds lines and an eye-line marker to make this easy to judge.',
      },
      {
        q: 'How to see webcam view?',
        a: 'The preview shows it live, but the most reliable check is to record a few seconds and play it back. A still preview hides how you move, how the camera handles changing light, and how much background noise your microphone picks up.',
      },
    ],
  },
  {
    id: 'open-and-find',
    title: 'Finding, opening and activating a webcam',
    items: [
      {
        q: 'How do I detect my camera?',
        a: 'A webcam test lists every camera your browser can see, which is the fastest way to confirm detection. If the list is empty, check Device Manager on Windows or System Information on a Mac — if the camera is missing there too, it is a connection or driver problem rather than a browser one.',
      },
      {
        q: 'How do I open my webcam?',
        a: 'A camera has no “open” of its own — an application opens it. In a browser, pressing Start test opens it. On Windows, the Camera app does; on macOS, Photo Booth or QuickTime. Whichever you use, the camera closes again when that application releases it.',
      },
      {
        q: 'How do I activate my webcam?',
        a: 'Built-in webcams are active as soon as an app requests them and you grant permission. If nothing happens, check for a physical privacy shutter, a keyboard function key that disables the camera, and the operating system’s camera privacy setting — all three can keep an otherwise healthy camera switched off.',
      },
      {
        q: 'Where is my webcam located?',
        a: 'On a laptop or all-in-one, the camera sits in the bezel above the screen, usually centred, with a small indicator light beside it. Some laptops place it below the screen or in the keyboard row instead. On a desktop the webcam is a separate device that clips to the top of the monitor.',
      },
    ],
  },
  {
    id: 'access-and-privacy',
    title: 'Checking webcam access, settings and which app is using it',
    items: [
      {
        q: 'How to check webcam access?',
        a: 'In the browser, click the camera or padlock icon at the left of the address bar to see whether this site is allowed, blocked, or has not been asked. At the system level, Windows lists camera permissions under Settings → Privacy & security → Camera, and macOS under System Settings → Privacy & Security → Camera.',
      },
      {
        q: 'Is my webcam on or off?',
        a: 'Trust the hardware indicator light next to the lens: on nearly every laptop it is wired to the camera, so if it is lit, something is using the camera. Windows 11 and macOS also show an on-screen indicator — a taskbar icon on Windows, a green dot in the menu bar on macOS.',
      },
      {
        q: 'How do I check what is using my webcam?',
        a: 'On Windows 11, Settings → Privacy & security → Camera shows recent camera activity per app. On macOS, clicking the green dot in the menu bar reveals which app has the camera. If the light is on and nothing obvious is running, check for apps minimised to the system tray or menu bar.',
      },
      {
        q: 'What app is using my webcam?',
        a: 'Usually a conferencing app left running in the background — Zoom, Teams, Slack, Discord, Skype or OBS are the common ones, and they hold the camera even when minimised. Quit them fully rather than closing the window. If the camera stays busy, restarting the computer releases it.',
      },
      {
        q: 'Where to check webcam settings?',
        a: 'There are three separate layers, and they override each other in this order: your operating system’s camera privacy settings, your browser’s per-site permission, and finally the settings inside whichever app you are using. A camera can be enabled in two of them and still be blocked by the third.',
      },
    ],
  },
  {
    id: 'fixing',
    title: 'Getting a webcam working before a meeting',
    items: [
      {
        q: 'How do I test my webcam before a meeting?',
        a: 'Run the test five minutes before you join, not thirty seconds. Confirm the right camera and microphone are selected, that the picture is well lit, and that your level meter moves when you speak. That leaves time to move a lamp or swap a cable if something is wrong.',
      },
      {
        q: 'How do I get my webcam working?',
        a: 'Work through four causes in order: another app holding the camera, a blocked browser permission, the wrong device selected, and a privacy shutter over the lens. Those four explain nearly every failure. If none applies, our troubleshooting guide decodes the specific error your browser reports.',
      },
    ],
  },
];

/** Flat list, for building the FAQPage graph without letting it drift. */
export const ALL_FAQ_ITEMS: Faq[] = FAQ_GROUPS.flatMap((g) => g.items);
