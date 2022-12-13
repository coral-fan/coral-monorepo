import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, buttonStyle } from 'components/ui/buttons';
import { buttonBaseStyle } from 'components/ui/buttons/styles';
import { Input } from 'components/ui/inputs';
import { getCoralAPIAxios } from 'libraries/utils';
import { useErrorToast } from 'libraries/utils/toasts';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TwitterShareButton } from 'react-share';
import tokens, { QUERY } from 'styles/tokens';
import { z } from 'zod';
import { BrandColor, ContentContainer, Heading, PrimaryContainer } from '../components';

interface ShareOnTwitterProps {
  socialShareCode: string;
  defaultContent: string;
  points: number;
  campaignId: string;
  setHasVerified: (hasVerified: boolean) => void;
}

const ShareButton = styled.div`
  ${buttonBaseStyle}
  ${buttonStyle}
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShareButtonWrapper = styled.div`
  .react-share__ShareButton {
    width: 100%;

    @media ${QUERY.TABLET} {
      width: 175px;
    }
  }
`;

const ModalText = styled.div`
  font-size: ${tokens.font.size.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
  line-height: ${tokens.font.line_height.md};
`;

interface FormProps {
  inputHasError: boolean;
}
const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media ${QUERY.TABLET} {
    flex-direction: row;
    align-items: ${({ inputHasError }) => (inputHasError ? 'center' : 'end')};
  }
`;

const VerifyButton = styled(Button)`
  width: 100%;

  @media ${QUERY.TABLET} {
    width: 125px;
  }

  height: 45px;
`;

const verifyTweetSchema = z.object({
  url: z.string().url(),
});

type VerifyTweetSchema = z.infer<typeof verifyTweetSchema>;

const coralAPI = getCoralAPIAxios();

export const ShareOnTwitter = ({
  socialShareCode,
  defaultContent,
  points,
  campaignId,
  setHasVerified,
}: ShareOnTwitterProps) => {
  const postContent = useMemo(() => defaultContent.replaceAll('/n', '\n'), [defaultContent]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<VerifyTweetSchema>({ resolver: zodResolver(verifyTweetSchema), mode: 'all' });

  const [isVerifyingTweet, setIsVerifyingTweet] = useState(false);
  const errorToast = useErrorToast();

  const handleSubmitUrl = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await handleSubmit(async ({ url }) => {
        setIsVerifyingTweet(true);
        try {
          await coralAPI.post('share-to-earn/verify/tweet', { tweetUrl: url, campaignId });
          setHasVerified(true);
        } catch (e) {
          errorToast();
        }
        setIsVerifyingTweet(false);
      })(e);
    },
    [handleSubmit, setIsVerifyingTweet, campaignId, setHasVerified, errorToast]
  );
  return (
    <PrimaryContainer>
      <ContentContainer>
        <Heading>
          1. Share This On Twitter And <BrandColor>Earn {points} Coral points</BrandColor>
        </Heading>
        <ModalText>
          {`If you change the Tweet, be sure to include all urls, mentions (@), tags (#) and unique code (${socialShareCode}) from the pre-populated content to earn your
          points.`}
        </ModalText>
        <ShareButtonWrapper>
          <TwitterShareButton key={'twitter'} title={postContent} url={socialShareCode}>
            <ShareButton>Post On Twitter</ShareButton>
          </TwitterShareButton>
        </ShareButtonWrapper>
      </ContentContainer>
      <ContentContainer>
        <Heading>2. Verify your Tweet</Heading>
        <Form inputHasError={errors?.url !== undefined} onSubmit={handleSubmitUrl}>
          <Input
            label="paste the url of the tweet you just posted"
            error={errors?.url?.message}
            {...register('url')}
          />
          <VerifyButton
            loading={isVerifyingTweet}
            disabled={isVerifyingTweet || !isValid || !isDirty}
          >
            Verify
          </VerifyButton>
        </Form>
      </ContentContainer>
    </PrimaryContainer>
  );
};
