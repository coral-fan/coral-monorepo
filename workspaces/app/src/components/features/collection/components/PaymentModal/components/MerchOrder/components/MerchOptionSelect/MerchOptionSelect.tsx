import { Select } from 'components/ui';
interface MerchOptionSelectProps {
  type: string;
  values: string[];
  onChange: (type: string, value: string) => void;
}

export const MerchOptionSelect = ({ type, values, onChange }: MerchOptionSelectProps) => {
  const options = values.map((value) => ({ value, label: value }));

  return <Select label={type} options={options} onChange={onChange} />;
};
