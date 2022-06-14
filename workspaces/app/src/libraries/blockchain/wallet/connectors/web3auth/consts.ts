import { WALLET_ADAPTERS } from '@web3auth/base';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils';

// ! UNCOMMENT OUT
// if (process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID === undefined) {
//   throw getEnvironmentVariableErrorMessage('NEXT_PUBLIC_WE3AUTH_CLIENT_ID');
// }

export const WEB3AUTH = {
  CLIENT_ID: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
  APP_LOGO: '/images/coral-logo.svg',
  LOGIN_METHOD_ORDER: [
    'google',
    'twitter',
    'discord',
    // 'apple',
    'twitch',
    'facebook',
    // 'reddit',
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
        // name properties must be added to prevent typescript error
        // google: {
        //   name: 'google',
        //   showOnModal: false,
        // },
        // facebook: {
        //   name: 'facebook',
        //   showOnModal: false,
        // },
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
        // discord: {
        //   name: 'discord',
        //   showOnModal: false,
        // },
        // twitch: {
        //   name: 'twitch',
        //   showOnModal: false,
        // },
        kakao: {
          name: 'kakao',
          showOnModal: false,
        },
        // twitter: {
        //   name: 'twitter',
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
