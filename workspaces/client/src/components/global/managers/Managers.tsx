import { AuthenticationManager } from './AuthenticationManager';
import { LoginManager } from './LoginManager';
import { LogoutManager } from './LogoutManager';

export const Managers = () => (
  <>
    <AuthenticationManager />
    <LoginManager />
    <LogoutManager />
  </>
);
