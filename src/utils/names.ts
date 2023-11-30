export const firstNames = [
  "깔끔한",
  "근면한",
  "엄격한",
  "꼼꼼한",
  "성급한",
  "솔직한",
  "게으른",
  "냉정한",
  "용감한",
  "완고한",
  "까다로운",
  "예민한",
  "세련된",
  "도도한",
  "외향적인",
  "창의적인",
  "유순한",
  "건방진",
  "신중한",
  "아름다운",
  "빛나는",
  "성실한",
  "친절한",
  "진실한",
  "정직한",
  "정중한",
  "도망가는",
  "헤엄치는",
  "웃음짓는",
  "당황한",
  "낙천적인",
  "존경받는",
  "사랑스러운",
  "두려운",
  "집중한",
  "비밀스러운",
  "행복한",
  "자신감있는",
  "지친",
  "졸린",
  "찌뿌둥한",
  "우아한",
  "배고픈",
  "배부른",
  "목마른",
  "우울한",
  "활기찬",
  "잠자는",
  "심심한",
  "수다스러운",
  "재잘대는",
  "겸손한",
  "낙천적인",
  "조용한",
  "시끄러운",
  "격노한",
  "춤추는",
  "노래하는",
  "박수치는",
  "서러운",
  "촐싹대는",
  "뒹굴대는",
  "두근대는",
  "미소짓는",
  "제멋대로인",
  "무뚝뚝한",
  "깜짝놀란",
  "정신없는",
  "꿈틀대는",
  "외로운",
  "고민많은",
] as const;

export const lastNames = [
  "토끼",
  "오리",
  "양",
  "사자",
  "코끼리",
  "사슴",
  "호랑이",
  "거미",
  "여우",
  "강아지",
  "원숭이",
  "쥐",
  "소",
  "뱀",
  "말",
  "상어",
  "돼지",
  "늑대",
  "코뿔소",
  "라쿤",
  "유니콘",
  "나비",
  "햄스터",
  "오징어",
  "고등어",
  "참새",
  "독수리",
  "도마뱀",
  "앵무새",
  "선인장",
  "네잎클로버",
  "문어",
  "거북이",
  "얼룩말",
  "해파리",
  "악어",
  "곰",
  "고양이",
  "닭",
  "개미",
  "공룡",
  "나무늘보",
  "고슴도치",
  "하마",
  "드래곤",
  "박쥐",
  "오랑우탄",
  "낙타",
  "병아리",
  "비둘기",
  "꿀벌",
  "표범",
  "코알라",
  "캥거루",
  "펭귄",
  "스컹크",
  "달팽이",
  "해바라기",
  "지렁이",
] as const;

export const getRandomName = (): string => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${lastName}`;
};

export const getEmoji = (name: string): string => {
  const [, lastName] = name.split(" ");

  switch (lastName) {
    case "토끼":
      return ":rabbit:";
    case "오리":
      return ":duck:";
    case "양":
      return ":sheep:";
    case "사자":
      return ":lion_face:";
    case "코끼리":
      return ":elephant:";
    case "사슴":
      return ":deer:";
    case "호랑이":
      return ":tiger:";
    case "거미":
      return ":spider:";
    case "여우":
      return ":fox_face:";
    case "강아지":
      return ":dog:";
    case "원숭이":
      return ":monkey:";
    case "쥐":
      return ":mouse:";
    case "소":
      return ":cow:";
    case "뱀":
      return ":snake:";
    case "말":
      return ":horse:";
    case "상어":
      return ":shark:";
    case "돼지":
      return ":pig:";
    case "늑대":
      return ":wolf:";
    case "코뿔소":
      return ":rhinoceros:";
    case "라쿤":
      return ":raccoon:";
    case "유니콘":
      return ":unicorn_face:";
    case "나비":
      return ":butterfly:";
    case "햄스터":
      return ":hamster:";
    case "오징어":
      return ":squid:";
    case "고등어":
      return ":fish:";
    case "참새":
      return ":bird:";
    case "독수리":
      return ":eagle:";
    case "도마뱀":
      return ":lizard:";
    case "앵무새":
      return ":parrot:";
    case "개구리":
      return ":frog:";
    case "버섯":
      return ":mushroom:";
    case "문어":
      return ":octopus:";
    case "거북이":
      return ":turtle:";
    case "돌고래":
      return ":dolphin:";
    case "네잎클로버":
      return ":four_leaf_clover:";
    case "악어":
      return ":crocodile:";
    case "곰":
      return ":bear:";
    case "고양이":
      return ":cat:";
    case "닭":
      return ":chicken:";
    case "개미":
      return ":ant:";
    case "공룡":
      return ":sauropod:";
    case "나무늘보":
      return ":sloth:";
    case "고슴도치":
      return ":hedgehog:";
    case "하마":
      return ":hippopotamus:";
    case "드래곤":
      return ":dragon:";
    case "박쥐":
      return ":bat:";
    case "오랑우탄":
      return ":orangutan:";
    case "낙타":
      return ":camel:";
    case "병아리":
      return ":baby_chick:";
    case "비둘기":
      return ":dove_of_peace:";
    case "꿀벌":
      return ":bee:";
    case "표범":
      return ":leopard:";
    case "코알라":
      return ":koala:";
    case "캥거루":
      return ":kangaroo:";
    case "펭귄":
      return ":penguin:";
    case "스컹크":
      return ":skunk:";
    case "달팽이":
      return ":snail:";
    case "해바라기":
      return ":sunflower:";
    case "지렁이":
      return ":worm:";
    default:
      return ":tanabata_tree:";
  }
};
