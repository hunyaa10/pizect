import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    // 팝업창으로 로그인
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        navigate("main");
      })
      .catch((error) => console.log("로그인 실패: ", error));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserData(null);
        navigate("/");
      })
      .catch((error) => console.log("로그아웃 실패 :", error));
  };

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setUserData(user);
    });
    return unSubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ userData, handleGoogleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
