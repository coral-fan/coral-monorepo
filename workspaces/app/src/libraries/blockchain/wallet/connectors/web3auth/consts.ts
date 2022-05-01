import { WALLET_ADAPTERS } from '@web3auth/base';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils';

if (process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID === undefined) {
  throw getEnvironmentVariableErrorMessage('NEXT_PUBLIC_WE3AUTH_CLIENT_ID');
}

export const WEB3AUTH = {
  CLIENT_ID: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
  APP_LOGO: '/images/coral-logo.svg',
  LOGIN_METHOD_ORDER: [
    'google',
    'twitter',
    'facebook',
    // 'reddit',
    // 'discord',
    // 'twitch',
    // 'apple',
    // 'line',
    // 'github',
    // 'kakao',
    // 'linkedin',
    // 'weibo',
    // 'wechat',
    'email_passwordless',
  ],
  // MODAL_CONFIG can be used to determine what login methods appear on the modal
  MODAL_CONFIG: {
    [WALLET_ADAPTERS.OPENLOGIN]: {
      label: WALLET_ADAPTERS.OPENLOGIN,
      loginMethods: {
        // google: {
        //   showOnModal: false,
        // },
        // facebook: {
        //   showOnModal: false,
        // },
        // name properties must be added to prevent typescript error
        apple: {
          name: 'apple',
          showOnModal: false,
        },
        linkedin: {
          name: 'linkedin',
          showOnModal: false,
        },
        reddit: {
          name: 'reddit',
          showOnModal: false,
        },
        line: {
          name: 'line',
          showOnModal: false,
        },
        discord: {
          name: 'discord',
          showOnModal: false,
        },
        twitch: {
          name: 'twitch',
          showOnModal: false,
        },
        kakao: {
          name: 'kakao',
          showOnModal: false,
        },
        // twitter: {
        //   showOnModal: false,
        // },
        weibo: {
          name: 'weibo',
          showOnModal: false,
        },
        wechat: {
          name: 'wechat',
          showOnModal: false,
        },
        github: {
          name: 'github',
          showOnModal: false,
        },
      },
    },
  },
};
