import { Select } from 'components/ui';
import { MerchOptionType, MERCH_OPTIONS } from 'libraries/models';

interface MerchOptionSelectProps {
  type: MerchOptionType;
  onChange: (type: string, value: string) => void;
}

export const MerchOptionSelect = ({ type, onChange }: MerchOptionSelectProps) => {
  const merchOptions = MERCH_OPTIONS[type];
  const options = merchOptions.map((merchOption) => ({ value: merchOption, label: merchOption }));

  return <Select label={type} options={options} onChange={onChange} />;
};
