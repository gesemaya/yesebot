import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV || 'development'}`),
});
console.log(path.join(__dirname, `../../.env.${process.env.NODE_ENV || 'development'}`));
export const config = {
  GITHUB_REPO: process.env.GITHUB_REPO ?? '',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN ?? '',
  GITHUB_USERNAME: process.env.GITHUB_USERNAME ?? '',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',
  GOOGLE_DRIVE_REFRESH_TOKEN: process.env.GOOGLE_DRIVE_REFRESH_TOKEN ?? '',
  GOOGLE_DRIVE_ROOT_IMAGE_FOLDER_ID: process.env.GOOGLE_DRIVE_ROOT_IMAGE_FOLDER_ID ?? '',
  GOOGLE_REDIRECT_ID: process.env.GOOGLE_REDIRECT_ID ?? '',
  MONGODB_URI: process.env.MONGODB_URI ?? '',
  OPEN_AI_ORG: process.env.OPEN_AI_ORG ?? '',
  OPEN_AI_TOKEN: process.env.OPEN_AI_TOKEN ?? '',
  PORT: Number(process.env.PORT ?? 8080),
  SUPER_ADMIN_USERNAME: process.env.SUPER_ADMIN_USERNAME ?? '',
  SUPER_ADMIN_USER_ID: Number(process.env.SUPER_ADMIN_USER_ID ?? ''),
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN ?? '',
};
