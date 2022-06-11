import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export default function useAuthProvider() {

    return useContext(AuthContext)
}