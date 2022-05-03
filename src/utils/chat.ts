import { WebClient } from "@slack/web-api";
import { SectionBlock } from "@slack/bolt";
import { formattedMessage } from "./format";

import { SLACK_BAMBOO_CHANNEL } from "./env";

export const BAMBOO_MESSAGE_CONTENT_BLOCK_ID = "#bamboo_message_content";

export const getOriginalMessageFromBlocks = (blocks: SectionBlock[] = []) => {
  return (
    blocks.find((b: SectionBlock) => b.block_id === "#bamboo_message_content")
      ?.text?.text ?? ""
  );
};

export const sendMessage = async ({
  client,
  name,
  message,
  thread_ts,
}: {
  client: WebClient;
  name: string;
  message: string;
  thread_ts?: string;
}) => {
  await client.chat.postMessage({
    text: formattedMessage({ name, message }), // 폴백 메시지
    blocks: [
      {
        type: "section",
        block_id: BAMBOO_MESSAGE_CONTENT_BLOCK_ID,
        text: {
          type: "mrkdwn",
          text: formattedMessage({ name, message }),
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "스레드 달기",
            emoji: true,
          },
          value: "make_thread_button_clicked", // 의미 없는 값
          action_id: "#make_thread_button_clicked",
        },
      },
    ],
    channel: SLACK_BAMBOO_CHANNEL,
    thread_ts,
  });
};
