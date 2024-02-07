import { ethers } from 'hardhat'
import { IERC20, Seaman } from '../typechain-types'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'

describe('CCA Detects Seaman Attack Test', async function () {
    this.timeout(300000)
    let attacker: SignerWithAddress
    let seaman: Seaman
    let USDT: IERC20
    let initialDodoUSDTBalance: bigint
    let initialAttackerUSDTBalance: bigint
    const USDTTokenAddress = '0x55d398326f99059fF775485246999027B3197955'
    const dodoAddress = '0x9ad32e3054268B849b84a8dBcC7c8f7c52E4e69A'
    beforeEach(async () => {
        ;[attacker] = await ethers.getSigners()

        // Deploy the Seaman contract
        const Seaman = await ethers.getContractFactory('Seaman')
        seaman = await Seaman.deploy()

        // Get a contract instance of USDT
        USDT = await ethers.getContractAt('IERC20', USDTTokenAddress)
    })

    it('should block number equal to 23_467_515', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(23467515)
    })

    it('should observe changes in USDT balances due to the exploit', async function () {
        initialDodoUSDTBalance = await USDT.balanceOf(dodoAddress)
        initialAttackerUSDTBalance = await USDT.balanceOf(seaman.getAddress())

        // Print initial balances
        console.log('Initial Dodo USDT Balance: ', initialDodoUSDTBalance.toString())
        console.log('Initial Attacker USDT Balance: ', initialAttackerUSDTBalance.toString())

        // Execute the exploit
        await seaman.exploit()

        // Get the final USDT balances
        const finalDodoUSDTBalance = await USDT.balanceOf(dodoAddress)
        const finalAttackerUSDTBalance = await USDT.balanceOf(seaman.getAddress())

        // Print final balances
        console.log('Final Dodo USDT Balance: ', finalDodoUSDTBalance.toString())
        console.log('Final Attacker USDT Balance: ', finalAttackerUSDTBalance.toString())

        // Example assertions
        expect(finalDodoUSDTBalance).to.be.gte(initialDodoUSDTBalance, "Dodo's USDT balance should not decrease")
        expect(finalAttackerUSDTBalance).to.be.gte(
            initialAttackerUSDTBalance,
            "Attacker's USDT balance should not decrease",
        )
    })
})
