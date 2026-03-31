import { useAuth0Lock } from '../context/Auth0LockContext';
import { LogIn, Loader } from 'lucide-react';

export default function Auth0LoginButton() {
  const { showLock, loading, isAuthenticated } = useAuth0Lock();

  if (isAuthenticated) {
    return null; // Hide if already authenticated
  }

  return (
    <button
      id="login"
      onClick={showLock}
      disabled={loading}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition font-semibold"
    >
      {loading ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <LogIn className="w-4 h-4" />
          Login with Auth0
        </>
      )}
    </button>
  );
}