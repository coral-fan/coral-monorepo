import styled from '@emotion/styled';
import { Card, Heading, Button, ConditionalSpinner } from 'components/ui';
import { getDocumentReferenceClientSide } from 'libraries/firebase';
import { ReferralCampaignData, ReferralData, getEarnCode, useUserUid } from 'libraries/models';
import { getCoralAPIAxios, useModal, useObservable } from 'libraries/utils';
import { docData } from 'rxfire/firestore';
import { filter, iif, map, mergeMap, of } from 'rxjs';
import tokens from 'styles/tokens';
import { useOpenSignInModal } from 'components/app';
import { useCallback, useMemo, useState } from 'react';
import { useErrorToast, useSuccessToast } from 'libraries/utils/toasts';
import { ShareToEarnModal } from './ShareToEarnModal';

const Container = styled(Card)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
`;

interface ShareToEarnProps {
  campaignId: string;
  collectionId: string;
  collectionName: string;
}

const getReferralCampaignById$ = (campaignId: string) => () => {
  const referralCampaignDataDocRef = getDocumentReferenceClientSide<ReferralCampaignData>(
    'referral-campaigns',
    campaignId
  );
  return docData(referralCampaignDataDocRef);
};

const getDoesHaveReferralCodeByUserAndCampaignId$ =
  (userId: string | undefined, campaignId: string) => () =>
    iif(
      () => userId === undefined,
      of(undefined),
      of(userId).pipe(
        filter((userId): userId is string => userId !== undefined),
        mergeMap((userId) => {
          const referralCode = getEarnCode(userId, campaignId);
          const referralDocRef = getDocumentReferenceClientSide<ReferralData>(
            'referrals',
            referralCode
          );
          return docData(referralDocRef);
        }),
        map((referralCode) => referralCode !== undefined)
      )
    );

const coralAPI = getCoralAPIAxios();

const useGenerateReferralCode = (collectionId: string, campaignId: string) => {
  const [isGeneratingReferralCode, setIsGeneratingReferralCode] = useState(false);
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const generateReferralCode = useCallback(async () => {
    setIsGeneratingReferralCode(true);
    try {
      await coralAPI.post('generate-referral-code', { collectionId, campaignId });
      successToast('referral code successfully generated!');
    } catch (e) {
      errorToast();
      console.error(e);
    }
    setIsGeneratingReferralCode(false);
  }, [collectionId, campaignId, successToast, errorToast]);

  return { isGeneratingReferralCode, generateReferralCode };
};

export const ShareToEarn = ({ collectionId, campaignId, collectionName }: ShareToEarnProps) => {
  const userId = useUserUid();

  const getReferralCampaign$ = useMemo(() => getReferralCampaignById$(campaignId), [campaignId]);
  const referralCampaignData = useObservable(getReferralCampaign$, undefined);

  const getDoesHaveReferralCode$ = useMemo(
    () => getDoesHaveReferralCodeByUserAndCampaignId$(userId, campaignId),
    [userId, campaignId]
  );

  const doesHaveReferralCode = useObservable(getDoesHaveReferralCode$, undefined);

  const openSignInModal = useOpenSignInModal();

  const { openModal, isModalOpen, closeModal } = useModal();

  const { isGeneratingReferralCode, generateReferralCode } = useGenerateReferralCode(
    collectionId,
    campaignId
  );

  return (
    <ConditionalSpinner
      size={'60px'}
      color={tokens.background.color.brand}
      loading={referralCampaignData === undefined && doesHaveReferralCode === undefined}
      center
    >
      <Container>
        <Heading level={2} styleVariant="h2">
          Share To Earn
        </Heading>
        <Text>
          {`Generate your own referral link for ${collectionName}. Every time someone purchases an item from this collection, you earn Coral points redeemable for crypto.`}
        </Text>
        {doesHaveReferralCode && referralCampaignData && userId ? (
          <>
            {/* referralCampaignData.pointsValues will always be defined here due to loading logic of
            conditional spinner */}
            <Button
              onClick={openModal}
            >{`Share This NFT To Earn ${referralCampaignData.pointsValue} Coral Points`}</Button>
            {isModalOpen && (
              <ShareToEarnModal
                onClick={closeModal}
                pointsValue={referralCampaignData.pointsValue}
                userId={userId}
                campaignId={campaignId}
                collectionName={collectionName}
              />
            )}
          </>
        ) : (
          <Button
            onClick={userId === undefined ? openSignInModal : generateReferralCode}
            loading={isGeneratingReferralCode}
            disabled={isGeneratingReferralCode}
          >
            Opt-In To Earn Coral Points
          </Button>
        )}
      </Container>
    </ConditionalSpinner>
  );
};
