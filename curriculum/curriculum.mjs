// DrawPath AI — Dữ liệu chương trình học (tự soạn, không sao chép học liệu thương mại).
export const SKILLS = [
 {
  "id": "line-control",
  "name": "Kiểm soát nét",
  "category": "Nền tảng",
  "description": "Điều khiển đường nét thẳng, cong, độ mượt, độ đậm nhạt và độ chính xác của điểm đầu-cuối."
 },
 {
  "id": "shape-accuracy",
  "name": "Độ chính xác hình dạng",
  "category": "Nền tảng",
  "description": "Dựng đường bao, hình 2D, đối xứng và quan hệ kích thước đúng với quan sát."
 },
 {
  "id": "proportion",
  "name": "Tỷ lệ",
  "category": "Nền tảng",
  "description": "Đo và so sánh kích thước, khoảng cách, góc giữa các bộ phận của đối tượng."
 },
 {
  "id": "form-construction",
  "name": "Dựng hình khối",
  "category": "Không gian",
  "description": "Xây dựng vật thể từ khối hộp, cầu, trụ, nón và trục cấu trúc."
 },
 {
  "id": "perspective",
  "name": "Phối cảnh",
  "category": "Không gian",
  "description": "Đường chân trời, điểm tụ, hội tụ cạnh và quan hệ chiều sâu trong không gian."
 },
 {
  "id": "observation",
  "name": "Quan sát",
  "category": "Nhận thức",
  "description": "Nhìn tổng thể, đo bằng mắt, dùng không gian âm và so sánh góc khi vẽ theo mẫu."
 },
 {
  "id": "value-shading",
  "name": "Sắc độ và bóng",
  "category": "Ánh sáng",
  "description": "Thang giá trị sáng tối, hướng sáng, bóng lõi, bóng đổ và ánh phản chiếu."
 },
 {
  "id": "color",
  "name": "Màu sắc và chất liệu",
  "category": "Ánh sáng",
  "description": "Vòng màu, hòa sắc, nóng lạnh, bão hòa và cách diễn tả chất liệu bằng màu."
 },
 {
  "id": "anatomy",
  "name": "Giải phẫu và dáng động",
  "category": "Hình họa người",
  "description": "Dáng động, đường hành động, tỷ lệ cơ thể, cấu trúc đầu, thân, tay và chân."
 },
 {
  "id": "composition",
  "name": "Bố cục và kể chuyện thị giác",
  "category": "Sáng tác",
  "description": "Điểm nhấn, cân bằng, nhịp điệu, tương phản và dẫn hướng mắt người xem."
 }
];

export const SKILL_PREREQS = [
 {
  "skill": "shape-accuracy",
  "prereq": "line-control",
  "kind": "required"
 },
 {
  "skill": "proportion",
  "prereq": "shape-accuracy",
  "kind": "required"
 },
 {
  "skill": "proportion",
  "prereq": "line-control",
  "kind": "recommended"
 },
 {
  "skill": "form-construction",
  "prereq": "shape-accuracy",
  "kind": "required"
 },
 {
  "skill": "form-construction",
  "prereq": "proportion",
  "kind": "recommended"
 },
 {
  "skill": "perspective",
  "prereq": "form-construction",
  "kind": "required"
 },
 {
  "skill": "perspective",
  "prereq": "proportion",
  "kind": "recommended"
 },
 {
  "skill": "observation",
  "prereq": "shape-accuracy",
  "kind": "required"
 },
 {
  "skill": "observation",
  "prereq": "proportion",
  "kind": "recommended"
 },
 {
  "skill": "value-shading",
  "prereq": "form-construction",
  "kind": "required"
 },
 {
  "skill": "value-shading",
  "prereq": "observation",
  "kind": "recommended"
 },
 {
  "skill": "color",
  "prereq": "value-shading",
  "kind": "required"
 },
 {
  "skill": "color",
  "prereq": "observation",
  "kind": "recommended"
 },
 {
  "skill": "anatomy",
  "prereq": "proportion",
  "kind": "required"
 },
 {
  "skill": "anatomy",
  "prereq": "form-construction",
  "kind": "recommended"
 },
 {
  "skill": "composition",
  "prereq": "observation",
  "kind": "required"
 },
 {
  "skill": "composition",
  "prereq": "perspective",
  "kind": "recommended"
 },
 {
  "skill": "composition",
  "prereq": "value-shading",
  "kind": "recommended"
 }
];

