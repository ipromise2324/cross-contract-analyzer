// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

interface IBondFixedExpiryTeller {
    function redeem(address token_, uint256 amount_) external;
}
address constant OHM = 0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5;

contract FakeToken {
    function underlying() external view returns (address) {
        return OHM;
    }

    function expiry() external pure returns (uint48 _expiry) {
        return 1;
    }

    function burn(address, uint256) external {
        // no thing
    }
}
