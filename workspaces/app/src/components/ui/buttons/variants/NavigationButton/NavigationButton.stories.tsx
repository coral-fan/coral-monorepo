import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavigationButton } from './NavigationButton';
import { CloseIcon } from '../../../icons';

export default {
  title: 'Coral/UI/Buttons/Navigation Button',
  component: NavigationButton,
} as ComponentMeta<typeof NavigationButton>;

const Template: ComponentStory<typeof NavigationButton> = ({ children, ...args }) => (
  <NavigationButton {...args}>{children}</NavigationButton>
);

export const Close = Template.bind({});
Close.args = {
  transparent: false,
  children: <CloseIcon />,
};
Close.parameters = {
  controls: { hideNoControlsWarning: true },
};
