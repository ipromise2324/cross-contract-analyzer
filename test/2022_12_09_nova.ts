import { ethers } from 'hardhat'
import { IERC20, INovaExchange, IPancakeRouter } from '../typechain-types'
import { expect } from 'chai'

const hre = require('hardhat')
describe('CCA Detects Nova Scam Test', async function () {
    let WBNB: IERC20
    let novaContract: INovaExchange
    let wbnb_nova: IPancakeRouter
    beforeEach(async () => {
        novaContract = await ethers.getContractAt('INovaExchange', '0xB5B27564D05Db32CF4F25813D35b6E6de9210941')
        WBNB = await ethers.getContractAt('IERC20', '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')
        wbnb_nova = await ethers.getContractAt('IPancakeRouter', '0x10ED43C718714eb63d5aA57B78B54704E256024E')
    })

    it('should block number equal to 23_749_678', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(23749678)
    })

    it('should find NOVA is a scam', async function () {
        let attacker = await ethers.getAddress('0xCBF184b8156e1271449CFb42A7D0556A8DCFEf72')

        await hre.network.provider.request({
            method: 'hardhat_impersonateAccount',
            params: [attacker],
        })
        const [sender] = await ethers.getSigners()
        const tx = await sender.sendTransaction({
            to: attacker,
            value: ethers.parseEther('10'),
        })

        await tx.wait()
        const impersonatedSigner = await ethers.getSigner(attacker)
        const balanceBefore = await novaContract.balanceOf(attacker)
        console.log('balanceBefore:', balanceBefore)
        let tx2 = await novaContract.connect(impersonatedSigner).rewardHolders(10000000000000000000000000000n)
        await tx2.wait()
        const balanceAfter = await novaContract.balanceOf(attacker)
        console.log('balanceAfter:', balanceAfter)
    })
})
