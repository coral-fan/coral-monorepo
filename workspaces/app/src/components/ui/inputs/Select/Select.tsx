import { OptionType } from './types';
import SelectComponent, { ActionMeta, SingleValue } from 'react-select';
import { dropdownStyles } from './styles';
import { Container, Label } from '../components';

interface SelectProps {
  label: string;
  options: OptionType[];
  onChange: (option: string, action: string) => void;
}

export const Select = ({ label, options, onChange }: SelectProps) => {
  const onChangeHandler = (option: SingleValue<OptionType>, action: ActionMeta<OptionType>) => {
    if (action.name === undefined || option === undefined || option === null) {
      throw 'Error: option undefined';
    }
    return onChange(action.name, option.value);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <SelectComponent
        name={label}
        options={options}
        menuPortalTarget={document.body}
        styles={dropdownStyles}
        onChange={onChangeHandler}
      />
    </Container>
  );
};
