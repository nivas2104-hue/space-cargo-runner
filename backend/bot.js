require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚀 Welcome to Space Cargo Runner!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🎮 Play Game",
            url: "https://space-cargo-runner.vercel.app",
          },
        ],
      ],
    },
  });
});

console.log("Bot Running...");
