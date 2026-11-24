/**
 * src/content.js
 * -----------------------------------------------------------------
 * TOÀN BỘ CHỮ CỦA WEBSITE "ĐỐT VÍA ONLINE" NẰM Ở ĐÂY.
 * Muốn sửa chữ: chỉ sửa trong file này, không cần đụng vào code giao diện.
 *
 * Cách đọc file:
 *  - Các khối được xếp theo thứ tự người dùng đi qua: Mở đầu -> Chặng 1 -> 2 -> 3 -> 4.
 *  - {n}, {current}, {total}, {group}, {link} là chỗ code sẽ tự điền giá trị. Giữ nguyên dấu ngoặc nhọn.
 *  - Các headline chơi chữ đã được duyệt. Muốn đổi thì đổi cả câu, đừng sửa lẻ từng chữ.
 * -----------------------------------------------------------------
 */

export const CONTENT = {
  // ===============================================================
  // 0. THÔNG TIN TRANG (hiện trên tab trình duyệt và khi chia sẻ link)
  // ===============================================================
  meta: {
    title: "Đốt Vía Online | Đốt mỡ thì nhẹ cân, đốt vía thì nhẹ người",
    description:
      "Xả xui cuối năm 2026 không cần lửa thật. Viết điều xui, cuộn chuột đốt giấy, bước qua than hồng 7 hoặc 9 nhịp, rồi xin một quẻ Vía Lành. Chung cư nào cũng chơi được.",
    // Địa chỉ web công khai, phải đầy đủ https:// và có dấu / ở cuối. Đổi tên repo/tên miền thì sửa dòng này
    url: "https://emmaziinggg.github.io/dot-via-online/",
    // Ảnh thumbnail khi chia sẻ link (file trong thư mục public/, khổ 1200x630)
    image: "og-image.jpg",
  },

  // ===============================================================
  // 1. MÀN HÌNH MỞ ĐẦU
  // ===============================================================
  hero: {
    tag: "Tiễn năm 2026", // dòng nhỏ phía trên headline
    // CỐ ĐỊNH, không đổi. Mỗi phần tử là 1 dòng (vế trên / vế dưới).
    headline: ["Đốt mỡ thì nhẹ cân", "Đốt vía thì nhẹ người"],
    // Trình bày như khổ thơ: mỗi phần tử là 1 dòng, giữ nguyên chữ hoa/thường.
    sub: [
      "Chung cư cấm đốt lửa",
      "đâu ai cấm xả xui",
      "Đốt vía trên màn hình",
      "khỏi sợ chuông báo cháy",
    ],
    subExtra:
      "Nếu không có gì thay đổi, hết 2026 sẽ là 2027. Năm nay xui gì thì xả hết, đừng mang sang năm mới.",
    ctaPrimary: "Bắt đầu đốt vía",
    ctaSecondary: "Xem cách chơi",
    scrollHint: "Kéo xuống để bắt đầu",
    duration: "Mất khoảng 1 phút.", // dòng nhỏ dưới 3 bước
    // 3 bước giới thiệu nhanh
    steps: [
      { num: "01", text: "Viết điều xui lên giấy" },
      { num: "02", text: "Cuộn chuột đốt giấy, bước qua than hồng" },
      { num: "03", text: "Xin một quẻ Vía Lành" },
    ],
  },

  // ===============================================================
  // 2. CHẶNG 1: NHẬP ĐIỀU XUI + CHỌN VÍA
  // ===============================================================
  stage1: {
    tag: "Trong cái rủi có cái xui", // dòng nhỏ phía trên headline
    headline: "Xui ở đâu, đốt ở đó",
    sub: "Chuyện nào không giải quyết được thì viết vô đây, mình đốt vía giùm.",

    inputLabel: "Điều xui của bạn",
    // Placeholder xoay vòng trong ô nhập
    placeholders: [
      "Gần deadline là hư máy",
      "Gửi nhầm tin nhắn vô group công ty",
      "Vừa giặt đồ xong thì mưa",
      "Vừa lãnh lương thì xe hư",
      "Hồi trẻ không có tiền, giờ hết trẻ vẫn chưa có",
      "Đặt trà sữa xong, shipper huỷ đơn",
      "Điện thoại rơi, úp mặt xuống đất",
    ],
    // LƯU Ý: chỉ giữ câu này nếu app KHÔNG lưu và KHÔNG gửi nội dung người dùng nhập lên server.
    helper: "Cứ viết thật, đốt xong là hết.",
    counter: "Còn {n} chữ", // {n} = số ký tự còn lại
    maxLength: 120, // giới hạn ký tự tối đa
    minLength: 5, // số ký tự tối thiểu để được châm lửa (đề xuất, chỉnh tuỳ ý)

    // Chọn vía. nhip = số nhịp sẽ phải bước qua than ở chặng 3
    via: {
      label: "Chọn vía của bạn",
      options: [
        { id: "nam", label: "Nam · 7 vía", nhip: 7 },
        { id: "nu", label: "Nữ · 9 vía", nhip: 9 },
      ],
      hint: "Nam đủ 7 nhịp, nữ đủ 9 nhịp. Chọn theo vía bạn thấy hợp.",
    },

    // Câu dẫn hiện ra trước, sau đó mới tới nút Châm lửa
    ctaLead: "Muốn bật dậy sau xui, trước hết phải bật lửa.",
    cta: "Châm lửa",

    // Các thông báo lỗi khi nhập
    errors: {
      empty: "Trên đời này không có gì là nothing. Viết gì đó đi.",
      tooShort: "Viết thêm chút nữa nha.",
      tooLong: "Dài quá rồi, rút bớt giúp mình.",
      noVia: "Bạn chọn vía trước đã nha.",
    },
  },

  // ===============================================================
  // 3. CHẶNG 2: CUỘN CHUỘT ĐỐT GIẤY
  // ===============================================================
  // (chặng này không có tiêu đề, chỉ có hướng dẫn)
  stage2: {
    instruction: {
      desktop:
        "Cuộn chuột xuống để châm lửa. Muốn cháy nhanh thì cuộn nhanh, muốn cháy chậm thì đừng cuộn nhanh.",
      mobile: "Vuốt lên để châm lửa.",
    },
    reassure: "Lửa trên màn hình thôi, chuông báo cháy không kêu đâu.",

    // Câu hiện theo mức cuộn (%). Code hiện câu đầu tiên có upTo >= % hiện tại.
    progress: [
      { upTo: 20, text: "Lửa bắt đầu bén." },
      { upTo: 50, text: "Giấy đang cháy dần." },
      { upTo: 80, text: "Cháy gần hết rồi." },
      { upTo: 99, text: "Còn chút xíu nữa." },
      { upTo: 100, text: "Xong, xui thành tro rồi." },
    ],
    scrollBack: "Đừng cuộn ngược nha, xui quay lại đó.", // khi người dùng cuộn ngược
    idle: {
      afterSeconds: 8, // đứng im bao nhiêu giây thì hiện câu nhắc
      text: "Cuộn tiếp đi, lửa sắp tàn rồi.",
    },
  },

  // ===============================================================
  // 4. CHẶNG 3: BƯỚC QUA CHẬU THAN HỒNG
  // Gõ / bấm vào chậu than, mỗi lần gõ là 1 nhịp.
  // (chỉ có hướng dẫn và bộ đếm, không có text riêng cho từng nhịp)
  // ===============================================================
  stage3: {
    headline: "Bước qua chậu lửa, rũ bỏ vận xui",
    instruction: "Gõ vào chậu than để bước qua. Nam đủ 7 nhịp, nữ đủ 9 nhịp.",
    counter: "Nhịp {current}/{total}", // total = 7 (Nam) hoặc 9 (Nữ)
    done: "Xong rồi. Xui ở lại sau lưng, mình đi tiếp thôi.",
    cta: "Đi xin quẻ",
  },

  // ===============================================================
  // 5. CHẶNG 4: ỐNG GIEO QUẺ
  // Người dùng bấm "Xin quẻ" -> ống lắc -> rớt ra ngẫu nhiên 1 trong 6 quẻ
  // -> que nằm lại trên màn hình, thẻ quẻ hiện ra bên cạnh (lời thơ chính là lời giải).
  // ===============================================================
  stage4: {
    headline: "Có công rút thẻ, có liền quẻ ngon",
    intro: "Đốt xong rồi, xin một quẻ cho năm mới. Bấm nút, ống sẽ tự lắc.",
    drawCta: "Xin quẻ", // nút bấm để lắc ống
    shaking: "Ống đang lắc…", // trong lúc animation lắc
    dropped: "Rớt ra một quẻ rồi nè.", // khi que quẻ rơi ra

    // Khung thẻ quẻ sau khi rút
    cardLabel: "Vía Lành · {group}", // {group} = tên nhóm của quẻ

    // Nút sau khi có quẻ
    actions: {
      save: "Lưu thẻ",
      share: "Chia sẻ",
      redraw: "Rút thêm quẻ", // rút lại quẻ khác, không cần đốt lại
      replay: "Đốt thêm điều xui",
    },

    // 6 QUẺ. Mỗi lần xin quẻ, code chọn ngẫu nhiên đều tay 1 trong 6 quẻ này.
    //  - group:       tên nhóm hiện trên nhãn thẻ
    //  - headline:    tiêu đề thẻ (câu nói nhảm)
    //  - headlineAlt: phương án dự phòng, KHÔNG hiển thị, để team chọn khi cần
    //  - poem:        lời quẻ, thơ lục bát 4 dòng (6-8-6-8). Giữ nguyên thứ tự và xuống dòng
    //  - decode:      phần giải mã, hiện chưa dùng trên giao diện (thẻ chỉ hiện thơ)
    ques: [
      {
        id: "cong-viec",
        group: "Công việc",
        headline: "Sông sâu tĩnh lặng, lương cao hay cười",
        headlineAlt: "",
        poem: [
          "Sếp thôi nhắn tối ngoài giờ,",
          "Hạn nào cũng biết đứng chờ, lương tăng.",
          "Tan ca còn kịp ngắm trăng,",
          "Cuối năm thưởng Tết cao bằng ước mơ.",
        ],
        decode:
          "Năm tới đi làm nhẹ hơn: sếp bớt nhắn ngoài giờ, hạn nộp chịu đứng chờ, lương nhích lên, cuối năm còn có thưởng Tết. Nhớ tắt thông báo công việc sau giờ làm nha.",
      },
      {
        id: "tien-bac",
        group: "Tiền bạc",
        headline: "Của đi thay cái mới",
        headlineAlt: "",
        poem: [
          "Ví dày thêm chút nữa thôi,",
          "Tiền về đúng hẹn, khỏi ngồi chờ mong.",
          "Nửa đêm bớt chốt, nhẹ lòng,",
          "Nợ nần trả hết là xong, đỡ phiền.",
        ],
        decode:
          "Ví dày thêm một chút, tiền về đúng hẹn nên khỏi hồi hộp canh lương. Nửa đêm bớt chốt đơn, nợ nần trả dần là nhẹ lòng.",
      },
      {
        id: "tinh-duyen",
        group: "Tình duyên",
        headline: "Sông có khúc, người có look at me?",
        headlineAlt: "",
        poem: [
          "Người xưa thôi hiện trên trang,",
          "Lửa tàn xui hết, duyên sang ghé nhà.",
          "Có tin thì nhớ rep nha,",
          "Biết đâu có kẻ nhìn ta, đứng chờ.",
        ],
        decode:
          "Người cũ thôi lởn vởn trên màn hình, duyên mới đang trên đường ghé nhà. Có tin nhắn thì rep cho nhanh, biết đâu có người để ý bạn từ lâu rồi.",
      },
      {
        id: "gia-dinh",
        group: "Gia đình",
        headline: "Ai ơi nhớ lấy câu này, nhỏ thì chưa lớn, lớn rồi thì thôi",
        headlineAlt: "Một điều nhịn bằng chín điều lành, vậy bạn nhịn đi, tôi không nhịn",
        poem: [
          "Cả nhà ấm áp sum vầy,",
          "Họ hàng hỏi nhẹ, mâm đầy tiếng vui.",
          "Ông bà khoẻ mạnh hết xui,",
          "Tết này mâm cỗ ngọt bùi, cười vang.",
        ],
        decode:
          "Nhà êm, ông bà khoẻ, họ hàng hỏi nhẹ tay, Tết này mâm cơm đông và vui. Tối nay gọi về nhà một cuộc là quẻ ứng sớm.",
      },
      {
        id: "suc-khoe",
        group: "Sức khỏe",
        headline: "Có thờ có thiêng, có ăn kiêng thì diet",
        headlineAlt: "",
        poem: [
          "Cà phê bớt uống đi nha,",
          "Ngủ ngon ăn đúng, mệt là nghỉ ngơi.",
          "Nước nhiều tóc đỡ rụng rơi,",
          "Năm sau còn sức đi chơi, thỏa lòng.",
        ],
        decode:
          "Quẻ nhắc nhẹ thôi: bớt cà phê, ngủ ngon, ăn đúng bữa, mệt thì nghỉ, nhớ uống nước. Giữ sức để năm sau còn đi chơi. Có gì bất thường thì đi khám bác sĩ nha.",
      },
      {
        id: "chung",
        group: "Chung",
        headline: "Đứng giữa ngã ba, đi đường nào cũng thế",
        headlineAlt: "Nếu không có gì thay đổi, thì hết hôm nay sẽ là ngày mai",
        poem: [
          "Xui giờ thành khói bay xa,",
          "Ngã ba chọn lối nào ra, cũng lành.",
          "Chốn này chừa chỗ để dành,",
          "Hên ơi vào đó cho nhanh, đừng chờ.",
        ],
        decode:
          "Xui đã bay xa, chỗ trống để dành cho hên. Chọn lối nào cũng ổn, cứ mở cửa sẵn là vừa.",
      },
    ],
  },

  // ===============================================================
  // 6. CHIA SẺ
  // ===============================================================
  share: {
    caption: "Vừa đốt xui xong, nhẹ cả người. Bạn thử chưa? {link}", // {link} = link site
  },

  // ===============================================================
  // 7. THÔNG BÁO NHỎ (toast, cảnh báo)
  // ===============================================================
  toasts: {
    saved: "Đã lưu thẻ.",
    linkCopied: "Đã copy link.",
    leaveTab: "Khoan đi, xui chưa cháy hết.", // khi người dùng rời tab giữa chừng
    networkError: "Mạng lỗi rồi, thử lại nha.",
  },

  // ===============================================================
  // 8. FOOTER
  // ===============================================================
  footer:
    "Đốt Vía Online. Trang giải trí, vui là chính. Chỉ cần có niềm tin thì không phải việc gì cũng làm được, bệnh thật thì đi bác sĩ nha.",

  // ===============================================================
  // 9. CHỮ PHỤ (EXTRA)
  // Chữ dành cho trình đọc màn hình, tên file, báo lỗi phụ.
  // Phần lớn không hiện trên màn hình, chỉ máy đọc hoặc lúc lỗi mới thấy.
  // ===============================================================
  extra: {
    paperAria: "Tờ giấy ghi điều xui đang cháy", // mô tả tờ giấy ở chặng 2
    coalsAria: "Chậu than hồng, gõ một lần là bước một nhịp", // nút chậu than ở chặng 3
    tubeAria: "Ống quẻ", // ống gieo quẻ ở chặng 4
    cardAria: "Thẻ Vía Lành bạn vừa rút", // thẻ quẻ
    saveFailed: "Lưu ảnh không được, chụp màn hình giúp mình nha.", // khi lưu thẻ bị lỗi
    fileName: "the-via-lanh", // tên file ảnh khi bấm Lưu thẻ (không dấu, không khoảng trắng)
  },
};

/**
 * Hàm nhỏ để điền {n}, {current}, {total}, {group}, {link} vào câu chữ.
 * Ví dụ: fill(CONTENT.stage3.counter, { current: 3, total: 7 }) -> "Nhịp 3/7"
 * KHÔNG cần sửa phần này.
 */
export function fill(template, vars = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

export default CONTENT;