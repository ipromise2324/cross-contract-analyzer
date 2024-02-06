// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

interface SheepFram {
    function register(address neighbor) external;

    function addGems() external payable;

    function upgradeVillage(uint256 framId) external;

    function withdrawMoney(uint256 wool) external;

    function sellVillage() external;
}
