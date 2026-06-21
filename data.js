// dog-doctor/data.js

const BREEDS = [
  { id: "maltese", name: "말티즈", size: "small", brachy: false },
  { id: "pomeranian", name: "포메라니안", size: "small", brachy: false },
  { id: "poodle", name: "푸들", size: "small", brachy: false },
  { id: "chihuahua", name: "치와와", size: "small", brachy: false },
  { id: "yorkshire", name: "요크셔테리어", size: "small", brachy: false },
  { id: "shih_tzu", name: "시츄", size: "small", brachy: true },
  { id: "pug", name: "퍼그", size: "small", brachy: true },
  { id: "french_bulldog", name: "프렌치 불독", size: "medium", brachy: true },
  { id: "cocker_spaniel", name: "코카스파니엘", size: "medium", brachy: false },
  { id: "welsh_corgi", name: "웰시코기", size: "medium", brachy: false },
  { id: "shiba", name: "시바견", size: "medium", brachy: false },
  { id: "jindo", name: "진돗개", size: "medium", brachy: false },
  { id: "golden_retriever", name: "골든 리트리버", size: "large", brachy: false },
  { id: "german_shepherd", name: "저먼 셰퍼드", size: "large", brachy: false },
  { id: "etc_mix", name: "기타 / 믹스견", size: "medium", brachy: false }
];

const BODY_PARTS = {
  head: {
    name: "머리/눈/코/귀",
    symptoms: [
      { id: "eye_discharge", name: "눈곱 증가", desc: "눈곱이 평소보다 많이 끼고 끈적거림" },
      { id: "eye_redness", name: "눈 충혈", desc: "눈의 흰자위가 빨갛게 충혈됨" },
      { id: "eye_cloudy", name: "눈이 뿌옇게 변함", desc: "각막이나 수정체 부위가 흐리거나 뿌옇게 보임" },
      { id: "runny_nose", name: "콧물/재채기", desc: "맑은 콧물이나 누런 콧물이 흐르고 재채기를 함" },
      { id: "coughing", name: "콱콱 거위소리 기침", desc: "목에 무언가 걸린 듯 콱콱거리거나 거위 울음소리 같은 기침" },
      { id: "ear_scratching", name: "귀를 자주 긁음", desc: "발로 귀를 긁거나 바닥에 머리를 비벼댐" },
      { id: "ear_smell", name: "귀에서 냄새/분비물", desc: "귀 안쪽에서 시큼하거나 불쾌한 냄새가 나고 갈색 귀지가 나옴" }
    ]
  },
  mouth: {
    name: "입/소화",
    symptoms: [
      { id: "vomiting", name: "구토", desc: "사료나 위액, 거품이 섞인 노란 액체 등을 토함" },
      { id: "diarrhea", name: "설사/묽은 변", desc: "대변의 형태가 없고 묽거나 물처럼 쏟아냄" },
      { id: "bloody_stool", name: "혈변 (피설사)", desc: "변에 붉은 피나 검붉은 혈액, 점액이 섞여 나옴" },
      { id: "loss_of_appetite", name: "식욕 부진", desc: "사료나 평소 좋아하던 간식을 거부함" },
      { id: "drooling", name: "침 흘림", desc: "입가에 침을 과도하게 흘리며 끈적한 침이 묻어남" },
      { id: "bad_breath", name: "심한 입냄새", desc: "입에서 생선 비린내나 평소보다 심한 악취가 남" }
    ]
  },
  skin: {
    name: "피부",
    symptoms: [
      { id: "skin_scratching", name: "피부를 긁거나 핥음", desc: "몸, 발가락, 사타구니 등을 계속 긁거나 핥음" },
      { id: "skin_redness", name: "발적/염증", desc: "피부가 붉게 발진되거나 뾰루지, 딱지가 생김" },
      { id: "dandruff", name: "비듬/각질", desc: "털 사이에 하얀 비듬이나 각질이 눈에 띄게 증가함" },
      { id: "hair_loss", name: "원형 탈모/부분 탈모", desc: "특정 부위의 털이 뭉텅이로 빠져 땜빵이 생김" }
    ]
  },
  joints: {
    name: "다리/관절",
    symptoms: [
      { id: "limping", name: "다리를 절뚝거림", desc: "걸을 때 한쪽 다리에 힘을 싣지 못하고 절뚝거림" },
      { id: "three_legs", name: "다리 하나를 들고 걸음", desc: "뒷다리 중 하나를 땅에 딛지 않고 들고 다님" },
      { id: "reluctance_to_move", name: "움직이기 싫어함", desc: "계단 오르기, 점프를 거부하고 안으려고 하면 통증을 느낌" },
      { id: "joint_licking", name: "특정 관절 부위를 계속 핥음", desc: "무릎이나 발목 등 특정 관절 주위를 집착적으로 핥음" }
    ]
  },
  belly: {
    name: "배/복부",
    symptoms: [
      { id: "bloated_belly", name: "배가 빵빵하게 부풀어 오름", desc: "갈비뼈 아래 복부가 단단하고 평소보다 부풀어 보임" },
      { id: "abdominal_pain", name: "배를 만지면 아파함/소리 지름", desc: "배 쪽을 만지려고 하면 으르렁대거나 깨갱 비명을 지름" },
      { id: "prayer_pose", name: "엉덩이를 들고 엎드리는 자세", desc: "앞다리는 엎드리고 엉덩이는 하늘로 올린 채 웅크리는 고통 표현 자세" }
    ]
  },
  body: {
    name: "전신/기타",
    symptoms: [
      { id: "lethargy", name: "활력 저하/기력 없음", desc: "하루 종일 누워만 있고 불러도 반응이 둔함" },
      { id: "fever", name: "발열", desc: "귀나 몸통 안쪽이 평소보다 지나치게 뜨겁고 코가 바짝 말라 있음" },
      { id: "panting", name: "과도한 헐떡임", desc: "운동을 하지 않았는데도 혀를 내밀고 빠르게 호흡함" },
      { id: "excessive_thirst", name: "음수량 급증/소변량 급증", desc: "물을 평소보다 비정상적으로 많이 마시고 소변을 자주 봄" },
      { id: "weight_loss", name: "이유 없는 체중 감소", desc: "사료를 먹는데도 살이 빠지고 갈비뼈가 도드라져 보임" }
    ]
  }
};

