import { Modal, Button, Input, Toggle, Select } from 'components/ui';
import { Form, InputsContainer, InputsContainerDouble } from './components';
import { useUpdateShippingForm } from './hooks';
import { SetStateAction } from 'react';
import { STATES } from 'libraries/models';

const STATE_OPTIONS = STATES.map((state) => ({ value: state, label: state }));

interface ShippingInfoProps {
  onClose: () => void;
  handleAddShippingInfo: React.Dispatch<SetStateAction<string | null>>;
}
export const ShippingInfoModal = ({ onClose, handleAddShippingInfo }: ShippingInfoProps) => {
  const { register, setValue, errors, isValid, isDirty, isSubmitting, handleSubmitShippingInfo } =
    useUpdateShippingForm(handleAddShippingInfo);

  return (
    <Modal title={'Shipping Info'} onClick={onClose} fullHeight>
      <Form
        onSubmit={async (e) => {
          await handleSubmitShippingInfo(e);
          onClose();
        }}
      >
        <InputsContainer>
          <Input
            label="First Name"
            placeholder="First Name"
            {...register('firstName')}
            error={errors?.firstName?.message}
          />
          <Input
            label="Last Name"
            placeholder="Last Name"
            {...register('lastName')}
            error={errors?.lastName?.message}
          />
          <Input
            label="Address - Line 1"
            placeholder="Address - Line 1"
            {...register('addressLineOne')}
            error={errors?.addressLineOne?.message}
          />
          <Input
            label="Address - Line 2"
            placeholder="Address - Line 2"
            {...register('addressLineTwo')}
            error={errors?.addressLineTwo?.message}
          />
          <Input
            label="City"
            placeholder="City"
            {...register('city')}
            error={errors?.city?.message}
          />
          <InputsContainerDouble>
            <Select
              label="State"
              options={STATE_OPTIONS}
              {...register('state')}
              onChange={(_A, action) => {
                setValue('state', action, { shouldValidate: true });
              }}
              error={errors?.state?.message}
            />
            <Input
              label="Zip Code"
              placeholder="Zip Code"
              {...register('zipCode')}
              error={errors?.zipCode?.message}
            />
          </InputsContainerDouble>
          <Toggle {...register('saveShippingInfo')}>Save my shipping info</Toggle>
        </InputsContainer>
        <Button
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
          loading={isSubmitting}
        >
          Add Shipping Info
        </Button>
      </Form>
    </Modal>
  );
};
