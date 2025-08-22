// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./DataNFT.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Marketplace {
    address public immutable dataNFTAddress;
    mapping(uint256 => uint256) public prices;

    event Purchased(uint256 indexed tokenId, address indexed buyer, uint256 amount);

    constructor(address _dataNFTAddress) {
        dataNFTAddress = _dataNFTAddress;
    }

    function setPrice(uint256 tokenId, uint256 price) external {
        IERC721 dataNFT = IERC721(dataNFTAddress);
        require(dataNFT.ownerOf(tokenId) == msg.sender, "Marketplace: Not the owner");
        prices[tokenId] = price;
    }

    function buy(uint256 tokenId) external payable {
        uint256 price = prices[tokenId];
        require(price > 0, "Marketplace: Token not for sale");
        require(msg.value == price, "Marketplace: Incorrect price");

        address owner = IERC721(dataNFTAddress).ownerOf(tokenId);

        // Transfer payment to the owner
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Marketplace: Payment transfer failed");

        // Transfer the NFT to the buyer
        IERC721(dataNFTAddress).safeTransferFrom(owner, msg.sender, tokenId);

        // Remove the price after purchase
        prices[tokenId] = 0;

        emit Purchased(tokenId, msg.sender, msg.value);
    }

    function getPrice(uint256 tokenId) external view returns (uint256) {
        return prices[tokenId];
    }
}
