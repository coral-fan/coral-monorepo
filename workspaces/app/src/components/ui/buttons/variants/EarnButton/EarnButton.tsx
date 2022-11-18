import styled from '@emotion/styled';
import { EarnModal } from 'components/ui';
import { useUserUid } from 'libraries/models';
import { useState } from 'react';
import { CtaButton } from '../CtaButton';

const EarnButtonWrapper = styled(CtaButton)`
  padding: 20px;
`;

interface EarnButtonProps {
  campaignId: string;
}

export const EarnButton = ({ campaignId }: EarnButtonProps) => {
  const [showEarnModal, setShowEarnModal] = useState(false);

  const uid = useUserUid();

  return (
    <>
      {uid && showEarnModal && (
        <EarnModal
          closeEarnModal={() => setShowEarnModal(false)}
          campaignId={campaignId}
          uid={uid}
        ></EarnModal>
      )}
      <EarnButtonWrapper disabled={!uid} onClick={() => setShowEarnModal(true)}>
        Earn Now
      </EarnButtonWrapper>
    </>
  );
};
