// TODO: implement home page in house
/* eslint-disable @next/next/no-img-element */
import { useIsAuthenticated } from 'libraries/authentication';
import { useOpenSignInModal } from 'components/app';

export const Home = () => {
  const handleOpenSignUpModal = useOpenSignInModal({ isSignUp: true });

  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="-mt-m-4 s-2:-mt-m-5">
      <section className="grid grid-cols-12 gap-4 s-2:gap-5 mb-20 md:mb-24 xl:mb-32 relative duration-300">
        <div className="col-span-12 s-2:col-span-6 mb-2.5 sm:mb-0 relative">
          <div className="overflow-hidden duration-300 -mx-6 s-2:mx-0">
            <img
              className="w-full"
              src="/images/coral-hero.gif"
              alt="The marketplace for a new era of music."
            ></img>
          </div>
        </div>
        <div className="col-span-12 s-2:col-span-6 s-2:pt-3 flex flex-col items-start duration-300 -mt-28 md:-mt-32 md:-translate-y-2 s-2:translate-y-0 s-2:mt-0 relative">
          <h1 className="max-w-lg text-1 md:text-4 md:leading-none leading-none xl:text-2 xl:leading-none tracking-3 mb-10 s-2:mb-24 font-medium duration-300 inline-block">
            Collect. Connect. <br></br>Experience.
          </h1>
          <p className="text-lg leading-lh-3 md:text-2xl md:leading-7 xl:text-1 xl:leading-none font-medium tracking-4 max-w-md s-2:max-w-none mb-3.5">
            Coral is a modern marketplace for music, collectibles, events, experiences, and
            empowered fans.
          </p>
          <ul className="mb-20 s-2:mb-4 flex space-x-2.5">
            <li>
              <a
                href="https://www.instagram.com/coral_fan/"
                className="bg-gray-2 bg-opacity-20 rounded-full hover:bg-opacity-50 duration-300 w-9 h-9 s-2:w-11 s-2:h-11 flex items-center justify-center duration-300"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  className="w-5 s-2:w-auto h-auto"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.8467 5.59838C19.8472 5.31317 19.7631 5.03421 19.605 4.79682C19.447 4.55942 19.222 4.37425 18.9587 4.26475C18.6953 4.15526 18.4054 4.12635 18.1256 4.18169C17.8458 4.23703 17.5887 4.37414 17.3869 4.57565C17.1851 4.77716 17.0475 5.03401 16.9917 5.31371C16.9359 5.59342 16.9644 5.88338 17.0734 6.14692C17.1825 6.41045 17.3673 6.63571 17.6044 6.79418C17.8416 6.95264 18.1204 7.03719 18.4056 7.03713C18.7874 7.03708 19.1535 6.88556 19.4237 6.61582C19.6939 6.34608 19.846 5.98016 19.8467 5.59838Z"
                    fill="#f0f0f0"
                  ></path>
                  <path
                    d="M21.7665 16.8484C21.7132 18.0185 21.5175 18.6543 21.355 19.0765C21.1621 19.5983 20.8542 20.0699 20.4542 20.4565C20.0686 20.8554 19.5976 21.1616 19.0765 21.352C18.6543 21.5169 18.0161 21.7132 16.8461 21.769C15.5811 21.8247 15.2063 21.8366 11.9985 21.8366C8.7937 21.8366 8.41592 21.8247 7.15095 21.769C5.9809 21.7132 5.34573 21.5169 4.92345 21.352C4.40565 21.1532 3.93534 20.8479 3.54287 20.4559C3.15041 20.064 2.84453 19.594 2.645 19.0765C2.48248 18.6543 2.28385 18.0185 2.23341 16.8484C2.17176 15.5835 2.16045 15.2027 2.16045 12.0015C2.16045 8.79371 2.17176 8.4159 2.23341 7.15094C2.28385 5.98089 2.48248 5.34573 2.645 4.9199C2.83591 4.39855 3.14319 3.92759 3.54347 3.54285C3.93046 3.14405 4.40205 2.83722 4.92345 2.645C5.34573 2.47954 5.9809 2.2862 7.15095 2.23046C8.41592 2.17469 8.7937 2.16046 11.9985 2.16046C15.2063 2.16046 15.5811 2.17469 16.8461 2.23046C18.0161 2.2862 18.6543 2.47954 19.0765 2.645C19.5931 2.84578 20.0624 3.15165 20.4546 3.54324C20.8468 3.93484 21.1534 4.40362 21.355 4.9199C21.5175 5.34573 21.7132 5.98089 21.7665 7.15094C21.8253 8.41591 21.8395 8.79371 21.8395 12.0015C21.8395 15.2027 21.8253 15.5835 21.7665 16.8484ZM23.927 7.05251C23.8683 5.77388 23.6667 4.90033 23.3672 4.13948C23.0602 3.34196 22.5896 2.61758 21.9856 2.013C21.3816 1.40842 20.6577 0.937044 19.8605 0.629238C19.0967 0.332701 18.2261 0.128677 16.9469 0.0729448C15.6677 0.0112537 15.2591 0 11.9985 0C8.74091 0 8.32935 0.0112527 7.05015 0.0729448C5.77389 0.128677 4.90389 0.332696 4.1365 0.629238C3.34 0.938261 2.61671 1.41006 2.0129 2.01449C1.40909 2.61891 0.938034 3.34266 0.629819 4.13948C0.333285 4.90033 0.13166 5.77388 0.0699676 7.05251C0.0142368 8.33171 0 8.74091 0 12.0015C0 15.2591 0.0142377 15.6677 0.0699676 16.9469C0.13166 18.2231 0.333285 19.0961 0.629819 19.8605C0.939148 20.6566 1.4106 21.3797 2.01428 21.9839C2.61795 22.5881 3.34066 23.0602 4.1365 23.3702C4.90389 23.6667 5.77388 23.8683 7.05015 23.9271C8.32935 23.9858 8.7409 24 11.9985 24C15.2591 24 15.6677 23.9858 16.9469 23.9271C18.2261 23.8683 19.0967 23.6667 19.8605 23.3702C20.6607 23.0679 21.3855 22.5951 21.9848 21.9848C22.5956 21.3865 23.0675 20.6613 23.3672 19.8605C23.6667 19.0961 23.8683 18.2231 23.927 16.9469C23.9858 15.6677 24 15.2591 24 12.0015C24 8.74091 23.9858 8.3317 23.927 7.05251Z"
                    fill="#f0f0f0"
                  ></path>
                  <path
                    d="M11.9989 15.9984C11.2078 15.9978 10.4348 15.7626 9.77737 15.3227C9.11999 14.8827 8.60783 14.2577 8.30566 13.5267C8.00349 12.7956 7.92488 11.9914 8.07978 11.2157C8.23467 10.44 8.61613 9.72763 9.17588 9.1687C9.73564 8.60978 10.4486 8.22939 11.2245 8.07564C12.0004 7.92189 12.8045 8.00169 13.5351 8.30494C14.2657 8.60819 14.89 9.12127 15.329 9.77931C15.7679 10.4373 16.0019 11.2108 16.0014 12.0018C16.0012 12.5271 15.8974 13.0472 15.6961 13.5323C15.4948 14.0175 15.1999 14.4583 14.8282 14.8294C14.4565 15.2006 14.0153 15.4948 13.5299 15.6954C13.0444 15.896 12.5241 15.9989 11.9989 15.9984ZM11.9989 5.83594C10.7801 5.83594 9.58866 6.19731 8.57524 6.87437C7.56181 7.55144 6.7719 8.51378 6.30535 9.63974C5.83881 10.7657 5.71658 12.0047 5.95414 13.2001C6.1917 14.3955 6.77838 15.4937 7.63998 16.3557C8.50159 17.2177 9.59945 17.8049 10.7947 18.043C11.99 18.2812 13.2291 18.1595 14.3553 17.6935C15.4815 17.2275 16.4442 16.4381 17.1217 15.4249C17.7993 14.4118 18.1612 13.2206 18.1618 12.0018C18.1622 11.1922 18.003 10.3905 17.6935 9.64248C17.3839 8.89444 16.93 8.21471 16.3577 7.64212C15.7854 7.06953 15.1059 6.61531 14.358 6.3054C13.6101 5.99549 12.8084 5.83597 11.9989 5.83594Z"
                    fill="#f0f0f0"
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/coral__fan"
                className="bg-gray-2 bg-opacity-20 rounded-full hover:bg-opacity-50 duration-300 w-9 h-9 s-2:w-11 s-2:h-11 flex items-center justify-center duration-300"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  className="w-5 s-2:w-auto h-auto"
                  width="26"
                  height="19"
                  viewBox="0 0 26 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.3542 4.71566C24.3718 4.02892 25.2877 3.20482 26 2.24337C25.0841 2.60964 24.0157 2.88434 22.9472 2.9759C24.0665 2.38072 24.8806 1.46506 25.2877 0.320482C24.2701 0.86988 23.0998 1.28193 21.9296 1.51084C20.9119 0.549398 19.5382 0 18.0117 0C15.0607 0 12.6693 2.15181 12.6693 4.80723C12.6693 5.17349 12.7202 5.53976 12.8219 5.90602C8.3953 5.67711 4.42661 3.75422 1.78082 0.86988C1.3229 1.55663 1.06849 2.38072 1.06849 3.29639C1.06849 4.94458 1.98434 6.40964 3.45988 7.27952C2.59491 7.23374 1.72994 7.0506 1.01761 6.68434V6.73012C1.01761 9.06506 2.84932 10.988 5.29159 11.4458C4.88454 11.5373 4.37573 11.6289 3.91781 11.6289C3.56164 11.6289 3.25636 11.5831 2.9002 11.5373C3.56164 13.4602 5.54599 14.8337 7.8865 14.8795C6.05479 16.1614 3.76517 16.9398 1.27202 16.9398C0.81409 16.9398 0.407045 16.894 0 16.8482C2.34051 18.2217 5.13894 19 8.19178 19C18.0117 19 23.3542 11.7205 23.3542 5.35663C23.3542 5.12771 23.3542 4.94458 23.3542 4.71566Z"
                    fill="#f0f0f0"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
          {!isAuthenticated && (
            <div className="group w-full sm:mt-auto flex items-start justify-between bg-orange-1 rounded-1 py-4 px-5 mb-5 relative hover:bg-gray-2 duration-300">
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
          )}
        </div>
      </section>
      {/* <section className="mb-20 lg:mb-24 xl:mb-32">
        <hr className="mb-3 lg:mb-5 border-gray-2 border-opacity-20"></hr>
        <div className="grid grid-cols-12 gap-4 lg:gap-5 group relative">
          <div className="col-span-12 sm:col-span-6 mb-2.5 sm:mb-0 relative hidden sm:block">
            <div className="rounded-1 overflow-hidden">
              <img className="w-full" src="/images/share-to-earn.png" alt="Share to earn"></img>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 flex flex-col items-start duration-300">
            <h2 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 font-medium duration-300 inline-block mb-10 lg:mb-16 xl:mb-24">
              Share To Earn
            </h2>
            <div className="rounded-1 overflow-hidden mb-5 sm:hidden">
              <img className="w-full" src="/images/share-to-earn.png" alt="Share to earn"></img>
            </div>
            <p className="text-lg leading-lh-3 xl:text-1 xl:leading-none font-medium tracking-4 max-w-xl mb-5">
              Generate a referral link for each NFT you own. Every time someone purchases an item
              through your link, you earn Coral points redeemable for crypto.
            </p>
          </div>
        </div>
      </section> */}
      <section className="mb-20 lg:mb-24 xl:mb-32 relative">
        <h3 className="text-lg leading-lh-3 xl:text-1 xl:leading-none font-medium tracking-4 uppercase mb-3.5">
          Current Drops
        </h3>
        <hr className="mb-3 lg:mb-4 border-gray-2 border-opacity-20"></hr>
        {/* start Rome concert drop section */}
        <div className="grid grid-cols-12 gap-4 lg:gap-5">
          <div className="col-span-12 sm:col-span-6">
            <h2 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 mb-2 font-medium inline-block">
              EXFLEX by Rome Fortune
            </h2>
            <div className="flex space-x-4 lg:space-x-5 text-xs leading-lh-1 tracking-1 uppercase mb-10 lg:mb-24">
              <div>Dropped on</div>
              {/* date starts here */}
              <time className="inline-block" dateTime="2022-10-03">
                {/* date ends here */}
                October 03, 2022
              </time>
            </div>
            {/* start mobile image link */}
            {/* collection link */}
            <a href="https://coral.fan/collection/0x7fFE7860F74b30deF853295E12a64506BCE22cF0">
              <div className="rounded-1 overflow-hidden sm:hidden mb-5 hover:rounded-2 duration-300">
                <img className="w-full" src="/images/rome.jpeg" alt="Rome Fortune"></img>
              </div>
            </a>
            {/* start mobile image link */}
            <p className="text-lg leading-lh-3 xl:text-1 xl:leading-none font-medium tracking-4 max-w-xl mb-5 ">
              The eccentric pioneer at the intersection of music and web3 is coming to Brooklyn, and
              he wants you to be your best self. Forget about your ex. You deserve better. Reach
              your true potential and claim your free Supplement Level NFT for access to Rome’s
              exclusive merch, upcoming drops, VIP afterparties, and more.
            </p>
            {/* CTA starts here */}
            {/* collection link */}
            <a
              href="https://coral.fan/collection/0x7fFE7860F74b30deF853295E12a64506BCE22cF0"
              className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-2 py-2 px-2.5 bg-gray-2 bg-opacity-20 hover:bg-opacity-50 rounded-full duration-300 mt-auto"
            >
              Claim Your Free NFT
            </a>
            {/* CTA ends here */}
          </div>
          {/* start desktop image link  */}
          {/* collection link */}
          <a
            href="https://coral.fan/collection/0x7fFE7860F74b30deF853295E12a64506BCE22cF0"
            className="col-span-12 sm:col-span-6 mb-2.5 sm:mb-0 relative"
          >
            <div className="rounded-1 overflow-hidden hidden sm:block hover:rounded-2 duration-300">
              <img className="w-full" src="/images/rome.jpeg" alt="Rome Fortune"></img>
            </div>
          </a>
          {/* end desktop image link  */}
        </div>
        {/* <hr className="mt-4 mb-3 lg:mb-4 border-gray-2 border-opacity-20"></hr> */}
        {/* end Rome drop section */}
      </section>

      <section className="mb-20 lg:mb-24 xl:mb-32">
        <hr className="mb-3 lg:mb-5 border-gray-2 border-opacity-20"></hr>
        <div className="grid grid-cols-12 gap-4 lg:gap-5 group relative">
          <div className="col-span-12 sm:col-span-6 mb-2.5 sm:mb-0 relative hidden sm:block">
            <div className="rounded-1 overflow-hidden">
              <img className="w-full" src="/images/simple-sign-up.jpg" alt="Simple Sign Up"></img>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 flex flex-col items-start duration-300">
            <h2 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 font-medium duration-300 inline-block mb-10 lg:mb-16 xl:mb-24">
              Simple Sign Up
            </h2>
            <div className="rounded-1 overflow-hidden mb-5 sm:hidden">
              <img className="w-full" src="/images/simple-sign-up.jpg" alt="Simple Sign Up"></img>
            </div>
            <p className="text-lg leading-lh-3 xl:text-1 xl:leading-none font-medium tracking-4 max-w-xl mb-5">
              You don’t need an existing crypto wallet to sign up. Connect your MetaMask account or
              sign up with an exsiting social account.
            </p>
            {!isAuthenticated && (
              <button
                onClick={handleOpenSignUpModal}
                disabled={isAuthenticated}
                className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-1 py-2 px-2.5 bg-orange-1 hover:bg-gray-2 rounded-full duration-300"
              >
                SIGN UP
              </button>
            )}
            <div className="grid grid-cols-1 gap-10 lg:gap-20 sm:mb-10 lg:mb-16 pt-10 lg:pt-16">
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase">
                    Connect Metamask
                  </h4>
                  <p className="lg:col-span-6 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2">
                    Connect your existing MetaMask wallet. You will be automatically connected to
                    the correct network.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase">
                    Social Login
                  </h4>
                  <p className="lg:col-span-6 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2">
                    Sign up with Gmail, Twitter, Discord, Apple, Twitch, or Facebook. We will create
                    a wallet you control for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20 lg:mb-24 xl:mb-32">
        <hr className="mb-3 lg:mb-5 border-gray-2 border-opacity-20"></hr>
        <div className="grid grid-cols-12 gap-4 lg:gap-5 relative">
          <div className="col-span-12 sm:col-span-6 flex flex-col items-start">
            <h2 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 font-medium max-w-xl mb-10 lg:mb-16 xl:mb-24">
              Artist Marketplaces infused with crypto
            </h2>
            <div className="rounded-1 overflow-hidden duration-300 sm:hidden mb-5">
              <img
                className="w-full"
                src="/images/coral-what.gif"
                alt="Artist Marketplaces infused with crypto"
              ></img>
            </div>
            <p className="text-lg leading-lh-3 xl:text-1 xl:leading-none font-medium tracking-4 max-w-xl mb-10 lg:mb-24">
              Coral enables everything you expect with the benefits of crypto, NFTs, exclusive
              experiences, and incentivized fans.
            </p>
            <div className="grid grid-cols-1 gap-10 lg:gap-20">
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase">
                    Web3 Enabled Marketplaces
                  </h4>
                  <p className="lg:col-span-6 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2">
                    Music, collectibles, events, merch, and more infused with benefits of Web3 to
                    reward fans and return value to artists.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase">
                    Collectibles and Access Passes
                  </h4>
                  <p className="lg:col-span-6 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2">
                    NFTs as rare digital collectibles, tickets, and membership passes to exclusive
                    content, discounts and more.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase">
                    Events and Experiences
                  </h4>
                  <p className="lg:col-span-6 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2">
                    Exclusive events, live performances, and unique experiences that celebrate the
                    connective power of music.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase">
                    Empowered Communities
                  </h4>
                  <p className="lg:col-span-6 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2">
                    Fans take an active role in artist communities through rewards, shared success
                    and the love of the music.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 mb-2.5 sm:mb-0 relative hidden sm:block">
            <div className="rounded-1 overflow-hidden duration-300 sticky top-0">
              <img
                className="w-full"
                src="/images/coral-what.gif"
                alt="Artist Marketplaces infused with crypto"
              ></img>
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
            data-id="628cdebc957828003dbaf71f"
          >
            <div className="col-span-6 relative">
              <div className="rounded-1 group-hover:rounded-2 overflow-hidden duration-300">
                <img
                  className="w-full"
                  src="https://editorial.coral.fan/content/images/size/w335h335/2022/05/Coral-Editorial-Header-Genre-Intro-3.jpg"
                  alt="Creating Musical Connections in a Post-Pandemic World"
                ></img>
              </div>
            </div>
            <div className="col-span-6 group-hover:opacity-60 duration-300">
              <h3>
                <a
                  href="https://editorial.coral.fan/creating-musical-connections-in-a-post-pandemic-world/"
                  className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 mb-3 font-medium duration-300 inline-block"
                >
                  Creating Musical Connections in a Post-Pandemic World
                </a>
              </h3>
              <div className=" flex space-x-4 lg:space-x-5">
                <time
                  className="inline-block text-xs leading-lh-1 tracking-1 uppercase text-gray-2"
                  dateTime="2022-05-26"
                >
                  26 May 2022
                </time>
              </div>
            </div>
            <a
              href="https://editorial.coral.fan/creating-musical-connections-in-a-post-pandemic-world/"
              className="absolute top-0 left-0 w-full h-full"
            ></a>
          </article>
          <article
            className="post tag-news featured grid grid-cols-12 gap-x-4 lg:gap-x-5 border-t border-gray-2 border-opacity-20 pt-4 lg:pt-5 group relative duration-300"
            data-id="6286e0d97d4697004d14b868"
          >
            <div className="col-span-6 relative">
              <div className="rounded-1 group-hover:rounded-2 overflow-hidden duration-300">
                <img
                  className="w-full"
                  src="https://editorial.coral.fan/content/images/size/w335h335/2022/05/Group-1202--1-.jpg"
                  alt="Symbiosis in Music"
                ></img>
              </div>
            </div>
            <div className="col-span-6 group-hover:opacity-60 duration-300">
              <h3>
                <a
                  href="https://editorial.coral.fan/symbiosis-in-music/"
                  className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 mb-3 font-medium duration-300 inline-block"
                >
                  Symbiosis in Music
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
                  19 May 2022
                </time>
              </div>
            </div>
            <a
              href="https://editorial.coral.fan/symbiosis-in-music/"
              className="absolute top-0 left-0 w-full h-full"
            ></a>
          </article>
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
              Coral connects artists and fans through direct support, shared success, and direct
              payments that reduce fees.
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
                    Transparent <br className="hidden lg:block"></br>Revenue Share
                  </h4>
                  <div className="lg:col-span-6">
                    <p className="text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2 mb-3">
                      Artist-first fee structures return more money to the artists and fans. With
                      Coral and crypto payments, roughly 90% of money goes directly to artists.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase">
                    Reduced Fees
                  </h4>
                  <p className="lg:col-span-6 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2">
                    Traditional credit card payments or crypto for instant, global, direct
                    transactions that cut out middlemen and reduce fees.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase">
                    NFTS
                  </h4>
                  <p className="lg:col-span-6 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2">
                    NFTs serve as tickets, and membership passes that can be held and used for perks
                    or resold to other fans.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase">
                    Fast, Low Cost, <br className="hidden lg:block"></br>Eco-Friendly Tech
                  </h4>
                  <div className="lg:col-span-6">
                    <p className="text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2 mb-3">
                      Coral uses the Avalanche blockchain to facilitate transacting in open
                      marketplaces like never before.
                    </p>
                    <a
                      href="https://www.avax.network/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-2 py-2 px-2.5 bg-gray-2 bg-opacity-20 rounded-full duration-300 mt-auto hover:bg-opacity-50"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-s-1 w-full mx-auto">
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {!isAuthenticated ? (
            <div className="group lg:min-h-min-h-1 flex bg-orange-1 rounded-1 py-4 px-5 relative hover:bg-gray-2 duration-300">
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
            <div className="group lg:min-h-min-h-1 flex bg-orange-1 text-gray-1 rounded-1 py-4 px-4 lg:px-5 relative duration-300">
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
          <div className="group lg:min-h-min-h-1 flex bg-gray-2 bg-opacity-10 rounded-1 py-4 px-5 relative hover:bg-opacity-20 duration-300">
            <a href="mailto:support@coral.fan" className="absolute top-0 left-0 w-full h-full"></a>
            <div className="flex flex-col items-start lg:w-3/4">
              <h3 className="text-1 leading-none lg:text-2 lg:leading-lh-2 tracking-3 font-medium mb-8">
                Coral For Artists and Labels
              </h3>
              <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-1 py-2 px-2.5 bg-gray-2 rounded-full hover:bg-orange-1 duration-300 mt-auto mb-4 group-hover:bg-orange-1 text-gray-1">
                Contact us
              </div>
              <p className="text-lg leading-lh-3 lg:text-2xl lg:leading-7">
                Contact us to learn more about how Coral can support you as an artist or label.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
