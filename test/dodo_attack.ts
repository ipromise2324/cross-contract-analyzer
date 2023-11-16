// import {
//   time,
//   loadFixture,
// } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
// import { expect } from "chai";
// import { ethers, network } from "hardhat";
// import { Address, Attack, IERC20 } from "../typechain-types";
// import { Signer } from "ethers";
// import { HardhatEthersSigner, SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
// import { token } from "../typechain-types/@openzeppelin/contracts";

// describe("dodo attack", async function () {
//   let attackContract: Attack;
//   let owner:SignerWithAddress;
//   let WCRES: IERC20;
//   let USDT: IERC20;
//   const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
//   const wcresAddress = "0xa0afAA285Ce85974c3C881256cB7F225e3A1178a";
//   const dvmAddress = "0x051EBD717311350f1684f89335bed4ABd083a2b6";
//   beforeEach(async () => {
//     [owner] = await ethers.getSigners();
//     WCRES = await ethers.getContractAt('IERC20',wcresAddress);
//     USDT = await ethers.getContractAt('IERC20',usdtAddress);
//   });
//   it("should block number equal to 6499198", async function () {
//     // console.log(await WCRES.getAddress());
//     // console.log(await USDT.getAddress());
//     const blockNumber = await ethers.provider.getBlockNumber();
//     expect(blockNumber).to.equal(6499198);
//   });
// });
