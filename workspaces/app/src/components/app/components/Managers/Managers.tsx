import { ConnectorActivationManager } from './ConnectorActivationManager';
import { LogoutManager } from './LogoutManager';
import { IsSigningUpStateManager } from './IsSigningUpStateManager';
import { TokenManager } from './TokenManager';
import { Web3AuthManager } from './Web3AuthManager';

export const Managers = () => (
  <>
    <Web3AuthManager />
    <ConnectorActivationManager />
    <LogoutManager />
    <IsSigningUpStateManager />
    <TokenManager />
  </>
);
