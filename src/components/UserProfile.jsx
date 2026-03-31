import { useAuth0Lock } from '../context/Auth0LockContext';
import { LogOut, User, Mail } from 'lucide-react';

export default function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth0Lock();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      {/* User Info */}
      <div className="hidden md:flex items-center gap-2">
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
        )}
        <div>
          <p className="text-sm font-semibold text-gray-800">{user.name}</p>
          <p className="text-xs text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-semibold"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}