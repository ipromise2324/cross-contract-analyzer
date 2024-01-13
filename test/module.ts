import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { IERC20 } from '../typechain-types'
import * as bancorFunctions from './functions/bancor_function' // change this to the appropriate file
import { Contract } from 'ethers'
import { expect } from 'chai'

describe('CCA Detects XXX Test', async function () {
    let alice: SignerWithAddress
    let bancor: Contract
    let XBPTokenAddress: string
    let XBPToken: IERC20

    let victim = '0xfd0B4DAa7bA535741E6B5Ba28Cba24F9a816E67E'

    beforeEach(async () => {
        ;[alice] = await ethers.getSigners()
        bancor = await ethers.getContractAt('ibancor', '0x5f58058C0eC971492166763c8C22632B583F667f')

        XBPTokenAddress = '0x28dee01D53FED0Edf5f6E310BF8Ef9311513Ae40'
        XBPToken = await ethers.getContractAt('IERC20', XBPTokenAddress)
    })

    it('should block number equal to 10592516', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(10_592_516)
    })

    it('should try to find vulnerability through DFS', async function () {
        const actions = [
            // List of functions from bancor_function.ts
            //bancorFunctions.handleRestrictRegistryUpdate,
            //bancorFunctions.handleRegisterEtherToken,
            bancorFunctions.handleTransferOwnership,
            bancorFunctions.handleSafeTransferFrom,
        ]

        const found = await dfs([], 0)
        if (!found) {
            console.log('No vulnerability sequence found.')
        } else {
            console.log('Vulnerability sequence found.')
        }
        async function checkIncident(victimBalanceBefore: bigint, victimBalanceAfter: bigint) {
            if (victimBalanceAfter < victimBalanceBefore) {
                console.log("An anomaly occurred: Victim's balance has decreased")
                return true
            }
        }

        async function dfs(actionSequence: string[] = [], depth: number): Promise<boolean> {
            if (depth === actions.length) {
                return false
            }

            for (let i = depth; i < actions.length; i++) {
                // Add the current action's name to the sequence BEFORE calling it
                actionSequence.push(actions[i].name)

                const victimBalanceBefore = await XBPToken.balanceOf(victim)

                // Call the function from the bancor contract with the appropriate arguments
                let value = await XBPToken.balanceOf(victim)
                try {
                    await actions[i](bancor, XBPToken, victim, alice.address, value)
                } catch (e) {
                    // Handle or log the error as needed
                    // console.log(e);
                }

                // Get the updated balances
                const victimBalanceAfter = await XBPToken.balanceOf(victim)

                // Check for incident
                if (await checkIncident(victimBalanceBefore, victimBalanceAfter)) {
                    console.log(`Triggering action sequence: ${actionSequence.join(' -> ')}`)
                    return true
                }

                // Recursively try the next function
                const result = await dfs(actionSequence, depth + 1)
                if (result) return true

                // Remove the last action from the sequence if it didn't lead to an incident
                actionSequence.pop()
            }
            return false
        }
    })
})
