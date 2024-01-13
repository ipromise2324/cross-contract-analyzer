import { ethers, network } from 'hardhat'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { IERC20, IHarvestUsdcVault, IUniswapV2Pair, IcurveYSwap } from '../typechain-types'
import { Contract } from 'ethers'
import { expect } from 'chai'

describe('CCA Detects Harvest Attack Test', async function () {
    let alice: SignerWithAddress

    let usdcPair: IUniswapV2Pair
    let usdtPair: IUniswapV2Pair
    let curveYSwap: IcurveYSwap
    let harvest: IHarvestUsdcVault
    let usdt: IERC20
    let usdc: IERC20
    let yusdt: IERC20
    let yusdc: IERC20
    let fusdt: IERC20
    let fusdc: IERC20

    const usdcLoan = 50_000_000 * 10 ** 6
    const usdcRepayment = (usdcLoan * 100_301) / 100_000
    const usdtLoan = 17_300_000 * 10 ** 6
    const usdtRepayment = (usdtLoan * 100_301) / 100_000

    beforeEach(async () => {
        ;[alice] = await ethers.getSigners()
        usdcPair = await ethers.getContractAt('IUniswapV2Pair', '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc')
        usdtPair = await ethers.getContractAt('IUniswapV2Pair', '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852')

        curveYSwap = await ethers.getContractAt('IcurveYSwap', '0x45F783CCE6B7FF23B2ab2D70e416cdb7D6055f51')

        harvest = await ethers.getContractAt('IHarvestUsdcVault', '0xf0358e8c3CD5Fa238a29301d0bEa3D63A17bEdBE')

        usdt = await ethers.getContractAt('IERC20', '0xdAC17F958D2ee523a2206206994597C13D831ec7')
        usdc = await ethers.getContractAt('IERC20', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48')

        yusdt = await ethers.getContractAt('IERC20', '0x83f798e925BcD4017Eb265844FDDAbb448f1707D')
        yusdc = await ethers.getContractAt('IERC20', '0xd6aD7a6750A7593E092a9B218d66C0A814a3436e')

        fusdt = await ethers.getContractAt('IERC20', '0x053c80eA73Dc6941F518a68E2FC52Ac45BDE7c9C')
        fusdc = await ethers.getContractAt('IERC20', '0xf0358e8c3CD5Fa238a29301d0bEa3D63A17bEdBE')
    })

    it('should block number equal to 11_129_473', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(11_129_473)
    })

    it('Exploit Test', async function () {
        const [deployer] = await ethers.getSigners()
        // Approvals
        await usdt.connect(deployer).approve(curveYSwap.getAddress(), ethers.MaxUint256)
        await usdc.connect(deployer).approve(curveYSwap.getAddress(), ethers.MaxUint256)
        await usdc.connect(deployer).approve(harvest.getAddress(), ethers.MaxUint256)
        await usdt.connect(deployer).approve(usdtPair.getAddress(), ethers.MaxUint256)
        await usdc.connect(deployer).approve(usdcPair.getAddress(), ethers.MaxUint256)

        // Log balances before exploitation
        let usdcBalanceBefore = await usdc.balanceOf(deployer.address)
        let usdtBalanceBefore = await usdt.balanceOf(deployer.address)
        console.log('Before exploitation, USDC balance of attacker:', usdcBalanceBefore.toString())
        console.log('Before exploitation, USDT balance of attacker:', usdtBalanceBefore.toString())

        // Perform swaps and other actions similar to Foundry test

        // Log balances after exploitation
        let usdcBalanceAfter = await usdc.balanceOf(deployer.address)
        let usdtBalanceAfter = await usdt.balanceOf(deployer.address)
        console.log('After exploitation, USDC balance of attacker:', usdcBalanceAfter.toString())
        console.log('After exploitation, USDT balance of attacker:', usdtBalanceAfter.toString())
    })
})
