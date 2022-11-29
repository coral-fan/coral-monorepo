// TODO: implement home page in house
/* eslint-disable @next/next/no-img-element */
import { useIsAuthenticated } from 'libraries/authentication';
import { useOpenSignInModal } from 'components/app';

export const Lp = () => {
  const handleOpenSignUpModal = useOpenSignInModal({ isSignUp: true });

  const isAuthenticated = useIsAuthenticated();
  return (
      <hr className="mb-4 lg:mb-5">
      <article className="mb-20 lg:mb-24 xl:mb-32 grid grid-cols-12 gap-x-4 lg:gap-x-5 group relative duration-300" data-id="637d0ed4e6e03663b49d3de1">
          <div className="col-span-12 sm:col-span-6 mb-2.5 sm:mb-0 relative">
              <div className="rounded-1 overflow-hidden">
                  <img className="w-full" src="/images/pinder/pinder.jpg" alt="Support Pinder’s sound.xyz Drop">
              </div>
          </div>
          <div className="col-span-12 sm:col-span-6 flex flex-col">
              <h3 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 mb-2 font-medium inline-block">Support Pinder's sound.xyz Drop</h3>
              <p className="text-lg leading-lh-3 lg:text-2xl lg:leading-7 mt-10">Share a promo for Pinder’s upcoming drop on sound.xyz of his new single “The Mop” and earn points.</p>
              <div className="group w-full sm:mt-auto flex items-start justify-between bg-orange-1 rounded-1 py-4 px-5 relative hover:bg-gray-2 duration-300">
                  <button className="absolute top-0 left-0 w-full h-full"></button>
                  <div className="flex flex-col items-start w-4/5">
                      <h3 className="text-lg leading-lh-3 xl:text-1 s-2:leading-none tracking-3 uppercase text-gray-1 font-medium mb-4 xl:mb-6">Share to Earn</h3>
                      <p className="text-lg leading-lh-3 xl:text-2xl xl:leading-7 text-gray-1">Support Pinder by sharing his content on Twitter and earn points redeemable for $AVAX.</p>
                  </div>
                  <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-1 py-2 px-2.5 bg-gray-2 rounded-full hover:bg-orange-1 duration-300 group-hover:bg-orange-1 text-gray-1">Get it</div>
              </div>
          </div>
      </article>

      <section className="mb-20 lg:mb-24 xl:mb-32">
          <hr className="mb-3 lg:mb-5 border-gray-2 border-opacity-20">
          <div className="grid grid-cols-12 gap-4 lg:gap-5 relative mb-10 lg:mb-20">
              <div className="col-span-12 sm:col-span-6 flex flex-col items-start">
                  <h2 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 font-medium max-w-xl">Featured Artists</h2>
              </div>
              <div className="col-span-12 sm:col-span-6 mb-2.5 sm:mb-0 relative hidden sm:block">
                  <p className="text-lg leading-lh-3 xl:text-1 xl:leading-none font-medium tracking-4"> Coral rewards fans for supporting and promoting artists. The more you support, the more you earn.</p>
              </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                  <div className="rounded-1 overflow-hidden mb-4">
                      <img className="w-full" src="/images/rome.jpeg" alt="Rome Fortune">
                  </div>
                  <h4 className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 font-medium">Rome Fortune</h4>
              </div>
              <div>
                  <div className="rounded-1 overflow-hidden mb-4">
                      <img className="w-full" src="/images/van-buren-records/vb-on-road.jpg" alt="Van Buren Records">
                  </div>
                  <h4 className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 font-medium">Van Buren Records</h4>
              </div>
              <div>
                  <div className="rounded-1 overflow-hidden mb-4">
                      <img className="w-full" src="/images/pinder/pinder.jpg" alt="Support Pinder’s sound.xyz Drop">
                  </div>
                  <h4 className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 font-medium">Pinder</h4>
              </div>
              <div className="flex flex-col">
                  <div className="group flex-1 flex bg-gray-2 bg-opacity-10 rounded-1 mb-4 py-4 px-5 relative hover:bg-opacity-20 duration-300">
                      <a href="mailto:support@coral.fan" className="absolute top-0 left-0 w-full h-full"></a>
                      <div className="flex flex-col items-start lg:w-3/4">
                          <h3 className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 mb-3 font-medium mb-auto">Are you an artist? Want to be featured on Coral?</h3>
                          <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-white py-2 px-2.5 bg-gray-2 bg-opacity-10 rounded-full mt-4">Apply as an artist</div>
                      </div>
                  </div>
                  <h4 className="text-lg leading-none lg:text-1 lg:leading-none tracking-2 font-medium">&nbsp;</h4>
              </div>
          </div>
      </section>

      <section className="mb-20 lg:mb-24 xl:mb-32">
          <hr className="mb-3 lg:mb-5 border-gray-2 border-opacity-20">
          </hr>
          <div className="grid grid-cols-12 gap-4 lg:gap-5 relative">
              <div className="col-span-12 sm:col-span-6 flex flex-col items-start">
                  <h2 className="text-1 leading-none xl:text-2 xl:leading-none tracking-3 font-medium inline-block mb-10 lg:mb-16 xl:mb-24"> How Coral Works </h2>
                  <p className="text-lg leading-lh-3 xl:text-1 xl:leading-none font-medium tracking-4"> Coral rewards fans for supporting and promoting artists. The more you support, the more you earn.</p>
              </div>
              <div className="border-t border-gray-2 border-opacity-20 pt-3.5 sm:pt-0 sm:border-none col-span-12 sm:col-span-6 relative">
                  <div className="grid grid-cols-1 gap-10 lg:gap-20">
                      <div className="grid grid-cols-10 lg:grid-cols-12 gap-5">
                          <div className="col-span-2">
                              <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                          </div>
                          <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                              <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase"> Browse, explore, discover</h4>
                              <div className="lg:col-span-6">
                                  <p className="text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2 mb-3"> Exclusive interviews, videos, BTS footage, and existing music, playlists, events, and news.</p>
                                  <a href="#" target="_blank" rel="noreferrer" className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-2 py-2 px-2.5 bg-gray-2 bg-opacity-20 rounded-full duration-300 mt-auto hover:bg-opacity-50"> Learn more </a>
                              </div>
                          </div>
                      </div>
                      <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                          <div className="col-span-2">
                              <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                          </div>
                          <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                              <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase"> Share or create your own content </h4>
                              <div className="lg:col-span-6">
                                  <p className="lg:col-span-6 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2 mb-3"> Share existing content or create your own based on prompts from the artists. </p>
                                  <a href="#" target="_blank" rel="noreferrer" className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-2 py-2 px-2.5 bg-gray-2 bg-opacity-20 rounded-full duration-300 mt-auto hover:bg-opacity-50"> Learn more </a>
                              </div>
                          </div>
                      </div>
                      <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                          <div className="col-span-2">
                              <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                          </div>
                          <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                              <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase"> EARN points </h4>
                              <div className="lg:col-span-6">
                                  <p className="lg:col-span-6 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2 mb-3"> Earn CORAL POINTS for your contributions.  </p>
                                  <a href="#" target="_blank" rel="noreferrer" className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-2 py-2 px-2.5 bg-gray-2 bg-opacity-20 rounded-full duration-300 mt-auto hover:bg-opacity-50"> Learn more </a>
                              </div>
                          </div>
                      </div>
                      <div className="border-t border-gray-2 border-opacity-20 pt-3.5 grid grid-cols-10 lg:grid-cols-12 gap-5">
                          <div className="col-span-2">
                              <img src="/images/plus.svg" className="w-6 h-6 lg:w-12 lg:h-12" alt="" />
                          </div>
                          <div className="col-span-8 lg:col-span-10 grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-5">
                              <h4 className="lg:col-span-4 text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-wide uppercase"> Redeem points for rewards </h4>
                              <div className="lg:col-span-6">
                                  <p className="text-base leading-5 lg:text-lg lg:leading-lh-3 tracking-2 mb-3"> Redeem your CORAL points for cryptocurrency or special benefits.  </p>
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
              <div className="group lg:min-h-min-h-1 flex bg-orange-1 rounded-1 py-4 px-5 relative hover:bg-gray-2 duration-300">
                  <button className="absolute top-0 left-0 w-full h-full"></button>
                  <div className="flex flex-col items-start lg:w-11/12">
                      <h3 className="text-1 leading-none lg:text-2 lg:leading-lh-2 tracking-3 text-gray-1 font-medium mb-8">Coral for Fans</h3>
                      <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-1 py-2 px-2.5 bg-gray-2 rounded-full hover:bg-orange-1 duration-300 mt-auto mb-4 group-hover:bg-orange-1 text-gray-1">Sign up</div>
                      <p className="text-lg leading-lh-3 lg:text-2xl lg:leading-7 text-gray-1">Coral is coming soon with exclusive events, experiences, and more. Sign up to reserve your spot.</p>
                  </div>
              </div>
              <div className="group lg:min-h-min-h-1 flex bg-gray-2 bg-opacity-10 rounded-1 py-4 px-5 relative hover:bg-opacity-20 duration-300">
                  <a href="mailto:support@coral.fan" className="absolute top-0 left-0 w-full h-full"></a>
                  <div className="flex flex-col items-start lg:w-3/4">
                      <h3 className="text-1 leading-none lg:text-2 lg:leading-lh-2 tracking-3 font-medium mb-8">Coral For Artists </h3>
                      <div className="inline-flex text-xs leading-3 tracking-1 uppercase text-gray-1 py-2 px-2.5 bg-gray-2 rounded-full hover:bg-orange-1 duration-300 mt-auto mb-4 group-hover:bg-orange-1 text-gray-1">Contact us</div>
                      <p className="text-lg leading-lh-3 lg:text-2xl lg:leading-7">Contact us to learn more about how Coral can support you as an artist or label. </p>
                  </div>
              </div>
          </div>
      </section>
  );
};
