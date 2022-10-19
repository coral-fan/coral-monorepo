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
      <section id="2022-10-22">
        {/* header */}
        <div className="max-w-screen-s-1 mx-auto px-4 lg:px-5 grid grid-cols-12 mt-12 md:mt-14 lg:mt-24">
          <h2 className="text-1 leading-none sm:leading-none lg:text-4 lg:leading-none tracking-5 col-span-12 sm:col-span-10 sm:col-start-2 font-medium duration-300">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
            velit
          </h2>
          <div className="col-span-12 sm:col-span-10 sm:col-start-2 tiny-1 mb-3 sm:mb-4 lg:mb-5 mt-8 lg:mt-12">
            <div className="flex space-x-5">
              <time dateTime="2022-10-22">October 22, 2022</time>
            </div>
          </div>
        </div>
        {/* video */}
        <div className="max-w-screen-s-1 mx-auto px-4 lg:px-5">
          <WebPlayer mediaId="449ed8b51d17e9cecd/fabf472242b19884" />
        </div>
        {/* video */}
        {/* content */}
        <div className="overflow-hidden">
          <div className="max-w-screen-s-1 mx-auto px-5 mt-10 sm:mt-20 lg:mt-24">
            <div className={styles.content}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec aliquet lorem.
                Proin dictum nulla vel feugiat sollicitudin. Sed eget dolor eu turpis ullamcorper
                aliquam. Vivamus vulputate elit sed lectus tincidunt, vel commodo massa ullamcorper.
                Cras id feugiat libero. Proin a imperdiet tortor, quis lobortis ex. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In hac
                habitasse platea dictumst. Quisque nec magna vehicula, malesuada tortor quis,
                aliquet ligula.
              </p>
            </div>
          </div>
        </div>
        {/* content */}
      </section>
      <section id="2022-10-20">
        {/* header */}
        <div className="max-w-screen-s-1 mx-auto px-4 lg:px-5 grid grid-cols-12 mt-12 md:mt-14 lg:mt-24">
          <h2 className="text-1 leading-none sm:leading-none lg:text-4 lg:leading-none tracking-5 col-span-12 sm:col-span-10 sm:col-start-2 font-medium duration-300">
            Lorem ipsum dolor sit amet velit
          </h2>
          <div className="col-span-12 sm:col-span-10 sm:col-start-2 tiny-1 mb-3 sm:mb-4 lg:mb-5 mt-8 lg:mt-12">
            <div className="flex space-x-5">
              <time dateTime="2022-10-20">October 20, 2022</time>
            </div>
          </div>
        </div>
        {/* image */}
        <div className="max-w-screen-s-1 mx-auto px-4 lg:px-5">
          <img src="/images/van-buren-records.jpg" alt="" className="w-full" />
        </div>
        {/* image */}
        {/* content */}
        <div className="overflow-hidden">
          <div className="max-w-screen-s-1 mx-auto px-5 mt-10 sm:mt-20 lg:mt-24">
            <div className={styles.content}>
              <p>
                <em>
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
                  adipisci velit...
                </em>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nibh odio, pulvinar
                et erat quis, volutpat tincidunt arcu. Suspendisse aliquet imperdiet pretium. Morbi
                hendrerit neque eu mauris gravida, et sagittis leo vestibulum. Etiam gravida
                ultrices mi, id lacinia metus ornare ac. Curabitur maximus luctus mi vitae blandit.
                Fusce placerat purus quis nisi congue, sed consectetur ante placerat. Proin
                hendrerit commodo lorem quis tempor. Aenean in lacinia dui, in maximus nibh. Sed
                ipsum quam, dapibus non sodales dapibus, sollicitudin quis magna. Vivamus sit amet
                nunc dictum, viverra nisl ac, tempor velit. Aliquam at blandit arcu, sed porta
                dolor. Suspendisse potenti. Curabitur consectetur, metus et viverra tempor, est
                risus molestie nisl, a efficitur mauris quam nec tortor.
              </p>
              <figure className={`${styles['kg-card']}`}>
                <img
                  className={styles['kg-image']}
                  src="https://editorial.coral.fan/content/images/size/w1400/2022/06/Coral-Editorial-VanBuren.jpg"
                  alt=""
                />
                <figcaption>Quis viverra nibh cras pulvinar mattis nunc sed</figcaption>
              </figure>
              <p>
                Donec sollicitudin vitae mi sed aliquet. Vivamus viverra, libero at euismod semper,
                diam risus faucibus tortor, vel hendrerit ipsum metus ut dolor. Ut purus risus,
                fringilla vitae varius ac, viverra eget metus. Vestibulum mi nulla, congue eget orci
                vel, consequat commodo nunc. Nulla facilisi. Suspendisse ac dignissim lorem.
                Phasellus lobortis, dui sed viverra consequat, sapien risus pharetra justo, ut
                eleifend nunc massa eget enim.
              </p>
              <blockquote>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacinia felis
                magna, nec placerat quam consequat vel. Maecenas egestas elit.”
              </blockquote>
              <h3>Lorem ipsum dolor sit amet</h3>
              <p>
                Maecenas tristique ipsum arcu. Maecenas consectetur at metus sed eleifend. Praesent
                varius, arcu at dictum tincidunt, erat mi commodo massa, quis maximus diam nisi quis
                risus. Vestibulum mollis sed felis a lobortis. Cras sit amet sapien odio. Morbi
                aliquam at arcu ac vehicula. Aliquam tristique hendrerit justo, sed egestas elit
                commodo in. Nulla nec nisl porta nisl lobortis bibendum. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc at
                augue orci. Phasellus sed est tellus. Pellentesque id venenatis dui. Quisque eu
                sagittis sem.
              </p>

              <Carousel
                imageSrcs={[
                  'https://editorial.coral.fan/content/images/size/w1000/2022/06/VBR-BC-1-3.jpg',
                  'https://editorial.coral.fan/content/images/size/w1000/2022/06/VBR-BC-1-2.jpg',
                  'https://editorial.coral.fan/content/images/size/w1000/2022/06/VBR-BC-2-2--1-.jpg',
                  'https://editorial.coral.fan/content/images/size/w1000/2022/06/VBR-BC-1-4.jpg',
                  'https://editorial.coral.fan/content/images/size/w1000/2022/06/DSC08798.jpg',
                  'https://editorial.coral.fan/content/images/size/w1000/2022/06/DSC08610.jpg',
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
