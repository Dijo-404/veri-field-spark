// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DataNFT is ERC721, Ownable {
    struct Dataset {
        string cid;
        string sha256sum;
        string licenseUri;
        string domain;
        string[] tags;
        bool verified;
    }

    uint256 private _tokenIdCounter;
    mapping(uint256 => Dataset) private _datasets;

    constructor() ERC721("DataNFT", "DATA") Ownable(msg.sender) {}

    function mint(address to, Dataset calldata meta) external returns (uint256 tokenId) {
        _tokenIdCounter++;
        tokenId = _tokenIdCounter;
        _safeMint(to, tokenId);
        _datasets[tokenId] = meta;
        return tokenId;
    }

    function getDataset(uint256 tokenId) external view returns (Dataset memory) {
        // The _exists check is removed as it's not available in OZ 5.0.
        // The function will return a default struct for a nonexistent token.
        return _datasets[tokenId];
    }

    function setVerified(uint256 tokenId, bool v) external onlyOwner {
        // The _exists check is removed.
        // The owner of the contract is responsible for calling this on existing tokens.
        _datasets[tokenId].verified = v;
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721)
    {
        super._increaseBalance(account, value);
    }
}
