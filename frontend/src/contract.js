import { ethers } from "ethers";
import ABI from "./abi.json";

const CONTRACT_ADDRESS = "0x6d20eda5cF60481d19939C02887A49Fdb25FfDd6";

export const cauth = new ethers.Contract(CONTRACT_ADDRESS, ABI);