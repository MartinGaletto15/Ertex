// SPDX-License-Identifier: MIT

pragma solidity ^0.8.21;

import './ERC721Connector.sol';

contract Ertex is ERC721Connector {

    // matriz para guardar NFTs
    string[] public ErtexNFTS;

    mapping(string => bool) _ertexExists;

    function mint(string memory _ertex) public {

        require(!_ertexExists[_ertex], 'Error - token already exists');

        ErtexNFTS.push(_ertex);
        uint _id = ErtexNFTS.length - 1;
        
        _mint(msg.sender, _id);

        _ertexExists[_ertex] = true;
    }

    constructor() ERC721Connector('Ertex', 'ERTX') {}

}