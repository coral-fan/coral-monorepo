import { Story, Meta } from '@storybook/react';
import { IconProps, Icon } from 'components/ui/Icon';

const getSpaceSeparatedName = (s: string) => s.split(/(?=[A-Z])/).join(' ');

export const getIconStoryConfigurations = (
  IconComponent: React.FunctionComponent<IconProps> & { displayName: string }
) => {
  const meta = {
    title: `Coral/Icons/${getSpaceSeparatedName(IconComponent.displayName)}`,
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
  const IconComponent = (props: IconProps) => <Icon svg={iconSVG} {...props} />;
  IconComponent.displayName = componentName;
  return IconComponent;
};
