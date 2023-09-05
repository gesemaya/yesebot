import {
    createWalletMessagesCallback,
    importWalletMessagesCallback
} from '@bot/callbacks';
import {ModeratorMenu, SessionsMenu, WalletMenu} from '@bot/constants';
import { dynamicUsersWithSessionMenuRange } from '@bot/helpers';
import { BotContextType } from '@bot/types';
import { Menu } from '@grammyjs/menu';

export const walletMenu = (menuName: string) => {
  // if (menuName === ModeratorMenu.NAME) {
  //   return new Menu<BotContextType>(`${SessionsMenu.INITIAL}-${menuName}`)
  //     .submenu((ctx) => ctx.t('sessions-menu-button-get'), `${SessionsMenu.GET}-${menuName}`)
  //     .row()
  //     .back((ctx) => ctx.t('common-button-go-back'));
  // }

  return new Menu<BotContextType>(`${WalletMenu.INITIAL}-${menuName}`)
    .submenu((ctx) => ctx.t('wallets-menu-button-reset'), `${WalletMenu.CREATE}-${menuName}`)
    .submenu((ctx) => ctx.t('wallets-menu-button-import'), `${WalletMenu.IMPORT}-${menuName}`)
    .row()
    .back((ctx) => ctx.t('common-button-go-back'));
};

export const createWalletMenu = (menuName: string) =>
  new Menu<BotContextType>(`${WalletMenu.CREATE}-${menuName}`, {
    onMenuOutdated: false,
  })
    .dynamic(async (ctx) => dynamicUsersWithSessionMenuRange(ctx, createWalletMessagesCallback))
    .text(
      (ctx) => ctx.t('common-button-cancel'),
      (ctx) => ctx.menu.nav(`${WalletMenu.INITIAL}-${menuName}`),
    );

export const importWalletMenu = (menuName: string) =>
  new Menu<BotContextType>(`${WalletMenu.IMPORT}-${menuName}`, {
    onMenuOutdated: false,
  })
    .dynamic(async (ctx) =>
      dynamicUsersWithSessionMenuRange(ctx, importWalletMessagesCallback),
    )
    .back(
      (ctx) => ctx.t('common-button-cancel'),
      (ctx) => ctx.menu.nav(`${WalletMenu.INITIAL}-${menuName}`),
    );
