import styled from '@emotion/styled';
import { CtaButton, DropTimer } from 'components/ui';
import { getMilliSecsDiff, getTimeRemaining$ } from 'libraries/time';
import { useObservable } from 'libraries/utils';
import { useCallback, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { AvailableContainer } from '../components';
import { Price, PriceProp } from '../Price';
import { ProgressBar, ProgressBarProps } from '../ProgressBar';

interface DropOrAvailableProps extends ProgressBarProps, PriceProp {
  dropDate: string;
}

const handleBuyButtonClick = () => {
  console.log('Bought');
};

const TRANSITION_NAME = 'fade';

const FadeContainer = styled.div`
  &.${TRANSITION_NAME}-enter {
    opacity: 0;
  }
  &.${TRANSITION_NAME}-enter-active, &.${TRANSITION_NAME}-exit {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  &.${TRANSITION_NAME}-exit-active {
    opacity: 0;
    transition: opacity 750ms ease-in-out;
    transition-delay: 100ms;
  }
`;

export const DropOrAvailable = ({
  priceUsd,
  maxMintable,
  numMinted,
  dropDate,
}: DropOrAvailableProps) => {
  /*
    SwitchTransition implementation from:
    https://stackoverflow.com/questions/64126226/how-do-i-get-switchtranition-to-work-with-csstransition-with-typescript
  */
  const nodeRef = useRef<any>(null);

  const getMilliSecondsRemaining = useCallback(
    () => getTimeRemaining$(dropDate, (milliSecsDiff) => milliSecsDiff),
    [dropDate]
  );

  const millisecondsRemaining = useObservable(getMilliSecondsRemaining, getMilliSecsDiff(dropDate));

  /*
    Cast boolean as strings because SwitchTransitions requires a string key
    
    Set threshold to 1 second because millisecond imprecision means value may not hit 0
    before bigTimer$ observable completes.
  */
  const isAvailable = millisecondsRemaining > 0 ? 'false' : 'true';

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={isAvailable}
        nodeRef={nodeRef}
        addEndListener={(done: () => void) => {
          nodeRef.current?.addEventListener('transitionend', done, false);
        }}
        classNames={TRANSITION_NAME}
      >
        <FadeContainer ref={nodeRef}>
          {isAvailable === 'true' ? (
            <AvailableContainer>
              <Price priceUsd={priceUsd} />
              <CtaButton onClick={handleBuyButtonClick}>Buy Now</CtaButton>
              <ProgressBar maxMintable={maxMintable} numMinted={numMinted} />
            </AvailableContainer>
          ) : (
            <DropTimer tokenSupply={maxMintable} timestamp={dropDate} />
          )}
        </FadeContainer>
      </CSSTransition>
    </SwitchTransition>
  );
};
