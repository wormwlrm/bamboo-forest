import { App, AwsLambdaReceiver } from "@slack/bolt";
import {
  AwsCallback,
  AwsEvent,
  AwsResponse,
} from "@slack/bolt/dist/receivers/AwsLambdaReceiver";

import "./utils/env";
import { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET } from "./utils/env";
import { applyBambooMessage } from "./shortcut/message";
import { applyBambooThread } from "./shortcut/thread";
import { applyBambooCommon } from "./shortcut/common";

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: SLACK_SIGNING_SECRET,
});

const app = new App({
  token: SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

applyBambooMessage(app);
applyBambooThread(app);
applyBambooCommon(app);

const handler = async (
  event: AwsEvent,
  context: any,
  callback: AwsCallback
): Promise<AwsResponse> => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
};

module.exports.handler = handler;
