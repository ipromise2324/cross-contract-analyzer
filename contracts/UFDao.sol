// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './UniRouterV2.sol';

interface SHOP {
    function buyPublicOffer(address _dao, uint256 _lpAmount) external;
}

interface IUFT is IERC20 {
    function burn(
        uint256 _amount,
        address[] memory _tokens,
        address[] memory _adapters,
        address[] memory _pools
    ) external;
}
