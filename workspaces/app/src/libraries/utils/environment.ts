export const isServerSide = () => typeof window === 'undefined';

export const getClientSideOnlyErrorMessage = (functionName: string) =>
  `${functionName} should only be called client-side.`;
