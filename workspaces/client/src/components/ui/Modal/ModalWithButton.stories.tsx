import { Story, Meta } from '@storybook/react';
import { Modal, ModalProps } from './Modal';

export default {
  title: 'Coral/Modals/Modal With Button',
  component: Modal,
  argTypes: {
    variant: {
      options: ['close', 'previous'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args}>Content</Modal>;

export const Default = Template.bind({});

Default.args = {
  title: 'Title',
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- okay for storybook story purposes
  onClick: () => {},
  variant: 'close',
};
