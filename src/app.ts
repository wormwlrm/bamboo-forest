import "./utils/env";
import { isGenericMessageEvent } from "./utils/helpers";
import { App } from "@slack/bolt";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message("hello", async ({ message, say }) => {
  if (!isGenericMessageEvent(message)) return;

  await say(`Hey there <@${message.user}>!`);
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
