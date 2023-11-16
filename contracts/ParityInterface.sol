// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

interface parity {
    function isOwner(address _addr) external view returns (bool);

    function kill(address _to) external;

    function initWallet(
        address[] memory _owners,
        uint256 _required,
        uint256 _daylimit
    ) external;
}
