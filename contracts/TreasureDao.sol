// SPDX-License-Identifier: UNLICENSED
// !! THIS FILE WAS AUTOGENERATED BY abi-to-sol v0.8.0. SEE SOURCE BELOW. !!
pragma solidity >=0.7.0 <0.9.0;
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

interface TreasureDao {
    function buyItem(
        address _nftAddress,
        uint256 _tokenId,
        address _owner,
        uint256 _quantity,
        uint256 _pricePerItem
    ) external;

    function marketplace() external view returns (address);

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) external returns (bytes4);

    function onERC1155Received(address, address, uint256, uint256, bytes memory) external returns (bytes4);

    function onERC721Received(address, address, uint256, bytes memory) external returns (bytes4);

    function supportsInterface(bytes4 interfaceId) external view returns (bool);

    function withdraw() external;

    function withdrawNFT(address _nftAddress, uint256 _tokenId, uint256 _quantity) external;
}

interface IERC721 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    function balanceOf(address owner) external view returns (uint256 balance);

    function ownerOf(uint256 tokenId) external view returns (address owner);

    function safeTransferFrom(address from, address to, uint256 tokenId) external;

    function transferFrom(address from, address to, uint256 tokenId) external;

    function approve(address to, uint256 tokenId) external;

    function getApproved(uint256 tokenId) external view returns (address operator);

    function setApprovalForAll(address operator, bool _approved) external;

    function isApprovedForAll(address owner, address operator) external view returns (bool);

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
}
