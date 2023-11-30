import { getEmoji } from "./names";

const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

export const formattedMessage = ({
  name,
  message,
}: {
  name: string;
  message: string;
}) => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const kr = new Date(utc + KR_TIME_DIFF);

  return `> ${getEmoji(name)} *${name}* 님이 *${kr.toLocaleDateString(
    "ko-KR"
  )} ${kr.toLocaleTimeString("ko-KR")}* 에 등록한 메시지입니다.\n\n${message}`;
};
