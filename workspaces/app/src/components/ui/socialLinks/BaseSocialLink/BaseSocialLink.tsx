import { Link } from 'components/ui';

/* eslint-disable @next/next/no-img-element */
interface BaseSocialLinkProp {
  svg: string;
  href: string;
}

export const BaseSocialLink = ({ svg, href }: BaseSocialLinkProp) => (
  <Link href={href}>
    <img src={svg} width={'auto'} height={'auto'} alt={''} />
  </Link>
);
