/*
  Component via https://gist.github.com/kitze/23d82bb9eb0baabfd03a6a720b1d637f
*/
import { FC, ReactNode } from 'react';

type ConditionalWrapProps = {
  condition: boolean;
  wrap: (children: ReactNode) => JSX.Element;
};

export const ConditionalWrap: FC<ConditionalWrapProps> = ({ condition, wrap, children }) =>
  condition ? wrap(children) : <>{children}</>;
