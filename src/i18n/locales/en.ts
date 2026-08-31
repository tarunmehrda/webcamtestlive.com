import type { Dict } from '../schema';

export const en = {
  seo: {
    primaryKeyword: 'webcam test',
    keywords: ['camera test', 'online camera', 'camera online', 'test webcam', 'webcam test online'],
  },

  meta: {
    homeTitle: 'Webcam Test: Free Online Webcam & Mic Test (No Download)',
    homeDescription:
      'Free online webcam test. Check your camera and mic in your browser, resolution, FPS, bitrate and image quality. No download, no sign-up, nothing uploaded.',
  },

  nav: {
    home: 'Webcam Test',
    resolution: 'Resolution',
    fps: 'FPS',
    micTest: 'Microphone',
    troubleshooting: 'Troubleshooting',
    faq: 'FAQ',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    language: 'Change language',
    openMenu: 'Open menu',
    startTest: 'Start test',
    toggleTheme: 'Toggle dark mode',
  },

  hero: {
    eyebrow: '100% private · runs in your browser',
    title: 'Webcam test, done in seconds.',
    subtitle:
      'Preview your camera, measure resolution and frame rate, and run instant health checks before your next call. Nothing ever leaves your device.',
    trust: {
      noDownloads: 'No downloads',
      noSignup: 'No sign-up',
      runsInBrowser: 'Runs in your browser',
      nothingUploaded: 'Nothing uploaded',
    },
  },

  tool: {
    startTest: 'Start test',
    stop: 'Stop',
    idleTitle: 'Your camera preview appears here',
    idleNote: 'Nothing is uploaded, the test runs on your device.',
    howToFix: 'How to fix this →',
    live: 'LIVE',
    mirror: 'Mirror preview',
    framingGuides: 'Framing guides',
    record: 'Record a short clip',
    snapshot: 'Take snapshot',
    fullscreen: 'Fullscreen',
    camera: 'Camera',
    microphone: 'Microphone',
    defaultCamera: 'Default camera',
    defaultMicrophone: 'Default microphone',
    eyeLine: 'eye line',

    info: {
      title: 'Webcam information',
      idle: 'Idle',
      live: 'Live',
      groupDevice: 'Device',
      groupVideo: 'Video',
      groupImage: 'Image',
      name: 'Webcam name',
      quality: 'Quality',
      builtInMic: 'Microphone',
      builtInSpeaker: 'Speaker',
      resolution: 'Resolution',
      maxSupported: 'Max supported',
      videoStandard: 'Standard',
      frameRate: 'Frame rate',
      megapixels: 'Megapixels',
      aspectRatio: 'Aspect ratio',
      streamType: 'Stream type',
      bitrate: 'Bitrate',
      pngSize: 'PNG frame',
      jpegSize: 'JPEG frame',
      imageMode: 'Image mode',
      colours: 'Colours',
      averageRgb: 'Average colour',
      lightness: 'Lightness',
      luminosity: 'Luminosity',
      brightness: 'Brightness',
      contrast: 'Contrast',
      hue: 'Hue',
      saturation: 'Saturation',
      note: 'Measured live on your device, nothing is uploaded. Colour count is taken from a 160×90 sample of the current frame; file sizes are the current frame encoded at full resolution. Use {copyReport} to save or share these numbers.',
    },

    healthChecks: {
      title: 'Health checks',
      copyReport: 'Copy report',
      copied: 'Copied',
      selectAndCopy: 'Select and copy',
      idle: 'Start the test to run automatic checks.',
    },

    cameraControls: {
      title: 'Camera controls',
      subtitle: 'Adjust the camera itself, not just the picture on screen.',
      reset: 'Reset',
      idle: 'Start the test to see which controls your camera supports.',
      unsupported:
        'This camera does not expose adjustable controls to your browser. That is common for built-in laptop webcams, and it is a browser limitation rather than a fault.',
      torch: 'Torch',
      on: 'On',
      off: 'Off',
    },

    mic: {
      title: 'Microphone',
      off: 'Off',
      prompt: 'Speak to see your input level. Starts with the camera test.',
      meterTitle: 'Microphone level',
      meterSubtitle: 'Speak and watch the bar respond. Audio is analysed on your device only.',
      idle: 'Idle',
      listening: 'Listening',
    },

    speakers: {
      title: 'Speakers',
      idle: 'Idle',
      prompt:
        'Play a test tone to check each side is working. Wear headphones to tell left from right.',
      left: 'Left',
      both: 'Both',
      right: 'Right',
      lr: 'L + R',
      playing: 'Playing',
      unavailable: 'Unavailable',
      blocked: 'Blocked',
      hint: 'Headphones tell left from right. Press the same button again to stop.',
      toneLabel: 'Tone',
      toneLow: 'Low',
      toneLowNote: '120 Hz bass response',
      toneMid: 'Mid',
      toneMidNote: '440 Hz voice range',
      toneHigh: 'High',
      toneHighNote: '2 kHz clarity and hiss',
    },

    recording: {
      title: 'See what others see',
      note: 'Played back from your device. Never uploaded.',
      download: 'Download',
      discard: 'Discard',
    },
  },

  home: {
    howItWorks: {
      title: 'Three steps, about a minute.',
      subtitle:
        'There is nothing to install and nothing to sign up for. The camera opens, the numbers appear, and you close the tab.',
      steps: [
        {
          name: 'Press “Start test”',
          text: 'No download, no plugin, no account. The test opens your camera through your browser’s standard media API, exactly as a video call would.',
        },
        {
          name: 'Allow camera access',
          text: 'Your browser asks for permission, it always does, for every site. Choose Allow and your preview appears within a second or two.',
        },
        {
          name: 'Read your results',
          text: 'Resolution, frame rate, aspect ratio and lighting are measured live, and anything that would look poor on a call is flagged with a specific fix.',
        },
      ],
    },

    checks: {
      title: 'What the test actually checks.',
      subtitle:
        'Seeing your own face confirms the camera turns on. These are the things that decide whether you look and sound good to everyone else.',
      items: [
        {
          title: 'Resolution',
          body: 'Your live resolution and the maximum your camera supports, so you know whether you are getting the quality you paid for.',
        },
        {
          title: 'Frame rate',
          body: 'Counted from the frames your browser actually presents, rather than the figure quoted on the box.',
        },
        {
          title: 'Aspect ratio',
          body: 'Whether your camera delivers the 16:9 shape conferencing apps expect, or a 4:3 image they will crop.',
        },
        {
          title: 'Bitrate',
          body: 'Measured by encoding a short sample, so the number reflects what your camera really produces.',
        },
        {
          title: 'Image quality',
          body: 'Brightness, contrast, saturation and colour count are sampled live, and we flag a picture that is too dark or blown out.',
        },
        {
          title: 'Microphone',
          body: 'A live input meter shows what callers would hear, so you can set your level before anyone is listening.',
        },
        {
          title: 'Speakers',
          body: 'A test tone through the left and right channels confirms the other half of the call actually works.',
        },
        {
          title: 'Record and play back',
          body: 'Capture a few seconds and watch it back, the only honest way to see what other people see.',
        },
        {
          title: 'Permissions and devices',
          body: 'Confirms the browser granted access over a secure connection, and lists every camera and microphone to switch between.',
        },
      ],
    },

    subTools: {
      title: 'Go deeper on any dimension.',
      subtitle: 'Focused tools for the checks that matter most before a meeting or stream.',
      openTool: 'Open tool',
      resolution: {
        title: 'Resolution test',
        body: 'See your live and maximum supported resolution, and whether it is HD-ready.',
      },
      fps: {
        title: 'FPS test',
        body: 'Measure real frame rate from the frames your browser actually presents.',
      },
      mic: {
        title: 'Microphone test',
        body: 'Check your mic with a live input level meter, no call required.',
      },
    },

    notWorking: {
      eyebrow: 'Camera not working?',
      title: 'Four causes explain almost every failure.',
      body: 'A blocked permission, another app holding the camera, the wrong device selected, or a privacy shutter over the lens. Our troubleshooting guide walks through each one, with the exact settings path for every major browser and for Windows and macOS.',
      cta: 'Open the fix-it guide',
    },

    privacyStrip: {
      eyebrow: 'Privacy by design',
      title: 'Your camera feed never leaves your device.',
      body: 'Every check runs locally in your browser using standard web APIs. We never receive, store or transmit your video or audio, and the optional clip you can record stays in your browser on your own device.',
      cta: 'Read our privacy approach',
    },

    faq: {
      title: 'Webcam test FAQ',
      more: 'More questions answered in the',
      moreLinkText: 'full webcam test FAQ',
      items: [
        {
          q: 'Is this webcam test safe and private?',
          a: 'Yes. The entire test runs inside your browser and your video never leaves your device, nothing is uploaded to any server, and there is no server that could receive your feed even if we wanted it to. The optional clip you can record is held in your browser and discarded when you are done.',
        },
        {
          q: 'Do I need to install anything?',
          a: 'No. There is nothing to download, no plugin, no extension, and no sign-up. Open the page, click “Start test”, and allow camera access when your browser asks.',
        },
        {
          q: 'Why does the browser ask for permission?',
          a: 'Browsers require your explicit permission before any site can use the camera or microphone, it is a built-in protection, not something we control. We request access only while you are testing, and you can revoke it at any time from the icon in your address bar.',
        },
        {
          q: 'My camera does not show up, what should I do?',
          a: 'Close any other app that may be holding the camera (Zoom, Teams, Meet, OBS), confirm the camera is plugged in and not covered by a privacy shutter, and check that you allowed access from the address-bar icon. Reload and try again. Our troubleshooting guide walks through every cause step by step.',
        },
        {
          q: 'Which browsers and devices are supported?',
          a: 'All modern browsers work: Chrome, Edge, Firefox, Safari, Opera and Brave, on Windows, macOS, Linux, Android and iOS. The page must be served over HTTPS, this site is, which is why the camera can start at all.',
        },
        {
          q: 'What do the health checks mean?',
          a: 'Once your camera starts we evaluate resolution, frame rate, aspect ratio, permissions and image brightness, then flag anything that would look poor on a call. Each flag comes with a specific fix rather than a generic warning.',
        },
        {
          q: 'Does testing here block my camera in other apps?',
          a: 'Only while the test is running, most systems let one page or app hold the camera at a time. Press “Stop” when you are done and the camera is released immediately, your indicator light turns off, and Zoom or Teams can pick it up again.',
        },
        {
          q: 'Does the recorded clip get uploaded anywhere?',
          a: 'No. The “see what others see” clip is recorded by your browser into memory on your own device and played back from there. It is discarded when you press Discard, record again, stop the test, or close the tab, and it only reaches your disk if you choose Download.',
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
          a: 'That is exactly what this is for. Run the test a few minutes beforehand to confirm the right camera is selected, the picture is sharp and well lit, and your microphone level responds when you speak, all without joining a call and putting yourself on display.',
        },
      ],
    },
  },

  footer: {
    blurb:
      'A fast, private webcam & microphone test. Everything runs in your browser, your video never leaves your device.',
    tools: 'Tools',
    guides: 'Guides',
    site: 'Site',
    rights: 'All rights reserved.',
    strapline: '100% client-side · no uploads · no tracking of your video',
  },
} satisfies Dict;
