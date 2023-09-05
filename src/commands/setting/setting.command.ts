import { BotCommands, TTL_DEFAULT } from '@bot/constants';
import { walletMenu } from '@bot/menu';
import { BotType } from '@bot/types';

export const settingCommand = async (bot: BotType) =>
  bot.command(BotCommands.SETTING, async (ctx) => {
    await ctx.reply(
      `${ctx.t('admin-panel-title')}\n\r\n\r${ctx.t('info-message-node-cache', {
        cache: TTL_DEFAULT / 60,
      })}`,

    );
  });
