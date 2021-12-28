import { Story, Meta } from '@storybook/react';
import { IconProps, Icon } from 'components/ui/Icon';
import React from 'react';

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

export const getIconComponent =
  (iconSVG: string) =>
  // eslint-disable-next-line react/display-name -- function name will be defined when utility function is used
  ({ size, alt }: IconProps) =>
    <Icon svg={iconSVG} alt={alt} size={size} />;
