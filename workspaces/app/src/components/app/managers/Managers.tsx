import { OpenLoginManager } from './OpenLoginManager';
import { ConnectorActivationManager } from './ConnectorActivationManager';
import { LogoutManager } from './LogoutManager';
import { IsSigningUpStateManager } from './IsSigningUpStateManager';
import { TokenManager } from './TokenManager';

export const Managers = () => (
  <>
    <OpenLoginManager />
    <ConnectorActivationManager />
    <LogoutManager />
    <IsSigningUpStateManager />
    <TokenManager />
  </>
);
