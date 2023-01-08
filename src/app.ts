import { AwsLambdaReceiver } from "@slack/bolt";
import {
  AwsCallback,
  AwsEvent,
  AwsResponse,
} from "@slack/bolt/dist/receivers/AwsLambdaReceiver";

import "./utils/env";
import { SLACK_SIGNING_SECRET } from "./utils/env";
import { Bamboo } from "./classes/Bamboo";

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: SLACK_SIGNING_SECRET,
});

const bamboo = new Bamboo({
  awsLambdaReceiver,
})
  .applyBambooCommon()
  .applyBambooMessage()
  .applyBambooThread();

console.log(bamboo);

const handler = async (
  event: AwsEvent,
  context: any,
  callback: AwsCallback
): Promise<AwsResponse> => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
};

module.exports.handler = handler;
