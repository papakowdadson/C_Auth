import { ethers } from "ethers";
import ABI from "./abi.json";

const CONTRACT_ADDRESS = "0xcAe96f23E325e7E32eDF4caDFeA849030322a7e2";

export const cauth = new ethers.Contract(CONTRACT_ADDRESS, ABI);