import styled from '@emotion/styled';
import { Heading } from 'components/ui';
import { MerchOptionType, MERCH_OPTIONS } from 'libraries/models';
import Select, { ActionMeta, SingleValue, StylesConfig } from 'react-select';
import tokens from 'styles/tokens';
import { MerchOption } from '../../MerchOrder';

interface MerchOptionSelectProps {
  type: MerchOptionType;
  onChange: (type: string, value: string) => void;
}

type OptionType = {
  value: string;
  label: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// const getMerchOption = (type: string | undefined, value: string | undefined) => {
//   if (type === undefined || value === undefined) {
//     throw new Error(`type ${type} or value ${value} can't be undefined`);
//   }
//   //
//   return { type, value } as unknown as MerchOption;
// };

const dropdownStyles: StylesConfig<OptionType, false> = {
  container: (provided) => ({
    ...provided,
    flexGrow: 1,
  }),
  control: (provided, { isFocused }) => ({
    ...provided,
    background: 'transparent',
    borderColor: `${tokens.border.color.brand}`,
    boxShadow: isFocused ? `${tokens.border.color.brand}` : `none`,
    borderRadius: `${tokens.border.radius.sm}`,
    '&:hover': {
      border: `1px solid ${tokens.border.color.brand}`,
      boxShadow: `${tokens.border.color.brand}`,
    },
    minHeight: '24px',
  }),
  menu: (provided) => ({
    ...provided,
    background: `${tokens.background.color.primary}`,
    color: `${tokens.font.color.primary}`,
    borderRadius: `${tokens.border.radius.sm}`,
  }),
  menuList: (provided) => ({
    ...provided,
    borderRadius: `${tokens.border.radius.sm}`,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: `${tokens.font.color.primary}`,
  }),
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isSelected
      ? `${tokens.background.color.brand}`
      : isFocused
      ? `${tokens.background.color.tertiary}`
      : undefined,
    color: isSelected ? `${tokens.font.color.contrast}` : `${tokens.font.color.primary}`,
    opacity: isFocused ? 0.85 : 1,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: `${tokens.font.color.primary}`,
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

export const MerchOptionSelect = ({ type, onChange }: MerchOptionSelectProps) => {
  const merchOptions = MERCH_OPTIONS[type];
  const options = merchOptions.map((merchOption) => ({ value: merchOption, label: merchOption }));

  const onChangeHandler = (option: SingleValue<OptionType>, action: ActionMeta<OptionType>) => {
    if (action.name === undefined || option === undefined || option === null) {
      throw 'Error: option undefined';
    }
    return onChange(action.name, option.value);
  };

  return (
    <Container>
      <Heading styleVariant="h4" level={2}>
        {type}
      </Heading>
      <Select
        name={type}
        options={options}
        menuPortalTarget={document.body}
        styles={dropdownStyles}
        onChange={onChangeHandler}
      />
    </Container>
  );
};
