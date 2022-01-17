import { OpenLoginManager } from './OpenLoginManager';
import { ConnectorActivationManager } from './ConnectorActivationManager';
import { LogoutManager } from './LogoutManager';

export const Managers = () => (
  <>
    <OpenLoginManager />
    <ConnectorActivationManager />
    <LogoutManager />
  </>
);
