import { useContext } from "react";
import { AuthContext } from "src/contexts/authContext";

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;