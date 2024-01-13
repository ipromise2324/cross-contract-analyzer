// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

interface IHarvestUsdcVault {
    function deposit(uint256 amountWei) external;

    function withdraw(uint256 numberOfShares) external;

    function balanceOf(address account) external view returns (uint256);
}
