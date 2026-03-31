import { useAuth0Lock } from '../context/Auth0LockContext';
import Auth0LoginButton from '../components/Auth0LoginButton';
import UserDashboard from '../components/UserDashboard';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { isAuthenticated } = useAuth0Lock();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to MyApp
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Secure authentication with Auth0 Lock
          </p>

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Auth0LoginButton />
              <button className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition">
                Learn More <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* User Dashboard */}
      {isAuthenticated && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <UserDashboard />
          </div>
        </section>
      )}

      {/* Features Section */}
      {!isAuthenticated && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Secure Login</h3>
                <p className="text-gray-600">Auth0 provides enterprise-grade security</p>
              </div>
              <div className="p-8 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Easy Integration</h3>
                <p className="text-gray-600">Quick setup with Auth0 Lock widget</p>
              </div>
              <div className="p-8 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Social Login</h3>
                <p className="text-gray-600">Support for Google, GitHub, and more</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}