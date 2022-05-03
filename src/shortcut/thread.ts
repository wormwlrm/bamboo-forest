import {
  AllMiddlewareArgs,
  App,
  BlockAction,
  BlockElementAction,
  MessageShortcut,
  SlackActionMiddlewareArgs,
  SlackShortcutMiddlewareArgs,
  SlackViewAction,
  SlackViewMiddlewareArgs,
  ViewSubmitAction,
} from "@slack/bolt";
import { getRandomName } from "../utils/names";
import { WebClient } from "@slack/web-api";
import { getOriginalMessageFromBlocks, sendMessage } from "../utils/chat";

const IDENTIFIER = "bamboo_thread";

const sendView = async ({
  client,
  trigger_id,
  serialized,
  description,
}: {
  client: WebClient;
  trigger_id: string;
  serialized: string;
  description: string;
}) => {
  return client.views.open({
    trigger_id: trigger_id,
    view: {
      type: "modal",
      private_metadata: serialized,
      callback_id: IDENTIFIER,
      title: {
        type: "plain_text",
        text: "Bamboo Forest",
        emoji: true,
      },
      submit: {
        type: "plain_text",
        text: "Submit",
        emoji: true,
      },
      close: {
        type: "plain_text",
        text: "Cancel",
        emoji: true,
      },
      blocks: [
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: description,
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "input",
          block_id: `#content`,
          element: {
            type: "plain_text_input",
            multiline: true,
            placeholder: {
              type: "plain_text",
              text: "스레드에 전송되는 메시지입니다.",
              emoji: true,
            },
            action_id: `#message`,
          },
          label: {
            type: "plain_text",
            text: "새 메시지 입력",
            emoji: true,
          },
        },
        {
          type: "input",
          block_id: `#name`,
          element: {
            type: "plain_text_input",
            placeholder: {
              type: "plain_text",
              text: "아무것도 입력하지 않으면 익명으로 표시됩니다.",
              emoji: true,
            },
            action_id: `#message`,
          },
          optional: true,
          label: {
            type: "plain_text",
            text: "이름 입력",
            emoji: true,
          },
        },
        {
          type: "section",
          block_id: `#confirm`,
          text: {
            type: "mrkdwn",
            text: " ",
          },
          accessory: {
            type: "checkboxes",
            focus_on_load: true,
            options: [
              {
                text: {
                  type: "mrkdwn",
                  text: ":warning: *한 번 전송한 메시지는 수정이 불가능함을 확인했어요.*",
                },
                value: "checked",
              },
            ],
            action_id: `#checked`,
          },
        },
      ],
    },
  });
};

const openThreadModal = async ({
  ack,
  body,
  client,
  logger,
}:
  | (SlackShortcutMiddlewareArgs<MessageShortcut> & AllMiddlewareArgs)
  | (SlackActionMiddlewareArgs<BlockAction<BlockElementAction>> &
      AllMiddlewareArgs)) => {
  try {
    await ack();

    const originalMessage = getOriginalMessageFromBlocks(body.message?.blocks);
    const description = `현재 아래 메시지에 스레드를 다는 중이에요.\n\n>>>\n${originalMessage}`;
    const private_metadata = JSON.stringify({
      message_ts: body.message?.ts ?? "",
    });
    const serialized = JSON.stringify(private_metadata);

    await sendView({
      client,
      trigger_id: body.trigger_id,
      serialized,
      description,
    });
  } catch (error) {
    logger.error(error);
  }
};

const responseModal = async ({
  ack,
  view,
  client,
  logger,
}: SlackViewMiddlewareArgs<SlackViewAction> & AllMiddlewareArgs) => {
  try {
    const values = view["state"]["values"];

    const name = values["#name"]["#message"].value ?? getRandomName();
    const message = values[`#content`][`#message`].value ?? "";
    const checked =
      (values[`#confirm`][`#checked`]["selected_options"]?.length ?? 0) > 0;

    const private_metadata = JSON.parse(JSON.parse(view["private_metadata"]));
    const thread_ts = private_metadata["message_ts"];

    if (!checked) {
      await ack({
        response_action: "errors",
        errors: {
          [`#content`]: "아래 체크박스에 동의해주세요.",
        },
      });
      return;
    }

    await ack();
    await sendMessage({
      client,
      name,
      message,
      thread_ts,
    });
  } catch (error) {
    logger.error(error);
  }
};

export const applyBambooThread = (app: App) => {
  app.shortcut<MessageShortcut>(IDENTIFIER, openThreadModal);
  app.view<ViewSubmitAction>(IDENTIFIER, responseModal);
  app.action<BlockAction<BlockElementAction>>(
    "#make_thread_button_clicked",
    openThreadModal
  );
};
