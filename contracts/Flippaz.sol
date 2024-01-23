// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

interface Flippaz {
    function bid() external payable;

    function ownerWithdrawAllTo(address toAddress) external;
}
