import { createContext } from "react";
import { Claim } from "./Auth.Model";

const AuthenticationContext = createContext<{

  claims: Claim[]
  
  update(claims: Claim[]): void 

}>({claims: [], update: () => {}})

export default AuthenticationContext