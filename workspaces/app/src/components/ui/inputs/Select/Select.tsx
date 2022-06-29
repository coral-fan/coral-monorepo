import { OptionType } from './types';
import SelectComponent, { ActionMeta, SingleValue } from 'react-select';
import { dropdownStyles } from './styles';
import { Container, Label, Error } from '../components';
import { forwardRef } from 'react';

interface SelectProps {
  label: string;
  options: OptionType[];
  onChange: (option: string, action: string) => void;
  error?: string;
}

// TODO: Figure out this type
export const Select = forwardRef<any, SelectProps>(function Select(
  { label, options, onChange, error }: SelectProps,
  ref
) {
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
        ref={ref}
        name={label}
        options={options}
        menuPortalTarget={document.body}
        styles={dropdownStyles}
        onChange={onChangeHandler}
        menuPlacement="auto"
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
});
