import type { Dict } from '../schema';

/**
 * Vietnamese. Note the keyword choice: Vietnamese users overwhelmingly type the
 * English loanword "webcam" rather than a native calque, and "test webcam" /
 * "kiểm tra webcam" both have real volume so the title leads with the loanword
 * form instead of a literal translation of the English headline.
 */
export const vi = {
  seo: {
    primaryKeyword: 'test webcam',
    keywords: ['kiểm tra webcam', 'test camera online', 'kiểm tra camera', 'camera online'],
  },

  meta: {
    homeTitle: 'Test Webcam: Kiểm tra webcam và micro online miễn phí',
    homeDescription:
      'Test webcam online miễn phí. Kiểm tra camera và micro ngay trên trình duyệt, độ phân giải, FPS, bitrate và chất lượng hình ảnh. Không cần tải, không cần đăng ký.',
  },

  nav: {
    home: 'Test Webcam',
    resolution: 'Độ phân giải',
    fps: 'FPS',
    micTest: 'Micro',
    troubleshooting: 'Khắc phục lỗi',
    faq: 'Hỏi đáp',
    about: 'Giới thiệu',
    contact: 'Liên hệ',
    privacy: 'Quyền riêng tư',
    terms: 'Điều khoản',
    language: 'Đổi ngôn ngữ',
    openMenu: 'Mở menu',
    startTest: 'Bắt đầu',
    toggleTheme: 'Chuyển chế độ tối',
  },

  hero: {
    eyebrow: '100% riêng tư · chạy trên trình duyệt của bạn',
    title: 'Test webcam chỉ trong vài giây.',
    subtitle:
      'Xem trước camera, đo độ phân giải và tốc độ khung hình, kiểm tra nhanh trước cuộc gọi tiếp theo. Dữ liệu không bao giờ rời khỏi thiết bị của bạn.',
    trust: {
      noDownloads: 'Không cần tải',
      noSignup: 'Không cần đăng ký',
      runsInBrowser: 'Chạy trên trình duyệt',
      nothingUploaded: 'Không tải lên gì cả',
    },
  },

  tool: {
    startTest: 'Bắt đầu test',
    stop: 'Dừng',
    idleTitle: 'Hình ảnh camera sẽ hiện ở đây',
    idleNote: 'Không có gì được tải lên, bài test chạy trên thiết bị của bạn.',
    howToFix: 'Cách khắc phục →',
    live: 'TRỰC TIẾP',
    mirror: 'Lật gương',
    framingGuides: 'Khung căn hình',
    record: 'Quay một đoạn ngắn',
    snapshot: 'Chụp ảnh',
    fullscreen: 'Toàn màn hình',
    camera: 'Camera',
    microphone: 'Micro',
    defaultCamera: 'Camera mặc định',
    defaultMicrophone: 'Micro mặc định',
    eyeLine: 'đường mắt',

    info: {
      title: 'Thông tin webcam',
      idle: 'Chờ',
      live: 'Trực tiếp',
      groupDevice: 'Thiết bị',
      groupVideo: 'Video',
      groupImage: 'Hình ảnh',
      name: 'Tên webcam',
      quality: 'Chất lượng',
      builtInMic: 'Micro',
      builtInSpeaker: 'Loa',
      resolution: 'Độ phân giải',
      maxSupported: 'Tối đa hỗ trợ',
      videoStandard: 'Chuẩn',
      frameRate: 'Tốc độ khung hình',
      megapixels: 'Megapixel',
      aspectRatio: 'Tỉ lệ khung hình',
      streamType: 'Loại luồng',
      bitrate: 'Bitrate',
      pngSize: 'Khung PNG',
      jpegSize: 'Khung JPEG',
      imageMode: 'Chế độ màu',
      colours: 'Số màu',
      averageRgb: 'Màu trung bình',
      lightness: 'Sắc độ sáng',
      luminosity: 'Độ chói',
      brightness: 'Độ sáng',
      contrast: 'Độ tương phản',
      hue: 'Tông màu',
      saturation: 'Độ bão hòa',
      note: 'Được đo trực tiếp trên thiết bị của bạn, không có gì được tải lên. Số lượng màu được lấy từ mẫu 160×90 của khung hình hiện tại; kích thước tệp là khung hình hiện tại được mã hoá ở độ phân giải đầy đủ. Dùng {copyReport} để lưu hoặc chia sẻ các số liệu này.',
    },

    healthChecks: {
      title: 'Kiểm tra tổng quan',
      copyReport: 'Sao chép báo cáo',
      copied: 'Đã sao chép',
      selectAndCopy: 'Chọn và sao chép',
      idle: 'Bắt đầu test để chạy kiểm tra tự động.',
    },

    cameraControls: {
      title: 'Điều chỉnh camera',
      subtitle: 'Chỉnh trực tiếp camera, không chỉ hình ảnh trên màn hình.',
      reset: 'Đặt lại',
      idle: 'Bắt đầu test để xem camera của bạn hỗ trợ những tuỳ chỉnh nào.',
      unsupported:
        'Camera này không cho phép trình duyệt điều chỉnh thông số. Điều này thường gặp ở webcam tích hợp trên laptop, và là giới hạn của trình duyệt chứ không phải lỗi.',
      torch: 'Đèn flash',
      on: 'Bật',
      off: 'Tắt',
    },

    mic: {
      title: 'Micro',
      off: 'Tắt',
      prompt: 'Hãy nói để xem mức âm thanh đầu vào. Bắt đầu cùng với bài test camera.',
      meterTitle: 'Mức âm micro',
      meterSubtitle: 'Hãy nói và xem thanh đo phản hồi. Âm thanh chỉ được phân tích trên thiết bị của bạn.',
      idle: 'Chờ',
      listening: 'Đang nghe',
    },

    speakers: {
      title: 'Loa',
      idle: 'Chờ',
      prompt:
        'Phát âm thanh thử để kiểm tra từng bên. Đeo tai nghe để phân biệt trái và phải chính xác hơn.',
      left: 'Trái',
      both: 'Cả hai',
      right: 'Phải',
      lr: 'L + R',
      playing: 'Đang phát',
      unavailable: 'Không khả dụng',
      blocked: 'Bị chặn',
      hint: 'Tai nghe giúp phân biệt trái và phải. Nhấn lại cùng nút để dừng.',
      toneLabel: 'Âm',
      toneLow: 'Trầm',
      toneLowNote: '120 Hz đáp tuyến trầm',
      toneMid: 'Trung',
      toneMidNote: '440 Hz dải giọng nói',
      toneHigh: 'Cao',
      toneHighNote: '2 kHz độ trong và tiếng rít',
    },

    recording: {
      title: 'Xem những gì người khác thấy',
      note: 'Phát lại từ thiết bị của bạn. Không bao giờ được tải lên.',
      download: 'Tải xuống',
      discard: 'Bỏ',
    },
  },

  home: {
    howItWorks: {
      title: 'Ba bước, khoảng một phút.',
      subtitle:
        'Không cần cài đặt, không cần đăng ký. Camera bật lên, các thông số hiện ra, rồi bạn đóng tab.',
      steps: [
        {
          name: 'Nhấn “Bắt đầu test”',
          text: 'Không tải xuống, không plugin, không tài khoản. Bài test mở camera qua API chuẩn của trình duyệt, y hệt như một cuộc gọi video.',
        },
        {
          name: 'Cho phép truy cập camera',
          text: 'Trình duyệt sẽ hỏi quyền truy cập, điều này luôn xảy ra với mọi trang web. Chọn Cho phép và hình ảnh sẽ hiện ra sau một, hai giây.',
        },
        {
          name: 'Đọc kết quả',
          text: 'Độ phân giải, tốc độ khung hình, tỉ lệ khung hình và ánh sáng được đo trực tiếp, và bất cứ điều gì trông kém trên cuộc gọi đều được cảnh báo kèm cách khắc phục cụ thể.',
        },
      ],
    },

    checks: {
      title: 'Bài test thực sự kiểm tra những gì.',
      subtitle:
        'Nhìn thấy mặt mình chỉ xác nhận camera đã bật. Đây mới là những yếu tố quyết định bạn trông và nghe ra sao với người khác.',
      items: [
        {
          title: 'Độ phân giải',
          body: 'Độ phân giải hiện tại và mức tối đa camera hỗ trợ, để bạn biết mình có nhận đúng chất lượng đã bỏ tiền ra hay không.',
        },
        {
          title: 'Tốc độ khung hình',
          body: 'Đếm từ số khung hình trình duyệt thực sự hiển thị, thay vì con số ghi trên hộp sản phẩm.',
        },
        {
          title: 'Tỉ lệ khung hình',
          body: 'Camera của bạn cho ra khung 16:9 mà các ứng dụng họp trực tuyến mong đợi, hay ảnh 4:3 sẽ bị cắt bớt.',
        },
        {
          title: 'Bitrate',
          body: 'Đo bằng cách mã hoá một đoạn mẫu ngắn, nên con số phản ánh đúng những gì camera thực sự tạo ra.',
        },
        {
          title: 'Chất lượng hình ảnh',
          body: 'Độ sáng, tương phản, bão hòa và số lượng màu được lấy mẫu trực tiếp, và chúng tôi cảnh báo nếu ảnh quá tối hoặc cháy sáng.',
        },
        {
          title: 'Micro',
          body: 'Thanh đo mức âm thanh trực tiếp cho thấy người nghe sẽ nghe được gì, để bạn chỉnh mức trước khi có ai đang nghe.',
        },
        {
          title: 'Loa',
          body: 'Âm thanh thử qua kênh trái và phải xác nhận nửa còn lại của cuộc gọi thực sự hoạt động.',
        },
        {
          title: 'Quay và phát lại',
          body: 'Quay vài giây rồi xem lại, cách trung thực duy nhất để thấy những gì người khác thấy.',
        },
        {
          title: 'Quyền và thiết bị',
          body: 'Xác nhận trình duyệt đã cấp quyền qua kết nối bảo mật, và liệt kê mọi camera và micro để bạn chuyển đổi.',
        },
      ],
    },

    subTools: {
      title: 'Đi sâu vào từng khía cạnh.',
      subtitle: 'Công cụ chuyên biệt cho những kiểm tra quan trọng nhất trước buổi họp hay livestream.',
      openTool: 'Mở công cụ',
      resolution: {
        title: 'Kiểm tra độ phân giải',
        body: 'Xem độ phân giải hiện tại và mức tối đa được hỗ trợ, và liệu đã đạt chuẩn HD chưa.',
      },
      fps: {
        title: 'Kiểm tra FPS',
        body: 'Đo tốc độ khung hình thực từ những khung hình trình duyệt thực sự hiển thị.',
      },
      mic: {
        title: 'Kiểm tra micro',
        body: 'Kiểm tra micro bằng thanh đo mức âm thanh trực tiếp, không cần gọi cho ai.',
      },
    },

    notWorking: {
      eyebrow: 'Camera không hoạt động?',
      title: 'Bốn nguyên nhân giải thích gần như mọi lỗi.',
      body: 'Quyền truy cập bị chặn, một ứng dụng khác đang giữ camera, chọn sai thiết bị, hoặc nắp che ống kính. Hướng dẫn khắc phục của chúng tôi đi qua từng nguyên nhân, kèm đường dẫn cài đặt chính xác cho mọi trình duyệt phổ biến và cho Windows lẫn macOS.',
      cta: 'Mở hướng dẫn khắc phục',
    },

    privacyStrip: {
      eyebrow: 'Riêng tư từ thiết kế',
      title: 'Hình ảnh camera không bao giờ rời khỏi thiết bị của bạn.',
      body: 'Mọi kiểm tra đều chạy cục bộ trên trình duyệt bằng các API web tiêu chuẩn. Chúng tôi không bao giờ nhận, lưu trữ hay truyền video và âm thanh của bạn, và đoạn clip tuỳ chọn bạn quay cũng nằm trong trình duyệt, trên chính thiết bị của bạn.',
      cta: 'Đọc về quyền riêng tư',
    },

    faq: {
      title: 'Hỏi đáp về test webcam',
      more: 'Thêm câu hỏi được giải đáp trong',
      moreLinkText: 'trang hỏi đáp đầy đủ về test webcam',
      items: [
        {
          q: 'Bài test webcam này có an toàn và riêng tư không?',
          a: 'Có. Toàn bộ bài test chạy bên trong trình duyệt của bạn và video không bao giờ rời khỏi thiết bị, không có gì được tải lên máy chủ nào, và cũng không tồn tại máy chủ nào có thể nhận hình ảnh của bạn kể cả khi chúng tôi muốn. Đoạn clip tuỳ chọn bạn quay được giữ trong trình duyệt và bị xoá khi bạn xong việc.',
        },
        {
          q: 'Tôi có cần cài đặt gì không?',
          a: 'Không. Không có gì để tải xuống, không plugin, không tiện ích mở rộng và không cần đăng ký. Mở trang, nhấn “Bắt đầu test”, rồi cho phép truy cập camera khi trình duyệt hỏi.',
        },
        {
          q: 'Vì sao trình duyệt hỏi quyền truy cập?',
          a: 'Trình duyệt yêu cầu bạn cho phép rõ ràng trước khi bất kỳ trang web nào dùng camera hay micro, đây là cơ chế bảo vệ tích hợp sẵn, không phải do chúng tôi kiểm soát. Chúng tôi chỉ yêu cầu quyền trong lúc bạn đang test, và bạn có thể thu hồi bất cứ lúc nào từ biểu tượng trên thanh địa chỉ.',
        },
        {
          q: 'Camera của tôi không hiện lên, phải làm sao?',
          a: 'Đóng mọi ứng dụng khác có thể đang giữ camera (Zoom, Teams, Meet, OBS), kiểm tra camera đã cắm và không bị nắp che, và xác nhận bạn đã cho phép truy cập từ biểu tượng trên thanh địa chỉ. Tải lại trang và thử lại. Hướng dẫn khắc phục của chúng tôi đi qua từng nguyên nhân theo từng bước.',
        },
        {
          q: 'Những trình duyệt và thiết bị nào được hỗ trợ?',
          a: 'Mọi trình duyệt hiện đại đều chạy được: Chrome, Edge, Firefox, Safari, Opera và Brave, trên Windows, macOS, Linux, Android và iOS. Trang phải được phục vụ qua HTTPS, trang này có, và đó là lý do camera có thể khởi động.',
        },
        {
          q: 'Các mục kiểm tra tổng quan có ý nghĩa gì?',
          a: 'Khi camera bật, chúng tôi đánh giá độ phân giải, tốc độ khung hình, tỉ lệ khung hình, quyền truy cập và độ sáng hình ảnh, rồi cảnh báo bất cứ điều gì sẽ trông kém trên cuộc gọi. Mỗi cảnh báo đều kèm cách khắc phục cụ thể chứ không phải lời nhắc chung chung.',
        },
        {
          q: 'Test ở đây có chặn camera trong ứng dụng khác không?',
          a: 'Chỉ trong lúc bài test đang chạy, phần lớn hệ thống chỉ cho một trang hoặc ứng dụng giữ camera tại một thời điểm. Nhấn “Dừng” khi xong và camera được giải phóng ngay lập tức, đèn báo tắt, và Zoom hay Teams có thể dùng lại.',
        },
        {
          q: 'Đoạn clip đã quay có được tải lên đâu không?',
          a: 'Không. Clip “xem những gì người khác thấy” được trình duyệt quay vào bộ nhớ trên chính thiết bị của bạn và phát lại từ đó. Nó bị xoá khi bạn nhấn Bỏ, quay lại lần nữa, dừng bài test, hoặc đóng tab, và chỉ được lưu vào ổ đĩa nếu bạn chọn Tải xuống.',
        },
        {
          q: 'Tôi có thể kiểm tra loa và tai nghe ở đây không?',
          a: 'Có. Bảng Loa phát một âm thanh thử ngắn qua kênh trái, kênh phải, hoặc cả hai, giúp xác nhận nửa còn lại của cuộc gọi hoạt động. Hãy đeo tai nghe nếu muốn phân biệt trái phải một cách chắc chắn.',
        },
        {
          q: 'Khung căn hình dùng để làm gì?',
          a: 'Chúng phủ lên hình xem trước các đường chia ba và một vạch đánh dấu đường mắt. Căn mắt bạn với đường phía trên và chừa một chút khoảng trống phía đầu là cách nhanh nhất để biến một khung hình webcam trông tình cờ thành một khung hình trông có chủ đích.',
        },
        {
          q: 'Tôi có thể test webcam trước buổi phỏng vấn hay cuộc họp không?',
          a: 'Đó chính là mục đích của công cụ này. Hãy chạy bài test vài phút trước đó để xác nhận đúng camera đã được chọn, hình ảnh sắc nét và đủ sáng, và mức micro phản hồi khi bạn nói, tất cả mà không cần vào cuộc gọi và phơi mình ra trước mọi người.',
        },
      ],
    },
  },

  footer: {
    blurb:
      'Công cụ test webcam và micro nhanh, riêng tư. Mọi thứ chạy trên trình duyệt video của bạn không bao giờ rời khỏi thiết bị.',
    tools: 'Công cụ',
    guides: 'Hướng dẫn',
    site: 'Trang web',
    rights: 'Bảo lưu mọi quyền.',
    strapline: '100% chạy phía người dùng · không tải lên · không theo dõi video của bạn',
  },
} satisfies Dict;
