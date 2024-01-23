import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import * as dotenv from 'dotenv'
dotenv.config()
const eth_url = process.env.ETH_URL
const arbit_url = process.env.ARBIT_URL
const blockNumber = process.env.BLOCK_NUMBER
const config: HardhatUserConfig = {
    solidity: '0.8.20',
    networks: {
        hardhat: {
            forking: {
                url: eth_url!,
                blockNumber: parseInt(blockNumber!),
            },
        },
    },
}

export default config
