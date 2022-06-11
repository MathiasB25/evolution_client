import { useContext } from "react";
import CryptoContext from "../context/CryptoProvider";

export default function useCryptoProvider() {

    return useContext(CryptoContext)
}