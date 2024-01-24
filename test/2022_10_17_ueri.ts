import { ethers } from 'hardhat'
import { expect } from 'chai'
import { IERC20, UeriAttack } from '../typechain-types'

describe('AttackContract Test', function () {
    this.timeout(150000)
    let attackerContract: UeriAttack
    let WETH_TOKEN: IERC20
    let deployerSigner: any

    before(async function () {
        // 获取部署者的签名者对象
        ;[deployerSigner] = await ethers.getSigners()

        // 部署攻击者合约
        const AttackerContract = await ethers.getContractFactory('UeriAttack')
        attackerContract = await AttackerContract.deploy()
    })

    it('should block number equal to 15767837', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(15767837)
    })

    it('Should perform the attack', async function () {
        // 获取攻击者合约的 WETH 余额
        WETH_TOKEN = await ethers.getContractAt('IERC20', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')

        const balanceBeforeAttack = await WETH_TOKEN.balanceOf(attackerContract.getAddress())
        console.log('Attacker WETH balance before attack:', ethers.formatEther(balanceBeforeAttack))

        // 执行攻击
        const tx = await attackerContract.connect(deployerSigner).attack()
        await tx.wait()

        const balanceAfterAttack = await WETH_TOKEN.balanceOf(attackerContract.getAddress())
        console.log('Attacker WETH balance after attack:', ethers.formatEther(balanceAfterAttack))

        // 检查攻击后余额是否增加（此行可选，视您的测试需求而定）
        expect(balanceAfterAttack).to.be.gt(balanceBeforeAttack)
    })
})
