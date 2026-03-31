import { useAuth0Lock } from '../context/Auth0LockContext';
import { User, Mail, Shield, LogOut } from 'lucide-react';

export default function UserDashboard() {
  const { user, isAuthenticated, logout } = useAuth0Lock();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">User Dashboard</h2>

      {/* User Profile Section */}
      <div className="space-y-6">
        {/* Profile Picture */}
        {user.picture && (
          <div className="text-center">
            <img
              src={user.picture}
              alt={user.name}
              className="w-24 h-24 rounded-full mx-auto border-4 border-blue-600"
            />
          </div>
        )}

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <User className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-gray-600 text-sm">Full Name</p>
              <p className="font-semibold text-gray-800">{user.name || 'Not provided'}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Mail className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="font-semibold text-gray-800">{user.email}</p>
            </div>
          </div>

          {/* Email Verified */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-gray-600 text-sm">Email Verified</p>
              <p className="font-semibold text-gray-800">
                {user.email_verified ? '✓ Yes' : '✗ No'}
              </p>
            </div>
          </div>

          {/* User ID */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 text-blue-600 font-bold">ID</div>
            <div>
              <p className="text-gray-600 text-sm">User ID</p>
              <p className="font-semibold text-gray-800 text-xs truncate">{user.sub}</p>
            </div>
          </div>
        </div>

        {/* Raw User Data */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm font-semibold text-gray-800 mb-2">Raw User Data</p>
          <pre className="text-xs text-gray-700 overflow-auto max-h-48">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}