import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { NowSwapAttack, IERC20 } from '../typechain-types'
import { expect } from 'chai'

describe('CCA Detects DaoMaker Attack Test', async function () {
    let owner: SignerWithAddress
    let ownerAddress: string
    let nbu: IERC20
    let AttackContract: NowSwapAttack

    beforeEach(async () => {
        owner = (await ethers.getSigners())[0]
        ownerAddress = await owner.getAddress()
        const Attack = await ethers.getContractFactory('NowSwapAttack')
        AttackContract = await Attack.deploy()
        nbu = await ethers.getContractAt('IERC20', '0xEB58343b36C7528F23CAAe63a150240241310049')
    })

    it('should block number equal to 13225516', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(13225516)
    })

    it('should execute the attack', async function () {
        const balanceBefore = await nbu.balanceOf(AttackContract.getAddress())
        console.log('Before exploiting', await nbu.balanceOf(AttackContract.getAddress()))

        await AttackContract.attack()

        const balanceAfter = await nbu.balanceOf(AttackContract.getAddress())
        console.log('After exploiting', await nbu.balanceOf(AttackContract.getAddress()))

        expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })
})
