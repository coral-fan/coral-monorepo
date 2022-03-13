import { ConnectorActivationManager } from './ConnectorActivationManager';
import { LogoutManager } from './LogoutManager';
import { IsSigningUpStateManager } from './IsSigningUpStateManager';
import { TokenManager } from './TokenManager';

export const Managers = () => (
  <>
    <ConnectorActivationManager />
    <LogoutManager />
    <IsSigningUpStateManager />
    <TokenManager />
  </>
);
