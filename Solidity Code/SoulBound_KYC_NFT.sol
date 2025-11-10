// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract SoulboundKYCNFT is ERC721, Ownable {

    struct Info {
        string profileImage;
        string name;
        uint8 age;
        string nationality;
        string phoneNumber;
        string aadharNo;
        string pancardNo;
        string bankAccountNo;
        string signatureImage;
    }

    struct MintData {
        string profileImage;
        string name;
        uint8 age;
        string nationality;
        string phoneNumber;
        string aadharNo;
        string pancardNo;
        string bankAccountNo;
        string signatureImage;
    }

    uint256 private _nextId = 1;

    mapping(uint256 => Info) private _info;
    mapping(address => uint256) private _ownerToken;

    event Minted(address indexed owner, uint256 indexed tokenId);
    event Burned(address indexed owner, uint256 indexed tokenId);

    constructor() ERC721("Know_Your_Customer_NFT", "KYCNFT") Ownable(msg.sender) {}


    function tokenOf(address owner_) public view returns (uint256) {
        return _ownerToken[owner_];
    }

    function isValid(address owner_) external view returns (bool) {
        uint256 tid = _ownerToken[owner_];
        return tid != 0 && _ownerOf(tid) == owner_;
    }

    function getInfo(uint256 tokenId) external view returns (Info memory) {
        require(_ownerOf(tokenId) != address(0), "Invalid token");
        return _info[tokenId];
    }


    function mintSoulbound(MintData calldata data) external {

        require(_ownerToken[msg.sender] == 0, "Already minted");
        require(bytes(data.name).length > 0, "Name required");
        require(bytes(data.phoneNumber).length > 0, "Phone required");
        require(bytes(data.aadharNo).length > 0, "Aadhar required");
        require(bytes(data.pancardNo).length > 0, "PAN required");

        uint256 tokenId = _nextId++;
        _ownerToken[msg.sender] = tokenId;

        _safeMint(msg.sender, tokenId);

        _info[tokenId] = Info({
            profileImage: data.profileImage,
            name: data.name,
            age: data.age,
            nationality: data.nationality,
            phoneNumber: data.phoneNumber,
            aadharNo: data.aadharNo,
            pancardNo: data.pancardNo,
            bankAccountNo: data.bankAccountNo,
            signatureImage: data.signatureImage
        });

        emit Minted(msg.sender, tokenId);
    }


    function burnSoulbound(uint256 tokenId) external {
        address ownerOfToken = ownerOf(tokenId);

        require(
            msg.sender == ownerOfToken || msg.sender == owner(),
            "Not authorized"
        );

        delete _ownerToken[ownerOfToken];
        delete _info[tokenId];

        _burn(tokenId);

        emit Burned(ownerOfToken, tokenId);
    }


    function _approve(address, uint256, address, bool) internal pure override {
        revert("Soulbound: approvals disabled");
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        virtual
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);

        if (from != address(0) && to != address(0)) {
            revert("Soulbound: non-transferable");
        }

        return super._update(to, tokenId, auth);
    }
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_ownerOf(tokenId) != address(0), "Invalid token");

    Info memory i = _info[tokenId];

    string memory json = string(
        abi.encodePacked(
            '{"name":"KYC - ', i.name,
            '","description":"Soulbound KYC NFT",',
            '"image":"ipfs://', i.profileImage, '",',
            '"attributes":[',
                '{"trait_type":"Age","value":"', Strings.toString(i.age), '"},',
                '{"trait_type":"Nationality","value":"', i.nationality, '"},',
                '{"trait_type":"Phone","value":"', i.phoneNumber, '"},',
                '{"trait_type":"Aadhar","value":"', i.aadharNo, '"},',
                '{"trait_type":"PAN","value":"', i.pancardNo, '"},',
                '{"trait_type":"Bank Account","value":"', i.bankAccountNo, '"}',
            ']}'
        )
    );

    string memory encoded = Base64.encode(bytes(json));

    return string(abi.encodePacked("data:application/json;base64,", encoded));
}

}
