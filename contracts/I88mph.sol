// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

interface I88mph {
    function init(address newOwner, string memory tokenName, string memory tokenSymbol) external;

    function mint(address to, uint256 tokenId) external;

    function burn(uint256 tokenId) external;

    function owner() external view returns (address);

    function ownerOf(uint256 tokenId) external view returns (address);
}
