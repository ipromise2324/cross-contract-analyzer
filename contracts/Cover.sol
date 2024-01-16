// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

interface Blacksmith {
    function claimRewardsForPools(address[] calldata _lpTokens) external;

    function claimRewards(address _lpToken) external;

    function deposit(address _lpToken, uint256 _amount) external;

    function withdraw(address _lpToken, uint256 _amount) external;
}
