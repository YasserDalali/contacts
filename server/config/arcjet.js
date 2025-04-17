import { ARCJET_KEY } from "./config.js";
import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";

const aj = arcjet({
    key: ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
      shield({ mode: "LIVE" }),
      detectBot({
        mode: "LIVE",
        allow: [
          "CATEGORY:SEARCH_ENGINE",
          "CATEGORY:TOOL",
        ],
      }),
      tokenBucket({
        mode: "LIVE",
        refillRate: 5,
        interval: 10,
        capacity: 10,
      }),
    ],
});

export { aj, isSpoofedBot };