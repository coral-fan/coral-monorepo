import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsAuthenticated } from 'libraries/authentication';
import { Modal, Button, Input, Toggle, Select } from 'components/ui';

import { Form, InputsContainer, InputsContainerDouble } from './components';

import { useUpdateShippingForm } from './hooks';
import states from './states.json';

interface ShippingInfoProps {
  onClose: () => void;
}
export const ShippingInfoModal = ({ onClose }: ShippingInfoProps) => {
  const isAuthenticated = useIsAuthenticated();
  const isNetworkSupported = useIsNetworkSupported();

  const {
    register,
    setValue,
    errors,
    isValid,
    isDirty,
    // isUpdateProfileInfoSubmitting,
    handleSubmitShippingInfo,
  } = useUpdateShippingForm();

  if (!isAuthenticated || !isNetworkSupported) {
    return null;
  }

  return (
    <Modal title={'Shipping Info'} onClick={onClose} fullHeight>
      <Form onSubmit={handleSubmitShippingInfo}>
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
              options={states}
              {...register('state')}
              onChange={(value) => setValue('state', value, { shouldValidate: true })}
              error={errors?.state?.message}
            />
            <Input
              label="Zip Code"
              placeholder="Zip Code"
              {...register('postalCode')}
              error={errors?.postalCode?.message}
            />
          </InputsContainerDouble>
          <Toggle {...register('saveShippingInfo')}>Save my shipping info</Toggle>
        </InputsContainer>
        <Button
          type="submit"
          disabled={!isDirty || !isValid}
          // loading={isUpdateProfileInfoSubmitting}
        >
          Add Shipping Info
        </Button>
      </Form>
    </Modal>
  );
};
