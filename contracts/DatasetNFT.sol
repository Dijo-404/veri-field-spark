// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DatasetNFT is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Dataset {
        string title;
        string description;
        string cid; // IPFS Content Identifier
        string sha256Hash;
        string domain;
        uint256 price;
        address creator;
        bool verified;
        uint256 downloads;
        string license;
    }

    mapping(uint256 => Dataset) public datasets;
    mapping(string => bool) public cidExists;
    mapping(string => bool) public hashExists;
    
    uint256 public platformFee = 250; // 2.5% in basis points
    address public platformWallet;

    event DatasetMinted(
        uint256 indexed tokenId,
        address indexed creator,
        string cid,
        string sha256Hash,
        uint256 price
    );

    event DatasetPurchased(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed creator,
        uint256 price
    );

    event DatasetVerified(uint256 indexed tokenId);

    constructor(address _platformWallet) ERC721("VeriField Dataset", "VFD") {
        platformWallet = _platformWallet;
    }

    function mintDataset(
        string memory title,
        string memory description,
        string memory cid,
        string memory sha256Hash,
        string memory domain,
        uint256 price,
        string memory license,
        string memory tokenURI
    ) public returns (uint256) {
        require(!cidExists[cid], "Dataset with this CID already exists");
        require(!hashExists[sha256Hash], "Dataset with this hash already exists");
        require(bytes(cid).length > 0, "CID cannot be empty");
        require(bytes(sha256Hash).length == 64, "Invalid SHA-256 hash");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        datasets[tokenId] = Dataset({
            title: title,
            description: description,
            cid: cid,
            sha256Hash: sha256Hash,
            domain: domain,
            price: price,
            creator: msg.sender,
            verified: false,
            downloads: 0,
            license: license
        });

        cidExists[cid] = true;
        hashExists[sha256Hash] = true;

        emit DatasetMinted(tokenId, msg.sender, cid, sha256Hash, price);
        return tokenId;
    }

    function purchaseDataset(uint256 tokenId) public payable nonReentrant {
        require(_exists(tokenId), "Dataset does not exist");
        Dataset storage dataset = datasets[tokenId];
        require(msg.value >= dataset.price, "Insufficient payment");
        require(dataset.creator != msg.sender, "Cannot purchase your own dataset");

        uint256 platformFeeAmount = (msg.value * platformFee) / 10000;
        uint256 creatorAmount = msg.value - platformFeeAmount;

        // Transfer platform fee
        payable(platformWallet).transfer(platformFeeAmount);
        
        // Transfer creator payment
        payable(dataset.creator).transfer(creatorAmount);

        // Increment download counter
        dataset.downloads++;

        emit DatasetPurchased(tokenId, msg.sender, dataset.creator, msg.value);
    }

    function verifyDataset(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "Dataset does not exist");
        datasets[tokenId].verified = true;
        emit DatasetVerified(tokenId);
    }

    function getDataset(uint256 tokenId) public view returns (Dataset memory) {
        require(_exists(tokenId), "Dataset does not exist");
        return datasets[tokenId];
    }

    function getAllDatasets() public view returns (Dataset[] memory, uint256[] memory) {
        uint256 totalSupply = _tokenIdCounter.current();
        Dataset[] memory allDatasets = new Dataset[](totalSupply);
        uint256[] memory tokenIds = new uint256[](totalSupply);

        for (uint256 i = 0; i < totalSupply; i++) {
            if (_exists(i)) {
                allDatasets[i] = datasets[i];
                tokenIds[i] = i;
            }
        }

        return (allDatasets, tokenIds);
    }

    function setPlatformFee(uint256 _platformFee) public onlyOwner {
        require(_platformFee <= 1000, "Platform fee cannot exceed 10%");
        platformFee = _platformFee;
    }

    function setPlatformWallet(address _platformWallet) public onlyOwner {
        platformWallet = _platformWallet;
    }

    // Override required functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}