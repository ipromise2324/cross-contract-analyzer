import { expect } from 'chai'
import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'

describe('Parity Kill Test', async function () {
    let alice: SignerWithAddress
    beforeEach(async () => {
        [alice] = await ethers.getSigners()
    })
    it('should block number equal to 4501735', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(4501735)
    })

    it('should accidentally kill it', async function () {
        const WalletLibrary = await ethers.getContractAt('parity', '0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4')
        const walletLibraryAddress = await WalletLibrary.getAddress()
        expect(walletLibraryAddress).to.equal('0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4')

        const isOwnerBefore = await WalletLibrary.isOwner(alice.address)
        // Before initWallet, the owner should not be the alice
        expect(isOwnerBefore).to.be.false

        // Init wallet with alice as the owner
        const ownerArray = [alice.address]
        await WalletLibrary.initWallet(ownerArray, 0, 0)

        const isOwnerAfter = await WalletLibrary.isOwner(alice.address)
        // After initWallet, the owner should be the alice
        expect(isOwnerAfter).to.be.true

        // Kill the wallet (selfdestruct)
        await WalletLibrary.kill(alice.address)

        // After kill, the code of the wallet library should be 0x -> I accidentally killed it!!!
        const code = await ethers.provider.getCode(walletLibraryAddress)
        expect(code).to.equal('0x')
    })
})
