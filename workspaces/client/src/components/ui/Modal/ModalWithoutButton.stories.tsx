import { Story, Meta } from '@storybook/react';
import { Modal, ModalProps } from './Modal';

export default {
  title: 'Coral/Modals/Modal Without Button',
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args}>Content</Modal>;

export const Default = Template.bind({});

Default.args = {
  title: 'Title',
};
