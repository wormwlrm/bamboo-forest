import {
  AllMiddlewareArgs,
  App,
  BlockAction,
  SlackActionMiddlewareArgs,
  SlackEventMiddlewareArgs,
  SlackViewAction,
  SlackViewMiddlewareArgs,
} from "@slack/bolt";
import { SLACK_BAMBOO_CHANNEL } from "../utils/env";

const responseJustAck = async ({
  ack,
  logger,
}: SlackActionMiddlewareArgs<BlockAction> & AllMiddlewareArgs) => {
  try {
    await ack();
  } catch (error) {
    console.log("error");
    logger.error(error);
  }
};

const sendWelcomeMessage = async ({
  say,
  event,
}: SlackEventMiddlewareArgs<"app_mention"> & AllMiddlewareArgs) => {
  await say({
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: ":tanabata_tree: Bamboo Forest",
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `>>> *임금님 귀는 당나귀 귀!* \n\n안녕하세요 여러분! 대나무숲에 오신 걸 환영해요.`,
        },
      },
      {
        block_id: "#mention",
        type: "section",
        text: {
          type: "mrkdwn",
          text: `👉 사용법이 궁금하신가요?`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "사용법 알아보기",
            emoji: true,
          },
          value: "help",
          action_id: "#help",
        },
      },
      {
        block_id: "#question",
        type: "section",
        text: {
          type: "mrkdwn",
          text: `👉 버그를 발견하셨거나 새 기능이 추가되었으면 좋겠나요?`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Github에서 제보하기",
            emoji: true,
          },
          value: "help",
          url: "https://github.com/wormwlrm/bamboo-forest",
          action_id: "#github",
        },
      },
    ],
  });
};

const sendHelpMessage = async ({
  ack,
  body,
  client,
}: SlackActionMiddlewareArgs<BlockAction> & AllMiddlewareArgs) => {
  await ack();

  console.log(body.user.id);
  await client.chat.postEphemeral({
    channel: SLACK_BAMBOO_CHANNEL,
    user: body.user.id,
    text: "*데스크탑에서 채널에 메시지 보내기*\n>1. 메시지 입력창 왼쪽에 있는 :heavy_plus_sign: `첨부 파일 및 바로가기` 버튼을 클릭해주세요.\n>2. :zap: `바로 가기 검색` 창에서 *Bamboo Forest* 를 입력하면 앱을 찾을 수 있어요.\n>3. 복잡한가요? 좀 더 간단하게는 채널 내 메시지 입력창에서 `/bamboo` 커맨드를 입력해도 돼요.\n\n *데스크탑에서 메시지에 스레드 달기*\n>1. 스레드를 달 메시지의 우측 상단에 마우스 커서를 올린 후 `⋮추가 작업` 버튼을 눌러주세요.\n>2. 펼쳐진 메뉴 중 `스레드에 댓글 달기` 항목을 선택하면 돼요.\n\n\n\n *모바일에서 채널에 메시지 보내기* \n>1. 메시지 입력창 왼쪽에 있는 :heavy_plus_sign: `첨부 파일 및 바로가기` 버튼을 눌러주세요. \n> 2. :zap: `바로 가기` 버튼을 눌러주세요. \n>3. `앱 찾아보기`의 *Bamboo Forest* 를 눌러주세요.\n\n*모바일에서 메시지에 스레드 달기*\n>1. 메시지를 꾹 누르면 간단하게 추가 작업 메뉴를 열 수 있어요.\n>2. 펼쳐진 메뉴 중 `스레드에 댓글 달기` 항목을 선택하면 돼요.",
  });
};

export const applyBambooCommon = (app: App) => {
  app.action("#checked", responseJustAck);
  app.action("#github", responseJustAck);

  app.event("app_mention", sendWelcomeMessage);
  app.action("#help", sendHelpMessage);
};
