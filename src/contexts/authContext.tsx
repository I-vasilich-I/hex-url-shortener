import  { useState, createContext, ReactNode } from "react";

interface IAuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
}

interface IProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContextProps>({
  token: null,
  setToken: () => {},
});

export const AuthContextProvider = ({ children }: IProps) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{
      token,
      setToken,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
