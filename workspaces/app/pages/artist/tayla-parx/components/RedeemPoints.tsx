import styled from '@emotion/styled';
import { Button, Modal } from 'components/ui';
import { getDocumentReferenceClientSide } from 'libraries/firebase';
import { UserPointsAccount, useUserUid } from 'libraries/models';
import { Reward } from 'libraries/models/reward';
import { getCoralAPIAxios, useModal } from 'libraries/utils';
import { useErrorToast, useSuccessToast } from 'libraries/utils/toasts';
import { useEffect, useState } from 'react';
import { docData } from 'rxfire/firestore';
import { Subscription } from 'rxjs';
import tokens, { QUERY } from 'styles/tokens';
import { useTaylaParxStore } from '../store';
import { ContentImage } from './ContentImage';
import { PillButton } from './pills';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: var(--gap);
  @media ${QUERY.TABLET} {
    --gap: 100px;
  }
`;

const RowContainer = styled.div`
  display: flex;
  --flex-direction: column;
  flex-direction: var(--flex-direction);

  --gap: 10px;
  gap: var(--gap);
  @media ${QUERY.TABLET} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap);

  @media ${QUERY.TABLET} {
    gap: var(--gap);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const Header = styled.h3`
  --font-size: ${tokens.font.size.xl};
  font-size: var(--font-size);
  font-weight: ${tokens.font.weight.bold};
  line-height: var(--font-size);

  @media ${QUERY.TABLET} {
    --font-size: ${tokens.font.size.xxl};
  }
`;

const Text = styled.p`
  --font-size: ${tokens.font.size.md};
  --line-height: ${tokens.font.line_height.md};

  font-size: var(--font-size);
  line-height: var(--line-height);

  @media ${QUERY.TABLET} {
    margin-top: 50px;
    --font-size: ${tokens.font.size.lg};
    --line-height: ${tokens.font.line_height.lg};
  }
`;

const coralAxios = getCoralAPIAxios();

export const RedeemPoints = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const userId = useUserUid();

  const [reward, setReward] = useState<Reward>();

  const [hasRedeemedReward, setHasRedeemedReward] = useState<boolean>();

  const [userPoints, setUserPoints] = useState<number>();

  const {
    metadata: { id },
  } = useTaylaParxStore();

  const rewardPath: [string, string] = ['rewards', id.redeemPointsForReward];

  useEffect(() => {
    const rewardDocRef = getDocumentReferenceClientSide<Reward>(...rewardPath);

    const subscriptions: Subscription[] = [];

    if (userId !== undefined) {
      const rewardParticipantRef = getDocumentReferenceClientSide(
        ...rewardPath,
        'participants',
        userId
      );

      subscriptions.push(
        docData(rewardParticipantRef).subscribe((rewardParticipant) =>
          setHasRedeemedReward(rewardParticipant !== undefined)
        )
      );

      const userPointsAccountsDocRef = getDocumentReferenceClientSide<UserPointsAccount>(
        'user-points-accounts',
        userId
      );

      docData(userPointsAccountsDocRef).subscribe((userPoints) =>
        setUserPoints(userPoints?.pointsBalance ?? 0)
      );
    }

    subscriptions.push(docData(rewardDocRef).subscribe(setReward));

    return () => subscriptions.forEach((subscription) => subscription.unsubscribe());
  }, [rewardPath, userId]);

  const [isRedeemingPoints, setIsRedeemingPoints] = useState(false);

  const isRedeemButtonLoading =
    (reward === undefined && hasRedeemedReward === undefined) || isRedeemingPoints;

  const doesUserHaveInsufficientPoints =
    reward !== undefined && userPoints !== undefined && reward.pointsCost > userPoints;

  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  return (
    <Container>
      <RowContainer>
        <Content>
          <Header>Merch Raffle</Header>
          <PillButton onClick={openModal}>Enter For Chance</PillButton>
          {isModalOpen && (
            <Modal title="Redeem Points To Win Merch" onClick={closeModal}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <Button
                onClick={async () => {
                  setIsRedeemingPoints(true);
                  try {
                    await coralAxios.post('/redeem-points-for-reward', { rewardId: rewardPath[1] });
                    successToast("You've successfully redeemed your points!");
                  } catch (e) {
                    console.error(e);
                    errorToast();
                  }

                  setIsRedeemingPoints(false);
                }}
                loading={isRedeemButtonLoading}
                disabled={hasRedeemedReward || doesUserHaveInsufficientPoints}
              >
                Redeem {reward?.pointsCost} Points
              </Button>
            </Modal>
          )}
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
        </Content>
        <ContentImage src="/images/tayla-parx/merch.png" />
      </RowContainer>
    </Container>
  );
};