const DISEASES = [
  {
    id: "parvovirus",
    name: "파보바이러스 장염",
    desc: "치사율이 매우 높은 급성 전염성 위장 질환입니다. 특히 백신 접종이 완료되지 않은 어린 강아지에게 치명적입니다.",
    urgency: "emergency",
    symptoms: ["vomiting", "diarrhea", "bloody_stool", "loss_of_appetite", "lethargy", "fever"],
    ageModifiers: { puppy: 2.5, adult: 0.8, senior: 0.5 },
    breedModifiers: {},
    dos: [
      { title: "즉시 동물병원으로 이송하세요.", reason: "전염성이 매우 강하고 탈수로 인해 단시간 내에 생명이 위험해질 수 있습니다." },
      { title: "격리 조치를 취해 주세요.", reason: "다견 가정일 경우 다른 반려견과의 접촉을 완벽히 차단해야 전염을 막을 수 있습니다." }
    ],
    donts: [
      { title: "물이나 사료를 억지로 먹이지 마세요.", reason: "구토와 설사를 가중시켜 심각한 탈수 상태를 유발할 수 있습니다." },
      { title: "자가 치료를 시도하지 마세요.", reason: "사람 해열제나 가정용 상비약은 강아지에게 급성 간부전이나 독성 반응을 일으킵니다." }
    ]
  },
  {
    id: "patellar_luxation",
    name: "슬개골 탈구",
    desc: "뒷다리 무릎관절 위의 활차구에서 슬개골(뼈)이 이탈하는 질환입니다. 소형견에게 유전적으로 매우 흔히 발생합니다.",
    urgency: "warning",
    symptoms: ["limping", "three_legs", "reluctance_to_move", "joint_licking"],
    ageModifiers: { puppy: 1.0, adult: 1.2, senior: 1.5 },
    sizeModifiers: { small: 2.0, medium: 1.0, large: 0.5 },
    breedModifiers: { maltese: 1.5, pomeranian: 1.8, poodle: 1.3, chihuahua: 1.5, yorkshire: 1.5 },
    dos: [
      { title: "안정 상태를 유지하도록 해주세요.", reason: "흥분해서 뛰거나 소파/침대에서 뛰어내리지 않도록 가두거나 제한 구역에 두어야 합니다." },
      { title: "관절 주변을 온찜질 해주세요.", reason: "급성 통증이 지나간 만성 통증 상태에서는 혈액 순환을 돕고 근육을 이완시키는 온찜질이 좋습니다." }
    ],
    donts: [
      { title: "두 발로 서게 하거나 춤추는 행동을 시키지 마세요.", reason: "무릎 관절에 체중의 수 배에 달하는 과부하가 걸려 탈구 기수를 악화시킵니다." },
      { title: "무리한 산책을 강행하지 마세요.", reason: "염증과 관절마모가 심해져 영구적인 보행 장애로 이어질 수 있습니다." }
    ]
  },
  {
    id: "otitis_externa",
    name: "외이도염",
    desc: "귓바퀴에서 고막에 이르는 통로인 외이도에 세균이나 곰팡이 균이 번식하여 염증이 생기는 질환입니다. 귀가 덮인 품종에 자주 발생합니다.",
    urgency: "warning",
    symptoms: ["ear_scratching", "ear_smell", "lethargy"],
    ageModifiers: { puppy: 1.0, adult: 1.0, senior: 1.0 },
    breedModifiers: { cocker_spaniel: 2.0, poodle: 1.5, golden_retriever: 1.5 },
    dos: [
      { title: "귀 주변을 건조하게 유지하세요.", reason: "습한 환경은 곰팡이와 세균의 번식을 촉진시키므로 환기가 잘 되도록 귀를 가끔 열어주는 것이 좋습니다." },
      { title: "카라(넥카라)를 씌워주세요.", reason: "귀를 계속 긁으면 2차 상처가 나거나 귀 안쪽에 이개혈종(피가 차는 증상)이 발생할 수 있습니다." }
    ],
    donts: [
      { title: "면봉으로 귓속을 무리하게 파지 마세요.", reason: "귓속 연약한 피부에 깊은 상처를 내어 염증을 안으로 밀어 넣거나 고막을 손상시킬 수 있습니다." },
      { title: "임의로 집에 있던 다른 동물 귀약을 넣지 마세요.", reason: "귓속 고막이 찢어진(천공) 상태에서 약물이 들어가면 영구적인 청력 상실을 유발할 수 있습니다." }
    ]
  },
  {
    id: "atopic_dermatitis",
    name: "아토피성 피부염 / 알레르기",
    desc: "환경적 요인이나 음식 알레르기로 인해 만성적인 가려움증과 피부 염증이 지속되는 면역학적 질환입니다.",
    urgency: "safe",
    symptoms: ["skin_scratching", "skin_redness", "dandruff", "hair_loss"],
    ageModifiers: { puppy: 1.2, adult: 1.2, senior: 0.8 },
    dos: [
      { title: "가려움증 부위에 냉찜질을 해주세요.", reason: "얼음주머니를 타월로 감싸 피부에 대어주면 신경 감각을 일시적으로 둔화시켜 긁는 것을 줄여줍니다." },
      { title: "최근에 바뀐 환경이나 음식을 체크하세요.", reason: "새로운 사료, 간식, 샴푸, 혹은 산책로의 풀 등이 알레르기 유발 물질(항원)일 가능성이 큽니다." }
    ],
    donts: [
      { title: "피부가 빨갛게 일어난 곳에 알코올 소독제를 바르지 마세요.", reason: "강한 자극과 통증을 유발하고 피부 보호막을 완전히 파괴해 증상을 악화시킵니다." },
      { title: "자주 목욕시키지 마세요.", reason: "잦은 샴푸 목욕은 피부를 더욱 건조하게 만들어 가려움증을 가중시킵니다. 주 1~2회가 적당합니다." }
    ]
  },
  {
    id: "gastroenteritis",
    name: "급성 위장염",
    desc: "부패한 음식 섭취, 과식, 스트레스 등으로 인해 위와 장에 급성 염증이 발생하는 질환입니다.",
    urgency: "warning",
    symptoms: ["vomiting", "diarrhea", "loss_of_appetite", "abdominal_pain", "lethargy"],
    ageModifiers: { puppy: 1.5, adult: 1.0, senior: 1.2 },
    dos: [
      { title: "반나절(6~12시간) 정도 절식을 고려하세요.", reason: "위장을 쉬게 하여 구토 증상을 진정시킬 수 있습니다. 단, 자견은 저혈당 위험이 있으므로 수의사와 상담해야 합니다." },
      { title: "탈수를 막기 위해 물을 조금씩 자주 주세요.", reason: "한 번에 많은 양의 물을 마시면 위가 자극되어 다시 토할 수 있으므로 숟가락으로 떠주듯 조금씩 급여합니다." }
    ],
    donts: [
      { title: "구토 증세가 멈추기 전에는 사료나 간식을 주지 마세요.", reason: "소화기관에 무리를 주어 재구토를 유발하고 역류성 식도염을 초래합니다." },
      { title: "임의로 사람이 먹는 지설제(설사약)를 먹이지 마세요.", reason: "성분 중 일부가 강아지에게 치명적인 독성을 보일 수 있으며 진단을 방해합니다." }
    ]
  },
  {
    id: "heatstroke",
    name: "급성 열사병",
    desc: "체온 조절 능력이 취약한 강아지가 고온의 환경(여름철 차 안, 뜨거운 한낮 산책)에 노출되어 심부 온도가 급격히 상승하는 응급 질환입니다.",
    urgency: "emergency",
    symptoms: ["panting", "drooling", "fever", "lethargy", "vomiting"],
    ageModifiers: { puppy: 1.2, adult: 1.0, senior: 1.8 },
    breedModifiers: { pug: 2.0, french_bulldog: 2.0, shih_tzu: 1.8 },
    dos: [
      { title: "즉시 그늘지고 에어컨이 나오는 시원한 곳으로 이동하세요.", reason: "체온을 낮추는 것이 생존의 가장 핵심적인 응급 처치입니다." },
      { title: "미지근한 물을 발바닥과 몸에 적셔주세요.", reason: "부드럽게 기화열로 체온을 떨어뜨려야 합니다. 시원한 선풍기 바람을 쐬어주면 좋습니다." }
    ],
    donts: [
      { title: "얼음물이나 극단적으로 차가운 물에 강아지를 담그지 마세요.", reason: "피부 혈관이 급격히 수축하여 오히려 몸속 심부 열이 방출되지 못하고 쇼크를 일으킵니다." },
      { title: "의식이 없는 상태에서 물을 억지로 마시게 하지 마세요.", reason: "물이 기도로 넘어가 오흡성 폐렴을 유발하거나 질식을 일으켜 매우 위험합니다." }
    ]
  },
  {
    id: "tracheal_collapse",
    name: "기관 협착증 (기관 허탈)",
    desc: "공기가 지나가는 통로인 기관(숨통)을 지지하는 연골 조직이 탄력을 잃고 납작하게 찌그러져 호흡 곤란을 유발하는 만성 질환입니다.",
    urgency: "warning",
    symptoms: ["coughing", "panting", "reluctance_to_move"],
    ageModifiers: { puppy: 0.5, adult: 1.0, senior: 1.8 },
    sizeModifiers: { small: 2.0, medium: 0.8, large: 0.3 },
    breedModifiers: { pomeranian: 2.0, yorkshire: 2.0, chihuahua: 1.8, pug: 1.5 },
    dos: [
      { title: "목줄 대신 가슴줄(하네스)을 사용하세요.", reason: "목에 가해지는 직접적인 압박을 제거하여 기관지 자극과 기침 발작을 줄일 수 있습니다." },
      { title: "온습도를 쾌적하게 유지하세요.", reason: "건조하고 더운 공기는 기도 점막을 자극하여 호흡 곤란을 부추기므로 가습기를 켜줍니다." }
    ],
    donts: [
      { title: "강아지를 흥분시키거나 과도하게 뛰게 하지 마세요.", reason: "흥분하면 호흡량이 늘어나 찌그러진 기관지에 마찰이 늘고 청색증이나 실신을 유발할 수 있습니다." },
      { title: "체중 관리를 소홀히 하지 마세요.", reason: "비만은 기도를 더 압박하고 호흡 효율을 떨어뜨리는 가장 치명적인 악화 요인입니다." }
    ]
  },
  {
    id: "pancreatitis",
    name: "췌장염",
    desc: "지방이 많은 음식 섭취 등으로 인해 췌장에 염증이 발생하여 심각한 복통과 장기 손상을 유발하는 질환입니다.",
    urgency: "emergency",
    symptoms: ["vomiting", "abdominal_pain", "prayer_pose", "loss_of_appetite", "lethargy", "diarrhea"],
    ageModifiers: { puppy: 0.5, adult: 1.0, senior: 1.8 },
    dos: [
      { title: "발견 즉시 모든 음식 급여를 중단(금식)하세요.", reason: "음식물이 위장에 들어오는 순간 췌장에서 소화효소가 분비되어 자가 소화 및 염증이 더욱 심해집니다." },
      { title: "최대한 편안한 자세로 눕혀 24시 병원으로 가세요.", reason: "췌장염은 신부전, 패혈증 등의 합병증으로 수일 내 사망할 수 있는 초응급 질환입니다." }
    ],
    donts: [
      { title: "배가 아파 보인다고 복부를 강하게 마사지하지 마세요.", reason: "염증 부위를 자극하여 통증을 극한으로 끌어올리고 장기 손상을 악화시킬 수 있습니다." },
      { title: "북어국이나 꿀물 등 '보양식'을 주지 마세요.", reason: "췌장에 일을 시키는 모든 영양물질은 현재 상태에서 독약과 같습니다." }
    ]
  },
  {
    id: "cataract",
    name: "백내장",
    desc: "안구 속 수정체가 뿌옇고 불투명하게 변하면서 시력 장애를 초래하는 노령성/유전성 안과 질환입니다.",
    urgency: "warning",
    symptoms: ["eye_cloudy", "eye_redness", "reluctance_to_move"],
    ageModifiers: { puppy: 0.3, adult: 0.8, senior: 2.5 },
    dos: [
      { title: "가구 배치를 바꾸지 말고 고정해 주세요.", reason: "시력이 저하된 강아지가 익숙한 경로로 보행하게 하여 가구에 부딪려 다치는 2차 사고를 방지합니다." },
      { title: "안구 주변 방해물(털 등)을 정리하세요.", reason: "눈 찌름 등으로 인한 2차 각막 염증이나 상처가 더해지는 것을 방지해야 합니다." }
    ],
    donts: [
      { title: "어두운 곳에서 갑자기 만지거나 놀라게 하지 마세요.", reason: "시야가 좁아지고 가려진 상태에서 방어적인 입질(물기) 반응이 나올 수 있습니다." },
      { title: "일반 노화 현상으로 치부하고 방치하지 마세요.", reason: "말기의 백내장은 녹내장이나 안구 내 포도막염을 유발하여 극심한 통증과 안구 적출로 이어질 수 있습니다." }
    ]
  },
  {
    id: "dementia",
    name: "인지기능장애 증후군 (치매)",
    desc: "뇌의 노화로 인해 학습, 기억력, 행동 양식이 변하는 노령견 전용 퇴행성 질환입니다.",
    urgency: "safe",
    symptoms: ["lethargy", "panting", "reluctance_to_move"],
    ageModifiers: { puppy: 0.0, adult: 0.1, senior: 3.0 },
    dos: [
      { title: "낮 동안 가벼운 산책이나 노즈워크를 시켜주세요.", reason: "두뇌에 지속적인 자극을 주고 낮 동안 활동을 늘려 밤샘 울음이나 수면 불일치를 다소 예방할 수 있습니다." },
      { title: "일관성 있는 일과 규칙을 만들어 주세요.", reason: "강아지가 일상에 예측 가능함을 느껴 심리적 불안과 벽을 보고 짖는 등의 행동을 진정시키는 데 도움을 줍니다." }
    ],
    donts: [
      { title: "대소변 실수를 하거나 헛짖음을 할 때 크게 혼내지 마세요.", reason: "질병으로 인한 인지 불가 행동이므로 혼을 내면 불안감만 극대화되어 치매 증상이 가속됩니다." },
      { title: "강아지가 좁은 틈에 끼였을 때 억지로 잡아당기지 마세요.", reason: "치매견은 전진만 하려는 경향이 있어 모퉁이나 틈새에 잘 끼이며, 억지로 꺼내면 패닉을 느낍니다." }
    ]
  }
];
