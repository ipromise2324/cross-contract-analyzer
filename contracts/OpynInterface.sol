// SPDX-License-Identifier: UNLICENSED
// !! THIS FILE WAS AUTOGENERATED BY abi-to-sol v0.8.0. SEE SOURCE BELOW. !!
pragma solidity >=0.7.0 <0.9.0;

interface OpynInterface {
    function addERC20CollateralOption(uint256 amtToCreate, uint256 amtCollateral, address receiver) external;

    function exercise(uint256 oTokensToExercise, address payable[] memory vaultsToExerciseFrom) external payable;

    function removeUnderlying() external;

    function hasVault(address owner) external view returns (bool);
}