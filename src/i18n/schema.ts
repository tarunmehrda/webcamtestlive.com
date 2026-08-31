/**
 * The shape every locale dictionary must satisfy.
 *
 * Each locale file is declared `satisfies Dict`, so omitting a key or
 * misspelling one fails `astro check` / the build rather than silently
 * rendering English inside a page served under a non-English hreflang,
 * which is the failure mode that actually damages you in search.
 */
export interface Dict {
  /** Per-locale search targeting. Keep these as the phrases people really type. */
  seo: {
    /** Primary keyword for this market, used in the <title>. */
    primaryKeyword: string;
    /** Secondary phrases, folded into the meta description and H2s. */
    keywords: readonly string[];
  };

  meta: {
    /** <title> for the homepage. */
    homeTitle: string;
    /** <meta name="description"> for the homepage. */
    homeDescription: string;
  };

  nav: {
    home: string;
    resolution: string;
    fps: string;
    micTest: string;
    troubleshooting: string;
    faq: string;
    about: string;
    contact: string;
    privacy: string;
    terms: string;
    /** aria-label for the language <select>. */
    language: string;
    openMenu: string;
    startTest: string;
    toggleTheme: string;
  };

  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    trust: {
      noDownloads: string;
      noSignup: string;
      runsInBrowser: string;
      nothingUploaded: string;
    };
  };

  /** The live tool interface. These are the strings a user sees while testing. */
  tool: {
    startTest: string;
    stop: string;
    idleTitle: string;
    idleNote: string;
    howToFix: string;
    live: string;
    mirror: string;
    framingGuides: string;
    record: string;
    snapshot: string;
    fullscreen: string;
    camera: string;
    microphone: string;
    defaultCamera: string;
    defaultMicrophone: string;
    eyeLine: string;

    /** The "Webcam information" read-out panel. */
    info: {
      title: string;
      /** Status pill: no stream yet / stream running. */
      idle: string;
      live: string;
      /** Section headings. */
      groupDevice: string;
      groupVideo: string;
      groupImage: string;

      // Device
      name: string;
      quality: string;
      builtInMic: string;
      builtInSpeaker: string;

      // Video
      resolution: string;
      maxSupported: string;
      videoStandard: string;
      frameRate: string;
      megapixels: string;
      aspectRatio: string;
      streamType: string;
      bitrate: string;
      pngSize: string;
      jpegSize: string;

      // Image
      imageMode: string;
      colours: string;
      averageRgb: string;
      lightness: string;
      luminosity: string;
      brightness: string;
      contrast: string;
      hue: string;
      saturation: string;

      /**
       * Footnote. Must contain the literal token `{copyReport}`, which is
       * replaced at render time with the highlighted "Copy report" button name.
       * A token rather than three concatenated fragments, so each language can
       * put the button name wherever its own word order needs it.
       */
      note: string;
    };

    healthChecks: {
      title: string;
      copyReport: string;
      copied: string;
      /** Shown when the clipboard API is unavailable and the textarea fallback opens. */
      selectAndCopy: string;
      idle: string;
    };

    cameraControls: {
      title: string;
      subtitle: string;
      reset: string;
      idle: string;
      unsupported: string;
      torch: string;
      on: string;
      off: string;
    };

    mic: {
      title: string;
      off: string;
      prompt: string;
      /** Standalone meter panel on /mic-test. */
      meterTitle: string;
      meterSubtitle: string;
      idle: string;
      listening: string;
    };

    speakers: {
      title: string;
      idle: string;
      prompt: string;
      left: string;
      both: string;
      right: string;
      /** Channel button sub-label; stays "L + R" in every locale (a symbol, not a word). */
      lr: string;
      playing: string;
      unavailable: string;
      blocked: string;
      /** Hint under the heading. */
      hint: string;
      /** "Tone" label before the frequency buttons. */
      toneLabel: string;
      toneLow: string;
      toneLowNote: string;
      toneMid: string;
      toneMidNote: string;
      toneHigh: string;
      toneHighNote: string;
    };

    recording: {
      title: string;
      note: string;
      download: string;
      discard: string;
    };
  };

  home: {
    howItWorks: {
      title: string;
      subtitle: string;
      steps: readonly { name: string; text: string }[];
    };
    checks: {
      title: string;
      subtitle: string;
      items: readonly { title: string; body: string }[];
    };
    subTools: {
      title: string;
      subtitle: string;
      openTool: string;
      resolution: { title: string; body: string };
      fps: { title: string; body: string };
      mic: { title: string; body: string };
    };
    notWorking: {
      eyebrow: string;
      title: string;
      body: string;
      cta: string;
    };
    privacyStrip: {
      eyebrow: string;
      title: string;
      body: string;
      cta: string;
    };
    faq: {
      title: string;
      more: string;
      moreLinkText: string;
      items: readonly { q: string; a: string }[];
    };
  };

  footer: {
    blurb: string;
    tools: string;
    guides: string;
    site: string;
    rights: string;
    strapline: string;
  };
}
