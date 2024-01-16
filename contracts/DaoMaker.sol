// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

interface DAOMaker {
    function init(uint256, uint256[] calldata, uint256[] calldata, address) external;

    function emergencyExit(address) external;
}
