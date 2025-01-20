import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { getTokenFromLocalStorage } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (getTokenFromLocalStorage()) {
      navigate("/profile");
    }
  }, []);

  const toggleAuthMode = () => setIsSignIn((prev) => !prev);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <motion.div
        key={isSignIn ? "signin" : "signup"}  
        initial={{ opacity: 0, x: isSignIn ? 100 : -100, scale: 0.9 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          x: isSignIn ? -100 : 100,  
          scale: 0.9,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="w-full max-w-md"
      >
        {isSignIn ? (
          <SignIn toggleAuthMode={toggleAuthMode} />
        ) : (
          <SignUp toggleAuthMode={toggleAuthMode} />
        )}
      </motion.div>
    </div>
  );
};
