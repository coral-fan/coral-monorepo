import { Story, Meta } from '@storybook/react';
import { ExperienceDetailsProp, ExperienceDetails } from './ExperienceDetails';

export default {
  title: 'Coral/Asset/Experience Details',
  component: ExperienceDetails,
} as Meta;

// eslint-disable-next-line jsx-a11y/alt-text
const Template: Story<ExperienceDetailsProp> = ({ ...args }) => <ExperienceDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  details: [
    'A personal call between just you and Bonobo',
    'Available any time before March 1st, 2022',
    "Accessible by Zoom after you've torn the ticket",
  ],
};
