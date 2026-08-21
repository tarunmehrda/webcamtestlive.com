export interface Faq {
  q: string;
  a: string;
}

export const HOME_FAQS: Faq[] = [
  {
    q: 'Is this webcam test safe and private?',
    a: 'Yes. The entire test runs inside your browser and your video never leaves your device — nothing is uploaded to any server, and there is no server that could receive your feed even if we wanted it to. The optional clip you can record is held in your browser and discarded when you are done.',
  },
  {
    q: 'Do I need to install anything?',
    a: 'No. There is nothing to download, no plugin, no extension, and no sign-up. Open the page, click “Start test”, and allow camera access when your browser asks.',
  },
  {
    q: 'Why does the browser ask for permission?',
    a: 'Browsers require your explicit permission before any site can use the camera or microphone — it is a built-in protection, not something we control. We request access only while you are testing, and you can revoke it at any time from the icon in your address bar.',
  },
  {
    q: 'My camera does not show up — what should I do?',
    a: 'Close any other app that may be holding the camera (Zoom, Teams, Meet, OBS), confirm the camera is plugged in and not covered by a privacy shutter, and check that you allowed access from the address-bar icon. Reload and try again. Our troubleshooting guide walks through every cause step by step.',
  },
  {
    q: 'Which browsers and devices are supported?',
    a: 'All modern browsers work: Chrome, Edge, Firefox, Safari, Opera and Brave, on Windows, macOS, Linux, Android and iOS. The page must be served over HTTPS — this site is, which is why the camera can start at all.',
  },
  {
    q: 'What do the health checks mean?',
    a: 'Once your camera starts we evaluate resolution, frame rate, aspect ratio, permissions and image brightness, then flag anything that would look poor on a call. Each flag comes with a specific fix rather than a generic warning.',
  },
  {
    q: 'Does testing here block my camera in other apps?',
    a: 'Only while the test is running — most systems let one page or app hold the camera at a time. Press “Stop” when you are done and the camera is released immediately, your indicator light turns off, and Zoom or Teams can pick it up again.',
  },
  {
    q: 'Does the recorded clip get uploaded anywhere?',
    a: 'No. The “see what others see” clip is recorded by your browser into memory on your own device and played back from there. It is discarded when you press Discard, record again, stop the test, or close the tab — and it only reaches your disk if you choose Download.',
  },
  {
    q: 'Can I test my speakers and headphones here too?',
    a: 'Yes. The Speakers panel plays a short test tone through the left channel, the right channel, or both, which confirms the other half of a call works. Wear headphones if you want to tell left from right reliably.',
  },
  {
    q: 'What are the framing guides for?',
    a: 'They overlay rule-of-thirds lines and an eye-line marker on your preview. Aligning your eyes with the upper line and leaving a little headroom is the quickest way to go from a webcam shot that looks accidental to one that looks deliberate.',
  },
  {
    q: 'Can I test my webcam before a job interview or meeting?',
    a: 'That is exactly what this is for. Run the test a few minutes beforehand to confirm the right camera is selected, the picture is sharp and well lit, and your microphone level responds when you speak — all without joining a call and putting yourself on display.',
  },
];

export const RESOLUTION_FAQS: Faq[] = [
  {
    q: 'What is my webcam resolution?',
    a: 'Your current resolution is shown live once the test starts, written as width × height in pixels. We also detect the maximum resolution your camera supports by requesting the highest quality your device will grant.',
  },
  {
    q: 'What resolution is good for video calls?',
    a: '720p (1280×720) is the practical minimum for a sharp call; 1080p (1920×1080) looks excellent. Anything below 480p will appear soft, especially on a large monitor.',
  },
  {
    q: 'Why is my resolution lower than my camera’s advertised specification?',
    a: 'Browsers and conferencing apps often negotiate a lower resolution to save bandwidth and CPU, and cameras drop resolution in low light to keep the frame rate up. The number here is what your browser is actually receiving, which is what people on your call would see.',
  },
  {
    q: 'Does higher resolution always look better?',
    a: 'No. Lighting matters more than pixel count. A well-lit 720p picture looks better than a dim 1080p one, because the noise reduction that kicks in under low light smears fine detail regardless of how many pixels the sensor captures.',
  },
  {
    q: 'What is aspect ratio and why does it matter?',
    a: 'Aspect ratio is the shape of your image — 16:9 is the widescreen standard used by nearly all conferencing apps. If your camera reports 4:3, apps may crop the top and bottom or add black bars at the sides to make it fit.',
  },
  {
    q: 'Can I force my webcam into 1080p?',
    a: 'Only if the camera supports it. This test requests the maximum your device reports, so if the result caps at 720p that is your hardware ceiling. Inside conferencing apps, look for an “HD video” setting — many disable it by default to save bandwidth.',
  },
];

