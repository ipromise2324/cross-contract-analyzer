import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { NimbusAttack, IERC20 } from '../typechain-types'
import { expect } from 'chai'

describe('CCA Detects DaoMaker Attack Test', async function () {
    let owner: SignerWithAddress
    let ownerAddress: string
    let usdt: IERC20
    let AttackContract: NimbusAttack

    beforeEach(async () => {
        owner = (await ethers.getSigners())[0]
        ownerAddress = await owner.getAddress()
        const Attack = await ethers.getContractFactory('NimbusAttack')
        AttackContract = await Attack.deploy()
        usdt = await ethers.getContractAt('IERC20', '0xdAC17F958D2ee523a2206206994597C13D831ec7')
    })

    it('should block number equal to 13225516', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(13225516)
    })

    it('should execute the attack', async function () {
        const balanceBefore = await usdt.balanceOf(AttackContract.getAddress())
        console.log('Before exploiting', await usdt.balanceOf(AttackContract.getAddress()))

        await AttackContract.attack()

        const balanceAfter = await usdt.balanceOf(AttackContract.getAddress())
        console.log('After exploiting', await usdt.balanceOf(AttackContract.getAddress()))

        expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })
})
