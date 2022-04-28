// for details see https://github.com/motdotla/dotenv/blob/master/examples/typescript/
import { resolve } from "path";
import { config } from "dotenv";

const pathToConfig = "../../.env";
config({ path: resolve(__dirname, pathToConfig) });

export const SLACK_BAMBOO_CHANNEL = process.env.SLACK_BAMBOO_CHANNEL ?? "";
export const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN ?? "";
export const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET ?? "";