export const FPS_FAQS: Faq[] = [
  {
    q: 'What is a good webcam frame rate?',
    a: '30 fps is the standard for smooth video. Anything from 24 fps upward looks fine; below 15 fps will appear visibly choppy and stuttery to the people you are talking to.',
  },
  {
    q: 'How is FPS measured here?',
    a: 'We count the actual video frames your browser presents over rolling one-second windows, so the number reflects real, delivered performance rather than the camera’s advertised specification.',
  },
  {
    q: 'Why is my frame rate lower than 30 fps?',
    a: 'Low light is the most common cause: the camera lengthens its exposure to gather more light, and a longer exposure means fewer frames each second. A busy CPU, a USB hub shared with other devices, or a high resolution setting can also pull it down.',
  },
  {
    q: 'How do I improve my webcam frame rate?',
    a: 'Add light in front of your face — this alone often doubles the frame rate. Then close background applications, plug the camera directly into the computer rather than through a hub, and if the camera offers the option, drop from 1080p to 720p to give the sensor more headroom.',
  },
  {
    q: 'Is 60 fps worth it for video calls?',
    a: 'Rarely. Most conferencing platforms cap at 30 fps and re-encode your video anyway, so a 60 fps camera gains nothing on a call. It is genuinely useful for streaming and recording, where the extra smoothness survives all the way to the viewer.',
  },
  {
    q: 'My frame rate keeps fluctuating — is that normal?',
    a: 'Some variation is expected. Cameras with auto-exposure adjust continuously as the light in the room changes, and browsers drop frames when the CPU is busy. Swings of a few frames per second are normal; a sustained drop below 15 fps is worth investigating.',
  },
];

export const MIC_FAQS: Faq[] = [
  {
    q: 'How does the microphone test work?',
    a: 'Allow microphone access and speak — the level meter moves with your voice. If the bar responds, your microphone is working and your computer is receiving audio. The signal is analysed locally with the Web Audio API and never leaves your device.',
  },
  {
    q: 'The meter is not moving. What is wrong?',
    a: 'Check that the correct microphone is selected in the dropdown, that it is not muted in your operating system or by a hardware switch on your headset, and that no other app is holding it. On some systems you may also need to raise the input volume in your sound settings.',
  },
  {
    q: 'What level should the meter show when I speak?',
    a: 'Normal speech should push the meter into the middle of its range and peak toward the upper third. If it barely moves, raise your input gain or move closer. If it sits pinned at the top, lower the gain — a signal that clips sounds harsh and distorted to everyone else.',
  },
  {
    q: 'Why do I sound quiet or distant to other people?',
    a: 'Usually the microphone is too far away or the input gain is too low. Speak from 15–30 cm away, keep the microphone off the desk surface so it does not pick up typing, and avoid sitting directly under a noisy air vent or fan.',
  },
  {
    q: 'Can I hear myself during the test?',
    a: 'This test shows your level visually rather than playing your voice back, which avoids the feedback squeal that happens when a microphone picks up its own output through your speakers. Watch the meter instead — it tells you what a caller would hear.',
  },
  {
    q: 'Does the microphone test record my voice?',
    a: 'No. Audio is measured moment by moment to draw the meter and is discarded immediately. Nothing is buffered, saved, or transmitted, and there is no server to send it to.',
  },
];

export const TROUBLESHOOTING_FAQS: Faq[] = [
  {
    q: 'Why does my webcam show a black screen?',
    a: 'A black picture with the camera light on usually means a privacy shutter or a piece of tape is covering the lens. If the light is off instead, another application is holding the camera or the wrong device is selected. Close other video apps, reload the page, and pick the correct camera from the dropdown.',
  },
  {
    q: 'I blocked camera access by mistake — how do I undo it?',
    a: 'Click the camera or padlock icon at the left of your browser’s address bar, set camera access back to “Allow”, then reload the page. Blocked permissions are remembered per site, so the prompt will not reappear on its own until you reset it there.',
  },
  {
    q: 'Why does my camera work in one app but not in the browser?',
    a: 'Either the other app still holds the camera, or your operating system blocks browsers specifically. On Windows check Settings → Privacy & security → Camera; on macOS check System Settings → Privacy & Security → Camera, and make sure your browser is listed and switched on.',
  },
  {
    q: 'My video is grainy and dark. How do I fix it?',
    a: 'Put a light source in front of you rather than behind you — a window you face, or a lamp beside your monitor. Backlighting forces the camera to expose for the bright background, leaving your face dark and noisy. This single change fixes most quality complaints.',
  },
  {
    q: 'Why is my webcam mirrored or upside down?',
    a: 'A mirrored preview is normal and intentional — it matches how you see yourself in a mirror, and most conferencing apps do the same. Other people see you the correct way round. An upside-down picture is different: that points to a driver problem, so update or reinstall the camera driver.',
  },
  {
    q: 'The test says my camera is in use by another application.',
    a: 'Quit every app that can access video — Zoom, Teams, Slack, Discord, OBS, Skype — including any minimised to the system tray, then reload this page. On Windows a background process sometimes keeps the device open, in which case signing out and back in releases it.',
  },
];
