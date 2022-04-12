/*
  Component via https://gist.github.com/kitze/23d82bb9eb0baabfd03a6a720b1d637f
*/
import { FC, ReactElement } from 'react';

interface ConditionalWrapProps {
  children: ReactElement;
  shouldWrap: boolean;
  wrap: (children: ReactElement) => JSX.Element;
}

export const ConditionalWrap: FC<ConditionalWrapProps> = ({ shouldWrap, wrap, children }) =>
  shouldWrap ? wrap(children) : children;
