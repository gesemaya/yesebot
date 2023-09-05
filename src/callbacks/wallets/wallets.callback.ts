import { UserRoles } from '@bot/constants';
import { inlineGoToAdminMenu, inlineGoToModeratorMenu } from '@bot/keyboards';
import { csv, logger, mongo } from '@bot/services';
import { DynamicUsersMenuCallbackType } from '@bot/types';
import { removeFile } from '@bot/utils';
import {createImageConversation, importWalletConversation} from "conversations";

export const createWalletMessagesCallback: DynamicUsersMenuCallbackType = async (
  ctx,
  username,
) => {
  try {
    await ctx.reply("创建钱包");
  } catch (error) {
    await ctx.reply(ctx.t('error-message-common'));

    logger.error(
      `callbacks::sessions::getUserSessionMessagesCallback::${JSON.stringify(error.message)}`,
    );
  }
};

export const importWalletMessagesCallback: DynamicUsersMenuCallbackType = async (
  ctx,
  username,
) => {
  try {
    await ctx.conversation.enter(importWalletConversation.name);
    console.log("adfasdf")


   // await ctx.deleteMessage();
   //  await ctx.reply(ctx.t('wallets-menu-message-import-create', { username }), {
   //    reply_markup: inlineGoToAdminMenu(ctx),
   //  });
  } catch (error) {
    await ctx.reply(ctx.t('error-message-common'));

    logger.error(
      `callbacks::sessions::deleteUserSessionMessagesCallback::${JSON.stringify(error.message)}`,
    );
  }
};
