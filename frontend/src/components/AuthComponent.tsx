import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AuthComponent = () => {
  const { pathname } = useLocation();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const isSignIn = pathname.includes('sign-in');

  useEffect(() => {
    if (isLoaded && user) {
      // Save user data to localStorage
      const userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        primaryEmailAddress: user.primaryEmailAddress?.emailAddress,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt,
        lastSignInAt: user.lastSignInAt,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      navigate('/portfolio');
    }
  }, [user, isLoaded, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      {isSignIn ? (
        <SignIn 
          routing="path"
          path="/sign-in"
          redirectUrl="/portfolio"
          afterSignInUrl="/portfolio"
          appearance={{
            elements: {
              rootBox: "w-full max-w-md",
              card: "shadow-xl rounded-xl",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-gray-500",
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 w-full",
              socialButtonsBlockButton: "w-full font-bold text-lg px-6 py-3 rounded-lg",
              socialButtonsProviderIcon: "mr-3",
            }
          }}
        />
      ) : (
        <SignUp 
          routing="path"
          path="/sign-up"
          redirectUrl="/portfolio"
          afterSignUpUrl="/portfolio"
          appearance={{
            elements: {
              rootBox: "w-full max-w-md",
              card: "shadow-xl rounded-xl",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-gray-500",
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 w-full",
              socialButtonsBlockButton: "w-full font-bold text-lg px-6 py-3 rounded-lg",
              socialButtonsProviderIcon: "mr-3",
            }
          }}
        />
      )}
    </div>
  );
};

export default AuthComponent; 