import { SignUp } from '@clerk/clerk-react';

const ClerkSignUpPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <SignUp 
        routing="path" 
        path="/sign-up" 
        redirectUrl="/portfolio"
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "shadow-xl rounded-xl",
            headerTitle: "text-2xl font-bold",
            headerSubtitle: "text-gray-500",
            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 w-full",
            socialButtonsBlockButton: "w-full",
          }
        }}
      />
    </div>
  );
};

export default ClerkSignUpPage;