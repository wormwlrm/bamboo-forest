import {
  AllMiddlewareArgs,
  App,
  BlockAction,
  SlackActionMiddlewareArgs,
} from "@slack/bolt";

const responseCheckbox = async ({
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

export const applyBambooCommon = (app: App) => {
  app.action("#checked", responseCheckbox);

  app.event("app_mention", async ({ say }) => {
    await say(`*임금님 귀는 당나귀 귀!*`);
  });
};
