import { OpenLoginManager } from './OpenLoginManager';
import { ConnectorActivationManager } from './ConnectorActivationManager';
import { LogoutManager } from './LogoutManager';
import { IsSigningUpStateManager } from './IsSigningUpStateManager';

export const Managers = () => (
  <>
    <OpenLoginManager />
    <ConnectorActivationManager />
    <LogoutManager />
    <IsSigningUpStateManager />
  </>
);
