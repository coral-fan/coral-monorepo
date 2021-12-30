import { Story, Meta } from '@storybook/react';
import { IconProps, BaseIconProps } from './types';

const getSpaceSeparatedName = (s: string) => s.split(/(?=[A-Z])/).join(' ');

export const getIconStoryConfigurations = (
  IconComponent: React.FunctionComponent<IconProps> & { displayName: string }
) => {
  const meta = {
    title: `Coral/UI/Icons/${getSpaceSeparatedName(IconComponent.displayName)}`,
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

const Icon = ({ svg, size, alt }: BaseIconProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={svg} alt={alt} width={size} height={size} />
);

// * possible that due to the function name attribute being the same for all icon components that the stack trace becomes difficult to debug
export const getIconComponent = (componentName: string, iconSVG: string) => {
  const IconComponent = (props: IconProps) => <Icon svg={iconSVG} {...props} />;
  IconComponent.displayName = componentName;
  return IconComponent;
};
