import {
  aboutCommand,
  adminCommand,
  clearCommand,
  descriptionCommand,
  imageCommand,
  moderatorCommand,
  profileCommand,
  startCommand,
  textCommand,
  voiceCommand,
} from '@bot/commands';
import {
  callbackQueryComposer,
  conversationComposer,
  menuComposer,
  sessionComposer,
} from '@bot/composers';
import { config } from '@bot/config';
import { botName, modelGPT, supportLanguageCodes } from '@bot/constants';
import { handleBotError, mapBotCommands, mapBotDescription } from '@bot/helpers';
import { auth, normalize } from '@bot/middlewares';
import { BotContextType } from '@bot/types';
import { hydrate } from '@grammyjs/hydrate';
import { I18n } from '@grammyjs/i18n';
import { limit as rateLimit } from '@grammyjs/ratelimiter';
import { apiThrottler } from '@grammyjs/transformer-throttler';
import { Bot } from 'grammy';
import path from 'path';
import { SocksProxyAgent } from 'socks-proxy-agent';
import {generateUpdateMiddleware} from 'telegraf-middleware-console-time';
import {env} from "node:process";

const socksAgent = new SocksProxyAgent('socks5://127.0.0.1:15235');


export const createBot = () => {
  const bot = new Bot<BotContextType>(config.TELEGRAM_TOKEN, {
      client : {
          baseFetchConfig: {
              agent: socksAgent,
              compress: true,
          },
      }
  });

  const i18n = new I18n<BotContextType>({
    defaultLocale: 'zh',
    globalTranslationContext: (ctx) => ({
      botName: ctx?.me?.first_name ?? botName,
      firstName: ctx?.from?.first_name ?? '',
      lastName: ctx?.from?.last_name ?? '',
      model: modelGPT,
      username: ctx?.from?.username ?? '',
    }),
    directory: path.join(__dirname, './locales'),
    useSession: true,
  });

  supportLanguageCodes.forEach(async (languageCode) => {
    await bot.api.setMyDescription(mapBotDescription(i18n, languageCode), {
      language_code: languageCode,
    });

    await bot.api.setMyCommands(mapBotCommands(i18n, languageCode), {
      language_code: languageCode,
    });
  });

  bot.api.config.use(apiThrottler());

  bot.use(rateLimit());

  bot.use(hydrate());

  bot.use(i18n);

  bot.use(auth());

  bot.use(sessionComposer());

  bot.use(normalize());

  bot.use(conversationComposer());

  bot.use(menuComposer());

  bot.use(callbackQueryComposer());

  [
    aboutCommand,
    adminCommand,
    clearCommand,
    descriptionCommand,
    moderatorCommand,
    profileCommand,
    startCommand,
    imageCommand,
    textCommand,
    voiceCommand,
  ].forEach((handle) => handle(bot));
  if (env['NODE_ENV'] !== 'production') {
    // Show what telegram updates (messages, button clicks, ...) are happening (only in development)
    bot.use(generateUpdateMiddleware());
  }
  bot.catch(handleBotError);


  return bot;
};
