export const formattedMessage = ({
  name,
  message,
}: {
  name: string;
  message: string;
}) =>
  `> :tanabata_tree: *${name}* 님이 *${new Date().toLocaleDateString(
    "ko-KR"
  )} ${new Date().toLocaleTimeString(
    "ko-KR"
  )}* 에 등록한 메시지입니다.\n\n${message}`;
