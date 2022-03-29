import faker from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { Option } from 'react-select/src/filters';

import { optionsFromStrings } from '../components/ResultsTable/ResultsTableBody/util';
import CustomSelect from '../components/Searchbar/CustomSelect';

export default {
  title: 'Components/Mobile Select',
  component: CustomSelect,
  parameters: {},
} as ComponentMeta<typeof CustomSelect>;

const SingleTemplate: ComponentStory<typeof CustomSelect> = (args) => {
  const [selected, setSelected] = useState<Array<string>>([]);

  const mergedArgs = {
    ...args,
    value: optionsFromStrings(selected),
    setter: (_, val) => {
      setSelected(val);
    },
  };
  return <CustomSelect {...mergedArgs} />;
};

const mockMember = () => ({
  name: faker.name.jobTitle(),
  count: faker.datatype.number(20000),
});
const mockMemberList = () => Array.from(Array(1000), mockMember);

export const Single = SingleTemplate.bind({});
Single.args = {
  id: 'Orchestra',
  label: 'Orchestra',
  selectOptions: mockMemberList(),
};
