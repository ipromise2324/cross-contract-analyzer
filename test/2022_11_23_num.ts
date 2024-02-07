import { ethers } from 'hardhat'
import { IERC20, NUM } from '../typechain-types'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'

describe('CCA Detects Sheep Fram Attack Test', async function () {
    let attacker: SignerWithAddress
    let NUM: IERC20
    let USDC: IERC20
    let WETH: IERC20
    let victim: string
    let NUMBalance: bigint
    let exploitContract: NUM
    beforeEach(async () => {
        ;[attacker] = await ethers.getSigners()
        // Deploy the exploit contract
        const ExploitContract = await ethers.getContractFactory('NUM')
        exploitContract = await ExploitContract.deploy()
        NUM = await ethers.getContractAt('IERC20', '0x3496B523e5C00a4b4150D6721320CdDb234c3079')
        USDC = await ethers.getContractAt('IERC20', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48')
        WETH = await ethers.getContractAt('IERC20', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
        victim = await ethers.getAddress('0x78AC2624a2Cd193E8dEfE9F39A9528e8bd4a368c')
    })

    it('should block number equal to 16029969', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(16029969)
    })

    it('should observe account changes due to the exploit', async function () {
        // Balance before exploit
        const victimBalanceBefore = await NUM.balanceOf(victim)
        const attackerBalanceBefore = await USDC.balanceOf(exploitContract.getAddress())

        console.log(`Victim NUM Balance Before: ${victimBalanceBefore}`)
        console.log(`Attacker USDC Balance Before: ${attackerBalanceBefore}`)

        // Execute the exploit
        await exploitContract.exploit()

        // Balance after exploit
        const victimBalanceAfter = await NUM.balanceOf(victim)
        const attackerBalanceAfter = await USDC.balanceOf(exploitContract.getAddress())

        console.log(`Victim NUM Balance After: ${victimBalanceAfter}`)
        console.log(`Attacker USDC Balance After: ${attackerBalanceAfter}`)

        // Example assertions (adjust according to expected outcomes)
        expect(victimBalanceAfter).to.be.below(victimBalanceBefore, "Victim's NUM balance should decrease")
        expect(attackerBalanceAfter).to.be.above(attackerBalanceBefore, "Attacker's USDC balance should increase")
    })
})
