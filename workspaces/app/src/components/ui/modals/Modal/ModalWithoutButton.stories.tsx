import { Story, Meta } from '@storybook/react';
import { Modal } from './Modal';
import { ModalProps } from './types';

export default {
  title: 'Coral/UI/Modal/Modal Without Button',
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args}>Content</Modal>;

export const Default = Template.bind({});

Default.args = {
  title: 'Title',
};
