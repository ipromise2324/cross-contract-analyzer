// SPDX-License-Identifier: UNLICENSED
// !! THIS FILE WAS AUTOGENERATED BY abi-to-sol v0.8.0. SEE SOURCE BELOW. !!
pragma solidity >=0.7.0 <0.9.0;

interface IcurveYSwap {
    function exchange(int128 i, int128 j, uint256 dx, uint256 min_dy) external;

    function exchange_underlying(int128 i, int128 j, uint256 dx, uint256 min_dy) external;
}
