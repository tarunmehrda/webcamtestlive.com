import type { Dict } from '../schema';

/**
 * Indonesian. "tes webcam" and "cek webcam" are both high-volume; "tes kamera"
 * catches the phone-camera intent. Indonesian uses "webcam" as a loanword, so a
 * native calque would lose the query match entirely.
 */
export const id = {
  seo: {
    primaryKeyword: 'tes webcam',
    keywords: ['cek webcam', 'tes kamera', 'kamera online', 'tes kamera online'],
  },

  meta: {
    homeTitle: 'Tes Webcam: Cek Kamera & Mikrofon Online Gratis',
    homeDescription:
      'Tes webcam online gratis. Cek kamera dan mikrofon langsung di browser, resolusi, FPS, bitrate, dan kualitas gambar. Tanpa unduhan, tanpa daftar, tanpa unggahan.',
  },

  nav: {
    home: 'Tes Webcam',
    resolution: 'Resolusi',
    fps: 'FPS',
    micTest: 'Mikrofon',
    troubleshooting: 'Pemecahan masalah',
    faq: 'Tanya jawab',
    about: 'Tentang',
    contact: 'Kontak',
    privacy: 'Privasi',
    terms: 'Ketentuan',
    language: 'Ganti bahasa',
    openMenu: 'Buka menu',
    startTest: 'Mulai tes',
    toggleTheme: 'Ubah mode gelap',
  },

  hero: {
    eyebrow: '100% privat · berjalan di browser Anda',
    title: 'Tes webcam dalam hitungan detik.',
    subtitle:
      'Lihat pratinjau kamera, ukur resolusi dan frame rate, serta jalankan pemeriksaan cepat sebelum panggilan berikutnya. Tidak ada data yang meninggalkan perangkat Anda.',
    trust: {
      noDownloads: 'Tanpa unduhan',
      noSignup: 'Tanpa daftar',
      runsInBrowser: 'Jalan di browser',
      nothingUploaded: 'Tanpa unggahan',
    },
  },

  tool: {
    startTest: 'Mulai tes',
    stop: 'Berhenti',
    idleTitle: 'Pratinjau kamera Anda muncul di sini',
    idleNote: 'Tidak ada yang diunggah, tes berjalan di perangkat Anda.',
    howToFix: 'Cara memperbaikinya →',
    live: 'LANGSUNG',
    mirror: 'Cerminkan pratinjau',
    framingGuides: 'Panduan komposisi',
    record: 'Rekam klip singkat',
    snapshot: 'Ambil gambar',
    fullscreen: 'Layar penuh',
    camera: 'Kamera',
    microphone: 'Mikrofon',
    defaultCamera: 'Kamera bawaan',
    defaultMicrophone: 'Mikrofon bawaan',
    eyeLine: 'garis mata',

    info: {
      title: 'Informasi webcam',
      idle: 'Siaga',
      live: 'Langsung',
      groupDevice: 'Perangkat',
      groupVideo: 'Video',
      groupImage: 'Gambar',
      name: 'Nama webcam',
      quality: 'Kualitas',
      builtInMic: 'Mikrofon',
      builtInSpeaker: 'Speaker',
      resolution: 'Resolusi',
      maxSupported: 'Maksimum didukung',
      videoStandard: 'Standar',
      frameRate: 'Frame rate',
      megapixels: 'Megapiksel',
      aspectRatio: 'Rasio aspek',
      streamType: 'Jenis stream',
      bitrate: 'Bitrate',
      pngSize: 'Frame PNG',
      jpegSize: 'Frame JPEG',
      imageMode: 'Mode gambar',
      colours: 'Warna',
      averageRgb: 'Warna rata-rata',
      lightness: 'Lightness',
      luminosity: 'Luminositas',
      brightness: 'Kecerahan',
      contrast: 'Kontras',
      hue: 'Rona',
      saturation: 'Saturasi',
      note: 'Diukur langsung di perangkat Anda, tidak ada yang diunggah. Jumlah warna diambil dari sampel 160×90 frame saat ini; ukuran file adalah frame saat ini yang dikodekan pada resolusi penuh. Gunakan {copyReport} untuk menyimpan atau membagikan angka-angka ini.',
    },

    healthChecks: {
      title: 'Pemeriksaan',
      copyReport: 'Salin laporan',
      copied: 'Tersalin',
      selectAndCopy: 'Pilih dan salin',
      idle: 'Mulai tes untuk menjalankan pemeriksaan otomatis.',
    },

    cameraControls: {
      title: 'Kontrol kamera',
      subtitle: 'Atur kameranya langsung, bukan sekadar gambar di layar.',
      reset: 'Atur ulang',
      idle: 'Mulai tes untuk melihat kontrol apa saja yang didukung kamera Anda.',
      unsupported:
        'Kamera ini tidak menyediakan kontrol yang dapat diatur ke browser Anda. Hal ini umum pada webcam bawaan laptop, dan merupakan keterbatasan browser, bukan kerusakan.',
      torch: 'Lampu',
      on: 'Nyala',
      off: 'Mati',
    },

    mic: {
      title: 'Mikrofon',
      off: 'Mati',
      prompt: 'Bicaralah untuk melihat level masukan. Dimulai bersama tes kamera.',
      meterTitle: 'Level mikrofon',
      meterSubtitle: 'Bicaralah dan lihat bilahnya bergerak. Audio dianalisis hanya di perangkat Anda.',
      idle: 'Siaga',
      listening: 'Mendengarkan',
    },

    speakers: {
      title: 'Speaker',
      idle: 'Siaga',
      prompt:
        'Putar nada uji untuk memeriksa setiap sisi. Gunakan headphone agar bisa membedakan kiri dan kanan.',
      left: 'Kiri',
      both: 'Keduanya',
      right: 'Kanan',
      lr: 'L + R',
      playing: 'Memutar',
      unavailable: 'Tidak tersedia',
      blocked: 'Diblokir',
      hint: 'Headphone membantu membedakan kiri dan kanan. Tekan tombol yang sama lagi untuk berhenti.',
      toneLabel: 'Nada',
      toneLow: 'Rendah',
      toneLowNote: '120 Hz respons bas',
      toneMid: 'Menengah',
      toneMidNote: '440 Hz rentang suara',
      toneHigh: 'Tinggi',
      toneHighNote: '2 kHz kejernihan dan desis',
    },

    recording: {
      title: 'Lihat apa yang orang lain lihat',
      note: 'Diputar dari perangkat Anda. Tidak pernah diunggah.',
      download: 'Unduh',
      discard: 'Buang',
    },
  },

  home: {
    howItWorks: {
      title: 'Tiga langkah, sekitar satu menit.',
      subtitle:
        'Tidak ada yang perlu dipasang dan tidak perlu mendaftar. Kamera menyala, angkanya muncul, lalu Anda tutup tabnya.',
      steps: [
        {
          name: 'Tekan “Mulai tes”',
          text: 'Tanpa unduhan, tanpa plugin, tanpa akun. Tes ini membuka kamera melalui API media standar browser Anda, persis seperti panggilan video.',
        },
        {
          name: 'Izinkan akses kamera',
          text: 'Browser akan meminta izin, selalu begitu, untuk setiap situs. Pilih Izinkan dan pratinjau muncul dalam satu dua detik.',
        },
        {
          name: 'Baca hasilnya',
          text: 'Resolusi, frame rate, rasio aspek, dan pencahayaan diukur secara langsung, dan apa pun yang akan terlihat buruk saat panggilan ditandai dengan solusi spesifik.',
        },
      ],
    },

    checks: {
      title: 'Apa yang sebenarnya diperiksa tes ini.',
      subtitle:
        'Melihat wajah sendiri hanya memastikan kamera menyala. Inilah hal-hal yang menentukan apakah Anda terlihat dan terdengar baik bagi orang lain.',
      items: [
        {
          title: 'Resolusi',
          body: 'Resolusi langsung Anda dan maksimum yang didukung kamera, agar Anda tahu apakah kualitasnya sesuai dengan yang Anda bayar.',
        },
        {
          title: 'Frame rate',
          body: 'Dihitung dari frame yang benar-benar ditampilkan browser, bukan angka yang tertulis di kemasan.',
        },
        {
          title: 'Rasio aspek',
          body: 'Apakah kamera Anda menghasilkan bentuk 16:9 yang diharapkan aplikasi konferensi, atau gambar 4:3 yang akan dipotong.',
        },
        {
          title: 'Bitrate',
          body: 'Diukur dengan mengodekan sampel singkat, sehingga angkanya mencerminkan apa yang benar-benar dihasilkan kamera Anda.',
        },
        {
          title: 'Kualitas gambar',
          body: 'Kecerahan, kontras, saturasi, dan jumlah warna diambil secara langsung, dan kami menandai gambar yang terlalu gelap atau terlalu terang.',
        },
        {
          title: 'Mikrofon',
          body: 'Pengukur masukan langsung menunjukkan apa yang akan didengar lawan bicara, sehingga Anda bisa mengatur level sebelum ada yang mendengarkan.',
        },
        {
          title: 'Speaker',
          body: 'Nada uji melalui kanal kiri dan kanan memastikan separuh lain dari panggilan benar-benar berfungsi.',
        },
        {
          title: 'Rekam dan putar ulang',
          body: 'Rekam beberapa detik lalu tonton kembali, satu-satunya cara jujur untuk melihat apa yang dilihat orang lain.',
        },
        {
          title: 'Izin dan perangkat',
          body: 'Memastikan browser memberikan akses melalui koneksi aman, dan menampilkan setiap kamera serta mikrofon untuk berpindah.',
        },
      ],
    },

    subTools: {
      title: 'Dalami setiap aspeknya.',
      subtitle: 'Alat khusus untuk pemeriksaan yang paling penting sebelum rapat atau siaran langsung.',
      openTool: 'Buka alat',
      resolution: {
        title: 'Tes resolusi',
        body: 'Lihat resolusi saat ini dan maksimum yang didukung, serta apakah sudah siap HD.',
      },
      fps: {
        title: 'Tes FPS',
        body: 'Ukur frame rate sesungguhnya dari frame yang benar-benar ditampilkan browser Anda.',
      },
      mic: {
        title: 'Tes mikrofon',
        body: 'Periksa mikrofon dengan pengukur level langsung, tanpa perlu melakukan panggilan.',
      },
    },

    notWorking: {
      eyebrow: 'Kamera tidak berfungsi?',
      title: 'Empat penyebab menjelaskan hampir semua kegagalan.',
      body: 'Izin yang diblokir, aplikasi lain yang sedang memakai kamera, perangkat yang salah dipilih, atau penutup privasi di lensa. Panduan pemecahan masalah kami membahas satu per satu, lengkap dengan jalur pengaturan untuk setiap browser utama serta Windows dan macOS.',
      cta: 'Buka panduan perbaikan',
    },

    privacyStrip: {
      eyebrow: 'Privasi sejak awal',
      title: 'Video kamera Anda tidak pernah meninggalkan perangkat.',
      body: 'Setiap pemeriksaan berjalan secara lokal di browser Anda menggunakan API web standar. Kami tidak pernah menerima, menyimpan, atau mengirim video maupun audio Anda, dan klip opsional yang Anda rekam tetap berada di browser, di perangkat Anda sendiri.',
      cta: 'Baca pendekatan privasi kami',
    },

    faq: {
      title: 'Tanya jawab tes webcam',
      more: 'Pertanyaan lain dijawab di',
      moreLinkText: 'halaman tanya jawab tes webcam lengkap',
      items: [
        {
          q: 'Apakah tes webcam ini aman dan privat?',
          a: 'Ya. Seluruh tes berjalan di dalam browser Anda dan video tidak pernah meninggalkan perangkat, tidak ada yang diunggah ke server mana pun, dan tidak ada server yang bisa menerima gambar Anda sekalipun kami menginginkannya. Klip opsional yang Anda rekam disimpan di browser dan dibuang setelah selesai.',
        },
        {
          q: 'Apakah saya perlu memasang sesuatu?',
          a: 'Tidak. Tidak ada yang perlu diunduh, tidak ada plugin, tidak ada ekstensi, dan tidak perlu mendaftar. Buka halamannya, klik “Mulai tes”, lalu izinkan akses kamera saat browser meminta.',
        },
        {
          q: 'Mengapa browser meminta izin?',
          a: 'Browser mewajibkan izin eksplisit sebelum situs mana pun bisa memakai kamera atau mikrofon, ini perlindungan bawaan, bukan sesuatu yang kami kendalikan. Kami meminta akses hanya selama Anda menguji, dan Anda bisa mencabutnya kapan saja lewat ikon di bilah alamat.',
        },
        {
          q: 'Kamera saya tidak muncul, apa yang harus dilakukan?',
          a: 'Tutup aplikasi lain yang mungkin sedang memakai kamera (Zoom, Teams, Meet, OBS), pastikan kamera terpasang dan tidak tertutup penutup privasi, lalu periksa apakah Anda sudah mengizinkan akses dari ikon di bilah alamat. Muat ulang dan coba lagi. Panduan pemecahan masalah kami membahas setiap penyebab langkah demi langkah.',
        },
        {
          q: 'Browser dan perangkat apa saja yang didukung?',
          a: 'Semua browser modern bisa: Chrome, Edge, Firefox, Safari, Opera, dan Brave, di Windows, macOS, Linux, Android, dan iOS. Halaman harus disajikan melalui HTTPS, situs ini demikian, dan itulah sebabnya kamera bisa menyala.',
        },
        {
          q: 'Apa arti hasil pemeriksaannya?',
          a: 'Begitu kamera menyala, kami mengevaluasi resolusi, frame rate, rasio aspek, izin, dan kecerahan gambar, lalu menandai apa pun yang akan terlihat buruk saat panggilan. Setiap tanda disertai solusi spesifik, bukan peringatan umum.',
        },
        {
          q: 'Apakah tes di sini memblokir kamera di aplikasi lain?',
          a: 'Hanya selama tes berjalan, kebanyakan sistem hanya mengizinkan satu halaman atau aplikasi memakai kamera pada satu waktu. Tekan “Berhenti” saat selesai dan kamera langsung dilepaskan, lampu indikator mati, dan Zoom atau Teams bisa memakainya lagi.',
        },
        {
          q: 'Apakah klip yang direkam diunggah ke suatu tempat?',
          a: 'Tidak. Klip “lihat apa yang orang lain lihat” direkam oleh browser Anda ke memori di perangkat Anda sendiri dan diputar dari sana. Klip itu dibuang saat Anda menekan Buang, merekam ulang, menghentikan tes, atau menutup tab, dan hanya tersimpan ke disk jika Anda memilih Unduh.',
        },
        {
          q: 'Bisakah saya menguji speaker dan headphone di sini juga?',
          a: 'Bisa. Panel Speaker memutar nada uji singkat melalui kanal kiri, kanal kanan, atau keduanya, yang memastikan separuh lain dari panggilan berfungsi. Gunakan headphone jika ingin membedakan kiri dan kanan dengan pasti.',
        },
        {
          q: 'Untuk apa panduan komposisi itu?',
          a: 'Panduan ini menampilkan garis rule of thirds dan penanda garis mata di atas pratinjau Anda. Menyejajarkan mata dengan garis atas dan menyisakan sedikit ruang di atas kepala adalah cara tercepat mengubah gambar webcam yang terlihat asal menjadi terlihat disengaja.',
        },
        {
          q: 'Bisakah saya menguji webcam sebelum wawancara kerja atau rapat?',
          a: 'Justru untuk itulah alat ini dibuat. Jalankan tes beberapa menit sebelumnya untuk memastikan kamera yang benar sudah dipilih, gambarnya tajam dan pencahayaannya baik, serta level mikrofon merespons saat Anda bicara, semuanya tanpa perlu bergabung ke panggilan.',
        },
      ],
    },
  },

  footer: {
    blurb:
      'Tes webcam dan mikrofon yang cepat dan privat. Semuanya berjalan di browser Anda video Anda tidak pernah meninggalkan perangkat.',
    tools: 'Alat',
    guides: 'Panduan',
    site: 'Situs',
    rights: 'Seluruh hak cipta dilindungi.',
    strapline: '100% di sisi klien · tanpa unggahan · tanpa pelacakan video Anda',
  },
} satisfies Dict;
