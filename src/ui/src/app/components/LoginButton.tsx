import React from "react";
import { signIn } from "next-auth/react";

// Define the type for the props
interface LoginButtonProps {
  className?: string; // Optional className prop for custom styling
}

const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
  const handleLoginClick = async () => {
    try {
      // Use your auth provider here. Default is "credentials", or specify "azure-ad" or any provider you use.
      await signIn("azure-ad"); // Change "azure-ad" to your actual provider name if it's different
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
 
    <div className="flex items-center gap-2">
  <span className="text-gray-400 font-semibold" style={{ letterSpacing: '1.5px' }}>Sign In</span>

    <button
      className={`transition-transform duration-200 ease-in-out focus:outline-none flex flex-col items-center gap-1 ${className}`}
      onClick={handleLoginClick}
      style={{ border: "none", background: "transparent" }}
    >
      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-400 hover:bg-blue-500 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-10 w-10 p-1.5 text-white stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          ></path>
        </svg>
      </div>
    </button>
  </div>
  );
};

export default LoginButton;
