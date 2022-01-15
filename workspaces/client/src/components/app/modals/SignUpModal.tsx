import styled from '@emotion/styled';
import { Modal, Button, Toggle } from 'components/ui';
import { Input } from 'components/ui/Input';

import { useIsSigningUp } from 'libraries/authentication/hooks';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 24px;
  align-items: center;
`;

const LegalAgreementContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: fit-content;
`;

const LegalAgreementCopy = styled.div`
  font-size: 14px;
`;

export const SignUpModal = () => {
  const [isSigningUp] = useIsSigningUp();

  if (!isSigningUp) {
    return null;
  }

  return (
    <Modal title="Sign up">
      <Content>
        <Input label="Pick a display name" placeholder="Enter a name" />
        <Input label="Pick a username" placeholder="username" />
        <Input label="Email address" placeholder="example@email.com" />
        <LegalAgreementContainer>
          <Toggle />
          <LegalAgreementCopy>
            <div>
              I agree to Coral&apos;s <u>privacy policy</u>
            </div>
            <div>
              and <u>terms &amp; conditions</u>
            </div>
          </LegalAgreementCopy>
        </LegalAgreementContainer>
        <Button disabled={true}>Create Account</Button>
      </Content>
    </Modal>
  );
};
