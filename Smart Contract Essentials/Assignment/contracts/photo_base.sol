
// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "./ERC721.sol";

contract photoToken is ERC721 {

	struct Photo
	{
        uint photo_id;
        string name;
        uint size;
        bool originality;
	}

	Photo[] public photos;

    mapping(address => uint) etherBalance;

	mapping(uint => bool) _photoExists;

	constructor () ERC721("Photo","PIC") public {
	}

//Mints a token for the caller.
	function mint(Photo memory _photo) public {
		require(_photoExists[_photo.photo_id] == false, "photo_id already exists");
		photos.push(_photo);
		_photoExists[_photo.photo_id] = true;
		_mint(msg.sender, _photo.photo_id);
	}

    function ownerof(uint256 tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    function balanceof(address owner) public view returns (uint256) {
        return balanceOf(owner);
    }

//A function that can set value for the unique item in a standardized way. So far limited to a single token.
	function look_up(Photo memory _photo) public pure returns(uint) {
        uint value = 0;
        if (_photo.size >= 0 && _photo.size <= 10) {value = 50;}
        else if (_photo.size > 10 && _photo.size <= 20) {value = 100;}
        else if (_photo.size > 20 ) {value = 200;}
        else value = 0;
        if (_photo.originality == true) {value = value * 2;}
        return value;
    }

//This function should be called by the buyer.
    function exchange(Photo memory _photo,uint _amount) public payable returns(bool){
        uint requiredValue = look_up(_photo);
        require(_amount==requiredValue,"Incorrect value sent");
        address photoOwner = ownerOf(_photo.photo_id);
        etherBalance[photoOwner] += _amount;
        etherBalance[photoOwner] -= _amount;
        _transfer(photoOwner,msg.sender,_photo.photo_id);
        return true;
    }

}