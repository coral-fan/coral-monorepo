import secondaryLogoIconSVG from './secondary-logo.svg';

export const SecondaryLogoIcon = ({ ...props }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={secondaryLogoIconSVG} alt={'Coral Logo'} width={99} height={45} {...props} />
);
