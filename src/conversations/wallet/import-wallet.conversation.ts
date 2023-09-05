import {config} from '@bot/config';
import {
    ADD_USER_CSV_FORMAT,
    addUserFormat,
    BotCommands,
    CREATE_IMAGE_QUERY_FORMAT,
    IMPORT_WALLET_FORMAT,
    UserRoles
} from '@bot/constants';
import {convertBase64ToFiles} from '@bot/helpers';
import {inlineCreateImage, inlineGoToAdminMenu, inlineGoToChat, inlineGoToModeratorMenu} from '@bot/keyboards';
import {google, logger, mongo, openAI} from '@bot/services';
import {ConversationType} from '@bot/types';
import {generateUniqueId, removeFile} from '@bot/utils';
import {InputMediaPhoto} from 'grammy/types';
import type {ForceReply, InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove} from "grammy/types";

export const importWalletConversation: ConversationType = async (conversation, ctx) => {
    try {
        const currentUsername = String(ctx.from?.username);

        await ctx.reply(ctx.t('wallets-menu-message-import-create', {privateFormat: IMPORT_WALLET_FORMAT}), {
            // Make Telegram clients automatically show a reply interface to the user.
            reply_markup: <ForceReply>{force_reply: true}
        });


        const {
            message: {text, message_id: messageId},
        } = await conversation.waitFor('message:text');
        console.log(text, messageId)
        console.log("adfasdfasdf", messageId)

        return;
    } catch (error) {
        await ctx.reply(ctx.t('error-message-common'));

        logger.error(`conversations::createImageConversation::${JSON.stringify(error.message)}`);

        return;
    }
};
