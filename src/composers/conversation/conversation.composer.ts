import {
  addMultipleUsersConversation,
  addUserConversation,
  createImageConversation, importWalletConversation,
} from '@bot/conversations';
import { BotContextType } from '@bot/types';
import { conversations, createConversation } from '@grammyjs/conversations';
import { Composer, Middleware } from 'grammy';

const composer = new Composer<BotContextType>();

composer.use(conversations());

composer.use(createConversation(addUserConversation));
composer.use(createConversation(addMultipleUsersConversation));
composer.use(createConversation(createImageConversation));


composer.use(createConversation(importWalletConversation));

export const conversationComposer = (): Middleware<BotContextType> => composer;
