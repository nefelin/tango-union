import { ComponentMeta, ComponentStory } from '@storybook/react';
import React  from 'react';

import MobileNavbar from '../components/MobileNavbar';

export default {
  title: 'Components/Mobile Navbar',
  component: MobileNavbar,
  parameters: {},
} as ComponentMeta<typeof MobileNavbar>;

const Template: ComponentStory<typeof MobileNavbar> = (args) => {
  return <MobileNavbar current='search' onNav={() => {}} />;
};

export const Basic = Template.bind({});
Basic.args = {};
