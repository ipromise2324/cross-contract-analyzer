import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/IlMIxZNyXEJCCpEp32QhrDX6OhGFHrBo",
        blockNumber: 4501735 
      }
    }
  }
};

export default config;