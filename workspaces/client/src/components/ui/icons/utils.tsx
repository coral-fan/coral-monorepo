import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Story, Meta } from '@storybook/react';
import { IconProps, Icon } from 'components/ui/Icon';

const getSpaceSeparatedName = (s: string) => s.split(/(?=[A-Z])/).join(' ');

export const getIconStoryConfigurations = (IconComponent: React.FunctionComponent<IconProps>) => {
  const meta = {
    title: `Coral/Icons/${getSpaceSeparatedName(IconComponent.name)}`,
    component: IconComponent,
    argTypes: {
      size: {
        control: { type: 'range' },
      },
    },
  } as Meta;

  const Template: Story<IconProps> = (args) => <IconComponent {...args} />;

  const Default = Template.bind({});

  return { meta, Default };
};

export const getIconComponent = (componentName: string, iconSVG: string) => {
  const IconComponent = ({ alt, size }: IconProps) => <Icon svg={iconSVG} alt={alt} size={size} />;
  IconComponent.name = componentName;
  IconComponent.displayName = componentName;
  return IconComponent;
};
