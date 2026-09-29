export const SITE_NAME = 'おなかのそと';

export const SITE_TAGLINE = '妊娠・出産・育児の記録';

export const SITE_DESCRIPTION =
  '妊娠・出産・育児の体験を、同じ境遇のママに向けて書いていくブログです。';

export const AUTHOR_NAME = '（ペンネーム未定）';

export const AUTHOR_DESCRIPTION = '育児の合間に、体験したことを少しずつ書いています。';

export const CONTACT_EMAIL = 'contact@example.com';

export function buildPageTitle(pageTitle?: string): string {
  if (!pageTitle) {
    return SITE_NAME;
  }
  return `${pageTitle}｜${SITE_NAME}`;
}
