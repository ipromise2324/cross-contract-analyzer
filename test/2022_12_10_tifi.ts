import { ethers } from 'hardhat'
import { expect } from 'chai'
import { Tifi, IERC20 } from '../typechain-types'

describe('Tifi Exploit Test', function () {
    let tifi: Tifi // Use the correct type for your contract
    let wbnb: IERC20 // Assuming you have a WBNB contract interface
    let initialWBNBBalance: bigint
    let finalWBNBBalance: bigint

    before(async function () {
        this.timeout(150000)
        // Deploy the WBNB mock contract
        wbnb = await ethers.getContractAt('IERC20', '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')

        // Deploy other necessary contracts and set up the environment
        // This could include deploying UniRouterV2, TIFIFinance, etc., and initializing them as needed

        // Deploy the Tifi contract
        const TifiContract = await ethers.getContractFactory('Tifi')
        tifi = await TifiContract.deploy()

        // Initial setup, such as providing the Tifi contract with initial funds or tokens if necessary
        // You might need to simulate some environment setup here, depending on your contract's needs

        // Get initial WBNB balance
        initialWBNBBalance = await wbnb.balanceOf(tifi.getAddress())
        //console.log(`Initial WBNB Balance: ${initialWBNBBalance.toString()}`)
    })

    it('should block number equal to 23778726', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(23778726)
    })

    it('Should execute exploit and check WBNB balance change', async function () {
        // Execute exploit
        await tifi.testExploit()

        // Get final WBNB balance
        finalWBNBBalance = await wbnb.balanceOf(tifi.getAddress())

        // Output the balance before and after the exploit
        console.log(`Initial WBNB Balance: ${initialWBNBBalance.toString()}`)
        console.log(`Final WBNB Balance: ${finalWBNBBalance.toString()}`)

        // Example assertion (adapt as needed)
        expect(finalWBNBBalance).to.be.above(initialWBNBBalance)
    })

    // Additional tests or cleanup can go here
})
