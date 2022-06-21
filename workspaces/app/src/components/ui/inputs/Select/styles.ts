import { StylesConfig } from 'react-select';
import tokens from 'styles/tokens';
import { OptionType } from './types';

export const dropdownStyles: StylesConfig<OptionType, false> = {
  container: (provided) => ({
    ...provided,
    flexGrow: 1,
  }),
  control: (provided, { isFocused }) => ({
    ...provided,
    background: `${tokens.background.color.primary}`,
    borderColor: isFocused ? `${tokens.border.color.brand}` : `transparent`,
    boxShadow: `transparent`,
    borderRadius: `${tokens.border.radius.sm}`,
    '&:hover': {
      border: `1px solid ${tokens.border.color.secondary}`,
      boxShadow: `transparent`,
    },
    height: '45px',
    fontSize: `${tokens.font.size.sm}`,
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