export const MODULES = [
 {
  "id": "m00",
  "code": "00",
  "title": "Drawing Fundamentals",
  "description": "Làm quen dụng cụ, tư thế, cách cầm bút và cách quan sát — nền móng trước khi học mọi kỹ thuật vẽ.",
  "track": null,
  "lessons": [
   {
    "id": "m00-l01",
    "title": "Dụng cụ vẽ và tư thế làm việc đúng",
    "summary": "Nhận biết dụng cụ cơ bản và sắp xếp góc vẽ không gây mỏi, không làm sai nét.",
    "objectives": [
     "Phân biệt được chì HB, 2B, 4B theo độ đậm trên giấy thử",
     "Sắp xếp bàn, giấy và ánh sáng đúng checklist 5 mục",
     "Ngồi vẽ liên tục 20 phút không mỏi cổ tay do sai tư thế"
    ],
    "difficulty": 1,
    "minutes": 30,
    "skills": [
     "line-control",
     "observation"
    ],
    "prereqLessons": [],
    "theory": "Dụng cụ quyết định tính chất của nét: chì cứng cho nét nhạt và chính xác, chì mềm cho mảng tối và nét đậm. Tư thế ngồi thẳng, giấy hơi nghiêng theo tay thuận và nguồn sáng chiếu từ phía ngược tay vẽ giúp tay không che bóng lên bài. Góc nhìn vuông góc với mặt giấy giúp tỷ lệ không bị méo do phối cảnh nhìn nghiêng. Trước khi học kỹ thuật, hãy biến việc chuẩn bị thành thói quen cố định.",
    "steps": [
     "Thử 3 cây chì HB, 2B, 4B lên giấy nháp và ghi độ đậm của từng cây",
     "Đặt giấy nghiêng khoảng 15 độ theo phía tay thuận",
     "Ngồi thẳng, hai chân chạm sàn, khuỷu tay không tì cứng vào cạnh bàn",
     "Vẽ 5 nét dài kiểm tra tay có che ánh sáng lên vùng đang vẽ không"
    ],
    "demo": {
     "kind": "line",
     "note": "Trình diễn trực quan cho bài 'Dụng cụ vẽ và tư thế làm việc đúng': bắt đầu từ bước 'Thử 3 cây chì HB, 2B, 4B lên giấy nháp và ghi độ đậm của từng cây', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ một vật thể đơn giản quanh bạn (cốc, hộp) chỉ bằng chì 2B sau khi đã sắp xếp góc vẽ đúng checklist, chụp hoặc nộp bản vẽ kèm ghi chú cây chì đã dùng.",
     "mode": "guided",
     "assessType": "free",
     "target": {}
    },
    "rubric": [
     {
      "id": "idea",
      "name": "Ý tưởng và yêu cầu đề",
      "weight": 30,
      "method": "ai",
      "desc": "Bài thể hiện rõ ý tưởng và đáp ứng đúng đề bài tự do."
     },
     {
      "id": "tech",
      "name": "Kỹ thuật thể hiện",
      "weight": 30,
      "method": "hybrid",
      "desc": "Kỹ thuật trọng tâm của bài được áp dụng nhất quán."
     },
     {
      "id": "coherence",
      "name": "Tính nhất quán tổng thể",
      "weight": 25,
      "method": "ai",
      "desc": "Hình, sắc độ/màu và bố cục thuộc cùng một tổng thể."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Bài hoàn chỉnh, không bỏ dở phần chính nào."
     }
    ],
    "mistakes": [
     {
      "error": "Bài lạc khỏi kỹ thuật trọng tâm của bài học",
      "cause": "Mải theo ý tưởng mà quên yêu cầu kỹ thuật cần luyện.",
      "fix": "Viết kỹ thuật trọng tâm ra mép giấy và kiểm tra lại sau mỗi giai đoạn vẽ."
     },
     {
      "error": "Bài bỏ dở ở phần khó nhất",
      "cause": "Bắt đầu từ phần dễ và chi tiết, hết thời gian cho phần cấu trúc.",
      "fix": "Dựng toàn bộ cấu trúc trước, chỉ chi tiết hóa khi tổng thể đã đứng vững."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m00-l02",
    "title": "Cầm bút và điều khiển lực tay",
    "summary": "Ba cách cầm bút cơ bản và cách tạo nét đậm nhạt chỉ bằng thay đổi lực tay.",
    "objectives": [
     "Thực hiện được 3 kiểu cầm bút: viết, tripod nới lỏng, cầm ngang (overhand)",
     "Tạo được 5 cấp độ đậm nhạt liên tiếp chỉ bằng lực tay với chì 2B",
     "Giữ nét không đứt khi giảm lực xuống mức nhẹ nhất"
    ],
    "difficulty": 1,
    "minutes": 35,
    "skills": [
     "line-control",
     "value-shading"
    ],
    "prereqLessons": [
     "m00-l01"
    ],
    "theory": "Cầm bút kiểu viết cho nét ngắn và chi tiết, cầm tripod nới lỏng cho nét dài trung bình, cầm ngang bằng cả bàn tay cho mảng lớn và nét dài. Lực tay là biến số chính tạo độ đậm: cùng một cây chì có thể cho từ xám rất nhạt tới gần đen nếu lực thay đổi có kiểm soát. Cổ tay cần thả lỏng vì cổ tay cứng khiến nét chỉ dài được vài centimet và dễ rung. Luyện lực tay trước giúp mọi bài sau không bị phụ thuộc vào việc đổi bút liên tục.",
    "steps": [
     "Cầm bút kiểu viết, vẽ 5 nét ngắn 5cm với lực tăng dần",
     "Đổi sang cầm tripod nới lỏng, vẽ 5 nét dài 15cm đều lực",
     "Cầm ngang cả bàn tay, quét 3 mảng xám nhạt phủ rộng",
     "Vẽ một dải 5 ô, mỗi ô một cấp lực từ nhẹ nhất tới mạnh nhất"
    ],
    "demo": {
     "kind": "value-scale",
     "note": "Trình diễn trực quan cho bài 'Cầm bút và điều khiển lực tay': bắt đầu từ bước 'Cầm bút kiểu viết, vẽ 5 nét ngắn 5cm với lực tăng dần', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Nộp dải thang lực tay 5 ô bằng chì 2B (mỗi ô đậm hơn ô trước một bậc rõ rệt) kèm 3 hàng nét dài thể hiện 3 kiểu cầm bút.",
     "mode": "assisted",
     "assessType": "value",
     "target": {
      "steps": 5
     }
    },
    "rubric": [
     {
      "id": "group",
      "name": "Phân nhóm sáng tối",
      "weight": 30,
      "method": "cv",
      "desc": "Các mảng sáng, trung gian và tối tách bạch, đúng số bậc yêu cầu."
     },
     {
      "id": "light",
      "name": "Nhất quán hướng sáng",
      "weight": 25,
      "method": "hybrid",
      "desc": "Mọi vùng bóng đều suy ra được từ cùng một nguồn sáng."
     },
     {
      "id": "transition",
      "name": "Chuyển sắc độ",
      "weight": 25,
      "method": "cv",
      "desc": "Chuyển bậc mượt hoặc đúng tính chất cứng/mềm theo yêu cầu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ vùng diễn tả và đúng đối tượng của bài."
     }
    ],
    "mistakes": [
     {
      "error": "Bóng đổ ngược hướng với bóng trên vật",
      "cause": "Vẽ bóng đổ sau cùng mà không suy ra từ nguồn sáng đã chọn.",
      "fix": "Vẽ mũi tên hướng sáng lên góc bài, mọi bóng phải nhất quán với mũi tên đó."
     },
     {
      "error": "Chuyển sắc độ bị bẩn, lem nhem",
      "cause": "Di bút qua lại nhiều lần với lực không đều.",
      "fix": "Tô một chiều, chồng lớp nhẹ nhiều lần, mỗi lớp chờ kiểm tra bậc giá trị."
     },
     {
      "error": "Vùng tối và vùng trung gian lẫn vào nhau",
      "cause": "Tô theo cảm giác từng chỗ, không lập thang giá trị trước.",
      "fix": "Lập thang 5 bậc ở mép giấy, gán mỗi vùng một bậc rồi mới tô."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m00-l03",
    "title": "Quan sát tổng thể trước chi tiết",
    "summary": "Phương pháp nhìn bao quát: thấy hình lớn, quan hệ lớn trước khi đi vào chi tiết nhỏ.",
    "objectives": [
     "Nheo mắt và nêu được 3 mảng hình lớn nhất của một vật thể trong 30 giây",
     "Phác khung bao tổng thể trước khi vẽ bất kỳ chi tiết nào",
     "So sánh được kích thước hai bộ phận bằng cách ước lượng phần trăm"
    ],
    "difficulty": 1,
    "minutes": 40,
    "skills": [
     "observation",
     "shape-accuracy"
    ],
    "prereqLessons": [
     "m00-l02"
    ],
    "theory": "Người mới thường vẽ từng chi tiết mình biết thay vì hình mình thật sự thấy, khiến tổng thể sai dù chi tiết đúng. Quan sát tổng thể nghĩa là nhìn vật thể như một hình phẳng lớn trước: khung bao ngoài, hướng nghiêng chính và các mảng sáng tối lớn. Nheo mắt giúp loại bỏ chi tiết, chỉ còn lại các mảng giá trị lớn. Khi khung lớn đã đúng, chi tiết thêm vào sau mới có chỗ đứng chính xác.",
    "steps": [
     "Chọn một vật thể, nheo mắt nhìn 30 giây và kể 3 mảng lớn nhất",
     "Vẽ khung bao ngoài của vật thể bằng nét thật nhạt",
     "Đánh dấu vị trí bộ phận lớn nhất và nhỏ nhất trong khung",
     "Mới bắt đầu vẽ đường bao chi tiết sau khi khung bao đã khớp"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Quan sát tổng thể trước chi tiết': bắt đầu từ bước 'Chọn một vật thể, nheo mắt nhìn 30 giây và kể 3 mảng lớn nhất', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ một chiếc ghế hoặc bàn học: nộp bản vẽ có lớp khung bao và đường chia tỷ lệ lớn còn giữ lại (không tẩy) phía dưới lớp đường bao hoàn thiện.",
     "mode": "assisted",
     "assessType": "shape",
     "target": {}
    },
    "rubric": [
     {
      "id": "shape",
      "name": "Độ chính xác hình dạng",
      "weight": 35,
      "method": "geometry",
      "desc": "Độ khớp của đường bao với hình mẫu."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ các phần",
      "weight": 30,
      "method": "geometry",
      "desc": "Quan hệ chiều rộng, chiều cao và kích thước tương đối."
     },
     {
      "id": "align",
      "name": "Căn chỉnh và đối xứng",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí các mốc, trục đối xứng và độ thẳng hàng."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đầy đủ các chi tiết cấu trúc mà đề bài yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Không gian âm bị bỏ qua",
      "cause": "Chỉ nhìn vật thể, không nhìn hình của khoảng trống xung quanh.",
      "fix": "Vẽ thêm hình của khoảng trống giữa các bộ phận và đối chiếu với mẫu."
     },
     {
      "error": "Hình đúng nét nhưng sai tỷ lệ tổng thể",
      "cause": "Vẽ chi tiết từng cạnh mà không khóa khung bao ngoài trước.",
      "fix": "Dựng khung bao (bounding box) và chia tỷ lệ khung trước khi vẽ đường bao."
     },
     {
      "error": "Đối xứng hai bên bị lệch",
      "cause": "Vẽ hoàn thiện một bên rồi đoán bên còn lại.",
      "fix": "Kẻ trục đối xứng, đánh dấu các cặp điểm ngang nhau rồi mới nối."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m00-l04",
    "title": "Làm quen bảng vẽ số và bút cảm ứng",
    "summary": "Thiết lập tablet, làm quen lực nhấn bút số và sự khác biệt giữa vẽ giấy và vẽ số.",
    "objectives": [
     "Phân biệt được nét có lực nhấn (pressure) và nét không có lực nhấn trên phần mềm vẽ",
     "Vẽ được nét thuôn đầu cuối bằng lực nhấn tăng giảm đều",
     "Thiết lập được kích thước canvas và độ phân giải phù hợp cho bài luyện"
    ],
    "difficulty": 1,
    "minutes": 35,
    "skills": [
     "line-control"
    ],
    "prereqLessons": [
     "m00-l03"
    ],
    "theory": "Bút cảm ứng ghi lại lực nhấn và biến nó thành độ dày hoặc độ đậm của nét, điều chì thật làm bằng lực tay và góc nghiêng. Khó khăn lớn nhất khi chuyển từ giấy sang số là mắt nhìn màn hình còn tay vẽ trên mặt tablet, cần vài buổi luyện phối hợp tay-mắt. Canvas nên đặt độ phân giải đủ lớn (ít nhất 2000px chiều dài) để nét không vỡ khi phóng to. Hãy bật hiển thị lực nhấn khi luyện để thấy rõ mình đang nhấn đều hay giật cục.",
    "steps": [
     "Tạo canvas 2400x1800px, vẽ 5 nét không dùng lực nhấn (tắt pressure)",
     "Bật pressure, vẽ lại 5 nét tương tự và so sánh đầu nét",
     "Vẽ 3 nét thuôn: mảnh ở hai đầu, dày ở giữa bằng cách nhấn tăng rồi giảm",
     "Phóng to 200% kiểm tra nét có bị vỡ hạt không"
    ],
    "demo": {
     "kind": "line",
     "note": "Trình diễn trực quan cho bài 'Làm quen bảng vẽ số và bút cảm ứng': bắt đầu từ bước 'Tạo canvas 2400x1800px, vẽ 5 nét không dùng lực nhấn (tắt pressure)', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Trên canvas số, nộp hàng nét gồm: 5 nét đều lực, 5 nét thuôn đầu cuối bằng pressure và 3 nét dài liền mạch không nhấc bút.",
     "mode": "assisted",
     "assessType": "line",
     "target": {
      "x1": 100,
      "y1": 500,
      "x2": 900,
      "y2": 500
     }
    },
    "rubric": [
     {
      "id": "accuracy",
      "name": "Độ chính xác vị trí nét",
      "weight": 35,
      "method": "geometry",
      "desc": "Khoảng cách từ nét vẽ tới đường mẫu và sai lệch điểm đầu, điểm cuối."
     },
     {
      "id": "smooth",
      "name": "Độ thẳng và độ mượt",
      "weight": 30,
      "method": "geometry",
      "desc": "Độ lệch khỏi đường thẳng lý tưởng và độ rung của nét."
     },
     {
      "id": "control",
      "name": "Kiểm soát lực và độ đậm",
      "weight": 20,
      "method": "cv",
      "desc": "Độ nhất quán của độ đậm, độ dày nét trong toàn bài."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Số lượng nét yêu cầu đã thực hiện và đúng thứ tự luyện tập."
     }
    ],
    "mistakes": [
     {
      "error": "Nét bị cong và rung ở giữa đoạn",
      "cause": "Tay di chuyển bằng cổ tay thay vì cả cánh tay, mắt nhìn đầu bút thay vì điểm đích.",
      "fix": "Khóa cổ tay, kéo nét bằng cả cánh tay và nhìn vào điểm cuối trước khi vẽ."
     },
     {
      "error": "Điểm cuối vượt quá mốc đích",
      "cause": "Xuất phát quá nhanh và không giảm tốc khi gần tới đích.",
      "fix": "Chia nét làm hai nhịp: kéo nhanh 80% đầu, chậm lại ở 20% cuối."
     },
     {
      "error": "Độ đậm nét không đều",
      "cause": "Lực tay thay đổi theo tốc độ, đoạn nhanh thì nhạt, đoạn chậm thì đậm.",
      "fix": "Giữ tốc độ đều, luyện cùng một lực trên ba nét liên tiếp rồi mới tăng tốc."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m00-l05",
    "title": "Bài đánh giá đầu vào: vẽ tĩnh vật đơn giản",
    "summary": "Bài tự đánh giá trình độ hiện tại để hệ thống gợi ý điểm bắt đầu, không tính là bài thi đạt/trượt.",
    "objectives": [
     "Hoàn thành một bức tĩnh vật 3 vật thể trong 45 phút không dùng mẫu dựng sẵn",
     "Tự chấm bài của mình theo 4 tiêu chí trong rubric của bài",
     "Ghi lại 2 điểm yếu nhất mà bản thân tự nhận thấy"
    ],
    "difficulty": 1,
    "minutes": 45,
    "skills": [
     "observation",
     "form-construction",
     "proportion"
    ],
    "prereqLessons": [
     "m00-l04"
    ],
    "theory": "Bài đánh giá đầu vào không nhằm xếp loại mà để lập bản đồ điểm mạnh, điểm yếu ban đầu. Hãy vẽ đúng khả năng thật: không sao chép tranh mẫu, không dùng thước gióng hỗ trợ ngoài những gì bạn đã biết. Ba vật thể khác nhau về hình khối (một khối hộp, một khối trụ, một khối cầu) sẽ bộc lộ đồng thời khả năng dựng hình, tỷ lệ và sắc độ. Kết quả này là mốc so sánh cho tiến bộ sau này, nên sự trung thực quan trọng hơn điểm số.",
    "steps": [
     "Chọn 3 vật thể thuộc 3 loại khối khác nhau, bày cạnh nhau",
     "Vẽ khung bao chung của cả nhóm vật trong 5 phút đầu",
     "Dựng từng vật thể, kiểm tra tỷ lệ giữa các vật",
     "Thêm mảng sáng tối lớn nhất, dừng ở mức khả năng hiện tại"
    ],
    "demo": {
     "kind": "cube",
     "note": "Trình diễn trực quan cho bài 'Bài đánh giá đầu vào: vẽ tĩnh vật đơn giản': bắt đầu từ bước 'Chọn 3 vật thể thuộc 3 loại khối khác nhau, bày cạnh nhau', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ tĩnh vật gồm một hộp, một chai/lọ và một quả tròn bày cạnh nhau trong tối đa 45 phút, nộp bản vẽ nguyên trạng không chỉnh sửa.",
     "mode": "independent",
     "assessType": "free",
     "target": {}
    },
    "rubric": [
     {
      "id": "idea",
      "name": "Ý tưởng và yêu cầu đề",
      "weight": 30,
      "method": "ai",
      "desc": "Bài thể hiện rõ ý tưởng và đáp ứng đúng đề bài tự do."
     },
     {
      "id": "tech",
      "name": "Kỹ thuật thể hiện",
      "weight": 30,
      "method": "hybrid",
      "desc": "Kỹ thuật trọng tâm của bài được áp dụng nhất quán."
     },
     {
      "id": "coherence",
      "name": "Tính nhất quán tổng thể",
      "weight": 25,
      "method": "ai",
      "desc": "Hình, sắc độ/màu và bố cục thuộc cùng một tổng thể."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Bài hoàn chỉnh, không bỏ dở phần chính nào."
     }
    ],
    "mistakes": [
     {
      "error": "Bài lạc khỏi kỹ thuật trọng tâm của bài học",
      "cause": "Mải theo ý tưởng mà quên yêu cầu kỹ thuật cần luyện.",
      "fix": "Viết kỹ thuật trọng tâm ra mép giấy và kiểm tra lại sau mỗi giai đoạn vẽ."
     },
     {
      "error": "Bài bỏ dở ở phần khó nhất",
      "cause": "Bắt đầu từ phần dễ và chi tiết, hết thời gian cho phần cấu trúc.",
      "fix": "Dựng toàn bộ cấu trúc trước, chỉ chi tiết hóa khi tổng thể đã đứng vững."
     }
    ],
    "passScore": 70
   }
  ]
 },
 {
  "id": "m01",
  "code": "01",
  "title": "Line Control",
  "description": "Luyện điều khiển nét: thẳng, cong, song song, tròn và ellipse — kỹ năng vận động nền tảng của mọi bài vẽ.",
  "track": null,
  "lessons": [
   {
    "id": "m01-l01",
    "title": "Nét thẳng tự do không dùng thước",
    "summary": "Kéo nét thẳng bằng cả cánh tay, nhìn điểm đích thay vì đầu bút.",
    "objectives": [
     "Vẽ được 10 nét thẳng dài 20cm lệch khỏi đường thẳng lý tưởng không quá 3mm",
     "Nối đúng điểm đích trong sai số 5mm ở 8/10 nét",
     "Giữ tốc độ nét đều, không có đoạn chậm gây đậm cục bộ"
    ],
    "difficulty": 1,
    "minutes": 30,
    "skills": [
     "line-control"
    ],
    "prereqLessons": [
     "m00-l05"
    ],
    "theory": "Nét thẳng tự do được kéo bằng chuyển động của cả cánh tay từ vai, cổ tay gần như cố định. Mắt phải nhìn điểm đích trước và trong suốt nét vẽ, vì tay có xu hướng đi theo hướng mắt nhìn. Vẽ nhanh vừa phải cho nét thẳng hơn vẽ chậm rề rà, do chuyển động chậm để lộ mọi rung động nhỏ của cơ tay. Đây là bài luyện vận động thuần túy: lặp lại nhiều lần quan trọng hơn vẽ ít nét thật hoàn hảo.",
    "steps": [
     "Đánh dấu cặp điểm bắt đầu-kết thúc cách nhau 20cm",
     "Nhìn vào điểm kết thúc, kéo nét một lần dứt khoát từ vai",
     "Lặp lại 10 nét, sau mỗi nét ghi độ lệch lớn nhất",
     "Vẽ thêm 5 nét chéo theo hai hướng đối nhau"
    ],
    "demo": {
     "kind": "line",
     "note": "Trình diễn trực quan cho bài 'Nét thẳng tự do không dùng thước': bắt đầu từ bước 'Đánh dấu cặp điểm bắt đầu-kết thúc cách nhau 20cm', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ 10 nét thẳng nối các cặp điểm cho sẵn trên mẫu luyện (ngang, dọc, chéo), mỗi nét chỉ kéo một lần, không tẩy sửa.",
     "mode": "guided",
     "assessType": "line",
     "target": {
      "x1": 80,
      "y1": 200,
      "x2": 920,
      "y2": 200
     }
    },
    "rubric": [
     {
      "id": "accuracy",
      "name": "Độ chính xác vị trí nét",
      "weight": 35,
      "method": "geometry",
      "desc": "Khoảng cách từ nét vẽ tới đường mẫu và sai lệch điểm đầu, điểm cuối."
     },
     {
      "id": "smooth",
      "name": "Độ thẳng và độ mượt",
      "weight": 30,
      "method": "geometry",
      "desc": "Độ lệch khỏi đường thẳng lý tưởng và độ rung của nét."
     },
     {
      "id": "control",
      "name": "Kiểm soát lực và độ đậm",
      "weight": 20,
      "method": "cv",
      "desc": "Độ nhất quán của độ đậm, độ dày nét trong toàn bài."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Số lượng nét yêu cầu đã thực hiện và đúng thứ tự luyện tập."
     }
    ],
    "mistakes": [
     {
      "error": "Nét bị cong và rung ở giữa đoạn",
      "cause": "Tay di chuyển bằng cổ tay thay vì cả cánh tay, mắt nhìn đầu bút thay vì điểm đích.",
      "fix": "Khóa cổ tay, kéo nét bằng cả cánh tay và nhìn vào điểm cuối trước khi vẽ."
     },
     {
      "error": "Điểm cuối vượt quá mốc đích",
      "cause": "Xuất phát quá nhanh và không giảm tốc khi gần tới đích.",
      "fix": "Chia nét làm hai nhịp: kéo nhanh 80% đầu, chậm lại ở 20% cuối."
     },
     {
      "error": "Độ đậm nét không đều",
      "cause": "Lực tay thay đổi theo tốc độ, đoạn nhanh thì nhạt, đoạn chậm thì đậm.",
      "fix": "Giữ tốc độ đều, luyện cùng một lực trên ba nét liên tiếp rồi mới tăng tốc."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m01-l02",
    "title": "Nét cong mượt và đường cong chữ S",
    "summary": "Vẽ đường cong liên tục không gãy khúc và kiểm soát độ cong theo ý muốn.",
    "objectives": [
     "Vẽ được đường cong chữ S qua 5 điểm mốc không gãy khúc tại điểm uốn",
     "Sao chép được một đường cong mẫu với sai lệch tối đa dưới 6mm",
     "Vẽ được 3 đường cong song song cách đều nhau 1cm"
    ],
    "difficulty": 2,
    "minutes": 35,
    "skills": [
     "line-control"
    ],
    "prereqLessons": [
     "m01-l01"
    ],
    "theory": "Đường cong mượt đòi hỏi cổ tay và cánh tay phối hợp: tay di chuyển liên tục, không dừng tại điểm uốn vì điểm dừng tạo góc gãy. Độ cong được kiểm soát bằng cách hình dung đường cong hoàn chỉnh trước khi đặt bút, giống như nét thẳng cần nhìn điểm đích. Đường cong chữ S là bài kiểm tra tốt nhất vì nó buộc tay đổi hướng cong giữa chừng mà vẫn giữ nhịp. Khi vẽ cong song song, khoảng cách đều quan trọng hơn độ khớp tuyệt đối với mẫu.",
    "steps": [
     "Đánh dấu 5 điểm mốc tạo thành đường chữ S",
     "Vẽ đường cong lướt qua cả 5 điểm trong một lần kéo",
     "Vẽ thêm 2 đường cong song song hai bên, cách đều 1cm",
     "So sánh với mẫu và đánh dấu đoạn cong lệch nhất"
    ],
    "demo": {
     "kind": "line",
     "note": "Trình diễn trực quan cho bài 'Nét cong mượt và đường cong chữ S': bắt đầu từ bước 'Đánh dấu 5 điểm mốc tạo thành đường chữ S', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ đường cong chữ S qua các điểm mốc cho sẵn và 2 đường cong song song đi kèm, tất cả trong một lần kéo mỗi đường.",
     "mode": "assisted",
     "assessType": "line",
     "target": {
      "x1": 100,
      "y1": 800,
      "x2": 900,
      "y2": 200
     }
    },
    "rubric": [
     {
      "id": "accuracy",
      "name": "Độ chính xác vị trí nét",
      "weight": 35,
      "method": "geometry",
      "desc": "Khoảng cách từ nét vẽ tới đường mẫu và sai lệch điểm đầu, điểm cuối."
     },
     {
      "id": "smooth",
      "name": "Độ thẳng và độ mượt",
      "weight": 30,
      "method": "geometry",
      "desc": "Độ lệch khỏi đường thẳng lý tưởng và độ rung của nét."
     },
     {
      "id": "control",
      "name": "Kiểm soát lực và độ đậm",
      "weight": 20,
      "method": "cv",
      "desc": "Độ nhất quán của độ đậm, độ dày nét trong toàn bài."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Số lượng nét yêu cầu đã thực hiện và đúng thứ tự luyện tập."
     }
    ],
    "mistakes": [
     {
      "error": "Điểm cuối vượt quá mốc đích",
      "cause": "Xuất phát quá nhanh và không giảm tốc khi gần tới đích.",
      "fix": "Chia nét làm hai nhịp: kéo nhanh 80% đầu, chậm lại ở 20% cuối."
     },
     {
      "error": "Độ đậm nét không đều",
      "cause": "Lực tay thay đổi theo tốc độ, đoạn nhanh thì nhạt, đoạn chậm thì đậm.",
      "fix": "Giữ tốc độ đều, luyện cùng một lực trên ba nét liên tiếp rồi mới tăng tốc."
     },
     {
      "error": "Nét bị cong và rung ở giữa đoạn",
      "cause": "Tay di chuyển bằng cổ tay thay vì cả cánh tay, mắt nhìn đầu bút thay vì điểm đích.",
      "fix": "Khóa cổ tay, kéo nét bằng cả cánh tay và nhìn vào điểm cuối trước khi vẽ."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m01-l03",
    "title": "Đường tròn tự do và vòng tròn đồng tâm",
    "summary": "Vẽ đường tròn khép kín, tròn đều không méo, từ chuyển động xoay của cả cánh tay.",
    "objectives": [
     "Vẽ được đường tròn đường kính 10cm với độ méo (chênh bán kính lớn nhất-nhỏ nhất) dưới 8mm",
     "Nối khép vòng tròn tại điểm bắt đầu không lệch quá 5mm",
     "Vẽ được 3 vòng tròn đồng tâm cách đều nhau"
    ],
    "difficulty": 2,
    "minutes": 35,
    "skills": [
     "line-control"
    ],
    "prereqLessons": [
     "m01-l02"
    ],
    "theory": "Đường tròn tự do không vẽ bằng cổ tay vì biên độ cổ tay quá nhỏ so với vòng tròn. Hãy hình dung tâm và bán kính trước, rồi cho cánh tay di chuyển theo quỹ đạo tròn quanh tâm tưởng tượng đó. Vẽ vòng tròn bằng nhiều vòng lướt nhẹ chồng lên nhau cho kết quả tròn hơn một vòng đậm duy nhất, vì mỗi vòng tự sửa sai lệch của vòng trước. Điểm khép vòng là nơi dễ lệch nhất, cần giảm tốc khi quay về điểm bắt đầu.",
    "steps": [
     "Đánh dấu tâm và 4 điểm trên vòng tròn tại các hướng chính",
     "Lướt nhẹ 3 vòng quanh tâm để tìm quỹ đạo tròn đều",
     "Vẽ vòng chính thức chồng lên quỹ đạo đã lướt",
     "Thêm 2 vòng đồng tâm trong và ngoài, giữ khoảng cách đều"
    ],
    "demo": {
     "kind": "circle",
     "note": "Trình diễn trực quan cho bài 'Đường tròn tự do và vòng tròn đồng tâm': bắt đầu từ bước 'Đánh dấu tâm và 4 điểm trên vòng tròn tại các hướng chính', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ một đường tròn đường kính chuẩn trên mẫu luyện (tâm và bán kính cho sẵn) kèm 2 vòng đồng tâm, nộp bản có giữ lại các vòng lướt phác.",
     "mode": "assisted",
     "assessType": "ellipse",
     "target": {
      "cx": 500,
      "cy": 500,
      "rx": 320,
      "ry": 320
     }
    },
    "rubric": [
     {
      "id": "fit",
      "name": "Độ khớp với ellipse mẫu",
      "weight": 40,
      "method": "geometry",
      "desc": "Sai lệch bán trục và vị trí tâm so với ellipse chuẩn."
     },
     {
      "id": "sym",
      "name": "Đối xứng qua hai trục",
      "weight": 25,
      "method": "geometry",
      "desc": "Mức cân xứng của ellipse qua trục ngang và trục dọc."
     },
     {
      "id": "smooth",
      "name": "Độ mượt của đường cong",
      "weight": 20,
      "method": "cv",
      "desc": "Độ liên tục, không gãy khúc của đường ellipse."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Số vòng ellipse yêu cầu đã vẽ và đúng kích thước đề bài."
     }
    ],
    "mistakes": [
     {
      "error": "Hai nửa ellipse không đối xứng",
      "cause": "Chỉ nhìn nửa đang vẽ, không so với nửa đối diện.",
      "fix": "Vẽ xong một vòng thì lật kiểm tra theo trục, sửa ở vòng luyện tiếp theo."
     },
     {
      "error": "Ellipse nhọn hai đầu như quả bóng bầu dục",
      "cause": "Hai đầu cong bị gấp vì tay dừng lại ở cuối trục dài.",
      "fix": "Vẽ liền một vòng không dừng, để bút lướt qua điểm cuối trục dài."
     },
     {
      "error": "Ellipse lệch tâm so với mẫu",
      "cause": "Vẽ đường bao trước khi xác định tâm và hai trục.",
      "fix": "Đánh dấu tâm, kẻ hai trục và bốn điểm chạm trước khi vẽ cong."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m01-l04",
    "title": "Ellipse và các bậc nghiêng của ellipse",
    "summary": "Hiểu ellipse là hình tròn nhìn nghiêng và kiểm soát độ mở của ellipse theo góc nhìn.",
    "objectives": [
     "Vẽ được dãy 5 ellipse cùng trục dài với độ mở tăng dần đều",
     "Giữ hai đầu ellipse cong tròn, không nhọn ở 5/5 hình",
     "Vẽ ellipse khớp khung chữ nhật cho sẵn với 4 điểm chạm đúng vị trí"
    ],
    "difficulty": 2,
    "minutes": 40,
    "skills": [
     "line-control"
    ],
    "prereqLessons": [
     "m01-l03"
    ],
    "theory": "Ellipse là hình ảnh của đường tròn khi nhìn nghiêng: trục dài không đổi còn trục ngắn thu hẹp dần khi góc nhìn càng xiên. Mọi ellipse đều có hai trục vuông góc và đối xứng qua cả hai trục, hai đầu phải cong tròn chứ không nhọn. Độ mở của ellipse cho người xem biết bề mặt đang nghiêng ở mức nào, nên vẽ sai độ mở sẽ làm vật thể trông méo. Khi luyện, hãy vẽ ellipse lọt trong khung chữ nhật để bốn điểm chạm giúp kiểm tra độ đối xứng.",
    "steps": [
     "Kẻ trục dài và trục ngắn vuông góc tại tâm ellipse",
     "Đánh dấu 4 điểm chạm trên khung chữ nhật bao quanh",
     "Vẽ cong từng phần tư, lướt qua điểm cuối trục dài không dừng",
     "Vẽ dãy 5 ellipse cùng trục dài, độ mở tăng dần"
    ],
    "demo": {
     "kind": "ellipse",
     "note": "Trình diễn trực quan cho bài 'Ellipse và các bậc nghiêng của ellipse': bắt đầu từ bước 'Kẻ trục dài và trục ngắn vuông góc tại tâm ellipse', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ ellipse khớp với khung chuẩn cho sẵn (tâm, trục dài, trục ngắn đã cho) và một dãy 3 ellipse độ mở khác nhau phía dưới.",
     "mode": "assisted",
     "assessType": "ellipse",
     "target": {
      "cx": 500,
      "cy": 420,
      "rx": 360,
      "ry": 150
     }
    },
    "rubric": [
     {
      "id": "fit",
      "name": "Độ khớp với ellipse mẫu",
      "weight": 40,
      "method": "geometry",
      "desc": "Sai lệch bán trục và vị trí tâm so với ellipse chuẩn."
     },
     {
      "id": "sym",
      "name": "Đối xứng qua hai trục",
      "weight": 25,
      "method": "geometry",
      "desc": "Mức cân xứng của ellipse qua trục ngang và trục dọc."
     },
     {
      "id": "smooth",
      "name": "Độ mượt của đường cong",
      "weight": 20,
      "method": "cv",
      "desc": "Độ liên tục, không gãy khúc của đường ellipse."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Số vòng ellipse yêu cầu đã vẽ và đúng kích thước đề bài."
     }
    ],
    "mistakes": [
     {
      "error": "Ellipse nhọn hai đầu như quả bóng bầu dục",
      "cause": "Hai đầu cong bị gấp vì tay dừng lại ở cuối trục dài.",
      "fix": "Vẽ liền một vòng không dừng, để bút lướt qua điểm cuối trục dài."
     },
     {
      "error": "Ellipse lệch tâm so với mẫu",
      "cause": "Vẽ đường bao trước khi xác định tâm và hai trục.",
      "fix": "Đánh dấu tâm, kẻ hai trục và bốn điểm chạm trước khi vẽ cong."
     },
     {
      "error": "Hai nửa ellipse không đối xứng",
      "cause": "Chỉ nhìn nửa đang vẽ, không so với nửa đối diện.",
      "fix": "Vẽ xong một vòng thì lật kiểm tra theo trục, sửa ở vòng luyện tiếp theo."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m01-l05",
    "title": "Đường song song, nét liên tục và kiểm soát độ đậm",
    "summary": "Kết hợp ba kỹ năng nét: giữ khoảng cách song song, vẽ một nét không nhấc bút và thay đổi độ đậm giữa chừng.",
    "objectives": [
     "Vẽ được 6 đường thẳng song song cách đều 1.5cm, sai lệch khoảng cách dưới 3mm",
     "Vẽ được một nét liên tục dài qua 8 điểm mốc không nhấc bút",
     "Tạo được nét chuyển từ nhạt sang đậm đều trong một lần kéo"
    ],
    "difficulty": 2,
    "minutes": 40,
    "skills": [
     "line-control"
    ],
    "prereqLessons": [
     "m01-l04"
    ],
    "theory": "Đường song song kiểm tra khả năng giữ hướng và khoảng cách đồng thời, mắt phải liên tục so sánh với đường vừa vẽ trước đó. Nét liên tục không nhấc bút buộc người vẽ phải hoạch định đường đi trước, vì không có điểm dừng để suy nghĩ lại. Thay đổi độ đậm trong một nét bằng cách tăng lực từ từ cho thấy mức độ làm chủ lực tay đã học. Ba kỹ năng này xuất hiện trong mọi bài dựng hình sau này: gióng đường, nối nét và nhấn nét chính.",
    "steps": [
     "Vẽ đường thẳng đầu tiên làm chuẩn",
     "Vẽ tiếp 5 đường song song, mỗi đường nhìn đường trước để giữ khoảng",
     "Đánh dấu 8 điểm mốc zíc zắc, nối bằng một nét không nhấc bút",
     "Vẽ 3 nét chuyển đậm dần bằng cách tăng lực đều từ đầu tới cuối"
    ],
    "demo": {
     "kind": "line",
     "note": "Trình diễn trực quan cho bài 'Đường song song, nét liên tục và kiểm soát độ đậm': bắt đầu từ bước 'Vẽ đường thẳng đầu tiên làm chuẩn', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Nộp trang luyện gồm: bộ 6 đường song song cách đều, một nét liên tục qua các điểm mốc zíc zắc và 3 nét chuyển độ đậm từ nhạt tới đậm.",
     "mode": "independent",
     "assessType": "line",
     "target": {
      "x1": 100,
      "y1": 300,
      "x2": 900,
      "y2": 300
     }
    },
    "rubric": [
     {
      "id": "accuracy",
      "name": "Độ chính xác vị trí nét",
      "weight": 35,
      "method": "geometry",
      "desc": "Khoảng cách từ nét vẽ tới đường mẫu và sai lệch điểm đầu, điểm cuối."
     },
     {
      "id": "smooth",
      "name": "Độ thẳng và độ mượt",
      "weight": 30,
      "method": "geometry",
      "desc": "Độ lệch khỏi đường thẳng lý tưởng và độ rung của nét."
     },
     {
      "id": "control",
      "name": "Kiểm soát lực và độ đậm",
      "weight": 20,
      "method": "cv",
      "desc": "Độ nhất quán của độ đậm, độ dày nét trong toàn bài."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Số lượng nét yêu cầu đã thực hiện và đúng thứ tự luyện tập."
     }
    ],
    "mistakes": [
     {
      "error": "Điểm cuối vượt quá mốc đích",
      "cause": "Xuất phát quá nhanh và không giảm tốc khi gần tới đích.",
      "fix": "Chia nét làm hai nhịp: kéo nhanh 80% đầu, chậm lại ở 20% cuối."
     },
     {
      "error": "Độ đậm nét không đều",
      "cause": "Lực tay thay đổi theo tốc độ, đoạn nhanh thì nhạt, đoạn chậm thì đậm.",
      "fix": "Giữ tốc độ đều, luyện cùng một lực trên ba nét liên tiếp rồi mới tăng tốc."
     },
     {
      "error": "Nét bị cong và rung ở giữa đoạn",
      "cause": "Tay di chuyển bằng cổ tay thay vì cả cánh tay, mắt nhìn đầu bút thay vì điểm đích.",
      "fix": "Khóa cổ tay, kéo nét bằng cả cánh tay và nhìn vào điểm cuối trước khi vẽ."
     }
    ],
    "passScore": 70
   }
  ]
 },
 {
  "id": "m02",
  "code": "02",
  "title": "Shapes & Proportion",
  "description": "Dựng hình 2D, đo tỷ lệ, đối xứng và không gian âm — bước chuyển từ nét vẽ sang hình có cấu trúc.",
  "track": null,
  "lessons": [
   {
    "id": "m02-l01",
    "title": "Hình học 2D và đường bao cơ bản",
    "summary": "Dựng tam giác, tứ giác, ngũ giác đều và sạch bằng đường bao liên tục.",
    "objectives": [
     "Dựng được 4 hình 2D cơ bản khớp khung cho sẵn với sai lệch cạnh dưới 6mm",
     "Vẽ đường bao khép kín không hở góc ở 4/4 hình",
     "Giữ cạnh thẳng không dùng thước ở các hình có cạnh thẳng"
    ],
    "difficulty": 1,
    "minutes": 35,
    "skills": [
     "shape-accuracy",
     "line-control"
    ],
    "prereqLessons": [
     "m01-l05"
    ],
    "theory": "Mọi vật thể phức tạp đều có thể rút gọn thành các hình 2D cơ bản trước khi dựng khối. Đường bao là biên ngoài cùng của hình, vẽ đúng đường bao nghĩa là kiểm soát được đồng thời vị trí mọi cạnh. Khi dựng hình cơ bản, hãy xác định các đỉnh trước bằng điểm mốc rồi mới nối, thay vì vẽ từng cạnh theo cảm giác. Hình càng đơn giản càng lộ lỗi, nên đây là nơi rèn độ chính xác rẻ nhất.",
    "steps": [
     "Đánh dấu vị trí các đỉnh của từng hình bằng điểm mốc",
     "Nối các đỉnh thành đường bao, kiểm tra độ khép kín",
     "So sánh từng cạnh với khung mẫu, ghi cạnh lệch nhất",
     "Vẽ lại hình lệch nhất một lần nữa ở bên cạnh"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Hình học 2D và đường bao cơ bản': bắt đầu từ bước 'Đánh dấu vị trí các đỉnh của từng hình bằng điểm mốc', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng 4 hình (tam giác, vuông, ngũ giác, lục giác) khớp các khung mẫu cho sẵn trên trang luyện, giữ lại điểm mốc đỉnh.",
     "mode": "guided",
     "assessType": "shape",
     "target": {
      "x": 250,
      "y": 250,
      "w": 500,
      "h": 500
     }
    },
    "rubric": [
     {
      "id": "shape",
      "name": "Độ chính xác hình dạng",
      "weight": 35,
      "method": "geometry",
      "desc": "Độ khớp của đường bao với hình mẫu."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ các phần",
      "weight": 30,
      "method": "geometry",
      "desc": "Quan hệ chiều rộng, chiều cao và kích thước tương đối."
     },
     {
      "id": "align",
      "name": "Căn chỉnh và đối xứng",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí các mốc, trục đối xứng và độ thẳng hàng."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đầy đủ các chi tiết cấu trúc mà đề bài yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Hình đúng nét nhưng sai tỷ lệ tổng thể",
      "cause": "Vẽ chi tiết từng cạnh mà không khóa khung bao ngoài trước.",
      "fix": "Dựng khung bao (bounding box) và chia tỷ lệ khung trước khi vẽ đường bao."
     },
     {
      "error": "Đối xứng hai bên bị lệch",
      "cause": "Vẽ hoàn thiện một bên rồi đoán bên còn lại.",
      "fix": "Kẻ trục đối xứng, đánh dấu các cặp điểm ngang nhau rồi mới nối."
     },
     {
      "error": "Không gian âm bị bỏ qua",
      "cause": "Chỉ nhìn vật thể, không nhìn hình của khoảng trống xung quanh.",
      "fix": "Vẽ thêm hình của khoảng trống giữa các bộ phận và đối chiếu với mẫu."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m02-l02",
    "title": "Tỷ lệ: đo và so sánh kích thước",
    "summary": "Dùng đơn vị đo tương đối (đầu bút, đoạn chuẩn) để chuyển tỷ lệ từ mẫu sang giấy đúng quan hệ.",
    "objectives": [
     "Đo được tỷ lệ chiều cao/chiều rộng của 3 vật thể bằng đơn vị đoạn chuẩn",
     "Chuyển tỷ lệ sang bản vẽ sai lệch dưới 10%",
     "Phát hiện và sửa được một lỗi tỷ lệ cố ý trong bài mẫu lỗi"
    ],
    "difficulty": 2,
    "minutes": 45,
    "skills": [
     "proportion",
     "observation"
    ],
    "prereqLessons": [
     "m02-l01"
    ],
    "theory": "Tỷ lệ không đo bằng centimet tuyệt đối mà bằng quan hệ: chiều cao gấp mấy lần chiều rộng, bộ phận này bằng mấy phần bộ phận kia. Chọn một đoạn làm đơn vị chuẩn rồi đếm mọi kích thước khác theo đơn vị đó, cả trên mẫu lẫn trên giấy. Cách đo này giữ đúng quan hệ dù bản vẽ to hay nhỏ hơn mẫu. Lỗi tỷ lệ thường không nằm ở từng nét mà ở việc bắt đầu vẽ chi tiết trước khi khóa khung tỷ lệ chung.",
    "steps": [
     "Chọn đoạn chuẩn trên vật mẫu (ví dụ chiều rộng đáy)",
     "Đếm chiều cao và các bộ phận theo đoạn chuẩn, ghi ra giấy",
     "Dựng khung bản vẽ theo đúng số đếm đó",
     "Vẽ đường bao và đối chiếu lại từng quan hệ một lần nữa"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Tỷ lệ: đo và so sánh kích thước': bắt đầu từ bước 'Chọn đoạn chuẩn trên vật mẫu (ví dụ chiều rộng đáy)', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ một chai nước theo đúng tỷ lệ đo được bằng đoạn chuẩn: nộp bản vẽ kèm bảng đếm tỷ lệ (chiều cao = mấy lần chiều rộng, cổ chai = mấy phần thân).",
     "mode": "assisted",
     "assessType": "shape",
     "target": {
      "x": 380,
      "y": 120,
      "w": 240,
      "h": 760
     }
    },
    "rubric": [
     {
      "id": "shape",
      "name": "Độ chính xác hình dạng",
      "weight": 35,
      "method": "geometry",
      "desc": "Độ khớp của đường bao với hình mẫu."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ các phần",
      "weight": 30,
      "method": "geometry",
      "desc": "Quan hệ chiều rộng, chiều cao và kích thước tương đối."
     },
     {
      "id": "align",
      "name": "Căn chỉnh và đối xứng",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí các mốc, trục đối xứng và độ thẳng hàng."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đầy đủ các chi tiết cấu trúc mà đề bài yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Đối xứng hai bên bị lệch",
      "cause": "Vẽ hoàn thiện một bên rồi đoán bên còn lại.",
      "fix": "Kẻ trục đối xứng, đánh dấu các cặp điểm ngang nhau rồi mới nối."
     },
     {
      "error": "Không gian âm bị bỏ qua",
      "cause": "Chỉ nhìn vật thể, không nhìn hình của khoảng trống xung quanh.",
      "fix": "Vẽ thêm hình của khoảng trống giữa các bộ phận và đối chiếu với mẫu."
     },
     {
      "error": "Hình đúng nét nhưng sai tỷ lệ tổng thể",
      "cause": "Vẽ chi tiết từng cạnh mà không khóa khung bao ngoài trước.",
      "fix": "Dựng khung bao (bounding box) và chia tỷ lệ khung trước khi vẽ đường bao."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m02-l03",
    "title": "Đối xứng và trục đối xứng",
    "summary": "Dựng hình đối xứng qua trục bằng phương pháp đánh dấu cặp điểm.",
    "objectives": [
     "Dựng được một hình đối xứng hai bên lệch trục dưới 5mm",
     "Đánh dấu được ít nhất 6 cặp điểm đối xứng trước khi nối",
     "Tự tìm được trục đối xứng của 3 hình cho sẵn"
    ],
    "difficulty": 2,
    "minutes": 40,
    "skills": [
     "shape-accuracy",
     "proportion"
    ],
    "prereqLessons": [
     "m02-l02"
    ],
    "theory": "Hình đối xứng có mọi điểm một bên cách trục đúng bằng điểm tương ứng bên kia. Cách dựng đáng tin cậy là kẻ trục trước, đánh dấu từng cặp điểm ngang nhau qua trục, rồi mới nối thành đường bao. Vẽ hoàn thiện một bên rồi đoán bên kia gần như luôn lệch vì mắt không tự cân xứng được. Nhiều vật thể thật (khuôn mặt, chai lọ, lá cây) gần đối xứng chứ không tuyệt đối, nhưng luyện đối xứng tuyệt đối trước giúp mắt nhạy với độ lệch.",
    "steps": [
     "Kẻ trục đối xứng dọc qua giữa khung vẽ",
     "Vẽ nửa trái của hình mẫu bằng đường bao",
     "Đánh dấu các điểm mốc của nửa trái và chiếu ngang qua trục",
     "Nối các điểm chiếu thành nửa phải, so sánh hai bên"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Đối xứng và trục đối xứng': bắt đầu từ bước 'Kẻ trục đối xứng dọc qua giữa khung vẽ', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Hoàn thiện nửa phải của một chiếc lá/bình hoa đối xứng cho sẵn nửa trái và trục đối xứng, nộp bản có giữ các điểm chiếu.",
     "mode": "assisted",
     "assessType": "shape",
     "target": {
      "x": 200,
      "y": 150,
      "w": 600,
      "h": 700
     }
    },
    "rubric": [
     {
      "id": "shape",
      "name": "Độ chính xác hình dạng",
      "weight": 35,
      "method": "geometry",
      "desc": "Độ khớp của đường bao với hình mẫu."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ các phần",
      "weight": 30,
      "method": "geometry",
      "desc": "Quan hệ chiều rộng, chiều cao và kích thước tương đối."
     },
     {
      "id": "align",
      "name": "Căn chỉnh và đối xứng",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí các mốc, trục đối xứng và độ thẳng hàng."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đầy đủ các chi tiết cấu trúc mà đề bài yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Không gian âm bị bỏ qua",
      "cause": "Chỉ nhìn vật thể, không nhìn hình của khoảng trống xung quanh.",
      "fix": "Vẽ thêm hình của khoảng trống giữa các bộ phận và đối chiếu với mẫu."
     },
     {
      "error": "Hình đúng nét nhưng sai tỷ lệ tổng thể",
      "cause": "Vẽ chi tiết từng cạnh mà không khóa khung bao ngoài trước.",
      "fix": "Dựng khung bao (bounding box) và chia tỷ lệ khung trước khi vẽ đường bao."
     },
     {
      "error": "Đối xứng hai bên bị lệch",
      "cause": "Vẽ hoàn thiện một bên rồi đoán bên còn lại.",
      "fix": "Kẻ trục đối xứng, đánh dấu các cặp điểm ngang nhau rồi mới nối."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m02-l04",
    "title": "Đo góc và khoảng cách bằng mắt",
    "summary": "Ước lượng góc nghiêng của cạnh và khoảng cách giữa các mốc so với mẫu.",
    "objectives": [
     "Ước lượng đúng hướng nghiêng của 8 cạnh mẫu trong sai số 7 độ",
     "Đánh dấu được vị trí tương đối của 5 điểm mốc trên lưới tọa độ tương đối",
     "Sửa được bản vẽ sai góc bằng cách gióng lại từ hai điểm cố định"
    ],
    "difficulty": 2,
    "minutes": 40,
    "skills": [
     "proportion",
     "observation"
    ],
    "prereqLessons": [
     "m02-l03"
    ],
    "theory": "Góc và khoảng cách là hai thông tin vị trí mà mắt thường bỏ qua khi chỉ nhìn hình dạng. Muốn đo góc bằng mắt, hãy so cạnh cần đo với hướng ngang và dọc tuyệt đối: cạnh nghiêng hơn 45 độ hay nhỏ hơn, lệch khỏi phương chuẩn bao nhiêu. Khoảng cách nên đo tương đối theo một cạnh đã biết thay vì đoán tuyệt đối. Kỹ năng này quyết định việc vẽ theo mẫu có giống mẫu hay chỉ giống ý tưởng về mẫu.",
    "steps": [
     "Trên mẫu, xác định 2 điểm cố định làm mốc gióng",
     "Ước lượng góc của từng cạnh so với phương ngang/dọc",
     "Đánh dấu vị trí các điểm mốc lên giấy theo tỷ lệ khoảng cách",
     "Nối các điểm và kiểm tra lại góc bằng cách kéo dài cạnh"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Đo góc và khoảng cách bằng mắt': bắt đầu từ bước 'Trên mẫu, xác định 2 điểm cố định làm mốc gióng', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Sao chép sơ đồ 5 điểm mốc và các cạnh nối cho sẵn (bản đồ hình học) sang khung trống bên cạnh, giữ đúng góc và khoảng cách tương đối.",
     "mode": "assisted",
     "assessType": "shape",
     "target": {
      "x": 150,
      "y": 150,
      "w": 700,
      "h": 700
     }
    },
    "rubric": [
     {
      "id": "shape",
      "name": "Độ chính xác hình dạng",
      "weight": 35,
      "method": "geometry",
      "desc": "Độ khớp của đường bao với hình mẫu."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ các phần",
      "weight": 30,
      "method": "geometry",
      "desc": "Quan hệ chiều rộng, chiều cao và kích thước tương đối."
     },
     {
      "id": "align",
      "name": "Căn chỉnh và đối xứng",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí các mốc, trục đối xứng và độ thẳng hàng."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đầy đủ các chi tiết cấu trúc mà đề bài yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Hình đúng nét nhưng sai tỷ lệ tổng thể",
      "cause": "Vẽ chi tiết từng cạnh mà không khóa khung bao ngoài trước.",
      "fix": "Dựng khung bao (bounding box) và chia tỷ lệ khung trước khi vẽ đường bao."
     },
     {
      "error": "Đối xứng hai bên bị lệch",
      "cause": "Vẽ hoàn thiện một bên rồi đoán bên còn lại.",
      "fix": "Kẻ trục đối xứng, đánh dấu các cặp điểm ngang nhau rồi mới nối."
     },
     {
      "error": "Không gian âm bị bỏ qua",
      "cause": "Chỉ nhìn vật thể, không nhìn hình của khoảng trống xung quanh.",
      "fix": "Vẽ thêm hình của khoảng trống giữa các bộ phận và đối chiếu với mẫu."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m02-l05",
    "title": "Không gian âm và phân rã hình phức tạp",
    "summary": "Nhìn khoảng trống quanh vật thể như một hình có hình dạng riêng và chia vật phức tạp thành hình cơ bản.",
    "objectives": [
     "Vẽ được hình không gian âm của một vật thể và đối chiếu khớp với đường bao vật thể",
     "Chia được một vật thể phức tạp thành tối đa 5 hình cơ bản",
     "Dựng lại vật thể chỉ từ các hình cơ bản đã phân rã"
    ],
    "difficulty": 3,
    "minutes": 50,
    "skills": [
     "observation",
     "shape-accuracy"
    ],
    "prereqLessons": [
     "m02-l04"
    ],
    "theory": "Không gian âm là hình của khoảng trống bao quanh và nằm giữa các bộ phận của vật thể. Vì não không có sẵn khái niệm về hình dạng của khoảng trống, vẽ không gian âm buộc mắt nhìn hình thật thay vì vẽ theo trí nhớ. Khi đường bao của không gian âm đúng thì đường bao của vật thể tự động đúng. Với vật phức tạp, hãy phân rã thành các hình cơ bản đã học, dựng từng hình rồi mới hợp nhất đường bao.",
    "steps": [
     "Chọn vật thể có khoảng trống rõ (ghế, kéo, ấm nước)",
     "Vẽ hình của khoảng trống bên trong và quanh vật thể trước",
     "Đảo ngược: dùng biên của không gian âm làm đường bao vật thể",
     "Chia vật thể thành các hình cơ bản và dựng lại một lần nữa"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Không gian âm và phân rã hình phức tạp': bắt đầu từ bước 'Chọn vật thể có khoảng trống rõ (ghế, kéo, ấm nước)', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ một chiếc ghế dựa theo phương pháp không gian âm: nộp bản vẽ có tô xám các vùng không gian âm kèm bản phân rã ghế thành hình cơ bản.",
     "mode": "independent",
     "assessType": "shape",
     "target": {
      "x": 250,
      "y": 100,
      "w": 500,
      "h": 800
     }
    },
    "rubric": [
     {
      "id": "shape",
      "name": "Độ chính xác hình dạng",
      "weight": 35,
      "method": "geometry",
      "desc": "Độ khớp của đường bao với hình mẫu."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ các phần",
      "weight": 30,
      "method": "geometry",
      "desc": "Quan hệ chiều rộng, chiều cao và kích thước tương đối."
     },
     {
      "id": "align",
      "name": "Căn chỉnh và đối xứng",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí các mốc, trục đối xứng và độ thẳng hàng."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đầy đủ các chi tiết cấu trúc mà đề bài yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Đối xứng hai bên bị lệch",
      "cause": "Vẽ hoàn thiện một bên rồi đoán bên còn lại.",
      "fix": "Kẻ trục đối xứng, đánh dấu các cặp điểm ngang nhau rồi mới nối."
     },
     {
      "error": "Không gian âm bị bỏ qua",
      "cause": "Chỉ nhìn vật thể, không nhìn hình của khoảng trống xung quanh.",
      "fix": "Vẽ thêm hình của khoảng trống giữa các bộ phận và đối chiếu với mẫu."
     },
     {
      "error": "Hình đúng nét nhưng sai tỷ lệ tổng thể",
      "cause": "Vẽ chi tiết từng cạnh mà không khóa khung bao ngoài trước.",
      "fix": "Dựng khung bao (bounding box) và chia tỷ lệ khung trước khi vẽ đường bao."
     }
    ],
    "passScore": 70
   }
  ]
 },
 {
  "id": "m03",
  "code": "03",
  "title": "Form Construction",
  "description": "Dựng vật thể từ khối hộp, cầu, trụ, nón; trục, xoay khối và đường xuyên khối.",
  "track": null,
  "lessons": [
   {
    "id": "m03-l01",
    "title": "Khối hộp và trục cấu trúc",
    "summary": "Dựng khối hộp từ khung bao, trục chính và ba mặt nhìn thấy được.",
    "objectives": [
     "Dựng được khối hộp có 3 mặt nhất quán với một hướng nhìn duy nhất",
     "Kẻ được trục chính và trục phụ đúng hướng nghiêng của khối",
     "Vẽ được đường xuyên (through-line) cho các cạnh bị khuất"
    ],
    "difficulty": 2,
    "minutes": 40,
    "skills": [
     "form-construction",
     "shape-accuracy"
    ],
    "prereqLessons": [
     "m02-l05"
    ],
    "theory": "Khối hộp là khối cơ bản quan trọng nhất vì hầu hết vật thể đều lọt trong một khung hộp tưởng tượng. Trước khi vẽ các mặt, hãy xác định trục chính của khối — hướng mà khối đang nghiêng theo. Các cạnh bị khuất vẫn nên được phác xuyên qua khối (through-line) để hai đầu của một cạnh khớp nhau. Ba mặt nhìn thấy phải thuộc cùng một hướng nhìn; trộn hai hướng nhìn là lỗi phổ biến nhất khi dựng hộp.",
    "steps": [
     "Vẽ khung bao tổng thể của khối hộp",
     "Kẻ trục chính theo hướng nghiêng của khối",
     "Dựng mặt trước, rồi kéo hai mặt bên theo cùng hướng sâu",
     "Phác xuyên các cạnh khuất bằng nét nhạt để kiểm tra"
    ],
    "demo": {
     "kind": "cube",
     "note": "Trình diễn trực quan cho bài 'Khối hộp và trục cấu trúc': bắt đầu từ bước 'Vẽ khung bao tổng thể của khối hộp', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng một khối hộp nghiêng theo mẫu khối cho sẵn, giữ lại trục và các đường xuyên khối trong bản nộp.",
     "mode": "guided",
     "assessType": "form",
     "target": {}
    },
    "rubric": [
     {
      "id": "structure",
      "name": "Cấu trúc khối",
      "weight": 35,
      "method": "hybrid",
      "desc": "Khối được dựng từ hình cơ bản đúng trục và đúng quan hệ các mặt."
     },
     {
      "id": "axis",
      "name": "Trục và hướng khối",
      "weight": 25,
      "method": "geometry",
      "desc": "Trục chính, hướng xoay và độ nghiêng của khối khớp với mẫu."
     },
     {
      "id": "space",
      "name": "Tính nhất quán không gian",
      "weight": 25,
      "method": "hybrid",
      "desc": "Các khối con nằm đúng vị trí, không mâu thuẫn về chiều sâu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số khối và các bước dựng hình theo yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Khối bị xẹp, không có chiều sâu",
      "cause": "Các mặt bên bị thu hẹp vì không xác định trục và hướng xoay trước.",
      "fix": "Kẻ trục chính, vẽ mặt trước rồi mới kéo chiều sâu theo một hướng thống nhất."
     },
     {
      "error": "Các khối con không gắn được vào khối chính",
      "cause": "Vẽ từng khối rời rạc, không dùng đường gióng chung.",
      "fix": "Dựng khối bao tổng thể trước, chia vị trí khối con bằng đường gióng từ khối chính."
     },
     {
      "error": "Đường xuyên khối (cross-contour) sai hướng",
      "cause": "Vẽ đường cong trang trí thay vì bám theo bề mặt khối.",
      "fix": "Cho đường cross-contour ôm quanh trục, đổi hướng đúng tại cạnh của khối."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m03-l02",
    "title": "Khối cầu và đường xuyên bề mặt",
    "summary": "Vẽ khối cầu bằng đường tròn bao và các đường kinh tuyến, vĩ tuyến bám bề mặt.",
    "objectives": [
     "Vẽ được đường tròn bao méo dưới 8mm",
     "Vẽ được 3 đường cross-contour ôm đúng bề mặt cầu, cong nhất tại biên",
     "Phân biệt được vĩ tuyến nhìn thẳng và vĩ tuyến nhìn nghiêng dạng ellipse"
    ],
    "difficulty": 2,
    "minutes": 40,
    "skills": [
     "form-construction",
     "line-control"
    ],
    "prereqLessons": [
     "m03-l01"
    ],
    "theory": "Khối cầu chỉ có một đường bao là đường tròn, nên chiều khối phải thể hiện bằng các đường xuyên bề mặt (cross-contour). Các đường này cong theo bề mặt: gần như thẳng khi qua vùng mặt hướng về người xem và cong mạnh khi tiến ra biên. Vĩ tuyến của cầu khi nhìn nghiêng trở thành các ellipse có độ mở giảm dần về phía cực. Hiểu cầu qua cross-contour là nền tảng để vẽ đầu người, trái cây và mọi bề mặt cong sau này.",
    "steps": [
     "Vẽ đường tròn bao bằng nhiều vòng lướt nhẹ",
     "Kẻ trục dọc và trục ngang qua tâm cầu",
     "Vẽ 2 kinh tuyến dạng ellipse ôm theo bề mặt",
     "Vẽ 2 vĩ tuyến phía trên và dưới đường xích đạo"
    ],
    "demo": {
     "kind": "sphere",
     "note": "Trình diễn trực quan cho bài 'Khối cầu và đường xuyên bề mặt': bắt đầu từ bước 'Vẽ đường tròn bao bằng nhiều vòng lướt nhẹ', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng khối cầu với đầy đủ 2 kinh tuyến và 2 vĩ tuyến cross-contour theo góc nhìn mẫu cho sẵn.",
     "mode": "assisted",
     "assessType": "form",
     "target": {}
    },
    "rubric": [
     {
      "id": "structure",
      "name": "Cấu trúc khối",
      "weight": 35,
      "method": "hybrid",
      "desc": "Khối được dựng từ hình cơ bản đúng trục và đúng quan hệ các mặt."
     },
     {
      "id": "axis",
      "name": "Trục và hướng khối",
      "weight": 25,
      "method": "geometry",
      "desc": "Trục chính, hướng xoay và độ nghiêng của khối khớp với mẫu."
     },
     {
      "id": "space",
      "name": "Tính nhất quán không gian",
      "weight": 25,
      "method": "hybrid",
      "desc": "Các khối con nằm đúng vị trí, không mâu thuẫn về chiều sâu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số khối và các bước dựng hình theo yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Các khối con không gắn được vào khối chính",
      "cause": "Vẽ từng khối rời rạc, không dùng đường gióng chung.",
      "fix": "Dựng khối bao tổng thể trước, chia vị trí khối con bằng đường gióng từ khối chính."
     },
     {
      "error": "Đường xuyên khối (cross-contour) sai hướng",
      "cause": "Vẽ đường cong trang trí thay vì bám theo bề mặt khối.",
      "fix": "Cho đường cross-contour ôm quanh trục, đổi hướng đúng tại cạnh của khối."
     },
     {
      "error": "Khối bị xẹp, không có chiều sâu",
      "cause": "Các mặt bên bị thu hẹp vì không xác định trục và hướng xoay trước.",
      "fix": "Kẻ trục chính, vẽ mặt trước rồi mới kéo chiều sâu theo một hướng thống nhất."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m03-l03",
    "title": "Khối trụ và ellipse hai đầu",
    "summary": "Dựng khối trụ từ trục, hai ellipse đầu và đường sinh hai bên.",
    "objectives": [
     "Dựng được khối trụ có hai ellipse cùng trục và cùng độ mở theo góc nhìn",
     "Giữ hai đường sinh tiếp tuyến đúng tại điểm rộng nhất của ellipse",
     "Vẽ được trụ nghiêng với trục và ellipse vuông góc nhau"
    ],
    "difficulty": 2,
    "minutes": 45,
    "skills": [
     "form-construction",
     "line-control"
    ],
    "prereqLessons": [
     "m03-l02"
    ],
    "theory": "Khối trụ được xác định bởi một trục thẳng và hai ellipse vuông góc với trục đó. Lỗi kinh điển là vẽ ellipse đầu trụ không vuông góc với trục, khiến trụ trông như bị vẹo. Độ mở của hai ellipse trong cùng một trụ gần như bằng nhau khi trụ ngắn, và đường sinh hai bên phải tiếp tuyến với ellipse tại điểm rộng nhất. Mọi vật hình chai, cốc, ống đều là biến thể của trụ, nên đây là khối dùng nhiều nhất trong tĩnh vật.",
    "steps": [
     "Kẻ trục của trụ theo hướng nghiêng yêu cầu",
     "Đánh dấu vị trí hai đầu trụ trên trục",
     "Vẽ hai ellipse vuông góc với trục tại hai đầu",
     "Nối hai đường sinh tiếp tuyến và kiểm tra độ song song với trục"
    ],
    "demo": {
     "kind": "cylinder",
     "note": "Trình diễn trực quan cho bài 'Khối trụ và ellipse hai đầu': bắt đầu từ bước 'Kẻ trục của trụ theo hướng nghiêng yêu cầu', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng một khối trụ đứng và một khối trụ nghiêng theo mẫu, mỗi trụ có đủ trục, hai ellipse đầu và đường sinh.",
     "mode": "assisted",
     "assessType": "form",
     "target": {}
    },
    "rubric": [
     {
      "id": "structure",
      "name": "Cấu trúc khối",
      "weight": 35,
      "method": "hybrid",
      "desc": "Khối được dựng từ hình cơ bản đúng trục và đúng quan hệ các mặt."
     },
     {
      "id": "axis",
      "name": "Trục và hướng khối",
      "weight": 25,
      "method": "geometry",
      "desc": "Trục chính, hướng xoay và độ nghiêng của khối khớp với mẫu."
     },
     {
      "id": "space",
      "name": "Tính nhất quán không gian",
      "weight": 25,
      "method": "hybrid",
      "desc": "Các khối con nằm đúng vị trí, không mâu thuẫn về chiều sâu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số khối và các bước dựng hình theo yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Đường xuyên khối (cross-contour) sai hướng",
      "cause": "Vẽ đường cong trang trí thay vì bám theo bề mặt khối.",
      "fix": "Cho đường cross-contour ôm quanh trục, đổi hướng đúng tại cạnh của khối."
     },
     {
      "error": "Khối bị xẹp, không có chiều sâu",
      "cause": "Các mặt bên bị thu hẹp vì không xác định trục và hướng xoay trước.",
      "fix": "Kẻ trục chính, vẽ mặt trước rồi mới kéo chiều sâu theo một hướng thống nhất."
     },
     {
      "error": "Các khối con không gắn được vào khối chính",
      "cause": "Vẽ từng khối rời rạc, không dùng đường gióng chung.",
      "fix": "Dựng khối bao tổng thể trước, chia vị trí khối con bằng đường gióng từ khối chính."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m03-l04",
    "title": "Khối nón, khối tổ hợp và cắt khối",
    "summary": "Ghép nhiều khối cơ bản thành một vật thể và cắt bỏ một phần khối theo mặt phẳng.",
    "objectives": [
     "Ghép được vật thể từ ít nhất 3 khối cơ bản có đường gióng chung",
     "Vẽ được mặt cắt phẳng trên khối hộp và khối trụ đúng vị trí",
     "Giữ các khối con không mâu thuẫn hướng nhìn với khối chính"
    ],
    "difficulty": 3,
    "minutes": 50,
    "skills": [
     "form-construction",
     "proportion"
    ],
    "prereqLessons": [
     "m03-l03"
    ],
    "theory": "Vật thể thật hiếm khi là một khối đơn: ấm nước là trụ cộng cầu bị cắt cộng nón, và cách dựng đúng là ghép các khối theo một đường gióng chung. Cắt khối (như vát góc hộp, khoét miệng chai) tạo ra mặt mới mà hướng của nó phải suy ra từ khối gốc. Khi ghép, hãy dựng khối bao tổng thể trước để các khối con không vượt khỏi tỷ lệ chung. Mọi khối con phải chia sẻ cùng hướng nhìn và cùng logic ánh sáng sau này.",
    "steps": [
     "Phân tích vật thể mẫu thành các khối cơ bản, liệt kê ra giấy",
     "Dựng khối bao tổng thể và chia vị trí cho từng khối con",
     "Dựng từng khối con theo đường gióng chung",
     "Vẽ một mặt cắt phẳng trên khối chính và kiểm tra hướng của mặt cắt"
    ],
    "demo": {
     "kind": "cube",
     "note": "Trình diễn trực quan cho bài 'Khối nón, khối tổ hợp và cắt khối': bắt đầu từ bước 'Phân tích vật thể mẫu thành các khối cơ bản, liệt kê ra giấy', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng một chiếc ấm/cốc có quai từ ít nhất 3 khối cơ bản ghép lại, nộp bản có giữ lớp dựng khối bên dưới lớp đường bao cuối.",
     "mode": "assisted",
     "assessType": "form",
     "target": {}
    },
    "rubric": [
     {
      "id": "structure",
      "name": "Cấu trúc khối",
      "weight": 35,
      "method": "hybrid",
      "desc": "Khối được dựng từ hình cơ bản đúng trục và đúng quan hệ các mặt."
     },
     {
      "id": "axis",
      "name": "Trục và hướng khối",
      "weight": 25,
      "method": "geometry",
      "desc": "Trục chính, hướng xoay và độ nghiêng của khối khớp với mẫu."
     },
     {
      "id": "space",
      "name": "Tính nhất quán không gian",
      "weight": 25,
      "method": "hybrid",
      "desc": "Các khối con nằm đúng vị trí, không mâu thuẫn về chiều sâu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số khối và các bước dựng hình theo yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Khối bị xẹp, không có chiều sâu",
      "cause": "Các mặt bên bị thu hẹp vì không xác định trục và hướng xoay trước.",
      "fix": "Kẻ trục chính, vẽ mặt trước rồi mới kéo chiều sâu theo một hướng thống nhất."
     },
     {
      "error": "Các khối con không gắn được vào khối chính",
      "cause": "Vẽ từng khối rời rạc, không dùng đường gióng chung.",
      "fix": "Dựng khối bao tổng thể trước, chia vị trí khối con bằng đường gióng từ khối chính."
     },
     {
      "error": "Đường xuyên khối (cross-contour) sai hướng",
      "cause": "Vẽ đường cong trang trí thay vì bám theo bề mặt khối.",
      "fix": "Cho đường cross-contour ôm quanh trục, đổi hướng đúng tại cạnh của khối."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m03-l05",
    "title": "Xoay khối trong không gian",
    "summary": "Vẽ cùng một khối hộp ở 3 góc xoay khác nhau quanh trục dọc và trục ngang.",
    "objectives": [
     "Vẽ được cùng một khối hộp ở 3 góc xoay với tỷ lệ các mặt thay đổi hợp lý",
     "Giữ chiều cao khối nhất quán khi xoay quanh trục dọc",
     "Mô tả được mặt nào biến mất/xuất hiện tại mỗi góc xoay"
    ],
    "difficulty": 3,
    "minutes": 50,
    "skills": [
     "form-construction",
     "perspective"
    ],
    "prereqLessons": [
     "m03-l04"
    ],
    "theory": "Xoay khối là bài kiểm tra tư duy không gian thật sự: khi hộp xoay, mặt hướng về người xem thu hẹp dần và mặt bên mở rộng ra, tổng chiều rộng thay đổi theo quy luật. Trục xoay phải được giữ cố định trong cả dãy hình để người xem đọc được chuyển động. Vẽ dãy xoay giúp bạn vẽ được vật thể ở góc bất kỳ thay vì chỉ chép được góc có mẫu. Hãy bắt đầu từ hộp, khối có cạnh thẳng dễ kiểm tra nhất khi xoay.",
    "steps": [
     "Kẻ trục xoay dọc cố định và hàng khung cho 3 vị trí",
     "Vẽ hộp ở góc chính diện làm mốc",
     "Xoay hộp 30 độ, thu hẹp mặt trước, mở mặt bên tương ứng",
     "Xoay tiếp tới 60 độ và kiểm tra cạnh khuất bằng đường xuyên"
    ],
    "demo": {
     "kind": "cube",
     "note": "Trình diễn trực quan cho bài 'Xoay khối trong không gian': bắt đầu từ bước 'Kẻ trục xoay dọc cố định và hàng khung cho 3 vị trí', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ dãy 3 khối hộp là cùng một hộp xoay quanh trục dọc ở 0, 30 và 60 độ, giữ trục xoay và chiều cao nhất quán.",
     "mode": "independent",
     "assessType": "form",
     "target": {}
    },
    "rubric": [
     {
      "id": "structure",
      "name": "Cấu trúc khối",
      "weight": 35,
      "method": "hybrid",
      "desc": "Khối được dựng từ hình cơ bản đúng trục và đúng quan hệ các mặt."
     },
     {
      "id": "axis",
      "name": "Trục và hướng khối",
      "weight": 25,
      "method": "geometry",
      "desc": "Trục chính, hướng xoay và độ nghiêng của khối khớp với mẫu."
     },
     {
      "id": "space",
      "name": "Tính nhất quán không gian",
      "weight": 25,
      "method": "hybrid",
      "desc": "Các khối con nằm đúng vị trí, không mâu thuẫn về chiều sâu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số khối và các bước dựng hình theo yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Các khối con không gắn được vào khối chính",
      "cause": "Vẽ từng khối rời rạc, không dùng đường gióng chung.",
      "fix": "Dựng khối bao tổng thể trước, chia vị trí khối con bằng đường gióng từ khối chính."
     },
     {
      "error": "Đường xuyên khối (cross-contour) sai hướng",
      "cause": "Vẽ đường cong trang trí thay vì bám theo bề mặt khối.",
      "fix": "Cho đường cross-contour ôm quanh trục, đổi hướng đúng tại cạnh của khối."
     },
     {
      "error": "Khối bị xẹp, không có chiều sâu",
      "cause": "Các mặt bên bị thu hẹp vì không xác định trục và hướng xoay trước.",
      "fix": "Kẻ trục chính, vẽ mặt trước rồi mới kéo chiều sâu theo một hướng thống nhất."
     }
    ],
    "passScore": 70
   }
  ]
 },
 {
  "id": "m04",
  "code": "04",
  "title": "Perspective",
  "description": "Đường chân trời, điểm tụ và phối cảnh 1, 2, 3 điểm tụ; rút ngắn thị giác và vật thể trong không gian.",
  "track": null,
  "lessons": [
   {
    "id": "m04-l01",
    "title": "Đường chân trời và điểm tụ",
    "summary": "Xác định đường chân trời theo tầm mắt và hiểu vai trò của điểm tụ trên đó.",
    "objectives": [
     "Đặt được đường chân trời đúng cao độ tầm mắt trong 3 tình huống cho sẵn",
     "Giải thích được vì sao mọi điểm tụ của cạnh ngang nằm trên đường chân trời",
     "Vẽ được 5 đường thẳng hội tụ về một điểm tụ với sai lệch tại điểm tụ dưới 10mm"
    ],
    "difficulty": 2,
    "minutes": 40,
    "skills": [
     "perspective",
     "form-construction"
    ],
    "prereqLessons": [
     "m03-l05"
    ],
    "theory": "Đường chân trời trong bản vẽ là hình chiếu của cao độ tầm mắt người nhìn, không phải đường biên của mặt đất trong khung cảnh. Mọi đường thẳng nằm ngang trong không gian, khi kéo dài, đều hội tụ về một điểm trên đường chân trời gọi là điểm tụ. Vật nằm trên đường chân trời thì ngang tầm mắt, vật dưới nó thì nhìn từ trên xuống, vật trên nó thì nhìn từ dưới lên. Chỉ cần đặt sai đường chân trời, toàn bộ không gian của bức vẽ sẽ sai theo.",
    "steps": [
     "Vẽ đường chân trời ở giữa trang, đánh dấu một điểm tụ",
     "Từ điểm tụ, kéo 5 đường gióng tỏa xuống vùng dưới",
     "Đặt 3 khối hộp dọc theo các đường gióng, khối xa nhỏ hơn",
     "Vẽ lại cảnh với đường chân trời thấp và so sánh cảm giác tầm mắt"
    ],
    "demo": {
     "kind": "horizon",
     "note": "Trình diễn trực quan cho bài 'Đường chân trời và điểm tụ': bắt đầu từ bước 'Vẽ đường chân trời ở giữa trang, đánh dấu một điểm tụ', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ một mặt đất dạng lưới phối cảnh với đường chân trời và một điểm tụ cho sẵn, đặt 3 khối hộp kích thước giảm dần theo chiều sâu trên lưới đó.",
     "mode": "guided",
     "assessType": "perspective",
     "target": {
      "horizon": 350,
      "vp": {
       "x": 500,
       "y": 350
      }
     }
    },
    "rubric": [
     {
      "id": "converge",
      "name": "Hội tụ về điểm tụ",
      "weight": 35,
      "method": "geometry",
      "desc": "Các cạnh song song trong không gian hội tụ đúng về điểm tụ."
     },
     {
      "id": "horizon",
      "name": "Đường chân trời và điểm tụ",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí đường chân trời và điểm tụ đúng với thiết lập của bài."
     },
     {
      "id": "structure",
      "name": "Cấu trúc vật thể",
      "weight": 30,
      "method": "hybrid",
      "desc": "Vật thể giữ đúng tỷ lệ và cấu trúc khi đặt trong phối cảnh."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ các vật thể và đường gióng phối cảnh yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Cạnh không hội tụ về cùng một điểm tụ",
      "cause": "Mỗi cạnh được vẽ theo cảm giác riêng, không gióng về điểm tụ.",
      "fix": "Kéo dài mọi cạnh thuộc cùng nhóm song song và kiểm tra chúng gặp nhau tại điểm tụ."
     },
     {
      "error": "Đường chân trời đặt sai so với tầm mắt",
      "cause": "Đặt đường chân trời theo vị trí thuận tay thay vì theo cao độ mắt trong bài.",
      "fix": "Xác định tầm mắt trước, mọi điểm tụ của cạnh ngang phải nằm trên đường này."
     },
     {
      "error": "Vật ở xa lại to bằng vật ở gần",
      "cause": "Không thu nhỏ kích thước theo khoảng cách.",
      "fix": "Dùng hai đường gióng từ điểm tụ để khóa chiều cao của vật ở từng vị trí sâu."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m04-l02",
    "title": "Phối cảnh một điểm tụ",
    "summary": "Dựng phòng và vật thể với mọi cạnh sâu hội tụ về một điểm tụ duy nhất.",
    "objectives": [
     "Dựng được một căn phòng 1 điểm tụ có cửa, cửa sổ và sàn nhất quán",
     "Mọi cạnh sâu trong bài hội tụ về điểm tụ trong sai số 10mm khi kéo dài",
     "Đặt được một khối hộp tại 3 vị trí sâu khác nhau trong phòng"
    ],
    "difficulty": 2,
    "minutes": 50,
    "skills": [
     "perspective"
    ],
    "prereqLessons": [
     "m04-l01"
    ],
    "theory": "Phối cảnh một điểm tụ áp dụng khi một mặt của vật song song với mặt tranh: mặt đó giữ nguyên hình dạng thật, còn mọi cạnh vuông góc với mặt tranh đều hướng về điểm tụ duy nhất. Đây là hệ phối cảnh dễ kiểm tra nhất vì chỉ có một điểm hội tụ để đối chiếu. Nội thất phòng, hành lang và đường thẳng nhìn trực diện là các chủ đề kinh điển của một điểm tụ. Khi một cạnh sâu nào không hướng về điểm tụ, vật thể đó sẽ trông như thuộc về một không gian khác.",
    "steps": [
     "Vẽ đường chân trời và điểm tụ giữa trang",
     "Dựng hình chữ nhật mặt sau của phòng",
     "Nối 4 góc của nó về điểm tụ để tạo tường, trần, sàn",
     "Thêm cửa và khối hộp trong phòng bằng đường gióng từ điểm tụ"
    ],
    "demo": {
     "kind": "horizon",
     "note": "Trình diễn trực quan cho bài 'Phối cảnh một điểm tụ': bắt đầu từ bước 'Vẽ đường chân trời và điểm tụ giữa trang', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng nội thất một căn phòng theo phối cảnh một điểm tụ (điểm tụ cho sẵn) gồm sàn, một cửa mở và một khối bàn, mọi cạnh sâu phải gióng về điểm tụ.",
     "mode": "assisted",
     "assessType": "perspective",
     "target": {
      "horizon": 400,
      "vp": {
       "x": 500,
       "y": 400
      }
     }
    },
    "rubric": [
     {
      "id": "converge",
      "name": "Hội tụ về điểm tụ",
      "weight": 35,
      "method": "geometry",
      "desc": "Các cạnh song song trong không gian hội tụ đúng về điểm tụ."
     },
     {
      "id": "horizon",
      "name": "Đường chân trời và điểm tụ",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí đường chân trời và điểm tụ đúng với thiết lập của bài."
     },
     {
      "id": "structure",
      "name": "Cấu trúc vật thể",
      "weight": 30,
      "method": "hybrid",
      "desc": "Vật thể giữ đúng tỷ lệ và cấu trúc khi đặt trong phối cảnh."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ các vật thể và đường gióng phối cảnh yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Đường chân trời đặt sai so với tầm mắt",
      "cause": "Đặt đường chân trời theo vị trí thuận tay thay vì theo cao độ mắt trong bài.",
      "fix": "Xác định tầm mắt trước, mọi điểm tụ của cạnh ngang phải nằm trên đường này."
     },
     {
      "error": "Vật ở xa lại to bằng vật ở gần",
      "cause": "Không thu nhỏ kích thước theo khoảng cách.",
      "fix": "Dùng hai đường gióng từ điểm tụ để khóa chiều cao của vật ở từng vị trí sâu."
     },
     {
      "error": "Cạnh không hội tụ về cùng một điểm tụ",
      "cause": "Mỗi cạnh được vẽ theo cảm giác riêng, không gióng về điểm tụ.",
      "fix": "Kéo dài mọi cạnh thuộc cùng nhóm song song và kiểm tra chúng gặp nhau tại điểm tụ."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m04-l03",
    "title": "Phối cảnh hai điểm tụ",
    "summary": "Dựng khối hộp và nhà với hai nhóm cạnh hội tụ về hai điểm tụ trên cùng đường chân trời.",
    "objectives": [
     "Dựng được khối hộp 2 điểm tụ có cạnh đứng thẳng đứng tuyệt đối",
     "Hai nhóm cạnh hội tụ đúng về hai điểm tụ tương ứng, kiểm tra bằng kéo dài cạnh",
     "Đặt được 2 khối hộp khác kích thước trong cùng một hệ 2 điểm tụ"
    ],
    "difficulty": 3,
    "minutes": 50,
    "skills": [
     "perspective"
    ],
    "prereqLessons": [
     "m04-l02"
    ],
    "theory": "Khi vật xoay một góc so với mặt tranh, cả hai nhóm cạnh ngang của nó đều nghiêng và hội tụ về hai điểm tụ riêng, cả hai đều nằm trên đường chân trời. Cạnh đứng vẫn thẳng đứng trong phối cảnh hai điểm tụ thông thường. Điểm tụ đặt càng xa nhau, vật càng ít méo; đặt quá gần sẽ làm khối bị biến dạng như qua ống kính mắt cá. Góc hộp hướng về người xem (cạnh đứng gần nhất) là mốc bắt đầu dựng đáng tin cậy nhất.",
    "steps": [
     "Vẽ đường chân trời cao, đánh dấu hai điểm tụ ở hai đầu",
     "Dựng cạnh đứng gần nhất của khối hộp",
     "Từ hai đầu cạnh đứng, gióng các cạnh về hai điểm tụ",
     "Hoàn thiện hộp và thêm một hộp nhỏ hơn trong cùng hệ gióng"
    ],
    "demo": {
     "kind": "horizon",
     "note": "Trình diễn trực quan cho bài 'Phối cảnh hai điểm tụ': bắt đầu từ bước 'Vẽ đường chân trời cao, đánh dấu hai điểm tụ ở hai đầu', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng hai khối hộp (một lớn, một nhỏ) trong cùng hệ phối cảnh hai điểm tụ với hai điểm tụ cho sẵn trên đường chân trời.",
     "mode": "assisted",
     "assessType": "perspective",
     "target": {
      "horizon": 300,
      "vp1": {
       "x": 80,
       "y": 300
      },
      "vp2": {
       "x": 920,
       "y": 300
      }
     }
    },
    "rubric": [
     {
      "id": "converge",
      "name": "Hội tụ về điểm tụ",
      "weight": 35,
      "method": "geometry",
      "desc": "Các cạnh song song trong không gian hội tụ đúng về điểm tụ."
     },
     {
      "id": "horizon",
      "name": "Đường chân trời và điểm tụ",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí đường chân trời và điểm tụ đúng với thiết lập của bài."
     },
     {
      "id": "structure",
      "name": "Cấu trúc vật thể",
      "weight": 30,
      "method": "hybrid",
      "desc": "Vật thể giữ đúng tỷ lệ và cấu trúc khi đặt trong phối cảnh."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ các vật thể và đường gióng phối cảnh yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Vật ở xa lại to bằng vật ở gần",
      "cause": "Không thu nhỏ kích thước theo khoảng cách.",
      "fix": "Dùng hai đường gióng từ điểm tụ để khóa chiều cao của vật ở từng vị trí sâu."
     },
     {
      "error": "Cạnh không hội tụ về cùng một điểm tụ",
      "cause": "Mỗi cạnh được vẽ theo cảm giác riêng, không gióng về điểm tụ.",
      "fix": "Kéo dài mọi cạnh thuộc cùng nhóm song song và kiểm tra chúng gặp nhau tại điểm tụ."
     },
     {
      "error": "Đường chân trời đặt sai so với tầm mắt",
      "cause": "Đặt đường chân trời theo vị trí thuận tay thay vì theo cao độ mắt trong bài.",
      "fix": "Xác định tầm mắt trước, mọi điểm tụ của cạnh ngang phải nằm trên đường này."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m04-l04",
    "title": "Phối cảnh ba điểm tụ và rút ngắn thị giác",
    "summary": "Nhìn lên/nhìn xuống với điểm tụ thứ ba và hiện tượng foreshortening khi bề mặt hướng thẳng vào mắt.",
    "objectives": [
     "Dựng được một tòa nhà nhìn từ dưới lên với cạnh đứng hội tụ về điểm tụ thứ ba",
     "Nhận biết được bề mặt bị rút ngắn trong 3 ví dụ mẫu",
     "Vẽ được một cánh tay hướng về phía người xem với các đoạn rút ngắn hợp lý"
    ],
    "difficulty": 4,
    "minutes": 55,
    "skills": [
     "perspective",
     "form-construction"
    ],
    "prereqLessons": [
     "m04-l03"
    ],
    "theory": "Khi nhìn lên cao hoặc nhìn xuống sâu, cả cạnh đứng cũng hội tụ, tạo điểm tụ thứ ba nằm ngoài khung hình theo chiều dọc. Rút ngắn thị giác (foreshortening) xảy ra khi một bề mặt hay bộ phận hướng thẳng về phía mắt: chiều dài của nó bị nén mạnh trong hình chiếu dù kích thước thật không đổi. Đây là lý do bàn tay chìa về phía máy ảnh trông rất to còn cánh tay gần như biến mất. Vẽ rút ngắn đúng đòi hỏi tin vào hình chiếu đã đo hơn là kiến thức về độ dài thật.",
    "steps": [
     "Vẽ đường chân trời thấp và hai điểm tụ ngang",
     "Đánh dấu điểm tụ thứ ba phía trên khung hình",
     "Dựng tòa nhà với cạnh đứng nghiêng dần về điểm tụ ba",
     "Vẽ thêm một hình trụ hướng thẳng về phía mắt, đầu gần to hơn hẳn đầu xa"
    ],
    "demo": {
     "kind": "horizon",
     "note": "Trình diễn trực quan cho bài 'Phối cảnh ba điểm tụ và rút ngắn thị giác': bắt đầu từ bước 'Vẽ đường chân trời thấp và hai điểm tụ ngang', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng một tòa nhà cao nhìn từ dưới lên theo phối cảnh ba điểm tụ (các điểm tụ cho sẵn) kèm một cột trụ rút ngắn hướng về người xem.",
     "mode": "assisted",
     "assessType": "perspective",
     "target": {
      "horizon": 750,
      "vp1": {
       "x": 60,
       "y": 750
      },
      "vp2": {
       "x": 940,
       "y": 750
      },
      "vp3": {
       "x": 500,
       "y": 40
      }
     }
    },
    "rubric": [
     {
      "id": "converge",
      "name": "Hội tụ về điểm tụ",
      "weight": 35,
      "method": "geometry",
      "desc": "Các cạnh song song trong không gian hội tụ đúng về điểm tụ."
     },
     {
      "id": "horizon",
      "name": "Đường chân trời và điểm tụ",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí đường chân trời và điểm tụ đúng với thiết lập của bài."
     },
     {
      "id": "structure",
      "name": "Cấu trúc vật thể",
      "weight": 30,
      "method": "hybrid",
      "desc": "Vật thể giữ đúng tỷ lệ và cấu trúc khi đặt trong phối cảnh."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ các vật thể và đường gióng phối cảnh yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Cạnh không hội tụ về cùng một điểm tụ",
      "cause": "Mỗi cạnh được vẽ theo cảm giác riêng, không gióng về điểm tụ.",
      "fix": "Kéo dài mọi cạnh thuộc cùng nhóm song song và kiểm tra chúng gặp nhau tại điểm tụ."
     },
     {
      "error": "Đường chân trời đặt sai so với tầm mắt",
      "cause": "Đặt đường chân trời theo vị trí thuận tay thay vì theo cao độ mắt trong bài.",
      "fix": "Xác định tầm mắt trước, mọi điểm tụ của cạnh ngang phải nằm trên đường này."
     },
     {
      "error": "Vật ở xa lại to bằng vật ở gần",
      "cause": "Không thu nhỏ kích thước theo khoảng cách.",
      "fix": "Dùng hai đường gióng từ điểm tụ để khóa chiều cao của vật ở từng vị trí sâu."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m04-l05",
    "title": "Vật thể trong không gian và phối cảnh ứng dụng",
    "summary": "Đặt nhiều vật thể lên cùng mặt đất, chia khoảng sâu và dựng cầu thang, đường dốc.",
    "objectives": [
     "Đặt được 5 vật thể trên cùng mặt đất với đường chân tiếp đất nhất quán",
     "Chia được một đoạn sâu thành 3 phần bằng nhau bằng đường chéo phối cảnh",
     "Dựng được cầu thang 4 bậc trong phối cảnh một điểm tụ"
    ],
    "difficulty": 3,
    "minutes": 55,
    "skills": [
     "perspective",
     "proportion"
    ],
    "prereqLessons": [
     "m04-l04"
    ],
    "theory": "Nhiều bài phối cảnh sai không phải ở từng vật mà ở quan hệ giữa các vật: vật nào cũng đúng riêng lẻ nhưng không đứng chung một mặt đất. Điểm tiếp đất của mọi vật phải tuân theo cùng lưới sàn và đường chân trời. Chia khoảng sâu dùng đường chéo của hình chữ nhật phối cảnh để nhân đôi khoảng cách một cách chính xác. Cầu thang là bài tổng hợp tốt vì mỗi bậc vừa là khối hộp vừa phải tuân theo đường dốc chung gióng về điểm tụ.",
    "steps": [
     "Vẽ lưới sàn phối cảnh một điểm tụ",
     "Đặt 3 khối hộp tại các ô lưới khác nhau, kiểm tra điểm tiếp đất",
     "Dùng đường chéo chia một khoảng sâu thành các phần bằng nhau",
     "Dựng cầu thang 4 bậc dọc theo một đường gióng của lưới"
    ],
    "demo": {
     "kind": "horizon",
     "note": "Trình diễn trực quan cho bài 'Vật thể trong không gian và phối cảnh ứng dụng': bắt đầu từ bước 'Vẽ lưới sàn phối cảnh một điểm tụ', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng cảnh gồm cầu thang 4 bậc và 3 khối hộp đặt trên cùng mặt đất phối cảnh một điểm tụ, các khoảng sâu chia bằng đường chéo.",
     "mode": "independent",
     "assessType": "perspective",
     "target": {
      "horizon": 380,
      "vp": {
       "x": 520,
       "y": 380
      }
     }
    },
    "rubric": [
     {
      "id": "converge",
      "name": "Hội tụ về điểm tụ",
      "weight": 35,
      "method": "geometry",
      "desc": "Các cạnh song song trong không gian hội tụ đúng về điểm tụ."
     },
     {
      "id": "horizon",
      "name": "Đường chân trời và điểm tụ",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí đường chân trời và điểm tụ đúng với thiết lập của bài."
     },
     {
      "id": "structure",
      "name": "Cấu trúc vật thể",
      "weight": 30,
      "method": "hybrid",
      "desc": "Vật thể giữ đúng tỷ lệ và cấu trúc khi đặt trong phối cảnh."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ các vật thể và đường gióng phối cảnh yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Đường chân trời đặt sai so với tầm mắt",
      "cause": "Đặt đường chân trời theo vị trí thuận tay thay vì theo cao độ mắt trong bài.",
      "fix": "Xác định tầm mắt trước, mọi điểm tụ của cạnh ngang phải nằm trên đường này."
     },
     {
      "error": "Vật ở xa lại to bằng vật ở gần",
      "cause": "Không thu nhỏ kích thước theo khoảng cách.",
      "fix": "Dùng hai đường gióng từ điểm tụ để khóa chiều cao của vật ở từng vị trí sâu."
     },
     {
      "error": "Cạnh không hội tụ về cùng một điểm tụ",
      "cause": "Mỗi cạnh được vẽ theo cảm giác riêng, không gióng về điểm tụ.",
      "fix": "Kéo dài mọi cạnh thuộc cùng nhóm song song và kiểm tra chúng gặp nhau tại điểm tụ."
     }
    ],
    "passScore": 70
   }
  ]
 },
 {
  "id": "m05",
  "code": "05",
  "title": "Observation Drawing",
  "description": "Vẽ theo quan sát: đo tỷ lệ bằng mắt, so sánh góc, không gian âm và tĩnh vật từ đồ vật thật.",
  "track": null,
  "lessons": [
   {
    "id": "m05-l01",
    "title": "Đo tỷ lệ bằng bút chì và bằng mắt",
    "summary": "Kỹ thuật giơ bút đo tỷ lệ trực tiếp trên mẫu và chuyển số đo sang giấy.",
    "objectives": [
     "Đo được 5 quan hệ kích thước của một vật thể bằng phương pháp giơ bút",
     "Chuyển số đo sang giấy với sai lệch tổng thể dưới 10%",
     "Tự kiểm tra lại bản vẽ bằng chính số đo đã ghi"
    ],
    "difficulty": 2,
    "minutes": 45,
    "skills": [
     "observation",
     "proportion"
    ],
    "prereqLessons": [
     "m04-l05"
    ],
    "theory": "Đo bằng bút chì là cách biến mắt thành thước đo: giơ thẳng tay, dùng đầu bút và ngón tay cái khóa một đoạn trên mẫu, rồi đếm mọi kích thước khác theo đoạn đó. Điều kiện bắt buộc là tay luôn duỗi thẳng hết cỡ, nếu không mỗi lần đo một khác. Số đo phải được ghi ra thay vì nhớ trong đầu, vì trí nhớ về tỷ lệ rất dễ bị kiến thức về vật thể lấn át. Đo trước, vẽ sau, đo lại để sửa là chu trình của mọi bài quan sát nghiêm túc.",
    "steps": [
     "Duỗi thẳng tay, khóa đoạn chuẩn bằng đầu bút và ngón cái",
     "Đo chiều cao, chiều rộng và 3 bộ phận của vật mẫu, ghi số đo",
     "Dựng khung và các mốc trên giấy theo số đo đã ghi",
     "Vẽ đường bao rồi đo lại trên mẫu để sửa điểm lệch nhất"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Đo tỷ lệ bằng bút chì và bằng mắt': bắt đầu từ bước 'Duỗi thẳng tay, khóa đoạn chuẩn bằng đầu bút và ngón cái', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ một chiếc ấm hoặc bình hoa theo phương pháp đo bằng bút: nộp bản vẽ kèm bảng số đo 5 quan hệ kích thước đã ghi trong quá trình vẽ.",
     "mode": "guided",
     "assessType": "shape",
     "target": {
      "x": 300,
      "y": 100,
      "w": 400,
      "h": 800
     }
    },
    "rubric": [
     {
      "id": "shape",
      "name": "Độ chính xác hình dạng",
      "weight": 35,
      "method": "geometry",
      "desc": "Độ khớp của đường bao với hình mẫu."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ các phần",
      "weight": 30,
      "method": "geometry",
      "desc": "Quan hệ chiều rộng, chiều cao và kích thước tương đối."
     },
     {
      "id": "align",
      "name": "Căn chỉnh và đối xứng",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí các mốc, trục đối xứng và độ thẳng hàng."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đầy đủ các chi tiết cấu trúc mà đề bài yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Hình đúng nét nhưng sai tỷ lệ tổng thể",
      "cause": "Vẽ chi tiết từng cạnh mà không khóa khung bao ngoài trước.",
      "fix": "Dựng khung bao (bounding box) và chia tỷ lệ khung trước khi vẽ đường bao."
     },
     {
      "error": "Đối xứng hai bên bị lệch",
      "cause": "Vẽ hoàn thiện một bên rồi đoán bên còn lại.",
      "fix": "Kẻ trục đối xứng, đánh dấu các cặp điểm ngang nhau rồi mới nối."
     },
     {
      "error": "Không gian âm bị bỏ qua",
      "cause": "Chỉ nhìn vật thể, không nhìn hình của khoảng trống xung quanh.",
      "fix": "Vẽ thêm hình của khoảng trống giữa các bộ phận và đối chiếu với mẫu."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m05-l02",
    "title": "Vẽ đường bao mù và đường bao chậm",
    "summary": "Luyện mắt-tay bằng contour mù (không nhìn giấy) và contour chậm có kiểm soát.",
    "objectives": [
     "Hoàn thành 2 bản contour mù của bàn tay, mỗi bản 10 phút không nhìn giấy",
     "Vẽ được contour chậm của một vật có đường bao phức tạp, khớp mẫu ở các mốc chính",
     "Mô tả được điểm khác biệt lớn nhất giữa hai phương pháp"
    ],
    "difficulty": 2,
    "minutes": 40,
    "skills": [
     "observation",
     "line-control"
    ],
    "prereqLessons": [
     "m05-l01"
    ],
    "theory": "Contour mù buộc mắt di chuyển chậm dọc theo đường bao thật của vật trong khi tay ghi lại cùng tốc độ mà không nhìn giấy; bản vẽ sẽ méo nhưng khả năng quan sát tăng rất nhanh. Contour chậm giữ nguyên kỷ luật di chuyển của mắt nhưng cho phép nhìn giấy để hiệu chỉnh vị trí. Cả hai đều chống lại thói quen vẽ ký hiệu: vẽ cái tai, cái lá theo mẫu có sẵn trong đầu thay vì đường biên thật trước mắt. Tốc độ của mắt và tay phải bằng nhau, đó là nguyên tắc duy nhất cần giữ.",
    "steps": [
     "Đặt bàn tay ở tư thế xòe, cố định không di chuyển",
     "Nhìn dọc đường bao của tay, vẽ contour mù 10 phút không nhìn giấy",
     "Đổi sang vật có đường bao phức tạp, vẽ contour chậm có nhìn giấy",
     "Khoanh vùng đoạn đường bao khớp mẫu nhất và đoạn lệch nhất"
    ],
    "demo": {
     "kind": "line",
     "note": "Trình diễn trực quan cho bài 'Vẽ đường bao mù và đường bao chậm': bắt đầu từ bước 'Đặt bàn tay ở tư thế xòe, cố định không di chuyển', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Nộp một bản contour chậm của một vật có đường bao phức tạp (kéo, cây nhỏ, giày) vẽ trong tối thiểu 15 phút liền mạch.",
     "mode": "assisted",
     "assessType": "shape",
     "target": {}
    },
    "rubric": [
     {
      "id": "shape",
      "name": "Độ chính xác hình dạng",
      "weight": 35,
      "method": "geometry",
      "desc": "Độ khớp của đường bao với hình mẫu."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ các phần",
      "weight": 30,
      "method": "geometry",
      "desc": "Quan hệ chiều rộng, chiều cao và kích thước tương đối."
     },
     {
      "id": "align",
      "name": "Căn chỉnh và đối xứng",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí các mốc, trục đối xứng và độ thẳng hàng."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đầy đủ các chi tiết cấu trúc mà đề bài yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Đối xứng hai bên bị lệch",
      "cause": "Vẽ hoàn thiện một bên rồi đoán bên còn lại.",
      "fix": "Kẻ trục đối xứng, đánh dấu các cặp điểm ngang nhau rồi mới nối."
     },
     {
      "error": "Không gian âm bị bỏ qua",
      "cause": "Chỉ nhìn vật thể, không nhìn hình của khoảng trống xung quanh.",
      "fix": "Vẽ thêm hình của khoảng trống giữa các bộ phận và đối chiếu với mẫu."
     },
     {
      "error": "Hình đúng nét nhưng sai tỷ lệ tổng thể",
      "cause": "Vẽ chi tiết từng cạnh mà không khóa khung bao ngoài trước.",
      "fix": "Dựng khung bao (bounding box) và chia tỷ lệ khung trước khi vẽ đường bao."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m05-l03",
    "title": "Tĩnh vật chai lọ và đồ vật trong nhà",
    "summary": "Dựng nhóm tĩnh vật gồm chai, lọ, hộp với quan hệ tỷ lệ và chồng lấp giữa các vật.",
    "objectives": [
     "Dựng được nhóm 3 vật thể với tỷ lệ chiều cao giữa các vật sai lệch dưới 10%",
     "Thể hiện đúng vật nào đứng trước qua đường chồng lấp",
     "Giữ các ellipse miệng chai cùng một cao độ tầm mắt nhất quán"
    ],
    "difficulty": 3,
    "minutes": 55,
    "skills": [
     "observation",
     "form-construction"
    ],
    "prereqLessons": [
     "m05-l02"
    ],
    "theory": "Tĩnh vật chai lọ là bài kiểm tra tổng hợp của quan sát: mỗi vật có trục đối xứng riêng nhưng tất cả chia sẻ cùng tầm mắt và mặt bàn. Miệng chai là ellipse mà độ mở của nó phụ thuộc vào cao độ mắt so với miệng chai, nên các chai ở cùng độ cao phải có ellipse tương tự nhau. Vật đứng trước cắt đường bao của vật đứng sau tại điểm chồng lấp, và điểm cắt đó phải được vẽ dứt khoát. Hãy dựng trục đối xứng của từng chai trước khi vẽ đường bao hai bên.",
    "steps": [
     "Bày 3 vật (chai cao, lọ thấp, hộp) chồng lấp nhẹ",
     "Dựng khung bao chung và đường mặt bàn",
     "Kẻ trục đối xứng từng vật, dựng đường bao theo trục",
     "Vẽ ellipse miệng các chai theo cùng tầm mắt, thêm điểm chồng lấp"
    ],
    "demo": {
     "kind": "cylinder",
     "note": "Trình diễn trực quan cho bài 'Tĩnh vật chai lọ và đồ vật trong nhà': bắt đầu từ bước 'Bày 3 vật (chai cao, lọ thấp, hộp) chồng lấp nhẹ', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ tĩnh vật 3 vật thể gồm một chai cao, một lọ thấp và một hộp có chồng lấp, nộp bản dựng có giữ trục đối xứng của từng vật.",
     "mode": "assisted",
     "assessType": "shape",
     "target": {
      "x": 200,
      "y": 80,
      "w": 600,
      "h": 820
     }
    },
    "rubric": [
     {
      "id": "shape",
      "name": "Độ chính xác hình dạng",
      "weight": 35,
      "method": "geometry",
      "desc": "Độ khớp của đường bao với hình mẫu."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ các phần",
      "weight": 30,
      "method": "geometry",
      "desc": "Quan hệ chiều rộng, chiều cao và kích thước tương đối."
     },
     {
      "id": "align",
      "name": "Căn chỉnh và đối xứng",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí các mốc, trục đối xứng và độ thẳng hàng."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đầy đủ các chi tiết cấu trúc mà đề bài yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Không gian âm bị bỏ qua",
      "cause": "Chỉ nhìn vật thể, không nhìn hình của khoảng trống xung quanh.",
      "fix": "Vẽ thêm hình của khoảng trống giữa các bộ phận và đối chiếu với mẫu."
     },
     {
      "error": "Hình đúng nét nhưng sai tỷ lệ tổng thể",
      "cause": "Vẽ chi tiết từng cạnh mà không khóa khung bao ngoài trước.",
      "fix": "Dựng khung bao (bounding box) và chia tỷ lệ khung trước khi vẽ đường bao."
     },
     {
      "error": "Đối xứng hai bên bị lệch",
      "cause": "Vẽ hoàn thiện một bên rồi đoán bên còn lại.",
      "fix": "Kẻ trục đối xứng, đánh dấu các cặp điểm ngang nhau rồi mới nối."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m05-l04",
    "title": "Vẽ hoa quả và vật hữu cơ",
    "summary": "Dựng các vật có hình dạng hữu cơ không đối xứng hoàn hảo: trái cây, rau củ, hoa lá.",
    "objectives": [
     "Dựng được 3 loại quả khác nhau về cấu trúc (tròn, dài, có múi)",
     "Thể hiện được điểm bất đối xứng đặc trưng của từng quả thay vì vẽ quả lý tưởng",
     "Vẽ được cuống và điểm lõm đúng vị trí quan sát"
    ],
    "difficulty": 3,
    "minutes": 50,
    "skills": [
     "observation",
     "shape-accuracy"
    ],
    "prereqLessons": [
     "m05-l03"
    ],
    "theory": "Vật hữu cơ không tuân theo hình học hoàn hảo: quả táo thật hơi lệch, quả chuối cong theo nhịp riêng, và chính sự bất đối xứng đó làm bài vẽ có sức sống. Cách dựng đúng là bắt đầu từ khối cơ bản gần nhất (cầu, trụ cong) rồi sửa đường bao theo quan sát cụ thể của vật mẫu trước mắt. Các mốc nhỏ như cuống, mắt quả, điểm lõm phải đặt theo vị trí đo được chứ không đặt giữa theo thói quen. Vẽ quả lý tưởng trong đầu thay vì quả thật trên bàn là lỗi cần tránh nhất ở bài này.",
    "steps": [
     "Chọn 3 quả có cấu trúc khác nhau, bày thành nhóm",
     "Dựng khối cơ bản cho từng quả (cầu, trụ cong, nón)",
     "Sửa đường bao theo bất đối xứng quan sát được",
     "Đặt cuống, điểm lõm và các mốc bề mặt theo vị trí thật"
    ],
    "demo": {
     "kind": "sphere",
     "note": "Trình diễn trực quan cho bài 'Vẽ hoa quả và vật hữu cơ': bắt đầu từ bước 'Chọn 3 quả có cấu trúc khác nhau, bày thành nhóm', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ nhóm 3 loại quả khác nhau cấu trúc bày trên bàn, yêu cầu thể hiện rõ bất đối xứng tự nhiên của từng quả.",
     "mode": "assisted",
     "assessType": "shape",
     "target": {}
    },
    "rubric": [
     {
      "id": "shape",
      "name": "Độ chính xác hình dạng",
      "weight": 35,
      "method": "geometry",
      "desc": "Độ khớp của đường bao với hình mẫu."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ các phần",
      "weight": 30,
      "method": "geometry",
      "desc": "Quan hệ chiều rộng, chiều cao và kích thước tương đối."
     },
     {
      "id": "align",
      "name": "Căn chỉnh và đối xứng",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí các mốc, trục đối xứng và độ thẳng hàng."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đầy đủ các chi tiết cấu trúc mà đề bài yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Hình đúng nét nhưng sai tỷ lệ tổng thể",
      "cause": "Vẽ chi tiết từng cạnh mà không khóa khung bao ngoài trước.",
      "fix": "Dựng khung bao (bounding box) và chia tỷ lệ khung trước khi vẽ đường bao."
     },
     {
      "error": "Đối xứng hai bên bị lệch",
      "cause": "Vẽ hoàn thiện một bên rồi đoán bên còn lại.",
      "fix": "Kẻ trục đối xứng, đánh dấu các cặp điểm ngang nhau rồi mới nối."
     },
     {
      "error": "Không gian âm bị bỏ qua",
      "cause": "Chỉ nhìn vật thể, không nhìn hình của khoảng trống xung quanh.",
      "fix": "Vẽ thêm hình của khoảng trống giữa các bộ phận và đối chiếu với mẫu."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m05-l05",
    "title": "Kết hợp quan sát và cấu trúc: vẽ đồ nội thất",
    "summary": "Vẽ một món nội thất (ghế, bàn) bằng cách kết hợp dựng khối với đo quan sát.",
    "objectives": [
     "Dựng được một chiếc ghế đúng cấu trúc khối và đúng tỷ lệ quan sát đồng thời",
     "Các chân ghế tiếp đất trên cùng một mặt phẳng",
     "Phát hiện và sửa được một lỗi phối cảnh của ghế bằng đường gióng chân trời"
    ],
    "difficulty": 3,
    "minutes": 55,
    "skills": [
     "observation",
     "perspective",
     "form-construction"
    ],
    "prereqLessons": [
     "m05-l04"
    ],
    "theory": "Đồ nội thất là nơi quan sát và cấu trúc gặp nhau: ghế vừa là tổ hợp khối hộp có phối cảnh, vừa có tỷ lệ riêng phải đo từ mẫu thật. Chỉ dựng khối theo lý thuyết sẽ ra chiếc ghế chung chung, chỉ chép quan sát sẽ dễ sai phối cảnh ở chân và mặt ngồi. Quy trình đúng là dựng khung khối phối cảnh trước, sau đó dùng số đo quan sát để hiệu chỉnh tỷ lệ từng bộ phận trong khung đó. Bốn chân ghế phải đứng trên cùng một mặt đất, kiểm tra bằng lưới sàn phối cảnh.",
    "steps": [
     "Chọn một chiếc ghế thật, xác định hướng nhìn và đường chân trời",
     "Dựng khung khối bao của ghế theo phối cảnh",
     "Đo tỷ lệ mặt ngồi, lưng ghế, chiều cao chân bằng phương pháp giơ bút",
     "Hiệu chỉnh khối theo số đo, kiểm tra 4 chân cùng mặt đất"
    ],
    "demo": {
     "kind": "cube",
     "note": "Trình diễn trực quan cho bài 'Kết hợp quan sát và cấu trúc: vẽ đồ nội thất': bắt đầu từ bước 'Chọn một chiếc ghế thật, xác định hướng nhìn và đường chân trời', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ một chiếc ghế thật theo hướng nhìn tùy chọn: nộp bản vẽ có lớp khung khối phối cảnh và ghi chú số đo tỷ lệ đã dùng để hiệu chỉnh.",
     "mode": "independent",
     "assessType": "form",
     "target": {}
    },
    "rubric": [
     {
      "id": "structure",
      "name": "Cấu trúc khối",
      "weight": 35,
      "method": "hybrid",
      "desc": "Khối được dựng từ hình cơ bản đúng trục và đúng quan hệ các mặt."
     },
     {
      "id": "axis",
      "name": "Trục và hướng khối",
      "weight": 25,
      "method": "geometry",
      "desc": "Trục chính, hướng xoay và độ nghiêng của khối khớp với mẫu."
     },
     {
      "id": "space",
      "name": "Tính nhất quán không gian",
      "weight": 25,
      "method": "hybrid",
      "desc": "Các khối con nằm đúng vị trí, không mâu thuẫn về chiều sâu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số khối và các bước dựng hình theo yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Các khối con không gắn được vào khối chính",
      "cause": "Vẽ từng khối rời rạc, không dùng đường gióng chung.",
      "fix": "Dựng khối bao tổng thể trước, chia vị trí khối con bằng đường gióng từ khối chính."
     },
     {
      "error": "Đường xuyên khối (cross-contour) sai hướng",
      "cause": "Vẽ đường cong trang trí thay vì bám theo bề mặt khối.",
      "fix": "Cho đường cross-contour ôm quanh trục, đổi hướng đúng tại cạnh của khối."
     },
     {
      "error": "Khối bị xẹp, không có chiều sâu",
      "cause": "Các mặt bên bị thu hẹp vì không xác định trục và hướng xoay trước.",
      "fix": "Kẻ trục chính, vẽ mặt trước rồi mới kéo chiều sâu theo một hướng thống nhất."
     }
    ],
    "passScore": 70
   }
  ]
 },
 {
  "id": "m06",
  "code": "06",
  "title": "Light & Shadow",
  "description": "Thang giá trị, hướng sáng, vùng sáng lõi, bóng đổ và diễn tả khối bằng sắc độ.",
  "track": null,
  "lessons": [
   {
    "id": "m06-l01",
    "title": "Thang giá trị 9 bậc",
    "summary": "Xây dựng và kiểm soát thang sắc độ từ trắng tới đen với các bậc cách đều nhau.",
    "objectives": [
     "Tạo được thang 9 bậc mà hai bậc kề nhau chênh lệch đều khi nheo mắt kiểm tra",
     "Nhận diện được bậc giá trị của 5 vùng cho sẵn trong tranh mẫu",
     "Giữ bậc sáng nhất không dùng trắng giấy hoàn toàn ở vùng giữa thang"
    ],
    "difficulty": 2,
    "minutes": 40,
    "skills": [
     "value-shading"
    ],
    "prereqLessons": [
     "m05-l05"
    ],
    "theory": "Thang giá trị là bảng chữ cái của diễn tả ánh sáng: mọi vùng sáng tối trên vật đều quy về một bậc trong thang. Bậc đều nghĩa là bước nhảy từ bậc 1 sang 2 tương đương bước nhảy từ bậc 7 sang 8, điều người mới thường làm sai ở vùng tối vì mắt kém phân biệt các bậc tối gần nhau. Nheo mắt khi kiểm tra giúp so sánh các bậc theo cảm giác tổng thể thay vì theo chi tiết. Nắm vững thang 9 bậc trước khi diễn tả vật thể giúp bài vẽ không bị rối sắc độ.",
    "steps": [
     "Kẻ hàng 9 ô liên tiếp trên giấy",
     "Tô ô cuối đậm nhất có thể bằng chì mềm, ô đầu để trắng",
     "Tô ô giữa ở mức xám trung bình làm mốc",
     "Điền các ô còn lại sao cho bước nhảy giữa các ô đều nhau, nheo mắt kiểm tra"
    ],
    "demo": {
     "kind": "value-scale",
     "note": "Trình diễn trực quan cho bài 'Thang giá trị 9 bậc': bắt đầu từ bước 'Kẻ hàng 9 ô liên tiếp trên giấy', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Nộp thang giá trị 9 bậc vẽ tay bằng chì, các bậc phải cách đều khi kiểm tra bằng cách nheo mắt và khi chụp ảnh chuyển xám.",
     "mode": "guided",
     "assessType": "value",
     "target": {
      "steps": 9
     }
    },
    "rubric": [
     {
      "id": "group",
      "name": "Phân nhóm sáng tối",
      "weight": 30,
      "method": "cv",
      "desc": "Các mảng sáng, trung gian và tối tách bạch, đúng số bậc yêu cầu."
     },
     {
      "id": "light",
      "name": "Nhất quán hướng sáng",
      "weight": 25,
      "method": "hybrid",
      "desc": "Mọi vùng bóng đều suy ra được từ cùng một nguồn sáng."
     },
     {
      "id": "transition",
      "name": "Chuyển sắc độ",
      "weight": 25,
      "method": "cv",
      "desc": "Chuyển bậc mượt hoặc đúng tính chất cứng/mềm theo yêu cầu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ vùng diễn tả và đúng đối tượng của bài."
     }
    ],
    "mistakes": [
     {
      "error": "Vùng tối và vùng trung gian lẫn vào nhau",
      "cause": "Tô theo cảm giác từng chỗ, không lập thang giá trị trước.",
      "fix": "Lập thang 5 bậc ở mép giấy, gán mỗi vùng một bậc rồi mới tô."
     },
     {
      "error": "Bóng đổ ngược hướng với bóng trên vật",
      "cause": "Vẽ bóng đổ sau cùng mà không suy ra từ nguồn sáng đã chọn.",
      "fix": "Vẽ mũi tên hướng sáng lên góc bài, mọi bóng phải nhất quán với mũi tên đó."
     },
     {
      "error": "Chuyển sắc độ bị bẩn, lem nhem",
      "cause": "Di bút qua lại nhiều lần với lực không đều.",
      "fix": "Tô một chiều, chồng lớp nhẹ nhiều lần, mỗi lớp chờ kiểm tra bậc giá trị."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m06-l02",
    "title": "Ánh sáng trên khối cầu: năm vùng sáng tối",
    "summary": "Phân tích khối cầu dưới một nguồn sáng thành highlight, midtone, bóng lõi, sáng phản chiếu và bóng đổ.",
    "objectives": [
     "Xác định đúng vị trí 5 vùng sáng tối trên khối cầu theo hướng sáng cho sẵn",
     "Vẽ được bóng lõi chạy đúng hướng vuông góc tương đối với hướng sáng",
     "Giữ sáng phản chiếu tối hơn mọi vùng midtone được chiếu sáng trực tiếp"
    ],
    "difficulty": 2,
    "minutes": 45,
    "skills": [
     "value-shading",
     "form-construction"
    ],
    "prereqLessons": [
     "m06-l01"
    ],
    "theory": "Dưới một nguồn sáng duy nhất, khối cầu luôn có cùng một cấu trúc sáng tối: điểm sáng nhất (highlight), vùng trung gian, dải bóng lõi tối nhất trên vật, vùng sáng phản chiếu yếu ở rìa phía tối và bóng đổ trên mặt đất. Bóng lõi nằm tại nơi bề mặt quay lưng hẳn với ánh sáng, vị trí của nó suy ra từ hướng sáng chứ không vẽ theo thói quen. Sáng phản chiếu đến từ môi trường xung quanh nên luôn yếu hơn sáng trực tiếp. Học thuộc cấu trúc năm vùng này trên cầu sẽ áp dụng được cho mọi bề mặt cong.",
    "steps": [
     "Vẽ đường tròn bao và đánh dấu hướng sáng bằng mũi tên",
     "Tô vùng trung gian toàn bộ phần được chiếu sáng",
     "Xác định dải bóng lõi và tô đậm nhất trên vật",
     "Thêm highlight, sáng phản chiếu ở rìa tối và bóng đổ trên mặt đất"
    ],
    "demo": {
     "kind": "value-scale",
     "note": "Trình diễn trực quan cho bài 'Ánh sáng trên khối cầu: năm vùng sáng tối': bắt đầu từ bước 'Vẽ đường tròn bao và đánh dấu hướng sáng bằng mũi tên', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Diễn tả một khối cầu dưới nguồn sáng từ góc trên-trái cho sẵn, đủ 5 vùng sáng tối và bóng đổ, bằng chì hoặc bút số thang xám.",
     "mode": "assisted",
     "assessType": "value",
     "target": {}
    },
    "rubric": [
     {
      "id": "group",
      "name": "Phân nhóm sáng tối",
      "weight": 30,
      "method": "cv",
      "desc": "Các mảng sáng, trung gian và tối tách bạch, đúng số bậc yêu cầu."
     },
     {
      "id": "light",
      "name": "Nhất quán hướng sáng",
      "weight": 25,
      "method": "hybrid",
      "desc": "Mọi vùng bóng đều suy ra được từ cùng một nguồn sáng."
     },
     {
      "id": "transition",
      "name": "Chuyển sắc độ",
      "weight": 25,
      "method": "cv",
      "desc": "Chuyển bậc mượt hoặc đúng tính chất cứng/mềm theo yêu cầu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ vùng diễn tả và đúng đối tượng của bài."
     }
    ],
    "mistakes": [
     {
      "error": "Bóng đổ ngược hướng với bóng trên vật",
      "cause": "Vẽ bóng đổ sau cùng mà không suy ra từ nguồn sáng đã chọn.",
      "fix": "Vẽ mũi tên hướng sáng lên góc bài, mọi bóng phải nhất quán với mũi tên đó."
     },
     {
      "error": "Chuyển sắc độ bị bẩn, lem nhem",
      "cause": "Di bút qua lại nhiều lần với lực không đều.",
      "fix": "Tô một chiều, chồng lớp nhẹ nhiều lần, mỗi lớp chờ kiểm tra bậc giá trị."
     },
     {
      "error": "Vùng tối và vùng trung gian lẫn vào nhau",
      "cause": "Tô theo cảm giác từng chỗ, không lập thang giá trị trước.",
      "fix": "Lập thang 5 bậc ở mép giấy, gán mỗi vùng một bậc rồi mới tô."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m06-l03",
    "title": "Bóng đổ và bóng trên các loại khối",
    "summary": "Dựng bóng đổ của khối hộp, trụ, cầu lên mặt đất và lên vật khác theo hướng sáng.",
    "objectives": [
     "Dựng được bóng đổ của khối hộp bằng phương pháp gióng từ nguồn sáng",
     "Phân biệt được cạnh bóng đổ sắc nét gần vật và mềm dần ở xa vật",
     "Vẽ được bóng của một vật đổ lên vật khác theo đúng bề mặt nhận bóng"
    ],
    "difficulty": 3,
    "minutes": 50,
    "skills": [
     "value-shading",
     "perspective"
    ],
    "prereqLessons": [
     "m06-l02"
    ],
    "theory": "Bóng đổ là hình chiếu của vật thể theo hướng tia sáng lên bề mặt nhận bóng, nên hình dạng của nó suy ra bằng hình học: gióng từ nguồn sáng qua các đỉnh của vật xuống mặt đất. Bóng sắc nét khi nguồn sáng nhỏ hoặc ở gần (ánh đèn) và mềm khi nguồn sáng lớn (trời nhiều mây). Khi bóng đổ lên vật khác, nó phải uốn theo bề mặt của vật nhận, không giữ nguyên hình phẳng. Vẽ bóng đổ sai hướng là lỗi làm lộ nguồn sáng mâu thuẫn nhanh nhất trong một bức vẽ.",
    "steps": [
     "Đặt nguồn sáng và vẽ mũi tên hướng sáng trên bài",
     "Gióng tia từ nguồn sáng qua các đỉnh khối hộp xuống mặt đất",
     "Nối các điểm chạm đất thành hình bóng đổ, tô đều",
     "Thêm một khối trụ, dựng bóng của nó đổ lên mặt bên của khối hộp"
    ],
    "demo": {
     "kind": "value-scale",
     "note": "Trình diễn trực quan cho bài 'Bóng đổ và bóng trên các loại khối': bắt đầu từ bước 'Đặt nguồn sáng và vẽ mũi tên hướng sáng trên bài', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng và tô bóng đổ của một khối hộp và một khối trụ đặt cạnh nhau dưới nguồn sáng điểm cho sẵn, giữ lại các đường gióng tia sáng.",
     "mode": "assisted",
     "assessType": "value",
     "target": {}
    },
    "rubric": [
     {
      "id": "group",
      "name": "Phân nhóm sáng tối",
      "weight": 30,
      "method": "cv",
      "desc": "Các mảng sáng, trung gian và tối tách bạch, đúng số bậc yêu cầu."
     },
     {
      "id": "light",
      "name": "Nhất quán hướng sáng",
      "weight": 25,
      "method": "hybrid",
      "desc": "Mọi vùng bóng đều suy ra được từ cùng một nguồn sáng."
     },
     {
      "id": "transition",
      "name": "Chuyển sắc độ",
      "weight": 25,
      "method": "cv",
      "desc": "Chuyển bậc mượt hoặc đúng tính chất cứng/mềm theo yêu cầu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ vùng diễn tả và đúng đối tượng của bài."
     }
    ],
    "mistakes": [
     {
      "error": "Chuyển sắc độ bị bẩn, lem nhem",
      "cause": "Di bút qua lại nhiều lần với lực không đều.",
      "fix": "Tô một chiều, chồng lớp nhẹ nhiều lần, mỗi lớp chờ kiểm tra bậc giá trị."
     },
     {
      "error": "Vùng tối và vùng trung gian lẫn vào nhau",
      "cause": "Tô theo cảm giác từng chỗ, không lập thang giá trị trước.",
      "fix": "Lập thang 5 bậc ở mép giấy, gán mỗi vùng một bậc rồi mới tô."
     },
     {
      "error": "Bóng đổ ngược hướng với bóng trên vật",
      "cause": "Vẽ bóng đổ sau cùng mà không suy ra từ nguồn sáng đã chọn.",
      "fix": "Vẽ mũi tên hướng sáng lên góc bài, mọi bóng phải nhất quán với mũi tên đó."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m06-l04",
    "title": "Diễn tả khối hộp và trụ bằng sắc độ",
    "summary": "Gán giá trị sáng tối cho từng mặt của khối hộp và chuyển sắc độ liên tục trên khối trụ.",
    "objectives": [
     "Gán đúng 3 bậc giá trị khác nhau cho 3 mặt khối hộp theo hướng sáng",
     "Chuyển sắc độ trên trụ liền mạch không có vệt bậc thang ngoài ý muốn",
     "Giữ mặt tối nhất của hộp vẫn sáng hơn bóng đổ của chính nó khi cần theo mẫu"
    ],
    "difficulty": 3,
    "minutes": 50,
    "skills": [
     "value-shading",
     "form-construction"
    ],
    "prereqLessons": [
     "m06-l03"
    ],
    "theory": "Khối hộp có các mặt phẳng nên mỗi mặt nhận một giá trị phẳng riêng, mặt nào hướng về sáng nhất thì sáng nhất. Khối trụ cong liên tục nên giá trị của nó chuyển dần từ sáng qua tối, với dải bóng lõi và sáng phản chiếu tương tự khối cầu nhưng kéo dài theo trục. Sai lầm thường gặp là tô mặt hộp bằng chuyển sắc độ như trụ, làm mặt phẳng trông như bị cong. Ngược lại, tô trụ bằng các dải phẳng rời rạc sẽ làm trụ trông như đa giác. Tính chất bề mặt quyết định cách chuyển giá trị.",
    "steps": [
     "Xác định hướng sáng, gán bậc giá trị cho từng mặt của khối hộp",
     "Tô phẳng từng mặt hộp, giữ cạnh giữa các mặt sắc nét",
     "Vẽ khối trụ cạnh hộp, phác dải bóng lõi dọc trục",
     "Chuyển sắc độ mượt trên trụ từ sáng tới tối, thêm sáng phản chiếu"
    ],
    "demo": {
     "kind": "value-scale",
     "note": "Trình diễn trực quan cho bài 'Diễn tả khối hộp và trụ bằng sắc độ': bắt đầu từ bước 'Xác định hướng sáng, gán bậc giá trị cho từng mặt của khối hộp', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Diễn tả một khối hộp và một khối trụ đứng cạnh nhau dưới cùng nguồn sáng: hộp tô phẳng theo mặt, trụ chuyển sắc độ liên tục.",
     "mode": "assisted",
     "assessType": "value",
     "target": {}
    },
    "rubric": [
     {
      "id": "group",
      "name": "Phân nhóm sáng tối",
      "weight": 30,
      "method": "cv",
      "desc": "Các mảng sáng, trung gian và tối tách bạch, đúng số bậc yêu cầu."
     },
     {
      "id": "light",
      "name": "Nhất quán hướng sáng",
      "weight": 25,
      "method": "hybrid",
      "desc": "Mọi vùng bóng đều suy ra được từ cùng một nguồn sáng."
     },
     {
      "id": "transition",
      "name": "Chuyển sắc độ",
      "weight": 25,
      "method": "cv",
      "desc": "Chuyển bậc mượt hoặc đúng tính chất cứng/mềm theo yêu cầu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ vùng diễn tả và đúng đối tượng của bài."
     }
    ],
    "mistakes": [
     {
      "error": "Vùng tối và vùng trung gian lẫn vào nhau",
      "cause": "Tô theo cảm giác từng chỗ, không lập thang giá trị trước.",
      "fix": "Lập thang 5 bậc ở mép giấy, gán mỗi vùng một bậc rồi mới tô."
     },
     {
      "error": "Bóng đổ ngược hướng với bóng trên vật",
      "cause": "Vẽ bóng đổ sau cùng mà không suy ra từ nguồn sáng đã chọn.",
      "fix": "Vẽ mũi tên hướng sáng lên góc bài, mọi bóng phải nhất quán với mũi tên đó."
     },
     {
      "error": "Chuyển sắc độ bị bẩn, lem nhem",
      "cause": "Di bút qua lại nhiều lần với lực không đều.",
      "fix": "Tô một chiều, chồng lớp nhẹ nhiều lần, mỗi lớp chờ kiểm tra bậc giá trị."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m06-l05",
    "title": "Bài luyện ánh sáng tổng hợp trên tĩnh vật",
    "summary": "Diễn tả nhóm tĩnh vật hoàn chỉnh với một nguồn sáng thống nhất và thang giá trị có kiểm soát.",
    "objectives": [
     "Diễn tả được nhóm 3 vật thể với cùng một hướng sáng không mâu thuẫn",
     "Giữ toàn bài trong 5 bậc giá trị chính, không dùng bậc ngoài kế hoạch",
     "Bóng đổ của các vật liên kết thành một hệ thống chung trên mặt bàn"
    ],
    "difficulty": 3,
    "minutes": 60,
    "skills": [
     "value-shading",
     "observation"
    ],
    "prereqLessons": [
     "m06-l04"
    ],
    "theory": "Bài tổng hợp buộc mọi kiến thức sắc độ vào một hệ thống duy nhất: một nguồn sáng, một thang giá trị, nhiều chất liệu khối khác nhau. Trước khi tô chi tiết, hãy lập sơ đồ giá trị nhỏ (value thumbnail) gán mỗi vùng lớn một bậc trong 5 bậc đã chọn. Bóng đổ của các vật gần nhau sẽ chồng và liên kết, tạo nhịp tối chung cho cả nhóm. Nếu một vật có hướng sáng riêng khác các vật còn lại, toàn bộ ảo giác không gian sẽ sụp đổ dù từng vật vẽ rất đẹp.",
    "steps": [
     "Vẽ thumbnail sắc độ nhỏ, gán 5 bậc cho các vùng lớn của nhóm tĩnh vật",
     "Dựng hình nhóm 3 vật đã học ở module quan sát",
     "Tô theo sơ đồ giá trị, bắt đầu từ mảng tối lớn nhất",
     "Kiểm tra hướng sáng trên từng vật và bóng đổ chung, sửa điểm mâu thuẫn"
    ],
    "demo": {
     "kind": "value-scale",
     "note": "Trình diễn trực quan cho bài 'Bài luyện ánh sáng tổng hợp trên tĩnh vật': bắt đầu từ bước 'Vẽ thumbnail sắc độ nhỏ, gán 5 bậc cho các vùng lớn của nhóm tĩnh vật', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Diễn tả hoàn chỉnh nhóm tĩnh vật 3 vật thể dưới một nguồn sáng duy nhất, nộp kèm thumbnail sơ đồ giá trị đã lập trước khi tô.",
     "mode": "independent",
     "assessType": "value",
     "target": {}
    },
    "rubric": [
     {
      "id": "group",
      "name": "Phân nhóm sáng tối",
      "weight": 30,
      "method": "cv",
      "desc": "Các mảng sáng, trung gian và tối tách bạch, đúng số bậc yêu cầu."
     },
     {
      "id": "light",
      "name": "Nhất quán hướng sáng",
      "weight": 25,
      "method": "hybrid",
      "desc": "Mọi vùng bóng đều suy ra được từ cùng một nguồn sáng."
     },
     {
      "id": "transition",
      "name": "Chuyển sắc độ",
      "weight": 25,
      "method": "cv",
      "desc": "Chuyển bậc mượt hoặc đúng tính chất cứng/mềm theo yêu cầu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ vùng diễn tả và đúng đối tượng của bài."
     }
    ],
    "mistakes": [
     {
      "error": "Bóng đổ ngược hướng với bóng trên vật",
      "cause": "Vẽ bóng đổ sau cùng mà không suy ra từ nguồn sáng đã chọn.",
      "fix": "Vẽ mũi tên hướng sáng lên góc bài, mọi bóng phải nhất quán với mũi tên đó."
     },
     {
      "error": "Chuyển sắc độ bị bẩn, lem nhem",
      "cause": "Di bút qua lại nhiều lần với lực không đều.",
      "fix": "Tô một chiều, chồng lớp nhẹ nhiều lần, mỗi lớp chờ kiểm tra bậc giá trị."
     },
     {
      "error": "Vùng tối và vùng trung gian lẫn vào nhau",
      "cause": "Tô theo cảm giác từng chỗ, không lập thang giá trị trước.",
      "fix": "Lập thang 5 bậc ở mép giấy, gán mỗi vùng một bậc rồi mới tô."
     }
    ],
    "passScore": 70
   }
  ]
 },
 {
  "id": "m07",
  "code": "07",
  "title": "Materials & Color",
  "description": "Diễn tả chất liệu gỗ, kim loại, thủy tinh, vải và nền tảng màu sắc: vòng màu, hòa sắc, nóng lạnh.",
  "track": null,
  "lessons": [
   {
    "id": "m07-l01",
    "title": "Vòng màu và ba thuộc tính của màu",
    "summary": "Xây dựng vòng màu 12 phần và phân biệt sắc (hue), độ bão hòa (saturation), độ sáng (value) của màu.",
    "objectives": [
     "Pha và sắp xếp được vòng màu 12 phần đúng thứ tự quang phổ",
     "Tạo được 3 biến thể của một màu: giảm bão hòa, tăng sáng, giảm sáng",
     "Đặt tên đúng cặp màu bổ túc của 4 màu cho sẵn trên vòng"
    ],
    "difficulty": 2,
    "minutes": 45,
    "skills": [
     "color"
    ],
    "prereqLessons": [
     "m06-l05"
    ],
    "theory": "Mọi màu đều mô tả được bằng ba thuộc tính độc lập: sắc là tên gọi của màu trên vòng, độ bão hòa là mức tinh khiết hay xám của màu, độ sáng là mức sáng tối của nó. Vòng màu 12 phần gồm 3 màu gốc, 3 màu bậc hai và 6 màu bậc ba, hai màu đối diện nhau qua tâm là cặp bổ túc. Người mới thường chỉ thay đổi sắc mà quên hai thuộc tính còn lại, khiến bảng màu nghèo nàn. Kiểm soát được cả ba thuộc tính là điều kiện để hòa sắc và diễn tả chất liệu bằng màu.",
    "steps": [
     "Vẽ vòng tròn chia 12 phần bằng nhau",
     "Tô 3 màu gốc cách đều nhau 4 phần",
     "Pha và tô các màu bậc hai, bậc ba vào vị trí giữa",
     "Chọn một màu, tạo hàng 3 biến thể đổi bão hòa và độ sáng bên cạnh vòng"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Vòng màu và ba thuộc tính của màu': bắt đầu từ bước 'Vẽ vòng tròn chia 12 phần bằng nhau', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Nộp vòng màu 12 phần pha tay hoặc tô số kèm một hàng biến thể (bão hòa, sáng, tối) của một màu tự chọn.",
     "mode": "guided",
     "assessType": "color",
     "target": {}
    },
    "rubric": [
     {
      "id": "harmony",
      "name": "Hòa sắc tổng thể",
      "weight": 30,
      "method": "ai",
      "desc": "Các màu thuộc cùng một quan hệ hòa sắc đã chọn và không xung đột."
     },
     {
      "id": "temp",
      "name": "Quan hệ nóng lạnh",
      "weight": 25,
      "method": "hybrid",
      "desc": "Vùng sáng lạnh/nóng và vùng tối đối ứng đúng nguyên tắc bài học."
     },
     {
      "id": "sat",
      "name": "Kiểm soát độ bão hòa",
      "weight": 25,
      "method": "cv",
      "desc": "Độ bão hòa cao nhất nằm ở điểm nhấn, giảm dần ở vùng phụ."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ bảng màu, đủ vùng tô và đúng chất liệu yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Màu nào cũng rực như nhau, mất điểm nhấn",
      "cause": "Chọn màu theo từng vật thể riêng lẻ, không phân cấp độ bão hòa.",
      "fix": "Giữ màu rực nhất cho điểm nhấn, giảm bão hòa mọi vùng phụ bằng màu đối hoặc xám màu."
     },
     {
      "error": "Vùng tối bị đen và chết màu",
      "cause": "Dùng đen thuần để làm tối thay vì dùng màu tối có sắc.",
      "fix": "Làm tối bằng màu bổ túc hoặc màu lạnh cùng họ, không dùng đen thuần."
     },
     {
      "error": "Chất liệu nào trông cũng giống nhau",
      "cause": "Chỉ đổi màu mà không đổi cách chuyển sắc và độ tương phản cạnh.",
      "fix": "Kim loại cần tương phản mạnh và cạnh sắc, vải cần chuyển mềm và tương phản thấp."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m07-l02",
    "title": "Hòa sắc: tương đồng, bổ túc và tam giác",
    "summary": "Áp dụng ba sơ đồ hòa sắc kinh điển vào cùng một bố cục tĩnh vật đơn giản.",
    "objectives": [
     "Tô được cùng một tĩnh vật theo 3 sơ đồ hòa sắc khác nhau",
     "Giữ tỷ lệ diện tích màu chủ đạo khoảng 70% trong mỗi phiên bản",
     "Giải thích được cảm giác khác nhau mà mỗi sơ đồ tạo ra trong 2 câu"
    ],
    "difficulty": 2,
    "minutes": 50,
    "skills": [
     "color"
    ],
    "prereqLessons": [
     "m07-l01"
    ],
    "theory": "Hòa sắc là quan hệ đã chọn giữa các màu trong bài, phổ biến nhất là tương đồng (các màu kề nhau, êm và thống nhất), bổ túc (hai màu đối diện, tương phản mạnh) và tam giác (ba màu cách đều, cân bằng và phong phú). Sơ đồ chỉ hiệu quả khi có một màu chủ đạo chiếm phần lớn diện tích, các màu còn lại đóng vai phụ. Đổi sơ đồ trên cùng một bố cục cho thấy màu thay đổi cảm xúc của bài mà không cần đổi hình. Đây là bài luyện nền trước khi dùng màu cho chất liệu và tranh hoàn chỉnh.",
    "steps": [
     "Vẽ một bố cục tĩnh vật đơn giản, nhân thành 3 bản giống nhau",
     "Bản 1: tô theo hòa sắc tương đồng với một màu chủ đạo",
     "Bản 2: tô theo cặp bổ túc, giữ màu phụ diện tích nhỏ",
     "Bản 3: tô theo hòa sắc tam giác, kiểm tra cân bằng 3 màu"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Hòa sắc: tương đồng, bổ túc và tam giác': bắt đầu từ bước 'Vẽ một bố cục tĩnh vật đơn giản, nhân thành 3 bản giống nhau', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Tô cùng một bố cục tĩnh vật theo 3 sơ đồ hòa sắc (tương đồng, bổ túc, tam giác), mỗi bản ghi rõ màu chủ đạo đã chọn.",
     "mode": "assisted",
     "assessType": "color",
     "target": {}
    },
    "rubric": [
     {
      "id": "harmony",
      "name": "Hòa sắc tổng thể",
      "weight": 30,
      "method": "ai",
      "desc": "Các màu thuộc cùng một quan hệ hòa sắc đã chọn và không xung đột."
     },
     {
      "id": "temp",
      "name": "Quan hệ nóng lạnh",
      "weight": 25,
      "method": "hybrid",
      "desc": "Vùng sáng lạnh/nóng và vùng tối đối ứng đúng nguyên tắc bài học."
     },
     {
      "id": "sat",
      "name": "Kiểm soát độ bão hòa",
      "weight": 25,
      "method": "cv",
      "desc": "Độ bão hòa cao nhất nằm ở điểm nhấn, giảm dần ở vùng phụ."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ bảng màu, đủ vùng tô và đúng chất liệu yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Vùng tối bị đen và chết màu",
      "cause": "Dùng đen thuần để làm tối thay vì dùng màu tối có sắc.",
      "fix": "Làm tối bằng màu bổ túc hoặc màu lạnh cùng họ, không dùng đen thuần."
     },
     {
      "error": "Chất liệu nào trông cũng giống nhau",
      "cause": "Chỉ đổi màu mà không đổi cách chuyển sắc và độ tương phản cạnh.",
      "fix": "Kim loại cần tương phản mạnh và cạnh sắc, vải cần chuyển mềm và tương phản thấp."
     },
     {
      "error": "Màu nào cũng rực như nhau, mất điểm nhấn",
      "cause": "Chọn màu theo từng vật thể riêng lẻ, không phân cấp độ bão hòa.",
      "fix": "Giữ màu rực nhất cho điểm nhấn, giảm bão hòa mọi vùng phụ bằng màu đối hoặc xám màu."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m07-l03",
    "title": "Màu nóng, màu lạnh và ánh sáng màu",
    "summary": "Dùng quan hệ nóng-lạnh để diễn tả nguồn sáng ấm và bóng mát lạnh trong cùng một cảnh.",
    "objectives": [
     "Phân loại được 12 màu của vòng thành nhóm nóng và lạnh kèm lý do",
     "Diễn tả được một vật dưới sáng ấm với bóng ngả lạnh nhất quán",
     "Tránh dùng đen thuần để tô bóng trong toàn bài"
    ],
    "difficulty": 3,
    "minutes": 50,
    "skills": [
     "color",
     "value-shading"
    ],
    "prereqLessons": [
     "m07-l02"
    ],
    "theory": "Màu nóng (đỏ, cam, vàng) có cảm giác tiến về phía người xem và gắn với ánh sáng ấm, màu lạnh (lam, lục lam, tím) lùi xa và gắn với bóng hoặc ánh sáng trời. Trong tự nhiên, ánh sáng ấm thường đi kèm bóng lạnh và ngược lại, vì bóng được chiếu bởi ánh sáng môi trường có sắc khác. Tận dụng tương phản nóng lạnh tạo chiều sâu mà không cần tăng tương phản sáng tối. Bóng tô bằng đen thuần sẽ chết màu; bóng đúng là màu tối có sắc, thường ngả lạnh.",
    "steps": [
     "Chia vòng màu thành hai nửa nóng và lạnh, đánh dấu ranh giới",
     "Dựng một khối cầu đơn giản trên mặt phẳng",
     "Tô vùng sáng bằng màu ấm, vùng trung gian trung tính",
     "Tô bóng lõi và bóng đổ ngả lạnh, không dùng đen thuần"
    ],
    "demo": {
     "kind": "sphere",
     "note": "Trình diễn trực quan cho bài 'Màu nóng, màu lạnh và ánh sáng màu': bắt đầu từ bước 'Chia vòng màu thành hai nửa nóng và lạnh, đánh dấu ranh giới', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Diễn tả một khối cầu và bóng đổ của nó bằng màu: vùng sáng ấm, bóng lạnh, ghi rõ nhiệt độ màu đã chọn cho sáng và tối.",
     "mode": "assisted",
     "assessType": "color",
     "target": {}
    },
    "rubric": [
     {
      "id": "harmony",
      "name": "Hòa sắc tổng thể",
      "weight": 30,
      "method": "ai",
      "desc": "Các màu thuộc cùng một quan hệ hòa sắc đã chọn và không xung đột."
     },
     {
      "id": "temp",
      "name": "Quan hệ nóng lạnh",
      "weight": 25,
      "method": "hybrid",
      "desc": "Vùng sáng lạnh/nóng và vùng tối đối ứng đúng nguyên tắc bài học."
     },
     {
      "id": "sat",
      "name": "Kiểm soát độ bão hòa",
      "weight": 25,
      "method": "cv",
      "desc": "Độ bão hòa cao nhất nằm ở điểm nhấn, giảm dần ở vùng phụ."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ bảng màu, đủ vùng tô và đúng chất liệu yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Chất liệu nào trông cũng giống nhau",
      "cause": "Chỉ đổi màu mà không đổi cách chuyển sắc và độ tương phản cạnh.",
      "fix": "Kim loại cần tương phản mạnh và cạnh sắc, vải cần chuyển mềm và tương phản thấp."
     },
     {
      "error": "Màu nào cũng rực như nhau, mất điểm nhấn",
      "cause": "Chọn màu theo từng vật thể riêng lẻ, không phân cấp độ bão hòa.",
      "fix": "Giữ màu rực nhất cho điểm nhấn, giảm bão hòa mọi vùng phụ bằng màu đối hoặc xám màu."
     },
     {
      "error": "Vùng tối bị đen và chết màu",
      "cause": "Dùng đen thuần để làm tối thay vì dùng màu tối có sắc.",
      "fix": "Làm tối bằng màu bổ túc hoặc màu lạnh cùng họ, không dùng đen thuần."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m07-l04",
    "title": "Diễn tả chất liệu: gỗ, vải và kim loại",
    "summary": "Phân biệt ba chất liệu bằng cách chuyển sắc độ, độ tương phản và tính chất cạnh.",
    "objectives": [
     "Diễn tả được gỗ với vân chạy theo bề mặt và tương phản thấp",
     "Diễn tả được kim loại với tương phản cao, dải sáng sắc nét và phản chiếu môi trường đơn giản hóa",
     "Diễn tả được vải với chuyển sắc mềm và nếp gấp theo trọng lực"
    ],
    "difficulty": 3,
    "minutes": 55,
    "skills": [
     "color",
     "value-shading"
    ],
    "prereqLessons": [
     "m07-l03"
    ],
    "theory": "Chất liệu được nhận biết chủ yếu qua cách bề mặt xử lý ánh sáng: gỗ mờ, vân hữu cơ chạy dọc thớ và tương phản vừa; vải mờ hơn nữa, chuyển sắc mềm vì bề mặt nhám và có nếp gấp; kim loại phản chiếu môi trường như gương méo, nên có tương phản rất cao và các dải sáng tối sắc nét. Cùng một khối trụ có thể biến thành ống gỗ, cuộn vải hay ống kim loại chỉ bằng cách đổi hành vi sáng tối. Vẽ chất liệu là vẽ quy luật ánh sáng của nó, không phải vẽ nhãn của vật.",
    "steps": [
     "Dựng 3 khối trụ giống hệt nhau cạnh nhau",
     "Trụ 1: tô gỗ, thêm vân cong bám theo bề mặt trụ",
     "Trụ 2: tô vải, chuyển sắc mềm và thêm nếp gấp dọc",
     "Trụ 3: tô kim loại, dải highlight sắc nét, tương phản mạnh"
    ],
    "demo": {
     "kind": "cylinder",
     "note": "Trình diễn trực quan cho bài 'Diễn tả chất liệu: gỗ, vải và kim loại': bắt đầu từ bước 'Dựng 3 khối trụ giống hệt nhau cạnh nhau', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Biến 3 khối trụ giống nhau thành gỗ, vải và kim loại chỉ bằng diễn tả bề mặt, nộp kèm ghi chú quy luật sáng tối của từng chất liệu.",
     "mode": "assisted",
     "assessType": "color",
     "target": {}
    },
    "rubric": [
     {
      "id": "harmony",
      "name": "Hòa sắc tổng thể",
      "weight": 30,
      "method": "ai",
      "desc": "Các màu thuộc cùng một quan hệ hòa sắc đã chọn và không xung đột."
     },
     {
      "id": "temp",
      "name": "Quan hệ nóng lạnh",
      "weight": 25,
      "method": "hybrid",
      "desc": "Vùng sáng lạnh/nóng và vùng tối đối ứng đúng nguyên tắc bài học."
     },
     {
      "id": "sat",
      "name": "Kiểm soát độ bão hòa",
      "weight": 25,
      "method": "cv",
      "desc": "Độ bão hòa cao nhất nằm ở điểm nhấn, giảm dần ở vùng phụ."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ bảng màu, đủ vùng tô và đúng chất liệu yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Màu nào cũng rực như nhau, mất điểm nhấn",
      "cause": "Chọn màu theo từng vật thể riêng lẻ, không phân cấp độ bão hòa.",
      "fix": "Giữ màu rực nhất cho điểm nhấn, giảm bão hòa mọi vùng phụ bằng màu đối hoặc xám màu."
     },
     {
      "error": "Vùng tối bị đen và chết màu",
      "cause": "Dùng đen thuần để làm tối thay vì dùng màu tối có sắc.",
      "fix": "Làm tối bằng màu bổ túc hoặc màu lạnh cùng họ, không dùng đen thuần."
     },
     {
      "error": "Chất liệu nào trông cũng giống nhau",
      "cause": "Chỉ đổi màu mà không đổi cách chuyển sắc và độ tương phản cạnh.",
      "fix": "Kim loại cần tương phản mạnh và cạnh sắc, vải cần chuyển mềm và tương phản thấp."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m07-l05",
    "title": "Thủy tinh và màu số cơ bản",
    "summary": "Diễn tả vật thủy tinh trong suốt bằng vùng sáng phản chiếu và nền xuyên qua, làm quen tô màu số theo lớp.",
    "objectives": [
     "Diễn tả được một chai thủy tinh mà người xem nhận ra tính trong suốt",
     "Giữ vùng highlight của thủy tinh sắc và nhỏ, nền xuyên qua bị lệch nhẹ",
     "Tô màu số theo lớp: lớp nền phẳng trước, lớp bóng sau, highlight cuối"
    ],
    "difficulty": 3,
    "minutes": 55,
    "skills": [
     "color",
     "observation"
    ],
    "prereqLessons": [
     "m07-l04"
    ],
    "theory": "Thủy tinh gần như không có màu bề mặt riêng: cái ta thấy là nền phía sau xuyên qua (bị khúc xạ lệch nhẹ), cộng các highlight sắc nét phản chiếu nguồn sáng và cạnh tối ở nơi bề mặt cong gắt. Vẽ thủy tinh bằng cách tô kín một màu xám sẽ biến nó thành kim loại mờ. Quy trình tô màu số theo lớp giúp tách các quyết định: dựng hình ở lớp riêng, màu nền phẳng, bóng, rồi highlight trên cùng, sai lớp nào sửa lớp đó. Bài này kết hợp cả hai: chất liệu khó nhất và quy trình số cơ bản nhất.",
    "steps": [
     "Dựng chai thủy tinh trên lớp riêng, vẽ nền phía sau chai",
     "Tô nền xuyên qua chai, lệch nhẹ các đường nền tại biên chai",
     "Thêm vùng tối cạnh cong và bóng đổ có phần sáng xuyên qua",
     "Highlight sắc nét ở lớp trên cùng, kiểm tra cảm giác trong suốt"
    ],
    "demo": {
     "kind": "cylinder",
     "note": "Trình diễn trực quan cho bài 'Thủy tinh và màu số cơ bản': bắt đầu từ bước 'Dựng chai thủy tinh trên lớp riêng, vẽ nền phía sau chai', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Diễn tả một chai thủy tinh đặt trước nền có họa tiết, thể hiện nền xuyên qua và highlight, thực hiện bằng tô màu theo lớp (giấy hoặc số).",
     "mode": "independent",
     "assessType": "color",
     "target": {}
    },
    "rubric": [
     {
      "id": "harmony",
      "name": "Hòa sắc tổng thể",
      "weight": 30,
      "method": "ai",
      "desc": "Các màu thuộc cùng một quan hệ hòa sắc đã chọn và không xung đột."
     },
     {
      "id": "temp",
      "name": "Quan hệ nóng lạnh",
      "weight": 25,
      "method": "hybrid",
      "desc": "Vùng sáng lạnh/nóng và vùng tối đối ứng đúng nguyên tắc bài học."
     },
     {
      "id": "sat",
      "name": "Kiểm soát độ bão hòa",
      "weight": 25,
      "method": "cv",
      "desc": "Độ bão hòa cao nhất nằm ở điểm nhấn, giảm dần ở vùng phụ."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ bảng màu, đủ vùng tô và đúng chất liệu yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Vùng tối bị đen và chết màu",
      "cause": "Dùng đen thuần để làm tối thay vì dùng màu tối có sắc.",
      "fix": "Làm tối bằng màu bổ túc hoặc màu lạnh cùng họ, không dùng đen thuần."
     },
     {
      "error": "Chất liệu nào trông cũng giống nhau",
      "cause": "Chỉ đổi màu mà không đổi cách chuyển sắc và độ tương phản cạnh.",
      "fix": "Kim loại cần tương phản mạnh và cạnh sắc, vải cần chuyển mềm và tương phản thấp."
     },
     {
      "error": "Màu nào cũng rực như nhau, mất điểm nhấn",
      "cause": "Chọn màu theo từng vật thể riêng lẻ, không phân cấp độ bão hòa.",
      "fix": "Giữ màu rực nhất cho điểm nhấn, giảm bão hòa mọi vùng phụ bằng màu đối hoặc xám màu."
     }
    ],
    "passScore": 70
   }
  ]
 },
 {
  "id": "m08",
  "code": "08",
  "title": "Gesture & Anatomy",
  "description": "Dáng động, đường hành động, tỷ lệ cơ thể và cấu trúc đầu, thân, tay, chân.",
  "track": null,
  "lessons": [
   {
    "id": "m08-l01",
    "title": "Gesture drawing và đường hành động",
    "summary": "Bắt dáng người trong 30 giây tới 2 phút bằng một đường hành động liền mạch.",
    "objectives": [
     "Vẽ được 8 dáng gesture trong 2 phút mỗi dáng, mỗi dáng có một đường hành động duy nhất",
     "Thể hiện được hướng chuyển động chính của dáng mà không cần chi tiết giải phẫu",
     "Giữ tỷ lệ đầu-thân-chân trong sai số một đầu ở bản gesture 2 phút"
    ],
    "difficulty": 2,
    "minutes": 45,
    "skills": [
     "anatomy",
     "line-control"
    ],
    "prereqLessons": [
     "m07-l05"
    ],
    "theory": "Gesture drawing ghi lại chuyển động và nhịp của dáng người, không ghi lại chi tiết bề mặt. Đường hành động là một đường cong tưởng tượng chạy dọc trục chính của cơ thể, từ đầu qua cột sống tới chân đỡ; mọi bộ phận đều bám theo hoặc đối ứng với nó. Vẽ nhanh có chủ đích buộc bạn quyết định điều quan trọng nhất của dáng trước khi hết giờ. Dáng gesture đúng sẽ trông sống động dù chưa có cơ bắp, còn dáng vẽ chậm chi tiết mà sai đường hành động sẽ cứng như tượng.",
    "steps": [
     "Nhìn dáng mẫu 10 giây, tìm đường hành động chính",
     "Vẽ đường hành động trong 5 giây đầu bằng một nét cong",
     "Gắn đầu, lồng ngực và chậu như ba khối dọc theo đường hành động",
     "Thêm tay chân bằng nét dài đơn giản, dừng đúng giờ quy định"
    ],
    "demo": {
     "kind": "gesture",
     "note": "Trình diễn trực quan cho bài 'Gesture drawing và đường hành động': bắt đầu từ bước 'Nhìn dáng mẫu 10 giây, tìm đường hành động chính', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ 6 dáng gesture từ ảnh mẫu dáng động (mỗi dáng tối đa 2 phút), mỗi dáng giữ lại đường hành động vẽ bằng màu khác.",
     "mode": "guided",
     "assessType": "gesture",
     "target": {}
    },
    "rubric": [
     {
      "id": "action",
      "name": "Đường hành động",
      "weight": 30,
      "method": "hybrid",
      "desc": "Đường hành động liền mạch, thể hiện hướng chuyển động chính."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ cơ thể",
      "weight": 30,
      "method": "geometry",
      "desc": "Tỷ lệ đầu-thân-chân tay khớp mốc giải phẫu của bài."
     },
     {
      "id": "rhythm",
      "name": "Nhịp điệu và cân bằng",
      "weight": 25,
      "method": "ai",
      "desc": "Dáng có nhịp cong đối ứng, trọng tâm rơi hợp lý."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số dáng, đủ thời lượng và đúng tư thế yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Dáng cứng như người que thẳng đứng",
      "cause": "Vẽ từng bộ phận thẳng hàng, bỏ qua đường hành động.",
      "fix": "Vẽ đường hành động cong liền mạch trước, mọi bộ phận bám theo đường này."
     },
     {
      "error": "Tỷ lệ thân và chân sai lệch",
      "cause": "Bắt đầu từ chi tiết đầu mà không chia mốc toàn thân.",
      "fix": "Chia chiều cao toàn thân thành các đơn vị đầu, đánh dấu mốc vai, hông, gối trước."
     },
     {
      "error": "Dáng mất cân bằng, như sắp ngã",
      "cause": "Trọng tâm vẽ ra ngoài đế đỡ mà không có ý đồ động.",
      "fix": "Kẻ đường dọi từ cổ xuống, kiểm tra nó rơi vào vùng đế đỡ của hai chân."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m08-l02",
    "title": "Tỷ lệ cơ thể người theo đơn vị đầu",
    "summary": "Hệ thống đo cơ thể bằng số đầu và các mốc giải phẫu chính ở tư thế đứng.",
    "objectives": [
     "Chia được cơ thể đứng thẳng thành 7.5 đơn vị đầu với các mốc chính đúng vị trí",
     "Đánh dấu đúng mốc cằm, ngực, rốn, chậu, gối, cổ chân trên hình người",
     "Phát hiện được lỗi tỷ lệ trong 2 hình người mẫu lỗi cho sẵn"
    ],
    "difficulty": 2,
    "minutes": 45,
    "skills": [
     "anatomy",
     "proportion"
    ],
    "prereqLessons": [
     "m08-l01"
    ],
    "theory": "Đơn vị đầu là thước đo tương đối của hình họa người: cơ thể người lớn đứng thẳng cao khoảng 7.5 đầu, với các mốc cố định như cằm ở 1, rốn gần 3, chậu ở 4, gối ở 6 đơn vị tính từ đỉnh đầu. Các mốc này thay đổi theo tư thế và độ tuổi nhưng ở tư thế đứng chuẩn chúng là hệ quy chiếu đáng tin cậy. Vẽ người sai tỷ lệ thường do bắt đầu từ một bộ phận mình thích và để các bộ phận khác tự phát triển. Hãy chia tổng chiều cao và đánh dấu mọi mốc trước khi vẽ bất kỳ đường bao nào.",
    "steps": [
     "Kẻ đoạn tổng chiều cao, chia thành 7.5 phần bằng nhau",
     "Đánh dấu các mốc: cằm, ngực, rốn, chậu, đầu gối, cổ chân",
     "Dựng hình người đứng bằng các đoạn thẳng nối mốc",
     "Vẽ đường bao cơ thể quanh khung mốc, kiểm tra lại từng đoạn"
    ],
    "demo": {
     "kind": "gesture",
     "note": "Trình diễn trực quan cho bài 'Tỷ lệ cơ thể người theo đơn vị đầu': bắt đầu từ bước 'Kẻ đoạn tổng chiều cao, chia thành 7.5 phần bằng nhau', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng hình người đứng thẳng đúng hệ 7.5 đầu, nộp bản có giữ lưới chia đơn vị và các mốc giải phẫu.",
     "mode": "assisted",
     "assessType": "gesture",
     "target": {}
    },
    "rubric": [
     {
      "id": "action",
      "name": "Đường hành động",
      "weight": 30,
      "method": "hybrid",
      "desc": "Đường hành động liền mạch, thể hiện hướng chuyển động chính."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ cơ thể",
      "weight": 30,
      "method": "geometry",
      "desc": "Tỷ lệ đầu-thân-chân tay khớp mốc giải phẫu của bài."
     },
     {
      "id": "rhythm",
      "name": "Nhịp điệu và cân bằng",
      "weight": 25,
      "method": "ai",
      "desc": "Dáng có nhịp cong đối ứng, trọng tâm rơi hợp lý."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số dáng, đủ thời lượng và đúng tư thế yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Tỷ lệ thân và chân sai lệch",
      "cause": "Bắt đầu từ chi tiết đầu mà không chia mốc toàn thân.",
      "fix": "Chia chiều cao toàn thân thành các đơn vị đầu, đánh dấu mốc vai, hông, gối trước."
     },
     {
      "error": "Dáng mất cân bằng, như sắp ngã",
      "cause": "Trọng tâm vẽ ra ngoài đế đỡ mà không có ý đồ động.",
      "fix": "Kẻ đường dọi từ cổ xuống, kiểm tra nó rơi vào vùng đế đỡ của hai chân."
     },
     {
      "error": "Dáng cứng như người que thẳng đứng",
      "cause": "Vẽ từng bộ phận thẳng hàng, bỏ qua đường hành động.",
      "fix": "Vẽ đường hành động cong liền mạch trước, mọi bộ phận bám theo đường này."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m08-l03",
    "title": "Cấu trúc đầu và khối hộp sọ",
    "summary": "Dựng đầu người từ khối cầu cắt và mặt phẳng mặt, xác định trục mặt và đường chân mày.",
    "objectives": [
     "Dựng được đầu ở góc thẳng và góc nghiêng từ cùng một cấu trúc cầu-hộp",
     "Đặt được đường chân mày, trục dọc mặt và mặt phẳng hàm đúng quan hệ",
     "Vẽ được đầu xoay 3/4 mà hai mắt vẫn nằm trên cùng đường cong mặt"
    ],
    "difficulty": 3,
    "minutes": 55,
    "skills": [
     "anatomy",
     "form-construction"
    ],
    "prereqLessons": [
     "m08-l02"
    ],
    "theory": "Đầu người được dựng từ một khối cầu bị cắt hai bên (hộp sọ) cộng khối mặt và hàm phía dưới. Đường chân mày là đường vòng quanh hộp sọ chia sọ và mặt, là mốc gióng quan trọng nhất khi đầu xoay. Khi đầu xoay 3/4, các đường ngang của mặt (mắt, mũi, miệng) cong theo bề mặt hình trụ của đầu chứ không thẳng hàng như khi nhìn thẳng. Dựng cấu trúc trước giúp vẽ được đầu ở góc bất kỳ thay vì chỉ chép được góc chính diện.",
    "steps": [
     "Vẽ khối cầu, cắt phẳng hai bên tạo hộp sọ",
     "Kẻ trục dọc và đường chân mày vòng quanh khối",
     "Gắn khối hàm phía dưới đường chân mày",
     "Xoay cấu trúc sang góc 3/4, cong các đường mắt-mũi-miệng theo bề mặt"
    ],
    "demo": {
     "kind": "sphere",
     "note": "Trình diễn trực quan cho bài 'Cấu trúc đầu và khối hộp sọ': bắt đầu từ bước 'Vẽ khối cầu, cắt phẳng hai bên tạo hộp sọ', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng đầu người ở 3 góc (thẳng, nghiêng, 3/4) từ cùng cấu trúc cầu-hộp, giữ lại đường chân mày và trục mặt ở cả 3 bản.",
     "mode": "assisted",
     "assessType": "form",
     "target": {}
    },
    "rubric": [
     {
      "id": "structure",
      "name": "Cấu trúc khối",
      "weight": 35,
      "method": "hybrid",
      "desc": "Khối được dựng từ hình cơ bản đúng trục và đúng quan hệ các mặt."
     },
     {
      "id": "axis",
      "name": "Trục và hướng khối",
      "weight": 25,
      "method": "geometry",
      "desc": "Trục chính, hướng xoay và độ nghiêng của khối khớp với mẫu."
     },
     {
      "id": "space",
      "name": "Tính nhất quán không gian",
      "weight": 25,
      "method": "hybrid",
      "desc": "Các khối con nằm đúng vị trí, không mâu thuẫn về chiều sâu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số khối và các bước dựng hình theo yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Đường xuyên khối (cross-contour) sai hướng",
      "cause": "Vẽ đường cong trang trí thay vì bám theo bề mặt khối.",
      "fix": "Cho đường cross-contour ôm quanh trục, đổi hướng đúng tại cạnh của khối."
     },
     {
      "error": "Khối bị xẹp, không có chiều sâu",
      "cause": "Các mặt bên bị thu hẹp vì không xác định trục và hướng xoay trước.",
      "fix": "Kẻ trục chính, vẽ mặt trước rồi mới kéo chiều sâu theo một hướng thống nhất."
     },
     {
      "error": "Các khối con không gắn được vào khối chính",
      "cause": "Vẽ từng khối rời rạc, không dùng đường gióng chung.",
      "fix": "Dựng khối bao tổng thể trước, chia vị trí khối con bằng đường gióng từ khối chính."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m08-l04",
    "title": "Thân, tay và chân như các khối liên kết",
    "summary": "Đơn giản hóa lồng ngực, chậu, cánh tay và chân thành khối hộp, trụ có khớp xoay.",
    "objectives": [
     "Dựng được thân người từ hai khối lồng ngực và chậu có góc nghiêng độc lập",
     "Vẽ được cánh tay gập tại khuỷu với hai đoạn trụ đúng chiều dài tương đối",
     "Thể hiện được chân đỡ thẳng trục trọng lượng và chân thả lỏng cong nhịp"
    ],
    "difficulty": 3,
    "minutes": 55,
    "skills": [
     "anatomy",
     "form-construction"
    ],
    "prereqLessons": [
     "m08-l03"
    ],
    "theory": "Thân người hoạt động như hai khối lớn, lồng ngực và xương chậu, nối bằng đoạn eo linh hoạt; hai khối này nghiêng độc lập và góc giữa chúng kể câu chuyện của dáng. Tay và chân là chuỗi các đoạn trụ nối bằng khớp cầu, mỗi đoạn có chiều dài tương đối cố định so với cơ thể. Khi dáng chuyển động, hãy dựng hai khối thân trước, định góc của chúng, rồi mới treo tay chân vào. Cách dựng theo khối này áp dụng được cho mọi tư thế, kể cả tư thế không có mẫu.",
    "steps": [
     "Dựng khối lồng ngực và khối chậu, cho hai khối nghiêng ngược nhau nhẹ",
     "Nối hai khối bằng đoạn eo cong theo đường hành động",
     "Gắn cánh tay: hai đoạn trụ gập tại khuỷu theo góc cho sẵn",
     "Gắn chân: một chân đỡ thẳng, một chân thả cong, kiểm tra trọng tâm"
    ],
    "demo": {
     "kind": "gesture",
     "note": "Trình diễn trực quan cho bài 'Thân, tay và chân như các khối liên kết': bắt đầu từ bước 'Dựng khối lồng ngực và khối chậu, cho hai khối nghiêng ngược nhau nhẹ', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng một dáng người đang bước đi từ khối lồng ngực, chậu và các đoạn tay chân, nộp bản dựng khối chưa thêm chi tiết bề mặt.",
     "mode": "assisted",
     "assessType": "gesture",
     "target": {}
    },
    "rubric": [
     {
      "id": "action",
      "name": "Đường hành động",
      "weight": 30,
      "method": "hybrid",
      "desc": "Đường hành động liền mạch, thể hiện hướng chuyển động chính."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ cơ thể",
      "weight": 30,
      "method": "geometry",
      "desc": "Tỷ lệ đầu-thân-chân tay khớp mốc giải phẫu của bài."
     },
     {
      "id": "rhythm",
      "name": "Nhịp điệu và cân bằng",
      "weight": 25,
      "method": "ai",
      "desc": "Dáng có nhịp cong đối ứng, trọng tâm rơi hợp lý."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số dáng, đủ thời lượng và đúng tư thế yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Dáng cứng như người que thẳng đứng",
      "cause": "Vẽ từng bộ phận thẳng hàng, bỏ qua đường hành động.",
      "fix": "Vẽ đường hành động cong liền mạch trước, mọi bộ phận bám theo đường này."
     },
     {
      "error": "Tỷ lệ thân và chân sai lệch",
      "cause": "Bắt đầu từ chi tiết đầu mà không chia mốc toàn thân.",
      "fix": "Chia chiều cao toàn thân thành các đơn vị đầu, đánh dấu mốc vai, hông, gối trước."
     },
     {
      "error": "Dáng mất cân bằng, như sắp ngã",
      "cause": "Trọng tâm vẽ ra ngoài đế đỡ mà không có ý đồ động.",
      "fix": "Kẻ đường dọi từ cổ xuống, kiểm tra nó rơi vào vùng đế đỡ của hai chân."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m08-l05",
    "title": "Bàn tay, bàn chân và dáng động tổng hợp",
    "summary": "Cấu trúc bàn tay như hộp dẹt cộng ngón, bàn chân như nêm, và bài gesture tổng hợp cuối module.",
    "objectives": [
     "Dựng được bàn tay ở 2 tư thế từ khối hộp dẹt và các đoạn ngón có khớp",
     "Dựng được bàn chân như khối nêm có vòm, đúng góc tiếp đất",
     "Hoàn thành dáng động tổng hợp có đường hành động, khối thân và tay chân trong 10 phút"
    ],
    "difficulty": 4,
    "minutes": 60,
    "skills": [
     "anatomy"
    ],
    "prereqLessons": [
     "m08-l04"
    ],
    "theory": "Bàn tay nên dựng từ một khối hộp dẹt (lòng bàn tay) cộng các ngón là chuỗi đoạn nhỏ gập theo khớp, thay vì vẽ từng ngón rời rạc. Bàn chân là khối nêm có vòm cong, chiều dài xấp xỉ một đơn vị đầu. Ở bài tổng hợp, thứ tự dựng là đường hành động, hai khối thân, tay chân dạng khối, cuối cùng mới tới bàn tay bàn chân tại vị trí đã khóa. Độ khó của tay chân nằm ở vị trí và tỷ lệ của chúng trong tổng thể nhiều hơn ở chi tiết ngón.",
    "steps": [
     "Dựng bàn tay xòe từ hộp dẹt, chia ngón thành các đoạn khớp",
     "Dựng bàn tay nắm từ cùng khối hộp, gập các đoạn ngón",
     "Vẽ bàn chân dạng nêm ở góc nghiêng, đánh dấu vòm chân",
     "Vẽ một dáng động tổng hợp 10 phút áp dụng toàn bộ cấu trúc module"
    ],
    "demo": {
     "kind": "gesture",
     "note": "Trình diễn trực quan cho bài 'Bàn tay, bàn chân và dáng động tổng hợp': bắt đầu từ bước 'Dựng bàn tay xòe từ hộp dẹt, chia ngón thành các đoạn khớp', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Nộp bộ bài gồm: 2 bàn tay dựng từ khối ở 2 tư thế, 1 bàn chân dạng nêm và 1 dáng động tổng hợp có đủ cấu trúc khối.",
     "mode": "independent",
     "assessType": "gesture",
     "target": {}
    },
    "rubric": [
     {
      "id": "action",
      "name": "Đường hành động",
      "weight": 30,
      "method": "hybrid",
      "desc": "Đường hành động liền mạch, thể hiện hướng chuyển động chính."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ cơ thể",
      "weight": 30,
      "method": "geometry",
      "desc": "Tỷ lệ đầu-thân-chân tay khớp mốc giải phẫu của bài."
     },
     {
      "id": "rhythm",
      "name": "Nhịp điệu và cân bằng",
      "weight": 25,
      "method": "ai",
      "desc": "Dáng có nhịp cong đối ứng, trọng tâm rơi hợp lý."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số dáng, đủ thời lượng và đúng tư thế yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Tỷ lệ thân và chân sai lệch",
      "cause": "Bắt đầu từ chi tiết đầu mà không chia mốc toàn thân.",
      "fix": "Chia chiều cao toàn thân thành các đơn vị đầu, đánh dấu mốc vai, hông, gối trước."
     },
     {
      "error": "Dáng mất cân bằng, như sắp ngã",
      "cause": "Trọng tâm vẽ ra ngoài đế đỡ mà không có ý đồ động.",
      "fix": "Kẻ đường dọi từ cổ xuống, kiểm tra nó rơi vào vùng đế đỡ của hai chân."
     },
     {
      "error": "Dáng cứng như người que thẳng đứng",
      "cause": "Vẽ từng bộ phận thẳng hàng, bỏ qua đường hành động.",
      "fix": "Vẽ đường hành động cong liền mạch trước, mọi bộ phận bám theo đường này."
     }
    ],
    "passScore": 70
   }
  ]
 },
 {
  "id": "m09",
  "code": "09",
  "title": "Composition & Visual Storytelling",
  "description": "Điểm nhấn, cân bằng, nhịp điệu, tương phản, thumbnail và kể chuyện bằng bố cục.",
  "track": null,
  "lessons": [
   {
    "id": "m09-l01",
    "title": "Phân cấp thị giác và điểm nhấn",
    "summary": "Tạo một điểm nhấn duy nhất bằng tương phản sáng tối, màu và độ chi tiết.",
    "objectives": [
     "Tạo được điểm nhấn mà người xem khác tìm thấy trong 3 giây đầu",
     "Sử dụng ít nhất 2 trong 3 công cụ tương phản (giá trị, màu, chi tiết) tại điểm nhấn",
     "Giảm được tương phản ở vùng phụ xuống dưới mức điểm nhấn"
    ],
    "difficulty": 2,
    "minutes": 45,
    "skills": [
     "composition",
     "value-shading"
    ],
    "prereqLessons": [
     "m08-l05"
    ],
    "theory": "Phân cấp thị giác là thứ tự mà mắt người xem đi qua bức tranh, và điểm nhấn là trạm đầu tiên trong hành trình đó. Mắt bị hút tới nơi có tương phản mạnh nhất, dù là tương phản sáng tối, màu bổ túc hay chi tiết dày đặc. Nếu hai vùng cùng tương phản mạnh ngang nhau, chúng cạnh tranh và bài vẽ mất điểm nhấn. Vì vậy tạo điểm nhấn gồm hai việc: tăng tương phản ở điểm chính và chủ động giảm tương phản ở mọi vùng còn lại.",
    "steps": [
     "Chọn bố cục đơn giản, khoanh vùng sẽ làm điểm nhấn",
     "Tăng tương phản sáng tối mạnh nhất tại điểm nhấn",
     "Giảm chi tiết và tương phản ở các vùng phụ",
     "Đưa người khác xem 3 giây và hỏi họ thấy gì đầu tiên"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Phân cấp thị giác và điểm nhấn': bắt đầu từ bước 'Chọn bố cục đơn giản, khoanh vùng sẽ làm điểm nhấn', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ một bố cục tĩnh vật đơn giản có điểm nhấn rõ tại một vật thể chỉ định, dùng tối thiểu 2 công cụ tương phản, ghi lại kết quả kiểm tra 3 giây.",
     "mode": "guided",
     "assessType": "composition",
     "target": {}
    },
    "rubric": [
     {
      "id": "focal",
      "name": "Điểm nhấn chính",
      "weight": 30,
      "method": "ai",
      "desc": "Điểm nhấn rõ nhất và được các yếu tố khác hỗ trợ."
     },
     {
      "id": "balance",
      "name": "Cân bằng thị giác",
      "weight": 25,
      "method": "hybrid",
      "desc": "Trọng lượng thị giác phân bố hợp lý quanh khung hình."
     },
     {
      "id": "rhythm",
      "name": "Nhịp điệu và dẫn mắt",
      "weight": 25,
      "method": "ai",
      "desc": "Đường dẫn, lặp lại và tương phản đưa mắt đi đúng hành trình dự định."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ thumbnail/bản cuối và đúng ràng buộc bố cục của đề."
     }
    ],
    "mistakes": [
     {
      "error": "Điểm nhấn bị cạnh tranh bởi chi tiết phụ",
      "cause": "Vùng phụ có tương phản và độ chi tiết ngang điểm nhấn.",
      "fix": "Giảm tương phản, giảm chi tiết ở vùng phụ, tăng tương phản tại điểm nhấn."
     },
     {
      "error": "Bố cục bị cắt vụn, mắt không có đường đi",
      "cause": "Các yếu tố đặt rời rạc, không có đường dẫn liên kết.",
      "fix": "Dùng cạnh, hướng nhìn hoặc mảng sáng tối nối các yếu tố thành một hành trình."
     },
     {
      "error": "Khung hình thừa khoảng trống vô nghĩa",
      "cause": "Đặt chủ thể theo thói quen ở giữa mà không tính không gian âm.",
      "fix": "Thử ít nhất ba thumbnail với vị trí chủ thể khác nhau trước khi vẽ bản cuối."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m09-l02",
    "title": "Cân bằng, quy tắc phần ba và không gian âm trong bố cục",
    "summary": "Bố trí trọng lượng thị giác quanh khung hình và dùng lưới phần ba có chủ đích.",
    "objectives": [
     "Đặt được chủ thể theo lưới phần ba và giải thích lý do chọn vị trí đó",
     "Tạo được một bố cục bất đối xứng vẫn cân bằng nhờ đối trọng thị giác",
     "Dùng không gian âm làm vùng nghỉ có hình dạng rõ ràng cho mắt"
    ],
    "difficulty": 2,
    "minutes": 45,
    "skills": [
     "composition"
    ],
    "prereqLessons": [
     "m09-l01"
    ],
    "theory": "Cân bằng thị giác không đồng nghĩa với đối xứng: một khối lớn tối ở một phía có thể cân bằng bởi một chi tiết nhỏ rực ở phía đối diện. Lưới phần ba là điểm khởi hành tiện lợi để tránh đặt chủ thể chết ở giữa, nhưng nó là gợi ý chứ không phải luật. Không gian âm trong bố cục là vùng nghỉ cho mắt và hình dạng của nó cũng cần được thiết kế, không phải phần thừa sau khi đặt chủ thể. Bố cục tốt là khi di chuyển bất kỳ yếu tố nào đi một chút cũng làm tổng thể kém hơn.",
    "steps": [
     "Chia khung hình theo lưới phần ba, đặt chủ thể tại một giao điểm",
     "Thêm một yếu tố đối trọng ở phía đối diện, chỉnh tới khi cân bằng",
     "Vẽ lại bố cục ở dạng đối xứng và so sánh hai phiên bản",
     "Tinh chỉnh hình dạng của vùng không gian âm quanh chủ thể"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Cân bằng, quy tắc phần ba và không gian âm trong bố cục': bắt đầu từ bước 'Chia khung hình theo lưới phần ba, đặt chủ thể tại một giao điểm', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Thiết kế một bố cục bất đối xứng cân bằng cho chủ đề 'một người ngồi bên cửa sổ', nộp bản cuối kèm lưới phần ba và ghi chú đối trọng thị giác.",
     "mode": "assisted",
     "assessType": "composition",
     "target": {}
    },
    "rubric": [
     {
      "id": "focal",
      "name": "Điểm nhấn chính",
      "weight": 30,
      "method": "ai",
      "desc": "Điểm nhấn rõ nhất và được các yếu tố khác hỗ trợ."
     },
     {
      "id": "balance",
      "name": "Cân bằng thị giác",
      "weight": 25,
      "method": "hybrid",
      "desc": "Trọng lượng thị giác phân bố hợp lý quanh khung hình."
     },
     {
      "id": "rhythm",
      "name": "Nhịp điệu và dẫn mắt",
      "weight": 25,
      "method": "ai",
      "desc": "Đường dẫn, lặp lại và tương phản đưa mắt đi đúng hành trình dự định."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ thumbnail/bản cuối và đúng ràng buộc bố cục của đề."
     }
    ],
    "mistakes": [
     {
      "error": "Bố cục bị cắt vụn, mắt không có đường đi",
      "cause": "Các yếu tố đặt rời rạc, không có đường dẫn liên kết.",
      "fix": "Dùng cạnh, hướng nhìn hoặc mảng sáng tối nối các yếu tố thành một hành trình."
     },
     {
      "error": "Khung hình thừa khoảng trống vô nghĩa",
      "cause": "Đặt chủ thể theo thói quen ở giữa mà không tính không gian âm.",
      "fix": "Thử ít nhất ba thumbnail với vị trí chủ thể khác nhau trước khi vẽ bản cuối."
     },
     {
      "error": "Điểm nhấn bị cạnh tranh bởi chi tiết phụ",
      "cause": "Vùng phụ có tương phản và độ chi tiết ngang điểm nhấn.",
      "fix": "Giảm tương phản, giảm chi tiết ở vùng phụ, tăng tương phản tại điểm nhấn."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m09-l03",
    "title": "Nhịp điệu, đường dẫn và tương phản",
    "summary": "Dùng lặp lại có biến đổi và đường dẫn thị giác để đưa mắt đi khắp khung hình.",
    "objectives": [
     "Tạo được một đường dẫn thị giác đi qua ít nhất 3 trạm trong khung hình",
     "Dùng lặp lại có biến đổi (kích thước hoặc khoảng cách) cho một nhóm yếu tố",
     "Đặt tương phản mạnh thứ hai tại trạm cuối của đường dẫn"
    ],
    "difficulty": 3,
    "minutes": 50,
    "skills": [
     "composition",
     "perspective"
    ],
    "prereqLessons": [
     "m09-l02"
    ],
    "theory": "Nhịp điệu trong tranh đến từ sự lặp lại có biến đổi: hàng cột nhỏ dần, sóng nối tiếp nhau, khiến mắt di chuyển theo một tốc độ có cảm giác nhạc. Đường dẫn là các cạnh, hướng nhìn của nhân vật hoặc dãy sáng tối được sắp xếp để mắt đi từ điểm nhấn qua các trạm phụ rồi quay lại. Tương phản nên phân cấp dọc theo hành trình này, mạnh nhất ở điểm nhấn và yếu dần ở vùng đệm. Bố cục thiếu nhịp điệu thường trông như danh sách các vật rời rạc dù từng vật vẽ đẹp.",
    "steps": [
     "Phác 3 phương án đường dẫn cho cùng một chủ đề (đường cong, zíc zắc, chéo)",
     "Chọn phương án rõ nhất, đặt các yếu tố dọc theo đường dẫn",
     "Tạo một nhóm yếu tố lặp lại có biến đổi kích thước theo chiều sâu",
     "Kiểm tra hành trình mắt bằng cách nhờ người khác mô tả thứ tự họ nhìn"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Nhịp điệu, đường dẫn và tương phản': bắt đầu từ bước 'Phác 3 phương án đường dẫn cho cùng một chủ đề (đường cong, zíc zắc, chéo)', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Thiết kế bố cục phong cảnh có đường dẫn thị giác qua 3 trạm và một nhóm yếu tố lặp lại biến đổi, nộp kèm bản phác đánh dấu hành trình mắt.",
     "mode": "assisted",
     "assessType": "composition",
     "target": {}
    },
    "rubric": [
     {
      "id": "focal",
      "name": "Điểm nhấn chính",
      "weight": 30,
      "method": "ai",
      "desc": "Điểm nhấn rõ nhất và được các yếu tố khác hỗ trợ."
     },
     {
      "id": "balance",
      "name": "Cân bằng thị giác",
      "weight": 25,
      "method": "hybrid",
      "desc": "Trọng lượng thị giác phân bố hợp lý quanh khung hình."
     },
     {
      "id": "rhythm",
      "name": "Nhịp điệu và dẫn mắt",
      "weight": 25,
      "method": "ai",
      "desc": "Đường dẫn, lặp lại và tương phản đưa mắt đi đúng hành trình dự định."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ thumbnail/bản cuối và đúng ràng buộc bố cục của đề."
     }
    ],
    "mistakes": [
     {
      "error": "Khung hình thừa khoảng trống vô nghĩa",
      "cause": "Đặt chủ thể theo thói quen ở giữa mà không tính không gian âm.",
      "fix": "Thử ít nhất ba thumbnail với vị trí chủ thể khác nhau trước khi vẽ bản cuối."
     },
     {
      "error": "Điểm nhấn bị cạnh tranh bởi chi tiết phụ",
      "cause": "Vùng phụ có tương phản và độ chi tiết ngang điểm nhấn.",
      "fix": "Giảm tương phản, giảm chi tiết ở vùng phụ, tăng tương phản tại điểm nhấn."
     },
     {
      "error": "Bố cục bị cắt vụn, mắt không có đường đi",
      "cause": "Các yếu tố đặt rời rạc, không có đường dẫn liên kết.",
      "fix": "Dùng cạnh, hướng nhìn hoặc mảng sáng tối nối các yếu tố thành một hành trình."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m09-l04",
    "title": "Thumbnail sketch và chọn bố cục",
    "summary": "Vẽ nhanh nhiều thumbnail nhỏ để so sánh bố cục bằng mảng sáng tối trước khi vẽ lớn.",
    "objectives": [
     "Vẽ được 6 thumbnail trong 20 phút, mỗi thumbnail chỉ dùng 3 bậc giá trị",
     "Chọn được thumbnail mạnh nhất theo 3 tiêu chí: điểm nhấn, cân bằng, đường dẫn",
     "Phóng thumbnail đã chọn lên khung lớn giữ nguyên quan hệ mảng lớn"
    ],
    "difficulty": 2,
    "minutes": 50,
    "skills": [
     "composition"
    ],
    "prereqLessons": [
     "m09-l03"
    ],
    "theory": "Thumbnail là bản bố cục thu nhỏ vẽ trong vài phút, chỉ gồm các mảng sáng tối lớn, không chi tiết. Vì rẻ và nhanh, thumbnail cho phép thử 6-10 phương án và loại bỏ phương án yếu trước khi đầu tư hàng giờ vào bản lớn. Khi thu nhỏ, mọi chi tiết biến mất nên cái còn lại chính là cấu trúc bố cục thật: điểm nhấn có nổi không, mảng có cân bằng không. Phóng thumbnail lên bản lớn phải giữ nguyên quan hệ mảng lớn, chỉ thêm chi tiết bên trong các mảng đã khóa.",
    "steps": [
     "Đặt đồng hồ 20 phút, vẽ thumbnail đầu tiên bằng 3 bậc giá trị",
     "Vẽ tiếp 5 thumbnail biến đổi vị trí chủ thể và mảng tối",
     "Chấm 6 thumbnail theo 3 tiêu chí và chọn bản mạnh nhất",
     "Phóng bản đã chọn lên khung lớn, giữ nguyên các mảng lớn"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Thumbnail sketch và chọn bố cục': bắt đầu từ bước 'Đặt đồng hồ 20 phút, vẽ thumbnail đầu tiên bằng 3 bậc giá trị', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Nộp bộ 6 thumbnail bố cục cho một chủ đề tự chọn kèm bản phóng lớn của thumbnail được chọn, giữ nguyên sơ đồ mảng sáng tối.",
     "mode": "assisted",
     "assessType": "composition",
     "target": {}
    },
    "rubric": [
     {
      "id": "focal",
      "name": "Điểm nhấn chính",
      "weight": 30,
      "method": "ai",
      "desc": "Điểm nhấn rõ nhất và được các yếu tố khác hỗ trợ."
     },
     {
      "id": "balance",
      "name": "Cân bằng thị giác",
      "weight": 25,
      "method": "hybrid",
      "desc": "Trọng lượng thị giác phân bố hợp lý quanh khung hình."
     },
     {
      "id": "rhythm",
      "name": "Nhịp điệu và dẫn mắt",
      "weight": 25,
      "method": "ai",
      "desc": "Đường dẫn, lặp lại và tương phản đưa mắt đi đúng hành trình dự định."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ thumbnail/bản cuối và đúng ràng buộc bố cục của đề."
     }
    ],
    "mistakes": [
     {
      "error": "Điểm nhấn bị cạnh tranh bởi chi tiết phụ",
      "cause": "Vùng phụ có tương phản và độ chi tiết ngang điểm nhấn.",
      "fix": "Giảm tương phản, giảm chi tiết ở vùng phụ, tăng tương phản tại điểm nhấn."
     },
     {
      "error": "Bố cục bị cắt vụn, mắt không có đường đi",
      "cause": "Các yếu tố đặt rời rạc, không có đường dẫn liên kết.",
      "fix": "Dùng cạnh, hướng nhìn hoặc mảng sáng tối nối các yếu tố thành một hành trình."
     },
     {
      "error": "Khung hình thừa khoảng trống vô nghĩa",
      "cause": "Đặt chủ thể theo thói quen ở giữa mà không tính không gian âm.",
      "fix": "Thử ít nhất ba thumbnail với vị trí chủ thể khác nhau trước khi vẽ bản cuối."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m09-l05",
    "title": "Kể chuyện thị giác và bố cục sáng tác hoàn chỉnh",
    "summary": "Xây dựng một bức tranh hoàn chỉnh có sự kiện, nhân vật và bối cảnh kể được một câu chuyện không cần chữ.",
    "objectives": [
     "Thiết kế được một cảnh mà người xem kể lại đúng sự kiện chính sau 10 giây xem",
     "Sử dụng ít nhất 3 yếu tố kể chuyện: hành động nhân vật, vật thể gợi bối cảnh, hướng nhìn",
     "Hoàn thiện bố cục qua đủ 3 vòng: thumbnail, dựng hình, hoàn thiện sắc độ"
    ],
    "difficulty": 4,
    "minutes": 75,
    "skills": [
     "composition",
     "anatomy",
     "perspective"
    ],
    "prereqLessons": [
     "m09-l04"
    ],
    "theory": "Kể chuyện thị giác là sắp xếp để người xem tự suy ra sự kiện, cảm xúc và quan hệ giữa các nhân vật mà không cần văn bản. Hành động đang dang dở gợi ý điều vừa xảy ra và sắp xảy ra tốt hơn hành động đã hoàn tất. Vật thể trong cảnh phải chọn lọc để gợi bối cảnh, mỗi vật thêm vào đều cần lý do tồn tại. Bài tổng hợp này đi qua trọn quy trình sáng tác: nhiều thumbnail, chọn một, dựng hình theo cấu trúc đã học, rồi hoàn thiện bằng sắc độ phục vụ điểm nhấn của câu chuyện.",
    "steps": [
     "Liệt kê câu chuyện trong một câu: ai, đang làm gì, điều gì sắp xảy ra",
     "Vẽ 4 thumbnail, chọn bản kể chuyện rõ nhất",
     "Dựng hình nhân vật và bối cảnh theo cấu trúc khối và phối cảnh",
     "Hoàn thiện sắc độ, dồn tương phản vào hành động chính của câu chuyện"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Kể chuyện thị giác và bố cục sáng tác hoàn chỉnh': bắt đầu từ bước 'Liệt kê câu chuyện trong một câu: ai, đang làm gì, điều gì sắp xảy ra', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Sáng tác một bức tranh kể chuyện hoàn chỉnh (một sự kiện, tối đa 2 nhân vật) qua đủ 3 vòng thumbnail, dựng hình, hoàn thiện; nộp kèm câu chuyện một câu của tranh.",
     "mode": "independent",
     "assessType": "composition",
     "target": {}
    },
    "rubric": [
     {
      "id": "focal",
      "name": "Điểm nhấn chính",
      "weight": 30,
      "method": "ai",
      "desc": "Điểm nhấn rõ nhất và được các yếu tố khác hỗ trợ."
     },
     {
      "id": "balance",
      "name": "Cân bằng thị giác",
      "weight": 25,
      "method": "hybrid",
      "desc": "Trọng lượng thị giác phân bố hợp lý quanh khung hình."
     },
     {
      "id": "rhythm",
      "name": "Nhịp điệu và dẫn mắt",
      "weight": 25,
      "method": "ai",
      "desc": "Đường dẫn, lặp lại và tương phản đưa mắt đi đúng hành trình dự định."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ thumbnail/bản cuối và đúng ràng buộc bố cục của đề."
     }
    ],
    "mistakes": [
     {
      "error": "Bố cục bị cắt vụn, mắt không có đường đi",
      "cause": "Các yếu tố đặt rời rạc, không có đường dẫn liên kết.",
      "fix": "Dùng cạnh, hướng nhìn hoặc mảng sáng tối nối các yếu tố thành một hành trình."
     },
     {
      "error": "Khung hình thừa khoảng trống vô nghĩa",
      "cause": "Đặt chủ thể theo thói quen ở giữa mà không tính không gian âm.",
      "fix": "Thử ít nhất ba thumbnail với vị trí chủ thể khác nhau trước khi vẽ bản cuối."
     },
     {
      "error": "Điểm nhấn bị cạnh tranh bởi chi tiết phụ",
      "cause": "Vùng phụ có tương phản và độ chi tiết ngang điểm nhấn.",
      "fix": "Giảm tương phản, giảm chi tiết ở vùng phụ, tăng tương phản tại điểm nhấn."
     }
    ],
    "passScore": 70
   }
  ]
 },
 {
  "id": "m10",
  "code": "10",
  "title": "Advanced Drawing",
  "description": "Tổng hợp nâng cao: dựng hình phức tạp, phối cảnh nâng cao, ánh sáng phức tạp, môi trường và đồ án cuối khóa.",
  "track": null,
  "lessons": [
   {
    "id": "m10-l01",
    "title": "Dựng hình phức tạp: vật thể nhiều khối giao nhau",
    "summary": "Dựng vật thể có các khối xuyên, giao và cắt nhau với đường xuyên kiểm soát toàn bộ.",
    "objectives": [
     "Dựng được một vật thể có ít nhất 2 khối giao nhau với đường giao tuyến đúng",
     "Giữ đường xuyên của cả hai khối nhất quán qua vùng giao",
     "Xác định được phần nào của mỗi khối bị khối kia che khuất"
    ],
    "difficulty": 4,
    "minutes": 60,
    "skills": [
     "form-construction",
     "perspective"
    ],
    "prereqLessons": [
     "m09-l05"
    ],
    "theory": "Khi hai khối giao nhau, bề mặt của chúng cắt nhau tạo đường giao tuyến mà vị trí của nó suy ra từ hình học của cả hai khối. Cách dựng an toàn là vẽ xuyên cả hai khối như thể chúng trong suốt, rồi mới quyết định phần nào bị che. Đoán đường giao tuyến theo cảm giác là nguyên nhân chính khiến vật thể phức tạp trông sai mà không rõ sai ở đâu. Kỹ thuật này áp dụng cho cổ chai giao thân chai, tay áo giao thân áo và mọi chi tiết cơ khí, kiến trúc.",
    "steps": [
     "Chọn vật thể có hai khối giao nhau (chai có cổ, ấm có vòi)",
     "Dựng xuyên cả hai khối bằng nét nhạt như vật trong suốt",
     "Tìm đường giao tuyến tại nơi hai bề mặt cắt nhau",
     "Tô đậm phần nhìn thấy, giữ phần xuyên ở lớp phác"
    ],
    "demo": {
     "kind": "cylinder",
     "note": "Trình diễn trực quan cho bài 'Dựng hình phức tạp: vật thể nhiều khối giao nhau': bắt đầu từ bước 'Chọn vật thể có hai khối giao nhau (chai có cổ, ấm có vòi)', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng một vật thể có ít nhất 2 khối giao nhau (ấm nước hoặc chai có cổ), nộp bản có lớp dựng xuyên và đường giao tuyến được đánh dấu.",
     "mode": "guided",
     "assessType": "form",
     "target": {}
    },
    "rubric": [
     {
      "id": "structure",
      "name": "Cấu trúc khối",
      "weight": 35,
      "method": "hybrid",
      "desc": "Khối được dựng từ hình cơ bản đúng trục và đúng quan hệ các mặt."
     },
     {
      "id": "axis",
      "name": "Trục và hướng khối",
      "weight": 25,
      "method": "geometry",
      "desc": "Trục chính, hướng xoay và độ nghiêng của khối khớp với mẫu."
     },
     {
      "id": "space",
      "name": "Tính nhất quán không gian",
      "weight": 25,
      "method": "hybrid",
      "desc": "Các khối con nằm đúng vị trí, không mâu thuẫn về chiều sâu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số khối và các bước dựng hình theo yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Khối bị xẹp, không có chiều sâu",
      "cause": "Các mặt bên bị thu hẹp vì không xác định trục và hướng xoay trước.",
      "fix": "Kẻ trục chính, vẽ mặt trước rồi mới kéo chiều sâu theo một hướng thống nhất."
     },
     {
      "error": "Các khối con không gắn được vào khối chính",
      "cause": "Vẽ từng khối rời rạc, không dùng đường gióng chung.",
      "fix": "Dựng khối bao tổng thể trước, chia vị trí khối con bằng đường gióng từ khối chính."
     },
     {
      "error": "Đường xuyên khối (cross-contour) sai hướng",
      "cause": "Vẽ đường cong trang trí thay vì bám theo bề mặt khối.",
      "fix": "Cho đường cross-contour ôm quanh trục, đổi hướng đúng tại cạnh của khối."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m10-l02",
    "title": "Phối cảnh nâng cao: bề mặt cong và cầu thang xoắn",
    "summary": "Áp dụng phối cảnh cho mặt cong, dốc nghiêng và các bậc thang xoay quanh trục.",
    "objectives": [
     "Dựng được một đường dốc nghiêng có điểm tụ riêng nằm trên đường thẳng đứng qua điểm tụ chính",
     "Vẽ được cầu thang cong 5 bậc với các bậc thu hẹp dần theo chiều sâu",
     "Giữ các ellipse trên bề mặt cong nhất quán với tầm mắt chung"
    ],
    "difficulty": 4,
    "minutes": 65,
    "skills": [
     "perspective"
    ],
    "prereqLessons": [
     "m10-l01"
    ],
    "theory": "Bề mặt nghiêng có điểm tụ riêng không nằm trên đường chân trời mà nằm trên đường thẳng đứng đi qua điểm tụ của hướng song song mặt đất tương ứng. Cầu thang xoắn kết hợp hai chuyển động: đi lên theo chiều cao và xoay quanh trục, nên mỗi bậc vừa tăng độ cao vừa xoay một góc đều. Bề mặt cong trong phối cảnh vẫn tuân theo luật ellipse: độ mở của mọi ellipse cùng cao độ tầm mắt phải nhất quán. Đây là nhóm bài phối cảnh khó nhất vì nhiều hệ gióng phải đúng đồng thời.",
    "steps": [
     "Vẽ đường chân trời, điểm tụ chính và đường dốc với điểm tụ phụ phía trên",
     "Dựng mặt dốc và một khối hộp trượt theo mặt dốc",
     "Đánh dấu trục giữa, vẽ 5 bậc cầu thang cong xoay quanh trục",
     "Kiểm tra ellipse và các cạnh bằng cách kéo dài về các điểm tụ"
    ],
    "demo": {
     "kind": "horizon",
     "note": "Trình diễn trực quan cho bài 'Phối cảnh nâng cao: bề mặt cong và cầu thang xoắn': bắt đầu từ bước 'Vẽ đường chân trời, điểm tụ chính và đường dốc với điểm tụ phụ phía trên', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng một cầu thang cong 5 bậc dẫn lên một mặt dốc, trong hệ phối cảnh có điểm tụ chính và điểm tụ dốc cho sẵn.",
     "mode": "assisted",
     "assessType": "perspective",
     "target": {
      "horizon": 420,
      "vp": {
       "x": 500,
       "y": 420
      },
      "vpSlope": {
       "x": 500,
       "y": 60
      }
     }
    },
    "rubric": [
     {
      "id": "converge",
      "name": "Hội tụ về điểm tụ",
      "weight": 35,
      "method": "geometry",
      "desc": "Các cạnh song song trong không gian hội tụ đúng về điểm tụ."
     },
     {
      "id": "horizon",
      "name": "Đường chân trời và điểm tụ",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí đường chân trời và điểm tụ đúng với thiết lập của bài."
     },
     {
      "id": "structure",
      "name": "Cấu trúc vật thể",
      "weight": 30,
      "method": "hybrid",
      "desc": "Vật thể giữ đúng tỷ lệ và cấu trúc khi đặt trong phối cảnh."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ các vật thể và đường gióng phối cảnh yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Đường chân trời đặt sai so với tầm mắt",
      "cause": "Đặt đường chân trời theo vị trí thuận tay thay vì theo cao độ mắt trong bài.",
      "fix": "Xác định tầm mắt trước, mọi điểm tụ của cạnh ngang phải nằm trên đường này."
     },
     {
      "error": "Vật ở xa lại to bằng vật ở gần",
      "cause": "Không thu nhỏ kích thước theo khoảng cách.",
      "fix": "Dùng hai đường gióng từ điểm tụ để khóa chiều cao của vật ở từng vị trí sâu."
     },
     {
      "error": "Cạnh không hội tụ về cùng một điểm tụ",
      "cause": "Mỗi cạnh được vẽ theo cảm giác riêng, không gióng về điểm tụ.",
      "fix": "Kéo dài mọi cạnh thuộc cùng nhóm song song và kiểm tra chúng gặp nhau tại điểm tụ."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m10-l03",
    "title": "Ánh sáng phức tạp: hai nguồn sáng và sáng phản chiếu mạnh",
    "summary": "Phân tích cảnh có nguồn sáng chính, nguồn sáng phụ và bề mặt phản chiếu lẫn nhau.",
    "objectives": [
     "Phân tích được cảnh 2 nguồn sáng thành vùng của sáng chính, vùng sáng phụ và vùng tối chung",
     "Giữ sáng phụ yếu hơn sáng chính ở mọi điểm trên cùng bề mặt",
     "Vẽ được một vùng sáng phản chiếu từ vật sáng màu sang vật kề bên (color bleeding đơn giản)"
    ],
    "difficulty": 4,
    "minutes": 65,
    "skills": [
     "value-shading",
     "color"
    ],
    "prereqLessons": [
     "m10-l02"
    ],
    "theory": "Với hai nguồn sáng, mỗi bề mặt nhận sáng từ cả hai nguồn với cường độ khác nhau, và vùng tối thật sự chỉ còn lại nơi cả hai nguồn đều không chiếu tới. Nguyên tắc phân cấp là bắt buộc: chọn một nguồn làm chính, nguồn còn lại yếu hơn rõ rệt, nếu không bài vẽ sẽ có hai hệ bóng mâu thuẫn. Vật sáng màu còn phản chiếu một phần màu của nó sang vật kề bên, hiện tượng này mạnh nhất ở vùng tiếp giáp. Hãy phân tích bằng sơ đồ vùng trước khi tô bất kỳ chi tiết nào.",
    "steps": [
     "Vẽ sơ đồ cảnh, đánh dấu hai nguồn sáng và hướng của chúng",
     "Chia bề mặt các vật thành 3 loại vùng: sáng chính, sáng phụ, tối chung",
     "Tô theo sơ đồ, giữ sáng phụ luôn yếu hơn sáng chính",
     "Thêm vệt phản chiếu màu tại vùng tiếp giáp hai vật"
    ],
    "demo": {
     "kind": "value-scale",
     "note": "Trình diễn trực quan cho bài 'Ánh sáng phức tạp: hai nguồn sáng và sáng phản chiếu mạnh': bắt đầu từ bước 'Vẽ sơ đồ cảnh, đánh dấu hai nguồn sáng và hướng của chúng', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Diễn tả tĩnh vật 2 vật thể dưới hai nguồn sáng (đèn ấm và cửa sổ lạnh), nộp kèm sơ đồ phân vùng sáng đã lập trước khi tô.",
     "mode": "assisted",
     "assessType": "value",
     "target": {}
    },
    "rubric": [
     {
      "id": "group",
      "name": "Phân nhóm sáng tối",
      "weight": 30,
      "method": "cv",
      "desc": "Các mảng sáng, trung gian và tối tách bạch, đúng số bậc yêu cầu."
     },
     {
      "id": "light",
      "name": "Nhất quán hướng sáng",
      "weight": 25,
      "method": "hybrid",
      "desc": "Mọi vùng bóng đều suy ra được từ cùng một nguồn sáng."
     },
     {
      "id": "transition",
      "name": "Chuyển sắc độ",
      "weight": 25,
      "method": "cv",
      "desc": "Chuyển bậc mượt hoặc đúng tính chất cứng/mềm theo yêu cầu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ vùng diễn tả và đúng đối tượng của bài."
     }
    ],
    "mistakes": [
     {
      "error": "Chuyển sắc độ bị bẩn, lem nhem",
      "cause": "Di bút qua lại nhiều lần với lực không đều.",
      "fix": "Tô một chiều, chồng lớp nhẹ nhiều lần, mỗi lớp chờ kiểm tra bậc giá trị."
     },
     {
      "error": "Vùng tối và vùng trung gian lẫn vào nhau",
      "cause": "Tô theo cảm giác từng chỗ, không lập thang giá trị trước.",
      "fix": "Lập thang 5 bậc ở mép giấy, gán mỗi vùng một bậc rồi mới tô."
     },
     {
      "error": "Bóng đổ ngược hướng với bóng trên vật",
      "cause": "Vẽ bóng đổ sau cùng mà không suy ra từ nguồn sáng đã chọn.",
      "fix": "Vẽ mũi tên hướng sáng lên góc bài, mọi bóng phải nhất quán với mũi tên đó."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m10-l04",
    "title": "Dựng môi trường hoàn chỉnh",
    "summary": "Xây dựng một không gian môi trường (phòng, phố, nội thất) có phối cảnh, vật thể và ánh sáng thống nhất.",
    "objectives": [
     "Dựng được một môi trường có ít nhất 8 vật thể chia sẻ cùng hệ phối cảnh",
     "Thể hiện được 3 lớp chiều sâu tiền cảnh, trung cảnh, hậu cảnh phân biệt rõ",
     "Áp dụng phối cảnh khí quyển đơn giản: lớp xa nhạt và ít chi tiết hơn lớp gần"
    ],
    "difficulty": 4,
    "minutes": 75,
    "skills": [
     "perspective",
     "composition",
     "value-shading"
    ],
    "prereqLessons": [
     "m10-l03"
    ],
    "theory": "Môi trường hoàn chỉnh là bài kiểm tra khả năng giữ một hệ thống nhất quán ở quy mô lớn: một đường chân trời, một tầm mắt, một nguồn sáng cho hàng chục vật thể. Ba lớp chiều sâu giúp tổ chức không gian: tiền cảnh gần và đậm, trung cảnh chứa chủ thể chính, hậu cảnh xa và nhạt dần do phối cảnh khí quyển. Vật thể ở mỗi lớp phải tuân theo lưới sàn chung để không gian không bị vỡ thành các mảnh riêng lẻ. Hãy dựng lưới không gian và đặt mọi vật vào lưới trước khi vẽ chi tiết bất kỳ vật nào.",
    "steps": [
     "Thiết lập đường chân trời, điểm tụ và lưới sàn cho toàn cảnh",
     "Chia khung thành 3 lớp sâu, đặt chủ thể chính ở trung cảnh",
     "Đặt ít nhất 8 vật thể vào lưới, kiểm tra điểm tiếp đất từng vật",
     "Hoàn thiện với lớp xa nhạt hơn, ít chi tiết hơn lớp gần"
    ],
    "demo": {
     "kind": "horizon",
     "note": "Trình diễn trực quan cho bài 'Dựng môi trường hoàn chỉnh': bắt đầu từ bước 'Thiết lập đường chân trời, điểm tụ và lưới sàn cho toàn cảnh', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng hoàn chỉnh một góc phố hoặc căn phòng có tối thiểu 8 vật thể, 3 lớp chiều sâu và một nguồn sáng thống nhất.",
     "mode": "assisted",
     "assessType": "perspective",
     "target": {
      "horizon": 360,
      "vp": {
       "x": 480,
       "y": 360
      }
     }
    },
    "rubric": [
     {
      "id": "converge",
      "name": "Hội tụ về điểm tụ",
      "weight": 35,
      "method": "geometry",
      "desc": "Các cạnh song song trong không gian hội tụ đúng về điểm tụ."
     },
     {
      "id": "horizon",
      "name": "Đường chân trời và điểm tụ",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí đường chân trời và điểm tụ đúng với thiết lập của bài."
     },
     {
      "id": "structure",
      "name": "Cấu trúc vật thể",
      "weight": 30,
      "method": "hybrid",
      "desc": "Vật thể giữ đúng tỷ lệ và cấu trúc khi đặt trong phối cảnh."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ các vật thể và đường gióng phối cảnh yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Cạnh không hội tụ về cùng một điểm tụ",
      "cause": "Mỗi cạnh được vẽ theo cảm giác riêng, không gióng về điểm tụ.",
      "fix": "Kéo dài mọi cạnh thuộc cùng nhóm song song và kiểm tra chúng gặp nhau tại điểm tụ."
     },
     {
      "error": "Đường chân trời đặt sai so với tầm mắt",
      "cause": "Đặt đường chân trời theo vị trí thuận tay thay vì theo cao độ mắt trong bài.",
      "fix": "Xác định tầm mắt trước, mọi điểm tụ của cạnh ngang phải nằm trên đường này."
     },
     {
      "error": "Vật ở xa lại to bằng vật ở gần",
      "cause": "Không thu nhỏ kích thước theo khoảng cách.",
      "fix": "Dùng hai đường gióng từ điểm tụ để khóa chiều cao của vật ở từng vị trí sâu."
     }
    ],
    "passScore": 70
   },
   {
    "id": "m10-l05",
    "title": "Đồ án cuối khóa (Capstone): bức tranh hoàn chỉnh",
    "summary": "Thực hiện một bức tranh hoàn chỉnh từ ý tưởng tới hoàn thiện, áp dụng toàn bộ chương trình nền tảng.",
    "objectives": [
     "Hoàn thành một bức tranh qua đủ 4 giai đoạn có lưu vết: thumbnail, dựng hình, sắc độ, hoàn thiện",
     "Áp dụng được ít nhất 5 kỹ năng nền tảng khác nhau và ghi rõ chúng trong bản thuyết minh",
     "Tự đánh giá bài theo rubric và đề xuất được một bài luyện tiếp theo cho điểm yếu nhất"
    ],
    "difficulty": 5,
    "minutes": 120,
    "skills": [
     "composition",
     "form-construction",
     "value-shading",
     "observation"
    ],
    "prereqLessons": [
     "m10-l04"
    ],
    "theory": "Đồ án cuối khóa không kiểm tra một kỹ thuật riêng lẻ mà kiểm tra khả năng điều phối toàn bộ quy trình sáng tác như một họa sĩ độc lập. Mỗi giai đoạn phải để lại dấu vết kiểm chứng được: bộ thumbnail đã chọn, bản dựng hình có cấu trúc, sơ đồ sắc độ và bản hoàn thiện. Thuyết minh đi kèm quan trọng không kém bức tranh, vì nó chứng minh các quyết định là có chủ đích chứ không phải may rủi. Điểm yếu tự nhận ra trong bài này sẽ trở thành điểm bắt đầu của lộ trình chuyên ngành tiếp theo.",
    "steps": [
     "Viết ý tưởng một câu và vẽ bộ thumbnail chọn bố cục",
     "Dựng hình hoàn chỉnh với cấu trúc khối và phối cảnh",
     "Lập sơ đồ sắc độ, hoàn thiện bức tranh theo sơ đồ",
     "Viết thuyết minh: 5 kỹ năng đã áp dụng, điểm yếu nhất, bài luyện tiếp theo"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Đồ án cuối khóa (Capstone): bức tranh hoàn chỉnh': bắt đầu từ bước 'Viết ý tưởng một câu và vẽ bộ thumbnail chọn bố cục', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Hoàn thành một bức tranh đề tài tự chọn qua đủ 4 giai đoạn (thumbnail, dựng hình, sắc độ, hoàn thiện), nộp cả 4 giai đoạn kèm thuyết minh một trang.",
     "mode": "independent",
     "assessType": "free",
     "target": {}
    },
    "rubric": [
     {
      "id": "idea",
      "name": "Ý tưởng và yêu cầu đề",
      "weight": 30,
      "method": "ai",
      "desc": "Bài thể hiện rõ ý tưởng và đáp ứng đúng đề bài tự do."
     },
     {
      "id": "tech",
      "name": "Kỹ thuật thể hiện",
      "weight": 30,
      "method": "hybrid",
      "desc": "Kỹ thuật trọng tâm của bài được áp dụng nhất quán."
     },
     {
      "id": "coherence",
      "name": "Tính nhất quán tổng thể",
      "weight": 25,
      "method": "ai",
      "desc": "Hình, sắc độ/màu và bố cục thuộc cùng một tổng thể."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Bài hoàn chỉnh, không bỏ dở phần chính nào."
     }
    ],
    "mistakes": [
     {
      "error": "Bài lạc khỏi kỹ thuật trọng tâm của bài học",
      "cause": "Mải theo ý tưởng mà quên yêu cầu kỹ thuật cần luyện.",
      "fix": "Viết kỹ thuật trọng tâm ra mép giấy và kiểm tra lại sau mỗi giai đoạn vẽ."
     },
     {
      "error": "Bài bỏ dở ở phần khó nhất",
      "cause": "Bắt đầu từ phần dễ và chi tiết, hết thời gian cho phần cấu trúc.",
      "fix": "Dựng toàn bộ cấu trúc trước, chỉ chi tiết hóa khi tổng thể đã đứng vững."
     }
    ],
    "passScore": 70
   }
  ]
 }
];

export const TRACKS = [
 {
  "id": "t-portrait",
  "title": "Portrait Drawing",
  "description": "Vẽ chân dung người: cấu trúc đầu, tỷ lệ khuôn mặt, đặc điểm ngũ quan và biểu cảm. Yêu cầu nền tảng về tỷ lệ, dựng khối và sắc độ.",
  "prereqSkills": [
   "proportion",
   "form-construction",
   "value-shading"
  ],
  "lessons": [
   {
    "id": "t-portrait-l01",
    "title": "Tỷ lệ khuôn mặt nhìn thẳng",
    "summary": "Các mốc chia khuôn mặt: chân tóc, chân mày, chân mũi, cằm và vị trí tai.",
    "objectives": [
     "Chia được khuôn mặt thẳng thành 3 phần bằng nhau theo chiều dọc",
     "Đặt được hai mắt cách nhau đúng một mắt tại đường mắt",
     "Xác định đúng vị trí tai nằm giữa đường chân mày và chân mũi"
    ],
    "difficulty": 3,
    "minutes": 50,
    "skills": [
     "proportion",
     "anatomy"
    ],
    "prereqLessons": [
     "m08-l02"
    ],
    "theory": "Khuôn mặt nhìn thẳng có hệ mốc khá ổn định: chiều dài mặt chia ba phần gần bằng nhau bởi chân tóc, chân mày, chân mũi và cằm. Hai mắt nằm trên đường giữa của tổng chiều dài mặt và cách nhau đúng một chiều rộng mắt. Tai kéo dài từ đường chân mày tới đường chân mũi, chi tiết thường bị đặt sai nhất. Các mốc này là điểm khởi hành để đo, khuôn mặt thật luôn lệch khỏi chuẩn ở vài điểm và chính độ lệch đó tạo nên nét riêng của người mẫu.",
    "steps": [
     "Vẽ trục dọc và hình oval khung mặt",
     "Chia chiều dài mặt thành 3 phần, kẻ các đường mốc ngang",
     "Đặt đường mắt, hai mắt cách nhau một mắt, đường chân mũi và miệng",
     "Đánh dấu vị trí tai hai bên và kiểm tra các mốc bằng đo lại"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Tỷ lệ khuôn mặt nhìn thẳng': bắt đầu từ bước 'Vẽ trục dọc và hình oval khung mặt', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng khuôn mặt nhìn thẳng đúng hệ mốc chia ba, nộp bản có giữ toàn bộ đường mốc và lưới chia tỷ lệ.",
     "mode": "guided",
     "assessType": "shape",
     "target": {
      "x": 300,
      "y": 80,
      "w": 400,
      "h": 840
     }
    },
    "rubric": [
     {
      "id": "shape",
      "name": "Độ chính xác hình dạng",
      "weight": 35,
      "method": "geometry",
      "desc": "Độ khớp của đường bao với hình mẫu."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ các phần",
      "weight": 30,
      "method": "geometry",
      "desc": "Quan hệ chiều rộng, chiều cao và kích thước tương đối."
     },
     {
      "id": "align",
      "name": "Căn chỉnh và đối xứng",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí các mốc, trục đối xứng và độ thẳng hàng."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đầy đủ các chi tiết cấu trúc mà đề bài yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Hình đúng nét nhưng sai tỷ lệ tổng thể",
      "cause": "Vẽ chi tiết từng cạnh mà không khóa khung bao ngoài trước.",
      "fix": "Dựng khung bao (bounding box) và chia tỷ lệ khung trước khi vẽ đường bao."
     },
     {
      "error": "Đối xứng hai bên bị lệch",
      "cause": "Vẽ hoàn thiện một bên rồi đoán bên còn lại.",
      "fix": "Kẻ trục đối xứng, đánh dấu các cặp điểm ngang nhau rồi mới nối."
     },
     {
      "error": "Không gian âm bị bỏ qua",
      "cause": "Chỉ nhìn vật thể, không nhìn hình của khoảng trống xung quanh.",
      "fix": "Vẽ thêm hình của khoảng trống giữa các bộ phận và đối chiếu với mẫu."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-portrait-l02",
    "title": "Dựng đầu ở góc 3/4 và góc nghiêng",
    "summary": "Xoay cấu trúc đầu sang góc 3/4 và profile với các đường cong mặt bám bề mặt.",
    "objectives": [
     "Dựng được đầu 3/4 mà đường giữa mặt cong đúng theo bề mặt hộp sọ",
     "Giữ hai mắt trên cùng một đường cong vòng quanh đầu ở góc 3/4",
     "Vẽ được profile có trán, mũi, môi, cằm nối thành một đường biên hợp lý"
    ],
    "difficulty": 3,
    "minutes": 55,
    "skills": [
     "anatomy",
     "form-construction"
    ],
    "prereqLessons": [
     "t-portrait-l01"
    ],
    "theory": "Khi đầu xoay, đường giữa mặt không còn thẳng mà cong theo bề mặt hình cầu của hộp sọ, và phía mặt xa bị thu hẹp lại. Ở góc 3/4, mắt phía xa nhỏ hơn và gần đường giữa hơn mắt phía gần, cả hai vẫn nằm trên một đường cong chung vòng quanh đầu. Profile là bài kiểm tra đường biên: trán, hốc mắt, mũi, môi và cằm phải nối thành một nhịp cong gãy hợp lý. Mọi góc đều bắt đầu từ cùng cấu trúc cầu-hộp đã học, chỉ thay đổi hướng trục.",
    "steps": [
     "Dựng khối cầu-hộp với trục mặt hướng sang góc 3/4",
     "Kẻ đường giữa mặt cong theo bề mặt và đường chân mày",
     "Đặt mắt, mũi, miệng dọc theo các đường cong mặt",
     "Vẽ thêm bản profile từ cùng cấu trúc, hoàn thiện đường biên"
    ],
    "demo": {
     "kind": "sphere",
     "note": "Trình diễn trực quan cho bài 'Dựng đầu ở góc 3/4 và góc nghiêng': bắt đầu từ bước 'Dựng khối cầu-hộp với trục mặt hướng sang góc 3/4', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng đầu người ở góc 3/4 và góc profile từ cấu trúc cầu-hộp, nộp cả hai bản có giữ đường cong mặt.",
     "mode": "assisted",
     "assessType": "form",
     "target": {}
    },
    "rubric": [
     {
      "id": "structure",
      "name": "Cấu trúc khối",
      "weight": 35,
      "method": "hybrid",
      "desc": "Khối được dựng từ hình cơ bản đúng trục và đúng quan hệ các mặt."
     },
     {
      "id": "axis",
      "name": "Trục và hướng khối",
      "weight": 25,
      "method": "geometry",
      "desc": "Trục chính, hướng xoay và độ nghiêng của khối khớp với mẫu."
     },
     {
      "id": "space",
      "name": "Tính nhất quán không gian",
      "weight": 25,
      "method": "hybrid",
      "desc": "Các khối con nằm đúng vị trí, không mâu thuẫn về chiều sâu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số khối và các bước dựng hình theo yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Các khối con không gắn được vào khối chính",
      "cause": "Vẽ từng khối rời rạc, không dùng đường gióng chung.",
      "fix": "Dựng khối bao tổng thể trước, chia vị trí khối con bằng đường gióng từ khối chính."
     },
     {
      "error": "Đường xuyên khối (cross-contour) sai hướng",
      "cause": "Vẽ đường cong trang trí thay vì bám theo bề mặt khối.",
      "fix": "Cho đường cross-contour ôm quanh trục, đổi hướng đúng tại cạnh của khối."
     },
     {
      "error": "Khối bị xẹp, không có chiều sâu",
      "cause": "Các mặt bên bị thu hẹp vì không xác định trục và hướng xoay trước.",
      "fix": "Kẻ trục chính, vẽ mặt trước rồi mới kéo chiều sâu theo một hướng thống nhất."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-portrait-l03",
    "title": "Vẽ mắt, mũi, miệng theo cấu trúc",
    "summary": "Dựng từng bộ phận ngũ quan như khối 3D thay vì ký hiệu 2D: nhãn cầu, chóp mũi, khối môi.",
    "objectives": [
     "Dựng được mắt từ nhãn cầu cầu và mí mắt ôm theo cầu",
     "Vẽ được mũi bằng các mặt phẳng: sống, chóp, cánh và đáy mũi",
     "Dựng được miệng theo khối môi trên-dưới và đường giữa cong theo mặt"
    ],
    "difficulty": 3,
    "minutes": 55,
    "skills": [
     "anatomy",
     "form-construction"
    ],
    "prereqLessons": [
     "t-portrait-l02"
    ],
    "theory": "Ngũ quan là các khối 3D nhỏ gắn trên bề mặt cong của đầu, không phải ký hiệu phẳng dán lên mặt. Mắt là nhãn cầu hình cầu bị mí mắt ôm một phần, mũi là tổ hợp mặt phẳng có chóp và cánh, miệng nằm trên bề mặt cong nên đường giữa của môi cong theo mặt. Vẽ từng bộ phận riêng lẻ để hiểu cấu trúc của nó, luôn đặt trong quan hệ với đường mốc chung của đầu. Khi hiểu khối, bạn sẽ vẽ được ngũ quan dưới ánh sáng thay vì chỉ vẽ đường viền.",
    "steps": [
     "Vẽ nhãn cầu cầu, thêm mí trên và mí dưới ôm theo cầu",
     "Dựng mũi: kẻ trục, khối chóp, hai cánh và mặt đáy có lỗ mũi",
     "Dựng miệng: đường giữa cong, khối môi trên và môi dưới",
     "Ghép cả ba bộ phận lên một đầu phác, kiểm tra vị trí theo mốc"
    ],
    "demo": {
     "kind": "sphere",
     "note": "Trình diễn trực quan cho bài 'Vẽ mắt, mũi, miệng theo cấu trúc': bắt đầu từ bước 'Vẽ nhãn cầu cầu, thêm mí trên và mí dưới ôm theo cầu', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Nộp bộ nghiên cứu ngũ quan: một mắt, một mũi, một miệng đều dựng theo cấu trúc khối, mỗi bộ phận ở 2 góc nhìn.",
     "mode": "assisted",
     "assessType": "form",
     "target": {}
    },
    "rubric": [
     {
      "id": "structure",
      "name": "Cấu trúc khối",
      "weight": 35,
      "method": "hybrid",
      "desc": "Khối được dựng từ hình cơ bản đúng trục và đúng quan hệ các mặt."
     },
     {
      "id": "axis",
      "name": "Trục và hướng khối",
      "weight": 25,
      "method": "geometry",
      "desc": "Trục chính, hướng xoay và độ nghiêng của khối khớp với mẫu."
     },
     {
      "id": "space",
      "name": "Tính nhất quán không gian",
      "weight": 25,
      "method": "hybrid",
      "desc": "Các khối con nằm đúng vị trí, không mâu thuẫn về chiều sâu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số khối và các bước dựng hình theo yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Đường xuyên khối (cross-contour) sai hướng",
      "cause": "Vẽ đường cong trang trí thay vì bám theo bề mặt khối.",
      "fix": "Cho đường cross-contour ôm quanh trục, đổi hướng đúng tại cạnh của khối."
     },
     {
      "error": "Khối bị xẹp, không có chiều sâu",
      "cause": "Các mặt bên bị thu hẹp vì không xác định trục và hướng xoay trước.",
      "fix": "Kẻ trục chính, vẽ mặt trước rồi mới kéo chiều sâu theo một hướng thống nhất."
     },
     {
      "error": "Các khối con không gắn được vào khối chính",
      "cause": "Vẽ từng khối rời rạc, không dùng đường gióng chung.",
      "fix": "Dựng khối bao tổng thể trước, chia vị trí khối con bằng đường gióng từ khối chính."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-portrait-l04",
    "title": "Sắc độ chân dung và mặt phẳng của đầu",
    "summary": "Chia đầu thành các mặt phẳng lớn và diễn tả bằng sắc độ theo một nguồn sáng.",
    "objectives": [
     "Chia được đầu thành các mặt phẳng chính (trán, má, hàm, mặt bên) trên bản dựng",
     "Gán được bậc giá trị cho từng mặt phẳng theo hướng sáng cho sẵn",
     "Giữ điểm nhấn sáng tối mạnh nhất tại vùng mắt-mũi"
    ],
    "difficulty": 4,
    "minutes": 60,
    "skills": [
     "value-shading",
     "anatomy"
    ],
    "prereqLessons": [
     "t-portrait-l03"
    ],
    "theory": "Đầu người có thể rút gọn thành một hệ mặt phẳng như tượng thạch cao: trán hướng lên, má hướng ngang, mặt bên quay lưng với sáng. Mỗi mặt phẳng nhận một bậc giá trị theo góc của nó với nguồn sáng, giống nguyên tắc mặt phẳng của khối hộp nhưng tinh tế hơn. Diễn tả chân dung bằng mặt phẳng trước giúp tránh lỗi tô mịn đều khắp mặt làm mất cấu trúc xương. Chi tiết ngũ quan chỉ nên thêm sau khi các mặt phẳng lớn đã đứng vững.",
    "steps": [
     "Dựng đầu góc 3/4 từ cấu trúc cầu-hộp",
     "Chia đầu thành các mặt phẳng lớn bằng đường thẳng",
     "Gán bậc giá trị cho từng mặt theo hướng sáng trên-trái",
     "Tô theo mặt phẳng, thêm chi tiết ngũ quan ở bước cuối"
    ],
    "demo": {
     "kind": "value-scale",
     "note": "Trình diễn trực quan cho bài 'Sắc độ chân dung và mặt phẳng của đầu': bắt đầu từ bước 'Dựng đầu góc 3/4 từ cấu trúc cầu-hộp', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Diễn tả một đầu người góc 3/4 bằng sắc độ theo mặt phẳng dưới một nguồn sáng, nộp kèm bản chia mặt phẳng chưa tô.",
     "mode": "assisted",
     "assessType": "value",
     "target": {}
    },
    "rubric": [
     {
      "id": "group",
      "name": "Phân nhóm sáng tối",
      "weight": 30,
      "method": "cv",
      "desc": "Các mảng sáng, trung gian và tối tách bạch, đúng số bậc yêu cầu."
     },
     {
      "id": "light",
      "name": "Nhất quán hướng sáng",
      "weight": 25,
      "method": "hybrid",
      "desc": "Mọi vùng bóng đều suy ra được từ cùng một nguồn sáng."
     },
     {
      "id": "transition",
      "name": "Chuyển sắc độ",
      "weight": 25,
      "method": "cv",
      "desc": "Chuyển bậc mượt hoặc đúng tính chất cứng/mềm theo yêu cầu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ vùng diễn tả và đúng đối tượng của bài."
     }
    ],
    "mistakes": [
     {
      "error": "Vùng tối và vùng trung gian lẫn vào nhau",
      "cause": "Tô theo cảm giác từng chỗ, không lập thang giá trị trước.",
      "fix": "Lập thang 5 bậc ở mép giấy, gán mỗi vùng một bậc rồi mới tô."
     },
     {
      "error": "Bóng đổ ngược hướng với bóng trên vật",
      "cause": "Vẽ bóng đổ sau cùng mà không suy ra từ nguồn sáng đã chọn.",
      "fix": "Vẽ mũi tên hướng sáng lên góc bài, mọi bóng phải nhất quán với mũi tên đó."
     },
     {
      "error": "Chuyển sắc độ bị bẩn, lem nhem",
      "cause": "Di bút qua lại nhiều lần với lực không đều.",
      "fix": "Tô một chiều, chồng lớp nhẹ nhiều lần, mỗi lớp chờ kiểm tra bậc giá trị."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-portrait-l05",
    "title": "Chân dung hoàn chỉnh từ ảnh mẫu",
    "summary": "Vẽ một chân dung hoàn chỉnh từ ảnh tham chiếu qua đủ các giai đoạn đo, dựng, sắc độ.",
    "objectives": [
     "Hoàn thành chân dung giống mẫu ở các mốc tỷ lệ chính (sai lệch mốc dưới 10%)",
     "Diễn tả được đặc điểm riêng của người mẫu thay vì khuôn mặt chung chung",
     "Giữ một nguồn sáng nhất quán trên toàn bộ chân dung"
    ],
    "difficulty": 4,
    "minutes": 75,
    "skills": [
     "anatomy",
     "observation",
     "value-shading"
    ],
    "prereqLessons": [
     "t-portrait-l04"
    ],
    "theory": "Chân dung hoàn chỉnh là quá trình trừ dần: bắt đầu từ mốc tỷ lệ chuẩn, sau đó sửa từng mốc theo độ lệch thật của người mẫu, vì nét riêng nằm ở chính những độ lệch đó. Đo liên tục trong suốt quá trình vẽ, không chỉ ở bước dựng đầu tiên, vì lỗi nhỏ ở mốc đầu sẽ phóng đại ở các bước sau. Sắc độ phục vụ cấu trúc đầu trước, phục vụ sự giống sau. Kết thúc bài, hãy đặt bản vẽ cạnh ảnh mẫu và kiểm tra lần lượt từng quan hệ thay vì nhìn tổng thể mơ hồ.",
    "steps": [
     "Chọn ảnh mẫu rõ sáng tối, in hoặc mở cạnh giấy vẽ",
     "Dựng đầu và các mốc mặt theo hệ chia ba, đo lệch của mẫu",
     "Sửa các mốc theo người mẫu, dựng ngũ quan theo cấu trúc",
     "Hoàn thiện sắc độ theo mặt phẳng, đối chiếu ảnh mẫu lần cuối"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Chân dung hoàn chỉnh từ ảnh mẫu': bắt đầu từ bước 'Chọn ảnh mẫu rõ sáng tối, in hoặc mở cạnh giấy vẽ', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ hoàn chỉnh một chân dung từ ảnh tham chiếu tự chọn (góc thẳng hoặc 3/4), nộp bản vẽ kèm ảnh mẫu thu nhỏ để đối chiếu.",
     "mode": "independent",
     "assessType": "free",
     "target": {}
    },
    "rubric": [
     {
      "id": "idea",
      "name": "Ý tưởng và yêu cầu đề",
      "weight": 30,
      "method": "ai",
      "desc": "Bài thể hiện rõ ý tưởng và đáp ứng đúng đề bài tự do."
     },
     {
      "id": "tech",
      "name": "Kỹ thuật thể hiện",
      "weight": 30,
      "method": "hybrid",
      "desc": "Kỹ thuật trọng tâm của bài được áp dụng nhất quán."
     },
     {
      "id": "coherence",
      "name": "Tính nhất quán tổng thể",
      "weight": 25,
      "method": "ai",
      "desc": "Hình, sắc độ/màu và bố cục thuộc cùng một tổng thể."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Bài hoàn chỉnh, không bỏ dở phần chính nào."
     }
    ],
    "mistakes": [
     {
      "error": "Bài lạc khỏi kỹ thuật trọng tâm của bài học",
      "cause": "Mải theo ý tưởng mà quên yêu cầu kỹ thuật cần luyện.",
      "fix": "Viết kỹ thuật trọng tâm ra mép giấy và kiểm tra lại sau mỗi giai đoạn vẽ."
     },
     {
      "error": "Bài bỏ dở ở phần khó nhất",
      "cause": "Bắt đầu từ phần dễ và chi tiết, hết thời gian cho phần cấu trúc.",
      "fix": "Dựng toàn bộ cấu trúc trước, chỉ chi tiết hóa khi tổng thể đã đứng vững."
     }
    ],
    "passScore": 70
   }
  ]
 },
 {
  "id": "t-anime",
  "title": "Anime & Manga",
  "description": "Vẽ nhân vật anime/manga: tỷ lệ phong cách hóa, khuôn mặt anime, tóc, trang phục và dáng nhân vật.",
  "prereqSkills": [
   "proportion",
   "anatomy",
   "line-control"
  ],
  "lessons": [
   {
    "id": "t-anime-l01",
    "title": "Tỷ lệ nhân vật anime và chibi",
    "summary": "Hệ tỷ lệ đầu thân phong cách hóa: 6-7 đầu cho nhân vật thường, 2-3 đầu cho chibi.",
    "objectives": [
     "Dựng được nhân vật anime đứng đúng tỷ lệ 6.5 đầu với các mốc khớp vị trí",
     "Vẽ được cùng nhân vật ở dạng chibi 2.5 đầu giữ đúng đặc điểm nhận diện",
     "So sánh được 3 điểm khác biệt tỷ lệ giữa anime và người thật"
    ],
    "difficulty": 2,
    "minutes": 45,
    "skills": [
     "anatomy",
     "proportion"
    ],
    "prereqLessons": [
     "m08-l02"
    ],
    "theory": "Anime dùng cùng logic đơn vị đầu như hình họa thật nhưng thay đổi các hệ số: nhân vật thường khoảng 6-7 đầu, mắt to hơn, cằm nhọn hơn và chân thường dài tương đối hơn. Chibi nén cơ thể xuống 2-3 đầu, đầu chiếm tỷ trọng lớn và chi tiết được đơn giản hóa mạnh. Vì hệ mốc vẫn nhất quán, nhân vật phong cách hóa vẫn cần dựng khung tỷ lệ trước như vẽ người thật. Bỏ qua khung tỷ lệ là lý do nhân vật anime của người mới thường bị lệch khớp và mất cân bằng.",
    "steps": [
     "Chia chiều cao thành 6.5 đơn vị đầu, đánh dấu mốc vai, chậu, gối",
     "Dựng khung người bằng đoạn thẳng và khối đơn giản",
     "Vẽ lại cùng nhân vật ở tỷ lệ chibi 2.5 đầu bên cạnh",
     "Hoàn thiện đường bao cả hai phiên bản, giữ đặc điểm chung"
    ],
    "demo": {
     "kind": "gesture",
     "note": "Trình diễn trực quan cho bài 'Tỷ lệ nhân vật anime và chibi': bắt đầu từ bước 'Chia chiều cao thành 6.5 đơn vị đầu, đánh dấu mốc vai, chậu, gối', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Dựng một nhân vật anime nguyên bản ở tỷ lệ 6.5 đầu và phiên bản chibi 2.5 đầu của chính nhân vật đó, giữ lưới chia đơn vị trong bản nộp.",
     "mode": "guided",
     "assessType": "gesture",
     "target": {}
    },
    "rubric": [
     {
      "id": "action",
      "name": "Đường hành động",
      "weight": 30,
      "method": "hybrid",
      "desc": "Đường hành động liền mạch, thể hiện hướng chuyển động chính."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ cơ thể",
      "weight": 30,
      "method": "geometry",
      "desc": "Tỷ lệ đầu-thân-chân tay khớp mốc giải phẫu của bài."
     },
     {
      "id": "rhythm",
      "name": "Nhịp điệu và cân bằng",
      "weight": 25,
      "method": "ai",
      "desc": "Dáng có nhịp cong đối ứng, trọng tâm rơi hợp lý."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số dáng, đủ thời lượng và đúng tư thế yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Dáng cứng như người que thẳng đứng",
      "cause": "Vẽ từng bộ phận thẳng hàng, bỏ qua đường hành động.",
      "fix": "Vẽ đường hành động cong liền mạch trước, mọi bộ phận bám theo đường này."
     },
     {
      "error": "Tỷ lệ thân và chân sai lệch",
      "cause": "Bắt đầu từ chi tiết đầu mà không chia mốc toàn thân.",
      "fix": "Chia chiều cao toàn thân thành các đơn vị đầu, đánh dấu mốc vai, hông, gối trước."
     },
     {
      "error": "Dáng mất cân bằng, như sắp ngã",
      "cause": "Trọng tâm vẽ ra ngoài đế đỡ mà không có ý đồ động.",
      "fix": "Kẻ đường dọi từ cổ xuống, kiểm tra nó rơi vào vùng đế đỡ của hai chân."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-anime-l02",
    "title": "Khuôn mặt anime: mắt, mũi, miệng phong cách",
    "summary": "Dựng khuôn mặt anime với mắt lớn là điểm nhấn và mũi miệng tối giản có chủ đích.",
    "objectives": [
     "Đặt được mắt anime trên đường giữa mặt với khoảng cách một mắt phong cách",
     "Vẽ được 3 biểu cảm khác nhau chỉ bằng thay đổi lông mày, mắt và miệng",
     "Giữ cằm và đường hàm nhất quán giữa các biểu cảm"
    ],
    "difficulty": 2,
    "minutes": 50,
    "skills": [
     "anatomy",
     "shape-accuracy"
    ],
    "prereqLessons": [
     "t-anime-l01"
    ],
    "theory": "Khuôn mặt anime dồn biểu cảm vào mắt và lông mày: mắt lớn, nhiều lớp highlight, lông mày vẽ xuyên qua tóc mái trong nhiều phong cách. Mũi thường rút thành một nét hoặc một điểm bóng nhỏ, miệng thay đổi hình dạng mạnh theo cảm xúc. Dù tối giản, vị trí của chúng vẫn tuân theo mốc mặt: mắt ở khoảng giữa chiều dài mặt, miệng nằm giữa chân mũi và cằm. Biểu cảm thuyết phục đến từ sự phối hợp đồng bộ của cả ba yếu tố, không phải từ một cái miệng cường điệu đơn độc.",
    "steps": [
     "Dựng oval mặt anime và các đường mốc cong",
     "Vẽ mắt lớn: mống mắt, con ngươi, hai lớp highlight, mí trên đậm",
     "Thêm mũi tối giản và miệng nhỏ theo biểu cảm trung tính",
     "Vẽ lại mặt với 3 biểu cảm: vui, giận, ngạc nhiên bằng lông mày-mắt-miệng"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Khuôn mặt anime: mắt, mũi, miệng phong cách': bắt đầu từ bước 'Dựng oval mặt anime và các đường mốc cong', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ một khuôn mặt anime kèm 3 phiên bản biểu cảm khác nhau của cùng nhân vật, giữ nguyên khung mặt và vị trí mốc.",
     "mode": "assisted",
     "assessType": "shape",
     "target": {
      "x": 300,
      "y": 100,
      "w": 400,
      "h": 700
     }
    },
    "rubric": [
     {
      "id": "shape",
      "name": "Độ chính xác hình dạng",
      "weight": 35,
      "method": "geometry",
      "desc": "Độ khớp của đường bao với hình mẫu."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ các phần",
      "weight": 30,
      "method": "geometry",
      "desc": "Quan hệ chiều rộng, chiều cao và kích thước tương đối."
     },
     {
      "id": "align",
      "name": "Căn chỉnh và đối xứng",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí các mốc, trục đối xứng và độ thẳng hàng."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đầy đủ các chi tiết cấu trúc mà đề bài yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Đối xứng hai bên bị lệch",
      "cause": "Vẽ hoàn thiện một bên rồi đoán bên còn lại.",
      "fix": "Kẻ trục đối xứng, đánh dấu các cặp điểm ngang nhau rồi mới nối."
     },
     {
      "error": "Không gian âm bị bỏ qua",
      "cause": "Chỉ nhìn vật thể, không nhìn hình của khoảng trống xung quanh.",
      "fix": "Vẽ thêm hình của khoảng trống giữa các bộ phận và đối chiếu với mẫu."
     },
     {
      "error": "Hình đúng nét nhưng sai tỷ lệ tổng thể",
      "cause": "Vẽ chi tiết từng cạnh mà không khóa khung bao ngoài trước.",
      "fix": "Dựng khung bao (bounding box) và chia tỷ lệ khung trước khi vẽ đường bao."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-anime-l03",
    "title": "Tóc anime theo mảng và khối",
    "summary": "Dựng tóc thành các mảng lớn có hướng chảy và khối lượng thay vì từng sợi.",
    "objectives": [
     "Chia được tóc thành tối thiểu 5 mảng lớn có hướng chảy từ một điểm mọc chung",
     "Thể hiện được độ dày của tóc bằng đường biên trong ở chân tóc",
     "Vẽ được 2 kiểu tóc khác nhau từ cùng một cấu trúc đầu"
    ],
    "difficulty": 2,
    "minutes": 50,
    "skills": [
     "anatomy",
     "shape-accuracy"
    ],
    "prereqLessons": [
     "t-anime-l02"
    ],
    "theory": "Tóc anime được vẽ theo mảng: toàn bộ tóc là một khối bao quanh hộp sọ, chia thành các mảng lớn chảy từ điểm mọc trên đỉnh đầu. Vẽ từng sợi ngay từ đầu làm tóc trông rối và mất khối lượng. Đường biên trong tại chân tóc cho thấy tóc có độ dày và nằm trên đầu chứ không dán vào trán. Highlight của tóc anime thường là một dải sáng chạy theo mảng, vị trí của nó phải nhất quán với hướng sáng chung của tranh.",
    "steps": [
     "Dựng đầu và vẽ đường chân tóc cùng điểm mọc trên đỉnh",
     "Chia tóc thành các mảng lớn: mái, hai bên, phía sau",
     "Cho các mảng chảy theo trọng lực và hướng kiểu tóc đã chọn",
     "Thêm dải highlight theo mảng và vài sợi tách nhỏ ở biên cuối cùng"
    ],
    "demo": {
     "kind": "sphere",
     "note": "Trình diễn trực quan cho bài 'Tóc anime theo mảng và khối': bắt đầu từ bước 'Dựng đầu và vẽ đường chân tóc cùng điểm mọc trên đỉnh', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Thiết kế 2 kiểu tóc anime khác nhau trên cùng một cấu trúc đầu, mỗi kiểu chia mảng rõ ràng và có dải highlight nhất quán.",
     "mode": "assisted",
     "assessType": "shape",
     "target": {}
    },
    "rubric": [
     {
      "id": "shape",
      "name": "Độ chính xác hình dạng",
      "weight": 35,
      "method": "geometry",
      "desc": "Độ khớp của đường bao với hình mẫu."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ các phần",
      "weight": 30,
      "method": "geometry",
      "desc": "Quan hệ chiều rộng, chiều cao và kích thước tương đối."
     },
     {
      "id": "align",
      "name": "Căn chỉnh và đối xứng",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí các mốc, trục đối xứng và độ thẳng hàng."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đầy đủ các chi tiết cấu trúc mà đề bài yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Không gian âm bị bỏ qua",
      "cause": "Chỉ nhìn vật thể, không nhìn hình của khoảng trống xung quanh.",
      "fix": "Vẽ thêm hình của khoảng trống giữa các bộ phận và đối chiếu với mẫu."
     },
     {
      "error": "Hình đúng nét nhưng sai tỷ lệ tổng thể",
      "cause": "Vẽ chi tiết từng cạnh mà không khóa khung bao ngoài trước.",
      "fix": "Dựng khung bao (bounding box) và chia tỷ lệ khung trước khi vẽ đường bao."
     },
     {
      "error": "Đối xứng hai bên bị lệch",
      "cause": "Vẽ hoàn thiện một bên rồi đoán bên còn lại.",
      "fix": "Kẻ trục đối xứng, đánh dấu các cặp điểm ngang nhau rồi mới nối."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-anime-l04",
    "title": "Trang phục và nếp vải cơ bản",
    "summary": "Vẽ quần áo bám cơ thể với nếp gấp tại điểm treo, điểm căng và điểm chùng.",
    "objectives": [
     "Vẽ được một trang phục có nếp gấp tại ít nhất 3 loại điểm: treo, căng, chùng",
     "Giữ đường may và viền trang phục bám theo bề mặt cơ thể bên dưới",
     "Phân biệt được vải dày và vải mỏng qua hình dạng nếp gấp trong cùng một trang phục"
    ],
    "difficulty": 3,
    "minutes": 55,
    "skills": [
     "anatomy",
     "value-shading"
    ],
    "prereqLessons": [
     "t-anime-l03"
    ],
    "theory": "Quần áo là lớp vải treo trên cơ thể: nếp gấp sinh ra tại điểm treo (vai, thắt lưng), kéo căng giữa hai điểm neo và chùng thành ống tại vùng thừa vải. Muốn vẽ trang phục đúng, phải dựng cơ thể bên dưới trước, dù lớp dựng đó sẽ bị che đi. Vải mỏng cho nếp nhỏ, nhiều và sắc; vải dày cho nếp lớn, ít và tròn. Nhân vật anime thường đơn giản hóa nếp vải nhưng vẫn giữ đúng vị trí phát sinh của chúng.",
    "steps": [
     "Dựng dáng nhân vật bằng khối đơn giản",
     "Phác trang phục ôm theo cơ thể, đánh dấu điểm treo và điểm căng",
     "Thêm nếp gấp: chùng ở vùng thừa vải, căng ở khớp gập",
     "Hoàn thiện viền, đường may và phân biệt phần vải dày mỏng"
    ],
    "demo": {
     "kind": "gesture",
     "note": "Trình diễn trực quan cho bài 'Trang phục và nếp vải cơ bản': bắt đầu từ bước 'Dựng dáng nhân vật bằng khối đơn giản', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Thiết kế một trang phục hoàn chỉnh cho nhân vật anime có sẵn dáng dựng, thể hiện đủ 3 loại nếp gấp và ghi chú điểm phát sinh của chúng.",
     "mode": "assisted",
     "assessType": "gesture",
     "target": {}
    },
    "rubric": [
     {
      "id": "action",
      "name": "Đường hành động",
      "weight": 30,
      "method": "hybrid",
      "desc": "Đường hành động liền mạch, thể hiện hướng chuyển động chính."
     },
     {
      "id": "prop",
      "name": "Tỷ lệ cơ thể",
      "weight": 30,
      "method": "geometry",
      "desc": "Tỷ lệ đầu-thân-chân tay khớp mốc giải phẫu của bài."
     },
     {
      "id": "rhythm",
      "name": "Nhịp điệu và cân bằng",
      "weight": 25,
      "method": "ai",
      "desc": "Dáng có nhịp cong đối ứng, trọng tâm rơi hợp lý."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ số dáng, đủ thời lượng và đúng tư thế yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Dáng cứng như người que thẳng đứng",
      "cause": "Vẽ từng bộ phận thẳng hàng, bỏ qua đường hành động.",
      "fix": "Vẽ đường hành động cong liền mạch trước, mọi bộ phận bám theo đường này."
     },
     {
      "error": "Tỷ lệ thân và chân sai lệch",
      "cause": "Bắt đầu từ chi tiết đầu mà không chia mốc toàn thân.",
      "fix": "Chia chiều cao toàn thân thành các đơn vị đầu, đánh dấu mốc vai, hông, gối trước."
     },
     {
      "error": "Dáng mất cân bằng, như sắp ngã",
      "cause": "Trọng tâm vẽ ra ngoài đế đỡ mà không có ý đồ động.",
      "fix": "Kẻ đường dọi từ cổ xuống, kiểm tra nó rơi vào vùng đế đỡ của hai chân."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-anime-l05",
    "title": "Nhân vật anime hoàn chỉnh và bảng nhân vật (character sheet)",
    "summary": "Hoàn thiện một nhân vật: dáng đứng chuẩn, 3 góc mặt, bảng màu và biểu cảm trên một trang.",
    "objectives": [
     "Hoàn thành character sheet gồm dáng toàn thân, mặt 3 góc và 3 biểu cảm nhất quán cùng một nhân vật",
     "Giữ bảng màu nhân vật trong tối đa 5 màu chính và ghi rõ mã màu",
     "Mọi góc vẽ giữ đúng tỷ lệ và đặc điểm nhận diện đã thiết kế"
    ],
    "difficulty": 3,
    "minutes": 75,
    "skills": [
     "anatomy",
     "color",
     "composition"
    ],
    "prereqLessons": [
     "t-anime-l04"
    ],
    "theory": "Character sheet là hồ sơ thiết kế để một nhân vật được vẽ lại nhất quán nhiều lần bởi chính bạn hoặc người khác. Nó gồm dáng toàn thân làm chuẩn tỷ lệ, đầu ở các góc chính để khóa cấu trúc, bảng màu cố định và dải biểu cảm. Tính nhất quán là tiêu chí cao nhất: đặc điểm nhận diện như kiểu tóc, phụ kiện, tỷ lệ phải giống nhau ở mọi góc. Đây cũng là tài liệu bắt buộc trước khi đưa nhân vật vào truyện tranh hay hoạt hình.",
    "steps": [
     "Dựng dáng toàn thân chuẩn của nhân vật theo tỷ lệ đã chọn",
     "Vẽ đầu nhân vật ở góc thẳng, 3/4 và profile trên cùng hàng",
     "Thêm 3 biểu cảm và bảng 5 màu chính có ghi mã màu",
     "Kiểm tra chéo mọi góc: tóc, phụ kiện, tỷ lệ có nhất quán không"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Nhân vật anime hoàn chỉnh và bảng nhân vật (character sheet)': bắt đầu từ bước 'Dựng dáng toàn thân chuẩn của nhân vật theo tỷ lệ đã chọn', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Tạo character sheet hoàn chỉnh cho một nhân vật anime nguyên bản: toàn thân, đầu 3 góc, 3 biểu cảm và bảng màu, tất cả trên một trang.",
     "mode": "independent",
     "assessType": "free",
     "target": {}
    },
    "rubric": [
     {
      "id": "idea",
      "name": "Ý tưởng và yêu cầu đề",
      "weight": 30,
      "method": "ai",
      "desc": "Bài thể hiện rõ ý tưởng và đáp ứng đúng đề bài tự do."
     },
     {
      "id": "tech",
      "name": "Kỹ thuật thể hiện",
      "weight": 30,
      "method": "hybrid",
      "desc": "Kỹ thuật trọng tâm của bài được áp dụng nhất quán."
     },
     {
      "id": "coherence",
      "name": "Tính nhất quán tổng thể",
      "weight": 25,
      "method": "ai",
      "desc": "Hình, sắc độ/màu và bố cục thuộc cùng một tổng thể."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Bài hoàn chỉnh, không bỏ dở phần chính nào."
     }
    ],
    "mistakes": [
     {
      "error": "Bài lạc khỏi kỹ thuật trọng tâm của bài học",
      "cause": "Mải theo ý tưởng mà quên yêu cầu kỹ thuật cần luyện.",
      "fix": "Viết kỹ thuật trọng tâm ra mép giấy và kiểm tra lại sau mỗi giai đoạn vẽ."
     },
     {
      "error": "Bài bỏ dở ở phần khó nhất",
      "cause": "Bắt đầu từ phần dễ và chi tiết, hết thời gian cho phần cấu trúc.",
      "fix": "Dựng toàn bộ cấu trúc trước, chỉ chi tiết hóa khi tổng thể đã đứng vững."
     }
    ],
    "passScore": 70
   }
  ]
 },
 {
  "id": "t-landscape",
  "title": "Landscape & Environment",
  "description": "Vẽ phong cảnh và môi trường: phối cảnh khí quyển, cây, nước, kiến trúc và bầu trời.",
  "prereqSkills": [
   "perspective",
   "observation",
   "value-shading"
  ],
  "lessons": [
   {
    "id": "t-landscape-l01",
    "title": "Phối cảnh khí quyển và ba lớp chiều sâu",
    "summary": "Dùng độ tương phản, độ chi tiết và độ bão hòa giảm dần để tạo chiều sâu không gian.",
    "objectives": [
     "Chia được một cảnh thành 3 lớp sâu với tương phản giảm dần rõ rệt",
     "Giữ lớp tiền cảnh có cạnh sắc và giá trị đậm nhất trong bài",
     "Mô tả được vì sao lớp xa nhạt đi bằng hiện tượng tán xạ không khí"
    ],
    "difficulty": 2,
    "minutes": 50,
    "skills": [
     "perspective",
     "value-shading"
    ],
    "prereqLessons": [
     "m04-l01"
    ],
    "theory": "Không khí giữa người xem và vật ở xa không trong suốt hoàn toàn: nó làm vật xa nhạt hơn, ít tương phản hơn, ít chi tiết hơn và ngả về màu của bầu trời. Hiệu ứng này gọi là phối cảnh khí quyển và là công cụ tạo chiều sâu mạnh nhất trong phong cảnh, bổ sung cho phối cảnh tuyến tính. Ba lớp sâu kinh điển gồm tiền cảnh đậm và sắc, trung cảnh vừa, hậu cảnh nhạt và mờ. Lỗi phổ biến là vẽ dãy núi xa đậm và chi tiết như vật gần, làm không gian bị phẳng.",
    "steps": [
     "Phác một cảnh có dãy núi, đồi và cây gần",
     "Gán giá trị đậm nhất và cạnh sắc nhất cho lớp tiền cảnh",
     "Giảm tương phản và chi tiết ở lớp trung cảnh",
     "Vẽ hậu cảnh nhạt nhất, biên mềm, ngả màu bầu trời"
    ],
    "demo": {
     "kind": "horizon",
     "note": "Trình diễn trực quan cho bài 'Phối cảnh khí quyển và ba lớp chiều sâu': bắt đầu từ bước 'Phác một cảnh có dãy núi, đồi và cây gần', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ một phong cảnh núi có đủ 3 lớp chiều sâu phân biệt bằng phối cảnh khí quyển, đường chân trời đặt ở một phần ba khung hình.",
     "mode": "guided",
     "assessType": "perspective",
     "target": {
      "horizon": 330,
      "vp": {
       "x": 500,
       "y": 330
      }
     }
    },
    "rubric": [
     {
      "id": "converge",
      "name": "Hội tụ về điểm tụ",
      "weight": 35,
      "method": "geometry",
      "desc": "Các cạnh song song trong không gian hội tụ đúng về điểm tụ."
     },
     {
      "id": "horizon",
      "name": "Đường chân trời và điểm tụ",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí đường chân trời và điểm tụ đúng với thiết lập của bài."
     },
     {
      "id": "structure",
      "name": "Cấu trúc vật thể",
      "weight": 30,
      "method": "hybrid",
      "desc": "Vật thể giữ đúng tỷ lệ và cấu trúc khi đặt trong phối cảnh."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ các vật thể và đường gióng phối cảnh yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Cạnh không hội tụ về cùng một điểm tụ",
      "cause": "Mỗi cạnh được vẽ theo cảm giác riêng, không gióng về điểm tụ.",
      "fix": "Kéo dài mọi cạnh thuộc cùng nhóm song song và kiểm tra chúng gặp nhau tại điểm tụ."
     },
     {
      "error": "Đường chân trời đặt sai so với tầm mắt",
      "cause": "Đặt đường chân trời theo vị trí thuận tay thay vì theo cao độ mắt trong bài.",
      "fix": "Xác định tầm mắt trước, mọi điểm tụ của cạnh ngang phải nằm trên đường này."
     },
     {
      "error": "Vật ở xa lại to bằng vật ở gần",
      "cause": "Không thu nhỏ kích thước theo khoảng cách.",
      "fix": "Dùng hai đường gióng từ điểm tụ để khóa chiều cao của vật ở từng vị trí sâu."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-landscape-l02",
    "title": "Vẽ cây và tán lá theo khối",
    "summary": "Dựng cây từ thân, cành theo quy luật phân nhánh và tán lá là tổ hợp khối cầu bị ánh sáng chia.",
    "objectives": [
     "Dựng được cây có thân thuôn dần và cành phân nhánh nhỏ dần đúng quy luật",
     "Chia được tán lá thành các khối lớn có sáng tối thay vì vẽ từng lá",
     "Giữ hướng sáng trên tán lá nhất quán với hướng sáng của toàn cảnh"
    ],
    "difficulty": 2,
    "minutes": 50,
    "skills": [
     "observation",
     "value-shading"
    ],
    "prereqLessons": [
     "t-landscape-l01"
    ],
    "theory": "Cây được dựng như mọi vật thể khác: thân là trụ thuôn, cành là các trụ nhỏ hơn phân nhánh theo quy luật càng xa gốc càng mảnh. Tán lá là một đám mây gồm nhiều khối cầu nhỏ gộp lại, nhận ánh sáng như các khối cầu: sáng ở phía hướng sáng, tối ở phía dưới và trong lõi. Vẽ từng chiếc lá ngay từ đầu phá vỡ khối lượng của tán và làm cây trông như đồ trang trí phẳng. Vài lá chi tiết chỉ nên xuất hiện ở biên tán nơi có ánh sáng bắt vào.",
    "steps": [
     "Dựng thân cây thuôn dần, chia cành chính theo quy luật phân nhánh",
     "Phác tán lá thành 4-6 khối cầu gộp chồng nhau",
     "Tô sáng tối theo khối: phía trên sáng, lõi và dưới tán tối",
     "Thêm vài chi tiết lá ở biên sáng của tán ở bước cuối"
    ],
    "demo": {
     "kind": "sphere",
     "note": "Trình diễn trực quan cho bài 'Vẽ cây và tán lá theo khối': bắt đầu từ bước 'Dựng thân cây thuôn dần, chia cành chính theo quy luật phân nhánh', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ một cây lớn hoàn chỉnh với thân, cành phân nhánh đúng quy luật và tán lá diễn tả theo khối sáng tối.",
     "mode": "assisted",
     "assessType": "value",
     "target": {}
    },
    "rubric": [
     {
      "id": "group",
      "name": "Phân nhóm sáng tối",
      "weight": 30,
      "method": "cv",
      "desc": "Các mảng sáng, trung gian và tối tách bạch, đúng số bậc yêu cầu."
     },
     {
      "id": "light",
      "name": "Nhất quán hướng sáng",
      "weight": 25,
      "method": "hybrid",
      "desc": "Mọi vùng bóng đều suy ra được từ cùng một nguồn sáng."
     },
     {
      "id": "transition",
      "name": "Chuyển sắc độ",
      "weight": 25,
      "method": "cv",
      "desc": "Chuyển bậc mượt hoặc đúng tính chất cứng/mềm theo yêu cầu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ vùng diễn tả và đúng đối tượng của bài."
     }
    ],
    "mistakes": [
     {
      "error": "Bóng đổ ngược hướng với bóng trên vật",
      "cause": "Vẽ bóng đổ sau cùng mà không suy ra từ nguồn sáng đã chọn.",
      "fix": "Vẽ mũi tên hướng sáng lên góc bài, mọi bóng phải nhất quán với mũi tên đó."
     },
     {
      "error": "Chuyển sắc độ bị bẩn, lem nhem",
      "cause": "Di bút qua lại nhiều lần với lực không đều.",
      "fix": "Tô một chiều, chồng lớp nhẹ nhiều lần, mỗi lớp chờ kiểm tra bậc giá trị."
     },
     {
      "error": "Vùng tối và vùng trung gian lẫn vào nhau",
      "cause": "Tô theo cảm giác từng chỗ, không lập thang giá trị trước.",
      "fix": "Lập thang 5 bậc ở mép giấy, gán mỗi vùng một bậc rồi mới tô."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-landscape-l03",
    "title": "Nước, phản chiếu và bầu trời",
    "summary": "Vẽ mặt nước phản chiếu như gương bị gợn và bầu trời có mây theo khối.",
    "objectives": [
     "Vẽ được phản chiếu của vật trên mặt nước đối xứng theo chiều dọc và bị nén bởi gợn sóng",
     "Phân biệt được phản chiếu khi nước tĩnh và khi nước động trong cùng một bài",
     "Dựng được đám mây như khối có mặt sáng và mặt tối thay vì hình phẳng"
    ],
    "difficulty": 3,
    "minutes": 55,
    "skills": [
     "value-shading",
     "observation"
    ],
    "prereqLessons": [
     "t-landscape-l02"
    ],
    "theory": "Mặt nước tĩnh phản chiếu vật như một hình đối xứng lật ngược qua đường mặt nước, nhưng gợn sóng sẽ phá hình phản chiếu thành các vệt ngang kéo dài. Vì vậy phản chiếu trên nước luôn vẽ bằng vệt ngang, không bao giờ sắc nét như vật thật phía trên. Mây là khối hơi có cấu trúc sáng tối: mặt trên và mặt hướng sáng thì sáng, đáy mây phẳng và tối hơn. Bầu trời thường sáng nhất ở gần chân trời và đậm dần lên đỉnh đầu, nền này làm mọi vật trên nó nổi rõ theo chiều sâu.",
    "steps": [
     "Vẽ đường mặt nước và dựng vật bờ (cây hoặc nhà nhỏ)",
     "Vẽ hình phản chiếu lật ngược bên dưới mặt nước",
     "Phá phản chiếu thành các vệt ngang, nhiều hơn ở vùng nước động",
     "Thêm bầu trời chuyển sắc và đám mây dạng khối phía trên"
    ],
    "demo": {
     "kind": "horizon",
     "note": "Trình diễn trực quan cho bài 'Nước, phản chiếu và bầu trời': bắt đầu từ bước 'Vẽ đường mặt nước và dựng vật bờ (cây hoặc nhà nhỏ)', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ cảnh bờ hồ có một cây hoặc ngôi nhà, mặt nước phản chiếu bị gợn vệt ngang và bầu trời có mây khối.",
     "mode": "assisted",
     "assessType": "value",
     "target": {
      "horizon": 480,
      "vp": {
       "x": 500,
       "y": 480
      }
     }
    },
    "rubric": [
     {
      "id": "group",
      "name": "Phân nhóm sáng tối",
      "weight": 30,
      "method": "cv",
      "desc": "Các mảng sáng, trung gian và tối tách bạch, đúng số bậc yêu cầu."
     },
     {
      "id": "light",
      "name": "Nhất quán hướng sáng",
      "weight": 25,
      "method": "hybrid",
      "desc": "Mọi vùng bóng đều suy ra được từ cùng một nguồn sáng."
     },
     {
      "id": "transition",
      "name": "Chuyển sắc độ",
      "weight": 25,
      "method": "cv",
      "desc": "Chuyển bậc mượt hoặc đúng tính chất cứng/mềm theo yêu cầu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ vùng diễn tả và đúng đối tượng của bài."
     }
    ],
    "mistakes": [
     {
      "error": "Chuyển sắc độ bị bẩn, lem nhem",
      "cause": "Di bút qua lại nhiều lần với lực không đều.",
      "fix": "Tô một chiều, chồng lớp nhẹ nhiều lần, mỗi lớp chờ kiểm tra bậc giá trị."
     },
     {
      "error": "Vùng tối và vùng trung gian lẫn vào nhau",
      "cause": "Tô theo cảm giác từng chỗ, không lập thang giá trị trước.",
      "fix": "Lập thang 5 bậc ở mép giấy, gán mỗi vùng một bậc rồi mới tô."
     },
     {
      "error": "Bóng đổ ngược hướng với bóng trên vật",
      "cause": "Vẽ bóng đổ sau cùng mà không suy ra từ nguồn sáng đã chọn.",
      "fix": "Vẽ mũi tên hướng sáng lên góc bài, mọi bóng phải nhất quán với mũi tên đó."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-landscape-l04",
    "title": "Kiến trúc trong phong cảnh",
    "summary": "Đưa nhà, cầu, đường vào phong cảnh bằng phối cảnh hai điểm tụ và chia tỷ lệ theo lưới sàn.",
    "objectives": [
     "Dựng được một ngôi nhà trong cảnh bằng phối cảnh 2 điểm tụ nhất quán với đường chân trời chung",
     "Đặt được con đường thu hẹp dần về điểm tụ và hàng cột điện nhỏ dần theo khoảng cách",
     "Giữ cửa và cửa sổ của nhà đúng tỷ lệ với một nhân vật đứng cạnh làm thước đo"
    ],
    "difficulty": 3,
    "minutes": 60,
    "skills": [
     "perspective",
     "composition"
    ],
    "prereqLessons": [
     "t-landscape-l03"
    ],
    "theory": "Kiến trúc trong phong cảnh phải chia sẻ cùng đường chân trời và tầm mắt với toàn cảnh, nếu không ngôi nhà sẽ trông như dán lên nền. Con người là thước đo tiện nhất: một cửa ra vào cao hơn người đứng cạnh một chút, và mọi vật khác suy ra từ đó. Đường đi và hàng cột là công cụ dẫn sâu: chúng thu hẹp và thưa dần về phía điểm tụ theo quy luật phối cảnh. Hãy dựng lưới sàn cho cả cảnh trước khi đặt từng công trình.",
    "steps": [
     "Thiết lập đường chân trời và hai điểm tụ cho toàn cảnh",
     "Dựng ngôi nhà chính từ cạnh đứng gần nhất",
     "Thêm con đường gióng về điểm tụ và hàng cột nhỏ dần",
     "Đặt một nhân vật cạnh cửa làm mốc tỷ lệ, kiểm tra mọi vật theo mốc này"
    ],
    "demo": {
     "kind": "horizon",
     "note": "Trình diễn trực quan cho bài 'Kiến trúc trong phong cảnh': bắt đầu từ bước 'Thiết lập đường chân trời và hai điểm tụ cho toàn cảnh', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Vẽ phong cảnh có một ngôi nhà, con đường và hàng cột điện dẫn về điểm tụ, kèm một nhân vật đứng cạnh cửa làm thước tỷ lệ.",
     "mode": "assisted",
     "assessType": "perspective",
     "target": {
      "horizon": 350,
      "vp1": {
       "x": 70,
       "y": 350
      },
      "vp2": {
       "x": 930,
       "y": 350
      }
     }
    },
    "rubric": [
     {
      "id": "converge",
      "name": "Hội tụ về điểm tụ",
      "weight": 35,
      "method": "geometry",
      "desc": "Các cạnh song song trong không gian hội tụ đúng về điểm tụ."
     },
     {
      "id": "horizon",
      "name": "Đường chân trời và điểm tụ",
      "weight": 20,
      "method": "geometry",
      "desc": "Vị trí đường chân trời và điểm tụ đúng với thiết lập của bài."
     },
     {
      "id": "structure",
      "name": "Cấu trúc vật thể",
      "weight": 30,
      "method": "hybrid",
      "desc": "Vật thể giữ đúng tỷ lệ và cấu trúc khi đặt trong phối cảnh."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Đủ các vật thể và đường gióng phối cảnh yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Cạnh không hội tụ về cùng một điểm tụ",
      "cause": "Mỗi cạnh được vẽ theo cảm giác riêng, không gióng về điểm tụ.",
      "fix": "Kéo dài mọi cạnh thuộc cùng nhóm song song và kiểm tra chúng gặp nhau tại điểm tụ."
     },
     {
      "error": "Đường chân trời đặt sai so với tầm mắt",
      "cause": "Đặt đường chân trời theo vị trí thuận tay thay vì theo cao độ mắt trong bài.",
      "fix": "Xác định tầm mắt trước, mọi điểm tụ của cạnh ngang phải nằm trên đường này."
     },
     {
      "error": "Vật ở xa lại to bằng vật ở gần",
      "cause": "Không thu nhỏ kích thước theo khoảng cách.",
      "fix": "Dùng hai đường gióng từ điểm tụ để khóa chiều cao của vật ở từng vị trí sâu."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-landscape-l05",
    "title": "Phong cảnh hoàn chỉnh có chủ đề",
    "summary": "Sáng tác phong cảnh hoàn chỉnh với điểm nhấn, đường dẫn và tâm trạng ánh sáng rõ ràng.",
    "objectives": [
     "Hoàn thành phong cảnh qua 3 vòng thumbnail, dựng hình, hoàn thiện",
     "Chọn được một thời điểm ánh sáng (bình minh, trưa, hoàng hôn) và giữ nhất quán màu, bóng",
     "Đường dẫn trong cảnh đưa mắt tới điểm nhấn trong tối đa 2 trạm trung gian"
    ],
    "difficulty": 4,
    "minutes": 75,
    "skills": [
     "composition",
     "perspective",
     "color"
    ],
    "prereqLessons": [
     "t-landscape-l04"
    ],
    "theory": "Phong cảnh hoàn chỉnh bắt đầu bằng quyết định về tâm trạng: cùng một thung lũng dưới nắng trưa và dưới hoàng hôn là hai bức tranh khác nhau hoàn toàn về màu và bóng. Thumbnail quyết định bố cục và vị trí điểm nhấn, dựng hình khóa phối cảnh và kiến trúc, hoàn thiện dồn tương phản vào điểm nhấn và thả lỏng các vùng phụ. Ánh sáng đã chọn phải chi phối mọi quyết định sau đó: hướng bóng, màu bầu trời, độ tương phản của từng lớp sâu. Phong cảnh tốt cho người xem biết đang ở đâu, vào lúc nào và nên nhìn vào đâu.",
    "steps": [
     "Chọn một thời điểm ánh sáng và viết một câu tâm trạng của cảnh",
     "Vẽ 3 thumbnail, chọn bản có đường dẫn rõ nhất",
     "Dựng hình toàn cảnh: lưới phối cảnh, kiến trúc, cây theo khối",
     "Hoàn thiện sáng tối và màu theo thời điểm đã chọn, dồn tương phản vào điểm nhấn"
    ],
    "demo": {
     "kind": "horizon",
     "note": "Trình diễn trực quan cho bài 'Phong cảnh hoàn chỉnh có chủ đề': bắt đầu từ bước 'Chọn một thời điểm ánh sáng và viết một câu tâm trạng của cảnh', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Sáng tác một phong cảnh hoàn chỉnh ở một thời điểm ánh sáng tự chọn, nộp kèm thumbnail đã chọn và ghi chú tâm trạng của cảnh.",
     "mode": "independent",
     "assessType": "composition",
     "target": {
      "horizon": 380,
      "vp": {
       "x": 500,
       "y": 380
      }
     }
    },
    "rubric": [
     {
      "id": "focal",
      "name": "Điểm nhấn chính",
      "weight": 30,
      "method": "ai",
      "desc": "Điểm nhấn rõ nhất và được các yếu tố khác hỗ trợ."
     },
     {
      "id": "balance",
      "name": "Cân bằng thị giác",
      "weight": 25,
      "method": "hybrid",
      "desc": "Trọng lượng thị giác phân bố hợp lý quanh khung hình."
     },
     {
      "id": "rhythm",
      "name": "Nhịp điệu và dẫn mắt",
      "weight": 25,
      "method": "ai",
      "desc": "Đường dẫn, lặp lại và tương phản đưa mắt đi đúng hành trình dự định."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ thumbnail/bản cuối và đúng ràng buộc bố cục của đề."
     }
    ],
    "mistakes": [
     {
      "error": "Bố cục bị cắt vụn, mắt không có đường đi",
      "cause": "Các yếu tố đặt rời rạc, không có đường dẫn liên kết.",
      "fix": "Dùng cạnh, hướng nhìn hoặc mảng sáng tối nối các yếu tố thành một hành trình."
     },
     {
      "error": "Khung hình thừa khoảng trống vô nghĩa",
      "cause": "Đặt chủ thể theo thói quen ở giữa mà không tính không gian âm.",
      "fix": "Thử ít nhất ba thumbnail với vị trí chủ thể khác nhau trước khi vẽ bản cuối."
     },
     {
      "error": "Điểm nhấn bị cạnh tranh bởi chi tiết phụ",
      "cause": "Vùng phụ có tương phản và độ chi tiết ngang điểm nhấn.",
      "fix": "Giảm tương phản, giảm chi tiết ở vùng phụ, tăng tương phản tại điểm nhấn."
     }
    ],
    "passScore": 70
   }
  ]
 },
 {
  "id": "t-digital",
  "title": "Digital Painting",
  "description": "Hội họa số: quy trình lớp (layer), brush, blending mode, tô màu theo giai đoạn và hoàn thiện tranh số.",
  "prereqSkills": [
   "color",
   "value-shading",
   "line-control"
  ],
  "lessons": [
   {
    "id": "t-digital-l01",
    "title": "Quy trình layer và brush cơ bản",
    "summary": "Tổ chức tranh số theo lớp: phác, line, màu nền, bóng, sáng và làm chủ brush cứng, mềm.",
    "objectives": [
     "Tạo được file tranh có tối thiểu 5 lớp đặt tên đúng thứ tự quy trình",
     "Phân biệt được vùng việc của brush cạnh cứng và brush cạnh mềm trên cùng một bài",
     "Giữ lớp phác không bị sửa khi thao tác trên các lớp sau"
    ],
    "difficulty": 1,
    "minutes": 45,
    "skills": [
     "color",
     "line-control"
    ],
    "prereqLessons": [
     "m07-l01"
    ],
    "theory": "Layer là lợi thế cốt lõi của vẽ số: mỗi quyết định nằm trên một lớp riêng nên sai ở đâu sửa ở đó mà không phá phần đã đúng. Thứ tự quy trình chuẩn là phác, line sạch, màu nền phẳng, bóng, rồi highlight và hiệu ứng trên cùng. Brush cạnh cứng dùng cho vùng cần biên rõ và màu phẳng, brush mềm dùng cho chuyển sắc và vùng mờ. Đặt tên lớp ngay từ đầu là thói quen nhỏ nhưng quyết định khả năng sửa bài về sau.",
    "steps": [
     "Tạo canvas và các lớp: Phac, Line, MauNen, Bong, Sang",
     "Vẽ phác một vật đơn giản trên lớp Phac, hạ opacity của lớp",
     "Vẽ line sạch trên lớp Line bằng brush cạnh cứng",
     "Tô màu nền phẳng trên lớp MauNen, thử brush mềm ở vùng chuyển sắc"
    ],
    "demo": {
     "kind": "sphere",
     "note": "Trình diễn trực quan cho bài 'Quy trình layer và brush cơ bản': bắt đầu từ bước 'Tạo canvas và các lớp: Phac, Line, MauNen, Bong, Sang', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Tạo một file tranh số vẽ một quả táo qua đủ 5 lớp quy trình, nộp ảnh xuất kèm ảnh chụp danh sách lớp đã đặt tên.",
     "mode": "guided",
     "assessType": "color",
     "target": {}
    },
    "rubric": [
     {
      "id": "harmony",
      "name": "Hòa sắc tổng thể",
      "weight": 30,
      "method": "ai",
      "desc": "Các màu thuộc cùng một quan hệ hòa sắc đã chọn và không xung đột."
     },
     {
      "id": "temp",
      "name": "Quan hệ nóng lạnh",
      "weight": 25,
      "method": "hybrid",
      "desc": "Vùng sáng lạnh/nóng và vùng tối đối ứng đúng nguyên tắc bài học."
     },
     {
      "id": "sat",
      "name": "Kiểm soát độ bão hòa",
      "weight": 25,
      "method": "cv",
      "desc": "Độ bão hòa cao nhất nằm ở điểm nhấn, giảm dần ở vùng phụ."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ bảng màu, đủ vùng tô và đúng chất liệu yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Màu nào cũng rực như nhau, mất điểm nhấn",
      "cause": "Chọn màu theo từng vật thể riêng lẻ, không phân cấp độ bão hòa.",
      "fix": "Giữ màu rực nhất cho điểm nhấn, giảm bão hòa mọi vùng phụ bằng màu đối hoặc xám màu."
     },
     {
      "error": "Vùng tối bị đen và chết màu",
      "cause": "Dùng đen thuần để làm tối thay vì dùng màu tối có sắc.",
      "fix": "Làm tối bằng màu bổ túc hoặc màu lạnh cùng họ, không dùng đen thuần."
     },
     {
      "error": "Chất liệu nào trông cũng giống nhau",
      "cause": "Chỉ đổi màu mà không đổi cách chuyển sắc và độ tương phản cạnh.",
      "fix": "Kim loại cần tương phản mạnh và cạnh sắc, vải cần chuyển mềm và tương phản thấp."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-digital-l02",
    "title": "Tô màu phẳng và chọn màu từ bánh xe màu số",
    "summary": "Flat color: tô vùng kín không lem, xây dựng bảng màu nhân vật/cảnh bằng công cụ chọn màu.",
    "objectives": [
     "Tô được các vùng màu phẳng không lem ra ngoài đường line bằng công cụ fill có khử răng cưa hợp lý",
     "Xây dựng được bảng màu 6 màu hài hòa từ một màu gốc bằng các quan hệ trên vòng màu",
     "Khóa được lớp màu phẳng bằng alpha lock và đổi màu một vùng mà không vẽ lại"
    ],
    "difficulty": 2,
    "minutes": 50,
    "skills": [
     "color"
    ],
    "prereqLessons": [
     "t-digital-l01"
    ],
    "theory": "Màu phẳng (flat color) là giai đoạn gán cho mỗi vùng một màu nền duy nhất, làm cơ sở cho mọi lớp bóng sáng sau này. Tô lem thường do đường line hở hoặc fill không tính khử răng cưa ở biên, cần xử lý bằng cách mở rộng vùng chọn nhẹ. Bảng màu nên xây từ một màu gốc bằng các quan hệ hòa sắc đã học, thay vì chọn từng màu theo cảm hứng rời rạc. Alpha lock cho phép đổi màu và tô bóng chỉ trong phạm vi đã tô, là kỹ thuật dùng hằng ngày của họa sĩ số.",
    "steps": [
     "Kiểm tra đường line khép kín, vá các điểm hở",
     "Fill từng vùng bằng màu phẳng, mỗi vật một lớp hoặc một vùng chọn",
     "Chọn một màu gốc, xây bảng 6 màu theo quan hệ tương đồng và một điểm bổ túc",
     "Bật alpha lock, đổi màu một vùng và tô thử bóng trong vùng đó"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Tô màu phẳng và chọn màu từ bánh xe màu số': bắt đầu từ bước 'Kiểm tra đường line khép kín, vá các điểm hở', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Nộp một bản line art đã tô màu phẳng hoàn chỉnh kèm bảng màu 6 màu đã dùng, không vùng nào bị lem ra ngoài line.",
     "mode": "assisted",
     "assessType": "color",
     "target": {}
    },
    "rubric": [
     {
      "id": "harmony",
      "name": "Hòa sắc tổng thể",
      "weight": 30,
      "method": "ai",
      "desc": "Các màu thuộc cùng một quan hệ hòa sắc đã chọn và không xung đột."
     },
     {
      "id": "temp",
      "name": "Quan hệ nóng lạnh",
      "weight": 25,
      "method": "hybrid",
      "desc": "Vùng sáng lạnh/nóng và vùng tối đối ứng đúng nguyên tắc bài học."
     },
     {
      "id": "sat",
      "name": "Kiểm soát độ bão hòa",
      "weight": 25,
      "method": "cv",
      "desc": "Độ bão hòa cao nhất nằm ở điểm nhấn, giảm dần ở vùng phụ."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ bảng màu, đủ vùng tô và đúng chất liệu yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Vùng tối bị đen và chết màu",
      "cause": "Dùng đen thuần để làm tối thay vì dùng màu tối có sắc.",
      "fix": "Làm tối bằng màu bổ túc hoặc màu lạnh cùng họ, không dùng đen thuần."
     },
     {
      "error": "Chất liệu nào trông cũng giống nhau",
      "cause": "Chỉ đổi màu mà không đổi cách chuyển sắc và độ tương phản cạnh.",
      "fix": "Kim loại cần tương phản mạnh và cạnh sắc, vải cần chuyển mềm và tương phản thấp."
     },
     {
      "error": "Màu nào cũng rực như nhau, mất điểm nhấn",
      "cause": "Chọn màu theo từng vật thể riêng lẻ, không phân cấp độ bão hòa.",
      "fix": "Giữ màu rực nhất cho điểm nhấn, giảm bão hòa mọi vùng phụ bằng màu đối hoặc xám màu."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-digital-l03",
    "title": "Bóng sáng số: cel shading và soft shading",
    "summary": "Hai phong cách đổ bóng số: bóng cứng cel shading theo mảng và bóng mềm chuyển sắc.",
    "objectives": [
     "Đổ được bóng cel shading 2 cấp cho một nhân vật/vật thể với biên bóng sắc nét theo hình dạng bề mặt",
     "Chuyển được cùng vùng bóng sang soft shading bằng brush mềm và smudge có kiểm soát",
     "Chọn được phong cách bóng phù hợp và giải thích lý do trong 2 câu"
    ],
    "difficulty": 2,
    "minutes": 55,
    "skills": [
     "value-shading",
     "color"
    ],
    "prereqLessons": [
     "t-digital-l02"
    ],
    "theory": "Cel shading chia bóng thành các mảng phẳng có biên sắc nét, thừa hưởng từ hoạt hình truyền thống, hợp với tranh line rõ và phong cách anime. Soft shading chuyển sắc độ dần như hội họa, hợp với tranh tả thực và không line. Cả hai đều bắt đầu từ cùng một phân tích nguồn sáng: khác nhau chỉ ở cách xử lý biên của vùng bóng. Trộn hai phong cách tùy tiện trong một bài thường làm tranh trông chưa hoàn thiện, nên hãy chọn một và giữ nhất quán.",
    "steps": [
     "Chọn một vật thể đã tô màu phẳng, xác định hướng sáng",
     "Đổ bóng cel: một lớp bóng cấp 1 toàn vùng tối, cấp 2 ở vùng tối nhất, biên sắc",
     "Nhân bản file, chuyển vùng bóng sang soft shading bằng brush mềm",
     "Đặt hai phiên bản cạnh nhau, ghi chú phong cách nào hợp hơn và vì sao"
    ],
    "demo": {
     "kind": "sphere",
     "note": "Trình diễn trực quan cho bài 'Bóng sáng số: cel shading và soft shading': bắt đầu từ bước 'Chọn một vật thể đã tô màu phẳng, xác định hướng sáng', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Nộp hai phiên bản của cùng một vật thể: một cel shading 2 cấp và một soft shading, cùng hướng sáng, kèm ghi chú lựa chọn phong cách.",
     "mode": "assisted",
     "assessType": "value",
     "target": {}
    },
    "rubric": [
     {
      "id": "group",
      "name": "Phân nhóm sáng tối",
      "weight": 30,
      "method": "cv",
      "desc": "Các mảng sáng, trung gian và tối tách bạch, đúng số bậc yêu cầu."
     },
     {
      "id": "light",
      "name": "Nhất quán hướng sáng",
      "weight": 25,
      "method": "hybrid",
      "desc": "Mọi vùng bóng đều suy ra được từ cùng một nguồn sáng."
     },
     {
      "id": "transition",
      "name": "Chuyển sắc độ",
      "weight": 25,
      "method": "cv",
      "desc": "Chuyển bậc mượt hoặc đúng tính chất cứng/mềm theo yêu cầu."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ vùng diễn tả và đúng đối tượng của bài."
     }
    ],
    "mistakes": [
     {
      "error": "Chuyển sắc độ bị bẩn, lem nhem",
      "cause": "Di bút qua lại nhiều lần với lực không đều.",
      "fix": "Tô một chiều, chồng lớp nhẹ nhiều lần, mỗi lớp chờ kiểm tra bậc giá trị."
     },
     {
      "error": "Vùng tối và vùng trung gian lẫn vào nhau",
      "cause": "Tô theo cảm giác từng chỗ, không lập thang giá trị trước.",
      "fix": "Lập thang 5 bậc ở mép giấy, gán mỗi vùng một bậc rồi mới tô."
     },
     {
      "error": "Bóng đổ ngược hướng với bóng trên vật",
      "cause": "Vẽ bóng đổ sau cùng mà không suy ra từ nguồn sáng đã chọn.",
      "fix": "Vẽ mũi tên hướng sáng lên góc bài, mọi bóng phải nhất quán với mũi tên đó."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-digital-l04",
    "title": "Blending mode và ánh sáng màu trong tranh số",
    "summary": "Dùng Multiply cho bóng, Screen/Overlay cho sáng và ánh sáng viền (rim light) bằng lớp riêng.",
    "objectives": [
     "Áp dụng được Multiply để đổ bóng giữ nguyên sắc màu bên dưới",
     "Tạo được rim light bằng lớp Screen hoặc Add đặt trên cùng, đúng phía ngược nguồn sáng phụ",
     "Tránh được lỗi bóng Multiply làm màu bị đục bằng cách chỉnh hue của lớp bóng"
    ],
    "difficulty": 3,
    "minutes": 55,
    "skills": [
     "color",
     "value-shading"
    ],
    "prereqLessons": [
     "t-digital-l03"
    ],
    "theory": "Blending mode thay đổi cách một lớp trộn với lớp dưới: Multiply nhân giá trị nên luôn làm tối đi mà vẫn giữ sắc của màu nền, rất hợp cho lớp bóng. Screen và các mode cộng sáng dùng cho highlight, phát sáng và rim light, thứ ánh sáng viền chạy dọc biên vật ở phía đối diện nguồn sáng chính. Bóng Multiply thuần xám dễ làm màu bị đục, họa sĩ thường cho lớp bóng ngả tím hoặc lam nhẹ. Mỗi hiệu ứng nên nằm trên lớp riêng có tên rõ ràng để tắt bật kiểm chứng.",
    "steps": [
     "Nhân bản lớp màu phẳng, đặt lớp bóng ở mode Multiply phía trên",
     "Tô bóng bằng màu tím xám, kiểm tra màu nền không bị đục",
     "Thêm lớp Screen, vẽ rim light dọc biên vật phía đối diện đèn chính",
     "Tắt bật từng lớp để kiểm chứng đóng góp của mỗi mode"
    ],
    "demo": {
     "kind": "cylinder",
     "note": "Trình diễn trực quan cho bài 'Blending mode và ánh sáng màu trong tranh số': bắt đầu từ bước 'Nhân bản lớp màu phẳng, đặt lớp bóng ở mode Multiply phía trên', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Hoàn thiện một vật thể tô số có lớp bóng Multiply ngả màu và rim light ở lớp riêng, nộp ảnh xuất kèm ảnh danh sách lớp và mode.",
     "mode": "assisted",
     "assessType": "color",
     "target": {}
    },
    "rubric": [
     {
      "id": "harmony",
      "name": "Hòa sắc tổng thể",
      "weight": 30,
      "method": "ai",
      "desc": "Các màu thuộc cùng một quan hệ hòa sắc đã chọn và không xung đột."
     },
     {
      "id": "temp",
      "name": "Quan hệ nóng lạnh",
      "weight": 25,
      "method": "hybrid",
      "desc": "Vùng sáng lạnh/nóng và vùng tối đối ứng đúng nguyên tắc bài học."
     },
     {
      "id": "sat",
      "name": "Kiểm soát độ bão hòa",
      "weight": 25,
      "method": "cv",
      "desc": "Độ bão hòa cao nhất nằm ở điểm nhấn, giảm dần ở vùng phụ."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 20,
      "method": "hybrid",
      "desc": "Đủ bảng màu, đủ vùng tô và đúng chất liệu yêu cầu."
     }
    ],
    "mistakes": [
     {
      "error": "Màu nào cũng rực như nhau, mất điểm nhấn",
      "cause": "Chọn màu theo từng vật thể riêng lẻ, không phân cấp độ bão hòa.",
      "fix": "Giữ màu rực nhất cho điểm nhấn, giảm bão hòa mọi vùng phụ bằng màu đối hoặc xám màu."
     },
     {
      "error": "Vùng tối bị đen và chết màu",
      "cause": "Dùng đen thuần để làm tối thay vì dùng màu tối có sắc.",
      "fix": "Làm tối bằng màu bổ túc hoặc màu lạnh cùng họ, không dùng đen thuần."
     },
     {
      "error": "Chất liệu nào trông cũng giống nhau",
      "cause": "Chỉ đổi màu mà không đổi cách chuyển sắc và độ tương phản cạnh.",
      "fix": "Kim loại cần tương phản mạnh và cạnh sắc, vải cần chuyển mềm và tương phản thấp."
     }
    ],
    "passScore": 70
   },
   {
    "id": "t-digital-l05",
    "title": "Tranh số hoàn chỉnh: từ phác tới xuất bản",
    "summary": "Thực hiện trọn quy trình một bức tranh số: thumbnail, phác, line, màu, bóng sáng, hoàn thiện và xuất file.",
    "objectives": [
     "Hoàn thành một bức tranh số qua đủ 6 giai đoạn có lưu file trung gian cho mỗi giai đoạn",
     "Giữ cấu trúc lớp sạch, đặt tên và gom nhóm khi xuất bản",
     "Xuất được file đúng định dạng và kích thước cho web (PNG, cạnh dài 2048px) và bản in thử nếu cần"
    ],
    "difficulty": 4,
    "minutes": 90,
    "skills": [
     "color",
     "composition",
     "value-shading"
    ],
    "prereqLessons": [
     "t-digital-l04"
    ],
    "theory": "Tranh số hoàn chỉnh là bài kiểm tra kỷ luật quy trình: mỗi giai đoạn giải quyết một loại quyết định và không giai đoạn nào nên ôm việc của giai đoạn sau. Thumbnail quyết định bố cục, phác quyết định hình, line quyết định biên, màu phẳng quyết định hòa sắc, bóng sáng quyết định ánh sáng, hoàn thiện chỉ tinh chỉnh và thống nhất. Lưu file trung gian theo giai đoạn giúp quay lui khi một quyết định muộn làm hỏng nền tảng sớm. Xuất bản đúng định dạng là bước cuối bắt buộc: bản web cần nhẹ và sắc nét, bản lưu trữ giữ nguyên lớp và độ phân giải gốc.",
    "steps": [
     "Vẽ thumbnail và phác lớn trên các lớp đầu tiên",
     "Hoàn thiện line sạch, tô màu phẳng theo bảng màu đã chốt",
     "Đổ bóng sáng theo một phong cách nhất quán, thêm hiệu ứng lớp trên cùng",
     "Gom nhóm lớp, lưu file gốc, xuất PNG 2048px và kiểm tra lại bản xuất"
    ],
    "demo": {
     "kind": "grid",
     "note": "Trình diễn trực quan cho bài 'Tranh số hoàn chỉnh: từ phác tới xuất bản': bắt đầu từ bước 'Vẽ thumbnail và phác lớn trên các lớp đầu tiên', thực hiện chậm và dừng lại ở từng mốc kiểm tra."
    },
    "exercise": {
     "prompt": "Thực hiện một bức tranh số hoàn chỉnh đề tài tự chọn qua đủ 6 giai đoạn, nộp bản xuất PNG kèm 3 ảnh chụp các giai đoạn trung gian (phác, màu phẳng, trước hoàn thiện).",
     "mode": "independent",
     "assessType": "free",
     "target": {}
    },
    "rubric": [
     {
      "id": "idea",
      "name": "Ý tưởng và yêu cầu đề",
      "weight": 30,
      "method": "ai",
      "desc": "Bài thể hiện rõ ý tưởng và đáp ứng đúng đề bài tự do."
     },
     {
      "id": "tech",
      "name": "Kỹ thuật thể hiện",
      "weight": 30,
      "method": "hybrid",
      "desc": "Kỹ thuật trọng tâm của bài được áp dụng nhất quán."
     },
     {
      "id": "coherence",
      "name": "Tính nhất quán tổng thể",
      "weight": 25,
      "method": "ai",
      "desc": "Hình, sắc độ/màu và bố cục thuộc cùng một tổng thể."
     },
     {
      "id": "complete",
      "name": "Hoàn thành yêu cầu bài",
      "weight": 15,
      "method": "hybrid",
      "desc": "Bài hoàn chỉnh, không bỏ dở phần chính nào."
     }
    ],
    "mistakes": [
     {
      "error": "Bài lạc khỏi kỹ thuật trọng tâm của bài học",
      "cause": "Mải theo ý tưởng mà quên yêu cầu kỹ thuật cần luyện.",
      "fix": "Viết kỹ thuật trọng tâm ra mép giấy và kiểm tra lại sau mỗi giai đoạn vẽ."
     },
     {
      "error": "Bài bỏ dở ở phần khó nhất",
      "cause": "Bắt đầu từ phần dễ và chi tiết, hết thời gian cho phần cấu trúc.",
      "fix": "Dựng toàn bộ cấu trúc trước, chỉ chi tiết hóa khi tổng thể đã đứng vững."
     }
    ],
    "passScore": 70
   }
  ]
 }
];
