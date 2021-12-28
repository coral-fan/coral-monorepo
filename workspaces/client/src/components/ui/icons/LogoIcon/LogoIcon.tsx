import { Icon } from 'components/ui';
import { IconProps } from 'components/ui/Icon';
import logoIconSVG from './logo.svg';

export const LogoIcon = ({ size, alt }: IconProps) => {
  return <Icon svg={logoIconSVG} alt={alt} size={size} />;
};
