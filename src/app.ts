import { App } from "@slack/bolt";

import "./utils/env";
import { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET } from "./utils/env";
import { applyBambooMessage } from "./shortcut/message";
import { applyBambooThread } from "./shortcut/thread";
import { applyBambooCommon } from "./shortcut/common";

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
});

applyBambooMessage(app);
applyBambooThread(app);
applyBambooCommon(app);

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
