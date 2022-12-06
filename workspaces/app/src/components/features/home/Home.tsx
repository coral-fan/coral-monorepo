/* eslint-disable @next/next/no-img-element */

import { useOpenSignInModal } from 'components/app';
import { CLIENT_ENVIRONMENT } from 'consts';
import { useIsAuthenticated } from 'libraries/authentication';
import { Earn } from '../../../../pages/artist/tayla-parx/components/Earn';
import { ShareAndEarnButton } from '../../../../pages/artist/tayla-parx/components/pills';

const SHARE_CORAL_CAMPAIGN_ID =
  CLIENT_ENVIRONMENT === 'production' ? 'VgNtvEVDLBXhu57Qxm6T' : 'QQkH98o20uk7pktMi9WA';

export const Home = () => {
  const handleOpenSignUpModal = useOpenSignInModal({ isSignUp: true });

  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <div className="max-w-screen-s-1 w-full relative mx-auto lg:px-5 grid grid-cols-12 gap-x-4 lg:gap-x-5 pt-4 lg:pt-5 mb-14 mt-1">
        <div className="col-span-12 lg:col-span-5 lg:col-start-2 flex items-start">
          <a href="/" className="ml-12">
            <svg
              width="143"
              height="60"
              viewBox="0 0 143 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-11 lg:h-h-1 -mt-1 lg:mt-0 -translate-y-px lg:translate-y-0"
            >
              <path
                d="M134.813 0V52.3256H143V60H124.492V0H134.813ZM108.763 38.7209L105.836 9.01993L102.958 38.7209H108.763ZM114.767 0L121.218 60H110.947L109.557 46.2957H102.263L100.973 60H92.2901L98.3435 0H114.767ZM73.2863 6.37874V26.8605H75.3702C78.1489 26.8605 78.7939 25.6644 78.7939 21.8272V11.113C78.7939 7.17608 78.0992 6.37874 75.4695 6.37874H73.2863ZM81.8702 0C86.1374 0 89.0649 1.84385 89.0649 8.47176V24.1694C89.0649 27.907 86.9313 29.8505 84.6985 30.4983C86.9809 31.0465 89.313 32.8405 89.313 38.2226V60H79.042V39.6678C79.042 35.1329 78.3969 34.1362 75.4695 34.1362H73.2863V60H63.0153V0H81.8702ZM44.6069 6.07973C42.126 6.07973 41.4313 7.52492 41.4313 11.0133V48.9369C41.4313 52.4751 42.126 53.9203 44.6069 53.9203C47.0878 53.9203 47.7824 52.4751 47.7824 48.9369V11.0133C47.7824 7.52492 47.0878 6.07973 44.6069 6.07973ZM49.7176 60H39.4466C35.1298 60 31.1603 57.5083 31.1603 49.5847V10.3654C31.1603 2.44186 35.1298 0 39.4466 0H49.7176C53.9351 0 58.0534 2.44186 58.0534 10.3654V49.5847C58.0534 57.5083 53.9351 60 49.7176 60ZM8.23664 0H18.1107C22.3282 0 26.2977 2.29236 26.2977 10.0664V26.9601H16.0267V10.8638C16.0267 7.42525 15.3817 6.07973 13.1489 6.07973C10.916 6.07973 10.271 7.52492 10.271 10.9635V49.0365C10.271 52.5747 10.8664 53.9203 13.1489 53.9203C15.3817 53.9203 16.0267 52.6246 16.0267 49.1362V32.4917H26.2977V49.9336C26.2977 57.7575 22.3282 60 18.1107 60H8.23664C3.91985 60 0 57.7575 0 49.9336V10.0664C0 2.29236 3.91985 0 8.23664 0Z"
                fill="#F0F0F0"
              />
            </svg>
          </a>
        </div>
        <div className="col-span-12 lg:col-span-6 mt-4 lg:mt-0">
          <p className="text-lg leading-lh-3 lg:text-2xl lg:leading-7 mb-3 lg:-mt-1 border-t border-gray-2 border-opacity-20 pt-1.5 lg:pt-0 lg:border-none">
            Support Your Favorite Artists. Earn Rewards.
          </p>
          <div className="flex">
            <ul className="flex items-center">
              <li className="mr-2.5">
                <a
                  href="https://twitter.com/coral__fan"
                  className="bg-gray-2 bg-opacity-20 rounded-full hover:bg-opacity-50 duration-300 w-7 h-7 flex items-center justify-center text-gray-2 hover:text-orange-1 duration-300"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    width="17"
                    height="13"
                    viewBox="0 0 17 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.2701 3.22651C15.9354 2.75663 16.5342 2.19277 17 1.53494C16.4012 1.78554 15.7025 1.97349 15.0039 2.03614C15.7358 1.62892 16.2681 1.00241 16.5342 0.219277C15.8689 0.595181 15.1037 0.877108 14.3386 1.03373C13.6732 0.375904 12.775 0 11.7769 0C9.84736 0 8.28376 1.47229 8.28376 3.28916C8.28376 3.53976 8.31703 3.79036 8.38356 4.04096C5.48924 3.88434 2.89432 2.56867 1.16438 0.595181C0.864971 1.06506 0.69863 1.62892 0.69863 2.25542C0.69863 3.38313 1.29746 4.38554 2.26223 4.98072C1.69667 4.9494 1.13112 4.8241 0.665362 4.57349V4.60482C0.665362 6.20241 1.86301 7.51807 3.45988 7.83133C3.19374 7.89398 2.86106 7.95663 2.56164 7.95663C2.32877 7.95663 2.12916 7.9253 1.89628 7.89398C2.32877 9.20964 3.62622 10.1494 5.15656 10.1807C3.9589 11.0578 2.46184 11.5904 0.831703 11.5904C0.53229 11.5904 0.266145 11.559 0 11.5277C1.53033 12.4675 3.36008 13 5.35616 13C11.7769 13 15.2701 8.01928 15.2701 3.66506C15.2701 3.50843 15.2701 3.38313 15.2701 3.22651Z"
                      fill="#F0F0F0"
                    />
                  </svg>
                </a>
              </li>
              <li className="mr-2.5">
                <a
                  href="https://www.instagram.com/coral_fan/"
                  className="bg-gray-2 bg-opacity-20 rounded-full hover:bg-opacity-50 duration-300 w-7 h-7 flex items-center justify-center text-gray-2 hover:text-orange-1 duration-300"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0081 3.91279C13.0083 3.76279 12.9641 3.61608 12.881 3.49123C12.7979 3.36638 12.6795 3.269 12.541 3.21141C12.4025 3.15382 12.2501 3.13862 12.1029 3.16773C11.9558 3.19683 11.8206 3.26894 11.7144 3.37491C11.6083 3.48089 11.5359 3.61598 11.5066 3.76308C11.4772 3.91018 11.4922 4.06268 11.5496 4.20127C11.6069 4.33987 11.7041 4.45834 11.8288 4.54168C11.9535 4.62501 12.1002 4.66948 12.2502 4.66945C12.451 4.66942 12.6435 4.58974 12.7856 4.44788C12.9277 4.30601 13.0077 4.11357 13.0081 3.91279"
                      fill="#F0F0F0"
                    />
                    <path
                      d="M14.2504 11.1435C14.2167 11.8827 14.093 12.2843 13.9904 12.551C13.8685 12.8806 13.674 13.1786 13.4213 13.4228C13.1777 13.6748 12.8802 13.8682 12.551 13.9885C12.2843 14.0927 11.8812 14.2167 11.142 14.2519C10.3429 14.2871 10.1061 14.2946 8.0797 14.2946C6.05516 14.2946 5.81651 14.2871 5.0174 14.2519C4.27826 14.2167 3.87701 14.0927 3.61025 13.9885C3.28314 13.8629 2.98603 13.67 2.7381 13.4224C2.49018 13.1748 2.29695 12.878 2.1709 12.551C2.06823 12.2843 1.94275 11.8827 1.91089 11.1435C1.87194 10.3444 1.8648 10.1039 1.8648 8.08159C1.8648 6.05516 1.87195 5.8165 1.91089 5.01739C1.94275 4.27825 2.06823 3.87701 2.1709 3.608C2.2915 3.27865 2.48562 2.98114 2.73848 2.73809C2.98295 2.48616 3.28087 2.29233 3.61025 2.1709C3.87701 2.06638 4.27826 1.94424 5.0174 1.90903C5.81651 1.8738 6.05516 1.86481 8.0797 1.86481C10.1061 1.86481 10.3429 1.8738 11.142 1.90903C11.8812 1.94424 12.2843 2.06638 12.551 2.1709C12.8774 2.29774 13.1738 2.49096 13.4216 2.73834C13.6693 2.98572 13.863 3.28186 13.9904 3.608C14.093 3.87701 14.2167 4.27825 14.2504 5.01739C14.2875 5.8165 14.2965 6.05516 14.2965 8.08159C14.2965 10.1039 14.2875 10.3444 14.2504 11.1435V11.1435ZM15.6152 4.95521C15.5781 4.14748 15.4507 3.59564 15.2615 3.11499C15.0676 2.61118 14.7703 2.15358 14.3887 1.77165C14.0072 1.38973 13.5499 1.09195 13.0463 0.897503C12.5638 0.710174 12.0138 0.581288 11.2057 0.546081C10.3976 0.507109 10.1395 0.5 8.0797 0.5C6.02181 0.5 5.76182 0.507109 4.95372 0.546081C4.14748 0.581288 3.59789 0.710171 3.11311 0.897503C2.60994 1.09272 2.15303 1.39077 1.77159 1.77259C1.39015 2.15442 1.09258 2.61163 0.89787 3.11499C0.710543 3.59564 0.583172 4.14748 0.5442 4.95521C0.508994 5.76331 0.5 6.02181 0.5 8.08159C0.5 10.1395 0.508994 10.3976 0.5442 11.2057C0.583172 12.0119 0.710543 12.5634 0.89787 13.0463C1.09328 13.5492 1.3911 14.006 1.77246 14.3877C2.15381 14.7694 2.61036 15.0676 3.11311 15.2634C3.59789 15.4507 4.14748 15.5781 4.95372 15.6152C5.76182 15.6523 6.02181 15.6613 8.0797 15.6613C10.1395 15.6613 10.3976 15.6523 11.2057 15.6152C12.0138 15.5781 12.5638 15.4507 13.0463 15.2634C13.5518 15.0724 14.0097 14.7738 14.3883 14.3883C14.7741 14.0103 15.0722 13.5522 15.2615 13.0463C15.4507 12.5634 15.5781 12.0119 15.6152 11.2057C15.6523 10.3976 15.6613 10.1395 15.6613 8.08159C15.6613 6.02181 15.6523 5.76331 15.6152 4.95521V4.95521Z"
                      fill="#F0F0F0"
                    />
                    <path
                      d="M8.08066 10.5401C7.59417 10.5398 7.1187 10.3951 6.7144 10.1246C6.31009 9.85398 5.99511 9.46959 5.80927 9.01998C5.62343 8.57038 5.57508 8.07577 5.67035 7.59869C5.76561 7.12162 6.00021 6.6835 6.34447 6.33975C6.68873 5.996 7.12719 5.76206 7.6044 5.6675C8.08162 5.57294 8.57616 5.62202 9.02549 5.80852C9.47481 5.99503 9.85874 6.31058 10.1287 6.71529C10.3987 7.11999 10.5426 7.59567 10.5423 8.08217C10.5421 8.40522 10.4783 8.72508 10.3545 9.02347C10.2307 9.32186 10.0494 9.59293 9.82076 9.8212C9.59216 10.0495 9.32082 10.2304 9.02225 10.3538C8.72367 10.4772 8.40371 10.5405 8.08066 10.5401V10.5401ZM8.08066 4.29004C7.33108 4.29004 6.59834 4.51229 5.97506 4.9287C5.35179 5.3451 4.86598 5.93696 4.57904 6.62945C4.29211 7.32194 4.21694 8.08395 4.36304 8.81915C4.50915 9.55435 4.86996 10.2297 5.39987 10.7599C5.92977 11.29 6.60497 11.6512 7.3401 11.7976C8.07523 11.9441 8.83729 11.8693 9.52991 11.5827C10.2225 11.2961 10.8146 10.8105 11.2313 10.1875C11.648 9.56438 11.8706 8.83174 11.871 8.08217C11.8712 7.58427 11.7733 7.0912 11.5829 6.63114C11.3926 6.17107 11.1134 5.75303 10.7614 5.40088C10.4094 5.04872 9.99153 4.76937 9.53156 4.57877C9.07159 4.38817 8.57856 4.29006 8.08066 4.29004V4.29004Z"
                      fill="#F0F0F0"
                    />
                  </svg>
                </a>
              </li>
              <li className="mr-2.5">
                <a
                  href="https://discord.gg/qYbRMd7BGd"
                  className="bg-gray-2 bg-opacity-20 rounded-full hover:bg-opacity-50 duration-300 w-7 h-7 flex items-center justify-center text-gray-2 hover:text-orange-1 duration-300"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.2477 1.16695C14.0825 0.621794 12.8367 0.225598 11.5342 0C11.3742 0.289208 11.1873 0.678199 11.0585 0.98764C9.67387 0.779413 8.30201 0.779413 6.94287 0.98764C6.81404 0.678199 6.62292 0.289208 6.46152 0C5.1576 0.225598 3.91032 0.623249 2.74514 1.16984C0.394982 4.72124 -0.242108 8.18443 0.0764375 11.5984C1.63519 12.7625 3.14581 13.4696 4.63093 13.9323C4.99762 13.4277 5.32465 12.8912 5.60638 12.3258C5.06981 12.1219 4.5559 11.8703 4.07031 11.5782C4.19913 11.4828 4.32514 11.383 4.44689 11.2803C7.40865 12.6656 10.6267 12.6656 13.5531 11.2803C13.6762 11.383 13.8022 11.4828 13.9296 11.5782C13.4426 11.8717 12.9273 12.1233 12.3907 12.3273C12.6724 12.8912 12.9981 13.4291 13.3662 13.9338C14.8527 13.471 16.3647 12.7639 17.9235 11.5984C18.2973 7.64073 17.285 4.20935 15.2477 1.16695ZM6.00988 9.49886C5.12079 9.49886 4.39166 8.66884 4.39166 7.65808C4.39166 6.64732 5.10522 5.81587 6.00988 5.81587C6.91457 5.81587 7.64367 6.64586 7.6281 7.65808C7.62951 8.66884 6.91457 9.49886 6.00988 9.49886ZM11.9901 9.49886C11.101 9.49886 10.3718 8.66884 10.3718 7.65808C10.3718 6.64732 11.0854 5.81587 11.9901 5.81587C12.8947 5.81587 13.6238 6.64586 13.6083 7.65808C13.6083 8.66884 12.8947 9.49886 11.9901 9.49886Z"
                      fill="#F0F0F0"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/channel/UCaq1Ap2bA-63VrVUsdiNKvA"
                  className="bg-gray-2 bg-opacity-20 rounded-full hover:bg-opacity-50 duration-300 w-7 h-7 flex items-center justify-center text-gray-2 hover:text-orange-1 duration-300"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    width="18"
                    height="12"
                    viewBox="0 0 18 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.9995 6.01122C18.0087 7.39686 17.8837 8.78036 17.6259 10.1443C17.5237 10.5053 17.3221 10.8341 17.0417 11.0969C16.7614 11.3598 16.4124 11.5472 16.0305 11.6401C14.6309 12 9.0027 12 9.0027 12C9.0027 12 3.37453 12 1.96896 11.6401C1.58735 11.548 1.23868 11.3606 0.959189 11.0976C0.679698 10.8346 0.479547 10.5054 0.379517 10.1443C-0.126506 7.40979 -0.126506 4.61265 0.379517 1.87815C0.478688 1.51419 0.678156 1.18174 0.957451 0.914945C1.23675 0.64815 1.58586 0.456562 1.96896 0.359828C3.37453 -6.0398e-05 9.0027 0 9.0027 0C9.0027 0 14.6309 -6.0398e-05 16.0305 0.359828C16.4139 0.457281 16.7633 0.649027 17.0435 0.915632C17.3236 1.18224 17.5245 1.51429 17.6259 1.87815C17.8837 3.24209 18.0087 4.62558 17.9995 6.01122V6.01122ZM11.8613 6.01122L7.15828 3.47513V8.53606L11.8613 6.01122Z"
                      fill="#F0F0F0"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="mb-4 lg:mb-5 border-white border-opacity-20" />
      <article
        className="mb-20 lg:mb-24 xl:mb-32 grid grid-cols-12 gap-x-4 lg:gap-x-5 relative duration-300"
        data-id="637d0ed4e6e03663b49d3de1"
      >
        <div className="col-span-12 sm:col-span-6 mb-2.5 sm:mb-0 relative">
          <div className="rounded-1 overflow-hidden">
            <img
              className="w-full"
              src="/images/pinder/pinder.png"
              alt="Support Pinder’s sound.xyz Drop"
            />
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 flex flex-col">
          <h3 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 mb-2 font-medium inline-block">
            {/* main heading copy */}
            Support Pinder&apos;s sound.xyz Drop
          </h3>
          <p className="text-lg leading-lh-3 lg:text-2xl lg:leading-7 mt-3 lg:mt-10 mb-5 lg:mb-4">
            Share a promo for Pinder’s upcoming drop on sound.xyz of his new single “The Mop” and
            earn points.
          </p>
          {/* Share to earn Pinder */}
          <div className="group w-full sm:mt-auto flex items-start justify-between bg-orange-1 rounded-1 py-4 px-5 relative hover:bg-gray-2 duration-300">
            <a className="absolute top-0 left-0 w-full h-full" href="/artist/pinder" />
            <div className="flex flex-col items-start w-4/5">
              <h3 className="text-lg leading-lh-3 xl:text-1 s-2:leading-none tracking-3 uppercase text-gray-1 font-medium mb-4 xl:mb-6">
                Share to Earn
              </h3>
              <p className="text-lg leading-lh-3 xl:text-2xl xl:leading-7 text-gray-1">
                Support Pinder by sharing his content on Twitter and earn points redeemable for
                $AVAX.
              </p>
            </div>
            <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-1 py-2 px-2.5 bg-gray-2 rounded-full hover:bg-orange-1 duration-300 group-hover:bg-orange-1 text-gray-1">
              Get it
            </div>
          </div>
          {/* {!isAuthenticated && (
            <div className="group w-full sm:mt-auto flex items-start justify-between bg-orange-1 rounded-1 py-4 px-5 relative hover:bg-gray-2 duration-300">
              <button
                onClick={handleOpenSignUpModal}
                disabled={isAuthenticated}
                className="absolute top-0 left-0 w-full h-full"
              ></button>
              <div className="flex flex-col items-start w-3/4">
                <h3 className="text-lg leading-lh-3 xl:text-1 s-2:leading-none tracking-3 uppercase text-gray-1 font-medium mb-4 xl:mb-6">
                  Create an account
                </h3>
                <p className="text-lg leading-lh-3 xl:text-2xl xl:leading-7 text-gray-1">
                  Sign up with MetaMask or an existing <br className="hidden s-2:block"></br>social
                  account
                </p>
              </div>
              <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-1 py-2 px-2.5 bg-gray-2 rounded-full hover:bg-orange-1 duration-300 group-hover:bg-orange-1 text-gray-1">
                Sign up
              </div>
            </div>
          )} */}
        </div>
      </article>
      {/* featured artist section */}
      <section className="mb-20 lg:mb-24 xl:mb-32">
        <hr className="mb-3 lg:mb-5 border-gray-2 border-opacity-20" />
        <div className="grid grid-cols-12 gap-4 lg:gap-5 relative mb-10 lg:mb-20">
          <div className="col-span-12 sm:col-span-6 flex flex-col items-start">
            <h2 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 font-medium max-w-xl">
              Featured Artists
            </h2>
          </div>
          <div className="col-span-12 sm:col-span-6 mb-2.5 sm:mb-0 relative hidden sm:block">
            <p className="text-lg leading-lh-3 xl:text-1 xl:leading-none font-medium tracking-4">
              {' '}
              Explore Artist Access Passes available on Coral. Stay tuned for many more.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="relative group">
            <div className="rounded-1 overflow-hidden mb-4">
              <img
                className="w-full group-hover:rounded-2 duration-300"
                src="/images/rome.jpeg"
                alt="Rome Fortune"
              />
            </div>
            <h4 className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 font-medium">
              Rome Fortune
            </h4>
            <a
              href="https://www.coral.fan/artist/0xbE74cdF5C499A8B21dE8A19c5F757c3abF7F3BEc"
              className="inset-0 absolute"
            ></a>
          </div>
          <div className="relative group">
            <div className="rounded-1 overflow-hidden mb-4">
              <img
                className="w-full group-hover:rounded-2 duration-300"
                src="/images/van-buren-records/vb-on-road.jpg"
                alt="Van Buren Records"
              />
            </div>
            <h4 className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 font-medium">
              Van Buren Records
            </h4>
            <a
              href="https://www.coral.fan/artist/0xCa86C97A5f5D8906DAeF4Bc83Ad9665D5298d35B"
              className="inset-0 absolute"
            ></a>
          </div>
          <div className="relative group">
            <div className="rounded-1 overflow-hidden mb-4">
              <img
                className="w-full group-hover:rounded-2 duration-300"
                src="/images/pinder/pinder.png"
                alt="Support Pinder’s sound.xyz Drop"
              />
            </div>
            <h4 className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 font-medium">
              Pinder
            </h4>
            <a href="/artist/pinder/" className="inset-0 absolute"></a>
          </div>
          <div className="flex flex-col">
            <div className="group flex-1 flex bg-gray-2 bg-opacity-10 rounded-1 mb-4 p-2.5 lg:py-4 lg:px-5 relative hover:bg-opacity-20 duration-300">
              <a
                href="mailto:support@coral.fan"
                className="absolute top-0 left-0 w-full h-full"
              ></a>
              <div className="flex flex-col items-start lg:w-3/4">
                <h3 className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 mb-3 font-medium mb-auto">
                  Are you an artist? Want to be featured on Coral?
                </h3>
                <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-white py-2 px-2.5 bg-gray-2 bg-opacity-10 rounded-full mt-4">
                  Apply <span className="hidden md:inline">as an artist</span>
                </div>
              </div>
            </div>
            <h4 className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 font-medium">
              &nbsp;
            </h4>
          </div>
        </div>
      </section>

      <section className="mb-20 lg:mb-24 xl:mb-32">
        <hr className="mb-3 lg:mb-5 border-gray-2 border-opacity-20"></hr>
        <div className="grid grid-cols-12 gap-4 lg:gap-5 relative">
          <div className="col-span-12 sm:col-span-6 flex flex-col items-start">
            <h2 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 font-medium inline-block mb-10 lg:mb-16 xl:mb-24">
              How Coral Works
            </h2>
            <p className="text-lg leading-lh-3 xl:text-1 xl:leading-none font-medium tracking-4">
              Coral rewards fans for supporting and promoting artists. The more you support, the
              more you earn.
            </p>
          </div>
          <div className="border-t border-gray-2 border-opacity-20 pt-3.5 sm:pt-0 sm:border-none col-span-12 sm:col-span-6 relative">
            <div className="grid grid-cols-1 gap-10 lg:gap-20">
              <div className="grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase">
                    Browse, explore, discover
                  </h4>
                  <div className="lg:col-span-6">
                    <p className="text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2 mb-3">
                      Exclusive interviews, videos, BTS footage, and existing music, playlists,
                      events, and news.
                    </p>
                    <a
                      href="https://editorial.coral.fan/introducing-a-new-coral-get-paid-for-being-a-fan/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-2 py-2 px-2.5 bg-gray-2 bg-opacity-20 rounded-full duration-300 mt-auto hover:bg-opacity-50"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase">
                    {' '}
                    Share or create your own content{' '}
                  </h4>
                  <div className="lg:col-span-6">
                    <p className="lg:col-span-6 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2 mb-3">
                      {' '}
                      Share existing content or create your own based on prompts from the artists.{' '}
                    </p>
                    {/* <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-2 py-2 px-2.5 bg-gray-2 bg-opacity-20 rounded-full duration-300 mt-auto hover:bg-opacity-50"
                    >
                      Learn more
                    </a> */}
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase">
                    {' '}
                    EARN points{' '}
                  </h4>
                  <div className="lg:col-span-6">
                    <p className="lg:col-span-6 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2 mb-3">
                      {' '}
                      Earn CORAL POINTS for your contributions.{' '}
                    </p>
                    {/* <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-2 py-2 px-2.5 bg-gray-2 bg-opacity-20 rounded-full duration-300 mt-auto hover:bg-opacity-50"
                    >
                      Learn more
                    </a> */}
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase">
                    Redeem points for rewards
                  </h4>
                  <div className="lg:col-span-6">
                    <p className="text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2 mb-3">
                      Redeem your CORAL points for cryptocurrency or special benefits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20 lg:mb-24 xl:mb-32">
        <h3 className="text-lg leading-lh-3 xl:text-1 xl:leading-none font-medium tracking-4 uppercase mb-3.5">
          Coral Editorial
        </h3>
        <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
          <article
            className="post tag-hash-highlight tag-news featured grid grid-cols-12 gap-x-4 lg:gap-x-5 border-t border-gray-2 border-opacity-20 pt-4 lg:pt-5 group relative duration-300"
            data-id="636acfadfd1f8d003d1921d7"
          >
            <div className="col-span-6 relative">
              <div className="rounded-1 group-hover:rounded-2 overflow-hidden duration-300">
                <img
                  className="w-full"
                  src="https://editorial.coral.fan/content/images/size/w920h920/2022/11/TBL---Stream-Wars---Hero.png"
                  alt="The Bottom Line: Stream Wars"
                ></img>
              </div>
            </div>
            <div className="col-span-6 group-hover:opacity-60 duration-300">
              <h3>
                <a
                  href="https://editorial.coral.fan/the-bottom-line-stream-wars/"
                  className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 mb-3 font-medium duration-300 inline-block"
                >
                  The Bottom Line: Stream Wars
                </a>
              </h3>
              <div className=" flex space-x-4 lg:space-x-5">
                <time
                  className="inline-block text-xs leading-lh-1 tracking-1 uppercase text-gray-2"
                  dateTime="2022-05-26"
                >
                  08 Nov 2022
                </time>
              </div>
            </div>
            <a
              href="https://editorial.coral.fan/the-bottom-line-stream-wars/"
              className="absolute top-0 left-0 w-full h-full"
            ></a>
          </article>
          <article
            className="post tag-news featured grid grid-cols-12 gap-x-4 lg:gap-x-5 border-t border-gray-2 border-opacity-20 pt-4 lg:pt-5 group relative duration-300"
            data-id="6321dc24354189003decad37"
          >
            <div className="col-span-6 relative">
              <div className="rounded-1 group-hover:rounded-2 overflow-hidden duration-300">
                <img
                  className="w-full"
                  src="https://editorial.coral.fan/content/images/size/w335h335/2022/09/Coral---Editorial---Header.jpg"
                  alt="Rewards, Metrics, and a Look Ahead"
                ></img>
              </div>
            </div>
            <div className="col-span-6 group-hover:opacity-60 duration-300">
              <h3>
                <a
                  href="https://editorial.coral.fan/rewards-metrics-and-a-look-ahead/"
                  className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 mb-3 font-medium duration-300 inline-block"
                >
                  Rewards, Metrics, and a Look Ahead
                </a>
              </h3>
              <div className=" flex space-x-4 lg:space-x-5">
                <a
                  href="/tag/news/"
                  className="inline-block text-xs leading-lh-1 tracking-1 uppercase text-gray-2"
                >
                  News
                </a>
                <time
                  className="inline-block text-xs leading-lh-1 tracking-1 uppercase text-gray-2"
                  dateTime="2022-05-19"
                >
                  19 Sep 2022
                </time>
              </div>
            </div>
            <a
              href="https://editorial.coral.fan/rewards-metrics-and-a-look-ahead/"
              className="absolute top-0 left-0 w-full h-full"
            ></a>
          </article>
        </div>
      </section>

      <section className="max-w-screen-s-1 w-full mx-auto">
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {!isAuthenticated ? (
            <div className="group min-h-min-h-2 lg:min-h-min-h-1 flex bg-orange-1 rounded-1 py-4 px-5 relative hover:bg-gray-2 duration-300">
              <button
                onClick={handleOpenSignUpModal}
                disabled={isAuthenticated}
                className="absolute top-0 left-0 w-full h-full"
              ></button>
              <div className="flex flex-col items-start lg:w-11/12">
                <h3 className="text-1 leading-none lg:text-2 lg:leading-lh-2 tracking-3 text-gray-1 font-medium mb-8">
                  Create an account
                </h3>
                <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-1 py-2 px-2.5 bg-gray-2 rounded-full hover:bg-orange-1 duration-300 mt-auto mb-4 group-hover:bg-orange-1 text-gray-1">
                  Sign up
                </div>
                <p className="text-lg leading-lh-3 lg:text-2xl lg:leading-7 text-gray-1">
                  Coral is coming soon with exclusive events, experiences, and more. Sign up to
                  reserve your spot.
                </p>
              </div>
            </div>
          ) : (
            <div className="group min-h-min-h-2 lg:min-h-min-h-1 flex bg-orange-1 text-gray-1 rounded-1 py-4 px-4 lg:px-5 relative duration-300">
              <div className="flex flex-col items-start lg:w-2/3">
                <h3 className="text-1 leading-none text-gray-1 lg:text-2 lg:leading-lh-2 tracking-3 font-medium mb-12 lg:mb-8">
                  Follow Coral on Social
                </h3>
                <ul className="mb-4 flex space-x-2.5 mt-auto">
                  <li>
                    <a
                      href="https://www.instagram.com/coral_fan/"
                      className="bg-gray-2 rounded-full hover:bg-opacity-50 duration-300 w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center text-gray-1 hover:text-orange-1 duration-300"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <svg
                        className="w-5 lg:w-auto h-auto"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.8467 5.59838C19.8472 5.31317 19.7631 5.03421 19.605 4.79682C19.447 4.55942 19.222 4.37425 18.9587 4.26475C18.6953 4.15526 18.4054 4.12635 18.1256 4.18169C17.8458 4.23703 17.5887 4.37414 17.3869 4.57565C17.1851 4.77716 17.0475 5.03401 16.9917 5.31371C16.9359 5.59342 16.9644 5.88338 17.0734 6.14692C17.1825 6.41045 17.3673 6.63571 17.6044 6.79418C17.8416 6.95264 18.1204 7.03719 18.4056 7.03713C18.7874 7.03708 19.1535 6.88556 19.4237 6.61582C19.6939 6.34608 19.846 5.98016 19.8467 5.59838Z"
                          fill="#1E1E1E"
                        />
                        <path
                          d="M21.7665 16.8484C21.7132 18.0185 21.5175 18.6543 21.355 19.0765C21.1621 19.5983 20.8542 20.0699 20.4542 20.4565C20.0686 20.8554 19.5976 21.1616 19.0765 21.352C18.6543 21.5169 18.0161 21.7132 16.8461 21.769C15.5811 21.8247 15.2063 21.8366 11.9985 21.8366C8.7937 21.8366 8.41592 21.8247 7.15095 21.769C5.9809 21.7132 5.34573 21.5169 4.92345 21.352C4.40565 21.1532 3.93534 20.8479 3.54287 20.4559C3.15041 20.064 2.84453 19.594 2.645 19.0765C2.48248 18.6543 2.28385 18.0185 2.23341 16.8484C2.17176 15.5835 2.16045 15.2027 2.16045 12.0015C2.16045 8.79371 2.17176 8.4159 2.23341 7.15094C2.28385 5.98089 2.48248 5.34573 2.645 4.9199C2.83591 4.39855 3.14319 3.92759 3.54347 3.54285C3.93046 3.14405 4.40205 2.83722 4.92345 2.645C5.34573 2.47954 5.9809 2.2862 7.15095 2.23046C8.41592 2.17469 8.7937 2.16046 11.9985 2.16046C15.2063 2.16046 15.5811 2.17469 16.8461 2.23046C18.0161 2.2862 18.6543 2.47954 19.0765 2.645C19.5931 2.84578 20.0624 3.15165 20.4546 3.54324C20.8468 3.93484 21.1534 4.40362 21.355 4.9199C21.5175 5.34573 21.7132 5.98089 21.7665 7.15094C21.8253 8.41591 21.8395 8.79371 21.8395 12.0015C21.8395 15.2027 21.8253 15.5835 21.7665 16.8484ZM23.927 7.05251C23.8683 5.77388 23.6667 4.90033 23.3672 4.13948C23.0602 3.34196 22.5896 2.61758 21.9856 2.013C21.3816 1.40842 20.6577 0.937044 19.8605 0.629238C19.0967 0.332701 18.2261 0.128677 16.9469 0.0729448C15.6677 0.0112537 15.2591 0 11.9985 0C8.74091 0 8.32935 0.0112527 7.05015 0.0729448C5.77389 0.128677 4.90389 0.332696 4.1365 0.629238C3.34 0.938261 2.61671 1.41006 2.0129 2.01449C1.40909 2.61891 0.938034 3.34266 0.629819 4.13948C0.333285 4.90033 0.13166 5.77388 0.0699676 7.05251C0.0142368 8.33171 0 8.74091 0 12.0015C0 15.2591 0.0142377 15.6677 0.0699676 16.9469C0.13166 18.2231 0.333285 19.0961 0.629819 19.8605C0.939148 20.6566 1.4106 21.3797 2.01428 21.9839C2.61795 22.5881 3.34066 23.0602 4.1365 23.3702C4.90389 23.6667 5.77388 23.8683 7.05015 23.9271C8.32935 23.9858 8.7409 24 11.9985 24C15.2591 24 15.6677 23.9858 16.9469 23.9271C18.2261 23.8683 19.0967 23.6667 19.8605 23.3702C20.6607 23.0679 21.3855 22.5951 21.9848 21.9848C22.5956 21.3865 23.0675 20.6613 23.3672 19.8605C23.6667 19.0961 23.8683 18.2231 23.927 16.9469C23.9858 15.6677 24 15.2591 24 12.0015C24 8.74091 23.9858 8.3317 23.927 7.05251Z"
                          fill="#1E1E1E"
                        />
                        <path
                          d="M11.9989 15.9984C11.2078 15.9978 10.4348 15.7626 9.77737 15.3227C9.11999 14.8827 8.60783 14.2577 8.30566 13.5267C8.00349 12.7956 7.92488 11.9914 8.07978 11.2157C8.23467 10.44 8.61613 9.72763 9.17588 9.1687C9.73564 8.60978 10.4486 8.22939 11.2245 8.07564C12.0004 7.92189 12.8045 8.00169 13.5351 8.30494C14.2657 8.60819 14.89 9.12127 15.329 9.77931C15.7679 10.4373 16.0019 11.2108 16.0014 12.0018C16.0012 12.5271 15.8974 13.0472 15.6961 13.5323C15.4948 14.0175 15.1999 14.4583 14.8282 14.8294C14.4565 15.2006 14.0153 15.4948 13.5299 15.6954C13.0444 15.896 12.5241 15.9989 11.9989 15.9984ZM11.9989 5.83594C10.7801 5.83594 9.58866 6.19731 8.57524 6.87437C7.56181 7.55144 6.7719 8.51378 6.30535 9.63974C5.83881 10.7657 5.71658 12.0047 5.95414 13.2001C6.1917 14.3955 6.77838 15.4937 7.63998 16.3557C8.50159 17.2177 9.59945 17.8049 10.7947 18.043C11.99 18.2812 13.2291 18.1595 14.3553 17.6935C15.4815 17.2275 16.4442 16.4381 17.1217 15.4249C17.7993 14.4118 18.1612 13.2206 18.1618 12.0018C18.1622 11.1922 18.003 10.3905 17.6935 9.64248C17.3839 8.89444 16.93 8.21471 16.3577 7.64212C15.7854 7.06953 15.1059 6.61531 14.358 6.3054C13.6101 5.99549 12.8084 5.83597 11.9989 5.83594Z"
                          fill="#1E1E1E"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/coral__fan"
                      className="bg-gray-2 rounded-full hover:bg-opacity-50 duration-300 w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center text-gray-2 hover:text-orange-1 duration-300"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <svg
                        className="w-5 lg:w-auto h-auto"
                        width="26"
                        height="19"
                        viewBox="0 0 26 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.3542 4.71566C24.3718 4.02892 25.2877 3.20482 26 2.24337C25.0841 2.60964 24.0157 2.88434 22.9472 2.9759C24.0665 2.38072 24.8806 1.46506 25.2877 0.320482C24.2701 0.86988 23.0998 1.28193 21.9296 1.51084C20.9119 0.549398 19.5382 0 18.0117 0C15.0607 0 12.6693 2.15181 12.6693 4.80723C12.6693 5.17349 12.7202 5.53976 12.8219 5.90602C8.3953 5.67711 4.42661 3.75422 1.78082 0.86988C1.3229 1.55663 1.06849 2.38072 1.06849 3.29639C1.06849 4.94458 1.98434 6.40964 3.45988 7.27952C2.59491 7.23374 1.72994 7.0506 1.01761 6.68434V6.73012C1.01761 9.06506 2.84932 10.988 5.29159 11.4458C4.88454 11.5373 4.37573 11.6289 3.91781 11.6289C3.56164 11.6289 3.25636 11.5831 2.9002 11.5373C3.56164 13.4602 5.54599 14.8337 7.8865 14.8795C6.05479 16.1614 3.76517 16.9398 1.27202 16.9398C0.81409 16.9398 0.407045 16.894 0 16.8482C2.34051 18.2217 5.13894 19 8.19178 19C18.0117 19 23.3542 11.7205 23.3542 5.35663C23.3542 5.12771 23.3542 4.94458 23.3542 4.71566Z"
                          fill="#1E1E1E"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://open.spotify.com/playlist/1wy8tDHQYCqC8ebPyOSXnl?si=51a19a4b78284cec"
                      className="bg-gray-2 rounded-full hover:bg-opacity-50 duration-300 w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center text-gray-2 hover:text-orange-1 duration-300"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <svg
                        className="w-5 lg:w-auto h-auto"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M26 13C26 15.5721 25.2369 18.0865 23.8075 20.2248C22.378 22.3632 20.3465 24.0293 17.9697 25.0126C15.593 25.9959 12.978 26.252 10.4556 25.7485C7.93327 25.2451 5.61706 24.0048 3.79988 22.1845C1.98269 20.3642 0.746135 18.0457 0.247054 15.5224C-0.252027 12.9992 0.00870204 10.3847 0.996065 8.00962C1.98343 5.63456 3.65311 3.60577 5.79388 2.17999C7.93465 0.754217 10.4501 -0.00440026 13.0222 1.92002e-05C14.7283 1.66731e-05 16.4177 0.336213 17.9937 0.989802C19.5697 1.64339 21.0016 2.60145 22.2069 3.80891C23.4123 5.01637 24.3678 6.44969 25.0187 8.0268C25.6695 9.60391 26.0029 11.2938 26 13ZM22.5377 10.4759C22.5562 10.2316 22.5 9.98744 22.3763 9.77596C22.2526 9.56448 22.0674 9.39563 21.8454 9.29198C16.604 6.71544 10.6119 6.10511 4.9587 7.57199C4.66413 7.65151 4.40791 7.83424 4.23669 8.08679C4.06547 8.33934 3.99074 8.64506 4.02592 8.94814C4.0611 9.25123 4.20386 9.53145 4.42837 9.73806C4.65289 9.94468 4.94414 10.0638 5.24909 10.0737C5.48446 10.0571 5.7171 10.0123 5.94166 9.93983C10.8702 8.71719 16.0714 9.26249 20.6391 11.481C20.8383 11.6115 21.0712 11.6815 21.3093 11.6822C21.6253 11.6763 21.9264 11.5465 22.1478 11.3209C22.3692 11.0953 22.4933 10.792 22.4932 10.4759H22.5377ZM20.7062 14.6529C20.7205 14.4436 20.6731 14.2346 20.5699 14.0519C20.4666 13.8693 20.3121 13.7211 20.1254 13.6255C17.3016 12.0221 14.1026 11.1972 10.8556 11.2353C9.1176 11.224 7.38728 11.4649 5.71835 11.9502C5.47638 12.0078 5.26275 12.1495 5.11549 12.3499C4.96822 12.5504 4.89691 12.7966 4.91426 13.0447C4.9201 13.3133 5.03085 13.569 5.22292 13.7569C5.41498 13.9448 5.67298 14.0498 5.94166 14.0498C6.15512 14.0328 6.36548 13.9879 6.56715 13.9159C10.7725 12.8045 15.2444 13.3563 19.0533 15.457C19.2457 15.5873 19.4693 15.6643 19.7011 15.6803C19.9619 15.6633 20.2063 15.5475 20.3847 15.3566C20.5631 15.1658 20.662 14.9142 20.6615 14.6529H20.7062ZM19.0757 18.2938C19.0899 18.1163 19.0479 17.939 18.9557 17.7867C18.8635 17.6343 18.7258 17.5147 18.562 17.445C14.7627 15.4025 10.3213 14.9064 6.16497 16.0601C5.95588 16.0931 5.7666 16.2029 5.63437 16.3682C5.50213 16.5335 5.43659 16.7424 5.45032 16.9537C5.44724 17.063 5.46632 17.1718 5.50676 17.2735C5.5472 17.3752 5.60799 17.4674 5.68536 17.5448C5.76272 17.6222 5.85499 17.683 5.95666 17.7234C6.05832 17.7638 6.1674 17.7832 6.27677 17.7801C6.48852 17.7524 6.69747 17.7075 6.90199 17.646C10.5358 16.671 14.4053 17.1268 17.7132 18.9193C17.881 19.0453 18.0841 19.1155 18.2939 19.1203C18.4993 19.1032 18.6901 19.0079 18.8273 18.8541C18.9644 18.7004 19.0374 18.4998 19.0309 18.2938H19.0757Z"
                          fill="#1E1E1E"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCaq1Ap2bA-63VrVUsdiNKvA"
                      className="bg-gray-2 rounded-full hover:bg-opacity-50 duration-300 w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center text-gray-2 hover:text-orange-1 duration-300"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <svg
                        className="w-5 lg:w-auto h-auto"
                        width="26"
                        height="18"
                        viewBox="0 0 26 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.9993 9.01683C26.0126 11.0953 25.832 13.1705 25.4596 15.2164C25.312 15.758 25.0208 16.2511 24.6158 16.6454C24.2109 17.0396 23.7068 17.3208 23.1552 17.4602C21.1335 18 13.0039 18 13.0039 18C13.0039 18 4.87432 18 2.84406 17.4602C2.29284 17.3219 1.7892 17.041 1.38549 16.6464C0.981786 16.2519 0.692679 15.7581 0.548191 15.2164C-0.18273 11.1147 -0.18273 6.91898 0.548191 2.81722C0.691438 2.27128 0.979559 1.77261 1.38298 1.37242C1.78641 0.972226 2.29068 0.684843 2.84406 0.539742C4.87432 -9.0597e-05 13.0039 0 13.0039 0C13.0039 0 21.1335 -9.0597e-05 23.1552 0.539742C23.7089 0.685921 24.2137 0.97354 24.6183 1.37345C25.023 1.77336 25.3132 2.27143 25.4596 2.81722C25.832 4.86313 26.0126 6.93838 25.9993 9.01683ZM17.133 9.01683L10.3397 5.2127V12.8041L17.133 9.01683Z"
                          fill="#1E1E1E"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
                <p className="text-lg leading-lh-3 text-gray-1 lg:text-2xl lg:leading-7">
                  We’re constantly feeding our socials. Click the links above to follow your
                  favorite channels.
                </p>
              </div>
            </div>
          )}
          <div className="group min-h-min-h-2 lg:min-h-min-h-1 flex bg-gray-2 bg-opacity-10 rounded-1 py-4 px-5 relative hover:bg-opacity-20 duration-300">
            <a href="mailto:support@coral.fan" className="absolute top-0 left-0 w-full h-full"></a>
            <div className="flex flex-col items-start lg:w-3/4">
              <h3 className="text-1 leading-none lg:text-2 lg:leading-lh-2 tracking-3 font-medium mb-8">
                Coral For Artists
              </h3>
              <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-1 py-2 px-2.5 bg-gray-2 rounded-full hover:bg-orange-1 duration-300 mt-auto mb-4 group-hover:bg-orange-1 text-gray-1">
                Contact us
              </div>
              <p className="text-lg leading-lh-3 lg:text-2xl lg:leading-7">
                Contact us to learn more about how Coral can support you as an artist or label.{' '}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
