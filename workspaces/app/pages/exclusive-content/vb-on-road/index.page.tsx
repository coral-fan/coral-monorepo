import styled from '@emotion/styled';

import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css';
import { WebPlayer } from 'components/features/stream/components/StreamPlayer/components';
import { ButtonLink, GatedContent } from 'components/ui';
import styles from './styles.module.css';
import { CLIENT_ENVIRONMENT } from 'consts';

const FlickitySlide = styled.img`
  width: 80%;
  margin-right: 10px;
`;

interface CarouselProps {
  imageSrcs: string[];
}

const Carousel = ({ imageSrcs }: CarouselProps) => (
  <Flickity
    className={`${styles['kg-width-wide']} ${styles.carousel}`}
    options={{ wrapAround: true, pageDots: false, initialIndex: 1 }}
  >
    {imageSrcs.map((src, i) => (
      <FlickitySlide key={i} src={src} />
    ))}
  </Flickity>
);

export default function VanBurenGatedContent() {
  return (
    <GatedContent
      accessGrantingTokenAddresses={[
        CLIENT_ENVIRONMENT === 'development'
          ? '0xaA1c5956dcE213733377eAa8ae6D4f9Cf9f5d570'
          : '0xc56E1b0734f25D17D7A68eb969f8eB00B287136d',
      ]}
      accessDeniedModalProps={{
        title: 'This is exclusive VB ON ROAD content',
        message:
          'This content is for Van Buren Records All Access Pass holders only. Redeem your FREE access pass for special and exclusive content.',
        actionElement: (
          <ButtonLink href="https://www.coral.fan/collection/0xc56E1b0734f25D17D7A68eb969f8eB00B287136d">
            Redeem FREE Access Pass
          </ButtonLink>
        ),
      }}
    >
      <div className="max-w-screen-s-1 mx-auto px-4 lg:px-5 grid grid-cols-12 mt-12 md:mt-14 lg:mt-24">
        <h1 className="text-4 leading-none sm:leading-none lg:text-3 lg:leading-none tracking-5 col-span-12 sm:col-span-10 sm:col-start-2 font-medium duration-300">
          Exclusive VB ON ROAD Content
        </h1>
      </div>
      <section id="2022-10-21">
        {/* header */}
        <div className="max-w-screen-s-1 mx-auto px-4 lg:px-5 grid grid-cols-12 mt-12 md:mt-14 lg:mt-24">
          <h2 className="text-1 leading-none sm:leading-none lg:text-4 lg:leading-none tracking-5 col-span-12 sm:col-span-10 sm:col-start-2 font-medium duration-300">
            Night One of VB ON ROAD: Philly
          </h2>
          <div className="col-span-12 sm:col-span-10 sm:col-start-2 tiny-1 mb-3 sm:mb-4 lg:mb-5 mt-8 lg:mt-12">
            <div className="flex space-x-5">
              <time dateTime="2022-10-21">October 21, 2022</time>
            </div>
          </div>
        </div>
        {/* image */}
        <div className="max-w-screen-s-1 mx-auto px-4 lg:px-5">
          <WebPlayer mediaId="119ed4bb1818e1cf98/90e2b16927376e3c" />
        </div>
        {/* image */}
        {/* content */}
        <div className="overflow-hidden">
          <div className="max-w-screen-s-1 mx-auto px-5 mt-10 sm:mt-20 lg:mt-24">
            <div className={styles.content}>
              <p>
                First leg of the Colture presents VB on Road Tour and first up - the city of
                brotherly love. Van Buren Records launched their first official tour since the
                release of the critically acclaimed “Dover Street Market” studio album at PhilaMOCA.
                High energy, high intensity, and the beginning of a slow burn six date tour across
                America begins.
              </p>
              <p>Jiles put it simply:</p>
              <blockquote>
                “Felt good performing the new tracks. Accomplishing night in a new city.”
              </blockquote>
              <p>
                One down, two to go on the East Coast. DC and NYC get ready. Follow Coral on{' '}
                <a
                  href="https://www.instagram.com/coral_fan/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>{' '}
                and{' '}
                <a href="https://twitter.com/coral__fan" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>{' '}
                for live updates, and come back for more behind the scenes content, show recaps,
                interviews, and exclusive merch coming down the pipeline.
              </p>

              <Carousel
                imageSrcs={[
                  '/images/van-buren-records/vb-on-road/philly/1.jpg',
                  '/images/van-buren-records/vb-on-road/philly/2.jpg',
                  '/images/van-buren-records/vb-on-road/philly/3.jpg',
                  '/images/van-buren-records/vb-on-road/philly/4.jpg',
                  '/images/van-buren-records/merch/rings.png',
                  '/images/van-buren-records/merch/t-shirts.png',
                ]}
              />
            </div>
          </div>
        </div>
        {/* content */}
      </section>
    </GatedContent>
  );
}
