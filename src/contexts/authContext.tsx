import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { IUser, verifyToken } from "../services/authService";

interface IAuthContextType {
  user: IUser | null | undefined;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | undefined | null>(undefined);

  const _verifyToken = async() => {
    try {
       const response = await verifyToken();
       if (response.success) {
         const _user = response.data as IUser
         setUser(_user)
       }else{
        setUser(null)
       }
     } catch (err) {
         console.error(err)
     }
 }

  useEffect(() => {
    _verifyToken()
  }, []);


  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
