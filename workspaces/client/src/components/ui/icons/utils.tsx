import { Story, Meta } from '@storybook/react';
import { IconProps } from 'components/ui/Icon';
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
