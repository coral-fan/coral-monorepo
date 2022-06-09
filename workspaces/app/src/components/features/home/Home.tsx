// TODO: implement home page in house
/* eslint-disable @next/next/no-img-element */
import { useIsAuthenticated } from 'libraries/authentication';
import { useOpenSignInModal } from 'components/app';

export const Home = () => {
  const handleOpenSignUpModal = useOpenSignInModal({ isSignUp: true });

  const isAuthenticated = useIsAuthenticated();
  return (
    <div>
      <section className="grid grid-cols-12 gap-4 lg:gap-5 mb-20 lg:mb-24 xl:mb-48 relative duration-300">
        <div className="col-span-12 sm:col-span-6 mb-2.5 sm:mb-0 relative">
          <div className="overflow-hidden duration-300">
            <img
              className="w-full"
              src="/images/the-marketplace-for-a-new-era-of-music.png"
              alt="The marketplace for a new era of music."
            ></img>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 sm:pt-3 flex flex-col items-start duration-300">
          <h1 className="max-w-lg text-1 leading-none xl:text-2 xl:leading-none tracking-3 mb-2 font-medium duration-300 inline-block">
            The marketplace for a new era of music.
          </h1>
          <div className="group w-full mt-8 mb-10 sm:my-auto flex flex-col lg:flex-row items-start justify-between bg-orange-1 rounded-1 py-4 px-5 relative hover:bg-gray-2 duration-300">
            <button
              onClick={handleOpenSignUpModal}
              disabled={isAuthenticated}
              className="absolute top-0 left-0 w-full h-full"
            ></button>
            <div className="flex flex-col items-start lg:w-4/5 mb-4 lg:mb-0">
              <h3 className="text-2xl leading-7 xl:text-1 lg:leading-none tracking-3 uppercase text-gray-1 font-medium mb-4 xl:mb-6">
                Sign Up
              </h3>
              <p className="text-lg leading-lh-3 xl:text-2xl xl:leading-7 text-gray-1">
                Sign up with MetaMask or an existing social account
              </p>
            </div>
            <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-1 py-2 px-2.5 bg-gray-2 rounded-full hover:bg-orange-1 duration-300 group-hover:bg-orange-1 text-gray-1">
              Sign up
            </div>
          </div>
          <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-2 py-2 px-2.5 bg-gray-2 bg-opacity-20 rounded-full duration-300 mt-auto">
            Scroll for latest collections
          </div>
        </div>
      </section>

      <section className="grid grid-cols-12 gap-4 lg:gap-5 mb-20 lg:mb-24 xl:mb-48 group relative duration-300">
        <div className="col-span-12 sm:col-span-6 group-hover:opacity-60 duration-300">
          {/* ADD VB LINK HERE */}
          <a href="#" className="absolute top-0 left-0 w-full h-full"></a>
          <hr className="mb-3 lg:mb-5 border-gray-2 border-opacity-20"></hr>
          <h2 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 mb-2 font-medium duration-300 inline-block">
            Van Buren Records
          </h2>
          <div className="flex space-x-4 lg:space-x-5 text-xs leading-lh-1 tracking-1 uppercase mb-10 md:mb-24 lg:mb-36">
            <div>Drops on</div>
            <time className="inline-block" dateTime="2022-06-15">
              June 15, 2022
            </time>
          </div>
          <p className="text-lg leading-lh-3 xl:text-1 xl:leading-none font-medium tracking-4 mb-4 lg:mb-9">
            Introducing the Brockton collective of rappers, fashion designers, artists, and
            creatives. This NFT will grant you access to a live performance, exclusive merch, and a
            spot in the growing community.
          </p>
          <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-2 py-2 px-2.5 bg-gray-2 bg-opacity-20 rounded-full duration-300 mt-auto">
            Get Your NFT
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 mb-2.5 sm:mb-0 relative">
          <div className="rounded-1 group-hover:rounded-2 overflow-hidden duration-300">
            <img
              className="w-full"
              src="/images/van-burden-records.jpg"
              alt="Van Buren Records"
            ></img>
          </div>
        </div>
      </section>

      <section className="mb-20 lg:mb-24 xl:mb-48">
        <hr className="mb-3 lg:mb-5 border-gray-2 border-opacity-20"></hr>
        <div className="grid grid-cols-12 gap-4 lg:gap-5 group relative">
          <button
            onClick={handleOpenSignUpModal}
            disabled={isAuthenticated}
            className="absolute top-0 left-0 w-full h-full"
          ></button>
          <div className="col-span-12 sm:col-span-6 mb-2.5 sm:mb-0 relative">
            <div className="rounded-1 overflow-hidden">
              <div className="w-full h-full bg-white aspect-square"></div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 flex flex-col items-start duration-300">
            <h2 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 mb-2 font-medium duration-300 inline-block mb-10 md:mb-16 xl:mb-24">
              Simple Sign Up
            </h2>
            <p className="text-lg leading-lh-3 xl:text-1 xl:leading-none font-medium tracking-4 mb-4 lg:mb-10">
              You don’t need an existing crypto wallet to sign up. Connect your MetaMask account or
              sign up with an exsiting social account.
            </p>
            <div className="grid grid-cols-1 gap-10 lg:gap-20 mb-10 lg:mb-16">
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-12 h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-lg leading-lh-3 tracking-wide uppercase">
                    Connect Metamask
                  </h4>
                  <p className="lg:col-span-6 text-lg leading-lh-3 tracking-2">
                    Connect your existiing MetaMask wallet. You will be automatically connected to
                    the correct network.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-12 h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-lg leading-lh-3 tracking-wide uppercase">
                    Social Login
                  </h4>
                  <p className="lg:col-span-6 text-lg leading-lh-3 tracking-2">
                    Sign up with Gmail, Twitter, Discord, Twitch, or Facebook. We will create a
                    wallet you control for you.
                  </p>
                </div>
              </div>
            </div>
            <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-1 py-2 px-2.5 bg-orange-1 rounded-full duration-300 mt-auto">
              SIGN UP
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20 sm:mb-0">
        <hr className="mb-3 lg:mb-5 border-gray-2 border-opacity-20"></hr>
        <div className="grid grid-cols-12 gap-4 lg:gap-5 group relative duration-300">
          <div className="col-span-12 sm:col-span-6 flex flex-col items-start duration-300">
            <h2 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 mb-2 font-medium duration-300 inline-block mb-10 md:mb-16 xl:mb-24">
              Artist Marketplaces infused with crypto
            </h2>
            <p className="text-lg leading-lh-3 xl:text-1 xl:leading-none font-medium tracking-4 mb-4 lg:mb-10">
              Coral enables everything you expect with the benefits of crypto, NFTs, exclusive
              experiences, and a chance to your for your fandom. .
            </p>
            <div className="grid grid-cols-1 gap-10 lg:gap-20 mb-10 lg:mb-16">
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-12 h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-lg leading-lh-3 tracking-wide uppercase">
                    Web3 Enabled Marketplaces
                  </h4>
                  <p className="lg:col-span-6 text-lg leading-lh-3 tracking-2">
                    Music, collectibles, events, merch, and more infused with benefits of Web3 to
                    reward fans and return value to artists.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-12 h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-lg leading-lh-3 tracking-wide uppercase">
                    Collectibles and Access Passes
                  </h4>
                  <p className="lg:col-span-6 text-lg leading-lh-3 tracking-2">
                    NFTs as rare digital collectibles, tickets, and membership passes to exclusive
                    content, discounts and more.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-12 h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-lg leading-lh-3 tracking-wide uppercase">
                    Events and Experiences
                  </h4>
                  <p className="lg:col-span-6 text-lg leading-lh-3 tracking-2">
                    Exclusive events, live performances, and unique experiences that celebrate the
                    connective power of music.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-12 h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-lg leading-lh-3 tracking-wide uppercase">
                    Empowered Communities
                  </h4>
                  <p className="lg:col-span-6 text-lg leading-lh-3 tracking-2">
                    Fans take an active role in artist communities through rewards, shared success
                    and the love of the music.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 mb-2.5 sm:mb-0 relative">
            <div className="rounded-1 overflow-hidden duration-300">
              <img
                className="w-full"
                src="/images/artist-marketplaces-infused-with-crypto.png"
                alt="Artist Marketplaces infused with crypto"
              ></img>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20 lg:mb-24 xl:mb-48">
        <hr className="mb-3 lg:mb-5 border-gray-2 border-opacity-20"></hr>
        <div className="grid grid-cols-12 gap-4 lg:gap-5 group relative duration-300">
          <div className="col-span-12 sm:col-span-6 flex flex-col items-start duration-300">
            <h2 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 mb-2 font-medium duration-300 inline-block mb-10 md:mb-16 xl:mb-24">
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
                  <img src="/images/plus.svg" className="w-12 h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-lg leading-lh-3 tracking-wide uppercase">
                    Transparent <br className="hidden lg:block"></br>Revenue Share
                  </h4>
                  <div className="lg:col-span-6">
                    <p className="text-lg leading-lh-3 tracking-2 mb-3">
                      Artist-first fee structures return more money to the artists and fans. With
                      Coral and crypto payments, roughly 90% of money goes directly to artists.
                    </p>
                    <a
                      href="#"
                      className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-2 py-2 px-2.5 bg-gray-2 bg-opacity-20 rounded-full duration-300 mt-auto hover:bg-opacity-50"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-12 h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-lg leading-lh-3 tracking-wide uppercase">
                    Reduced Fees
                  </h4>
                  <p className="lg:col-span-6 text-lg leading-lh-3 tracking-2">
                    Traditional credit card payments or crypto for instant, global, direct
                    transactions that cut out middlemen and reduce fees.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-12 h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-lg leading-lh-3 tracking-wide uppercase">
                    NFT’S
                  </h4>
                  <p className="lg:col-span-6 text-lg leading-lh-3 tracking-2">
                    NFTs serve as tickets, and membership passes that can be held and used for perks
                    or resold to other fans..
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                <div className="col-span-2">
                  <img src="/images/plus.svg" className="w-12 h-12" alt="" />
                </div>
                <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                  <h4 className="lg:col-span-4 text-lg leading-lh-3 tracking-wide uppercase">
                    Fast, Low Cost, <br className="hidden lg:block"></br>Eco-Friendly Tech
                  </h4>
                  <div className="lg:col-span-6">
                    <p className="text-lg leading-lh-3 tracking-2 mb-3">
                      Coral uses the Avalanche blockchain to facilitate transacting in open
                      marketplaces like never before.
                    </p>
                    <a
                      href="#"
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
          <div className="group lg:min-h-min-h-1 flex bg-orange-1 rounded-1 py-4 px-5 relative hover:bg-gray-2 duration-300">
            <button
              onClick={handleOpenSignUpModal}
              disabled={isAuthenticated}
              className="absolute top-0 left-0 w-full h-full"
            ></button>
            <div className="flex flex-col items-start lg:w-11/12">
              <h3 className="text-1 leading-none lg:text-2 lg:leading-lh-2 tracking-3 text-gray-1 font-medium mb-8">
                Sign Up for Early Access
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
