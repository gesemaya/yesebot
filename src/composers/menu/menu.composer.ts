import { AdminMenu, ModeratorMenu } from '@bot/constants';
import {
  adminMainMenu,
  blockUnblockUserMenu,
  changeUserGptLimitsMenu,
  changeUserRoleMenu,
  conversationsMenu, createWalletMenu,
  deleteUserConversationMenu,
  deleteUserMenu,
  deleteUserSessionMenu,
  getArchiveOrCsvMenu,
  getUserConversationMenu,
  getUserImagesMenu,
  getUserSessionMenu, importWalletMenu,
  moderatorMainMenu,
  selectNewGptLimits,
  selectNewUserRoleMenu,
  sessionsMenu,
  userImagesMenu,
  usersMenu, walletMenu,
} from '@bot/menu';
import { BotContextType } from '@bot/types';
import { Composer, Middleware } from 'grammy';

const composer = new Composer<BotContextType>();

[
    walletMenu,
    createWalletMenu,
    importWalletMenu,
  blockUnblockUserMenu,
  changeUserGptLimitsMenu,
  changeUserRoleMenu,
  conversationsMenu,
  deleteUserConversationMenu,
  deleteUserMenu,
  deleteUserSessionMenu,
  getArchiveOrCsvMenu,
  getUserConversationMenu,
  getUserImagesMenu,
  getUserSessionMenu,
  selectNewGptLimits,
  selectNewUserRoleMenu,
  sessionsMenu,
  userImagesMenu,
  usersMenu,
].forEach((subMenu) => adminMainMenu.register(subMenu(AdminMenu.NAME)));

[blockUnblockUserMenu, getUserSessionMenu, sessionsMenu, usersMenu].forEach((subMenu) =>
  moderatorMainMenu.register(subMenu(ModeratorMenu.NAME)),
);

composer.use(adminMainMenu);
composer.use(moderatorMainMenu);

export const menuComposer = (): Middleware<BotContextType> => composer;
