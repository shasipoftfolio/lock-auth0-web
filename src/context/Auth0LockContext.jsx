import { createContext, useContext, useEffect, useState } from 'react';
import { Auth0Lock }  from 'auth0-lock';

const Auth0LockContext = createContext();

export function useAuth0Lock() {
  return useContext(Auth0LockContext);
}

export function Auth0LockProvider({ children }) {
  const [lock, setLock] = useState(null);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize Auth0 Lock
  useEffect(() => {
    try {
      const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
      const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

      if (!auth0Domain || !auth0ClientId) {
        console.error('Auth0 credentials not found in environment variables');
        setError('Auth0 configuration missing');
        return;
      }

      // Create Lock instance
      const lockInstance = new Auth0Lock(auth0ClientId, auth0Domain, {
        // Configuration options
        auth: {
          params: {
            scope: 'openid profile email',
          },
          redirect: false,
        allowedConnections: ['Username-Password-Authentication', 'google-oauth2'],
        prompt:'none'
      }});

      // Handle authenticated event
      lockInstance.on('authenticated', (authResult) => {
        console.log('Authenticated:', authResult);
        setLoading(true);
        setError(null);

        try {
          // Get user info
          lockInstance.getUserInfo(authResult.accessToken, (err, profile) => {
            if (err) {
              console.error('Error getting user profile:', err);
              setError('Failed to get user profile');
              setLoading(false);
              return;
            }

            // Store user data
            setUser(profile);
            setAccessToken(authResult.accessToken);
            setIsAuthenticated(true);

            // Store in localStorage for persistence
            localStorage.setItem('auth0_access_token', authResult.accessToken);
            localStorage.setItem('auth0_user_profile', JSON.stringify(profile));
            localStorage.setItem(
              'auth0_expires_at',
              new Date().getTime() + authResult.expiresIn * 1000
            );

            console.log('User profile:', profile);
            setLoading(false);

            // Hide the lock widget
            lockInstance.hide();
          });
        } catch (err) {
          console.error('Authentication error:', err);
          setError(err.message);
          setLoading(false);
        }
      });

      // Handle errors
      lockInstance.on('unrecoverable_error', (error) => {
        console.error('Unrecoverable error:', error);
        setError('An unrecoverable error occurred');
      });

      lockInstance.on('authorization_error', (error) => {
        console.error('Authorization error:', error);
        setError(error.error_description || 'Authorization failed');
      });

      lockInstance.on('hide', () => {
        console.log('Lock widget hidden');
      });

      setLock(lockInstance);
    } catch (err) {
      console.error('Lock initialization error:', err);
      setError('Failed to initialize authentication');
    }
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth0_access_token');
    const storedProfile = localStorage.getItem('auth0_user_profile');
    const expiresAt = localStorage.getItem('auth0_expires_at');

    if (storedToken && storedProfile && expiresAt) {
      const expiresAtTime = new Date(expiresAt).getTime();
      if (expiresAtTime > Date.now()) {
        setAccessToken(storedToken);
        setUser(JSON.parse(storedProfile));
        setIsAuthenticated(true);
        console.log('Restored session from storage');
      } else {
        // Token expired, clear storage
        localStorage.removeItem('auth0_access_token');
        localStorage.removeItem('auth0_user_profile');
        localStorage.removeItem('auth0_expires_at');
      }
    }
  }, []);

  // Function to show lock widget
  const showLock = () => {
    if (lock) {
      lock.show();
    }
  };

  // Function to hide lock widget
  const hideLock = () => {
    if (lock) {
      lock.hide();
    }
  };

  // Function to logout
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth0_access_token');
    localStorage.removeItem('auth0_user_profile');
    localStorage.removeItem('auth0_expires_at');

    if (lock) {
      lock.logout();
    }
  };

  const value = {
    lock,
    user,
    accessToken,
    loading,
    error,
    isAuthenticated,
    showLock,
    hideLock,
    logout,
  };

  return (
    <Auth0LockContext.Provider value={value}>
      {children}
    </Auth0LockContext.Provider>
  );
}