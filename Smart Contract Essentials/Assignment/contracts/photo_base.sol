
// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "./ERC721.sol";

contract photoToken is ERC721 {

	struct Photo
	{
        string photo_id;
        uint size;
        bool originality;
	}

	Photo[] public photos;

	mapping(string => bool) _photoExists;

	constructor () ERC721("Photo","PIC") public {
	}

	function mint(Photo memory _photo) public {
		require(_photoExists[_photo.photo_id] == false, "photo_id already exists");
		photos.push(_photo);
		uint _id = photos.length - 1;
		_photoExists[_photo.photo_id] = true;
		_mint(msg.sender, _id);
	}

	function look_up(Photo memory _photo) public pure returns(uint) {
        uint value = 0;
        if (_photo.size >= 0 && _photo.size <= 10) {value = 50;}
        else if (_photo.size > 10 && _photo.size <= 20) {value = 100;}
        else if (_photo.size > 20 ) {value = 200;}
        else value = 0;
        if (_photo.originality == true) {value = value * 2;}
        return value;
    }

    function exchange(Photo memory _photo,uint _amount) public payable returns(bool){
        uint requiredValue = look_up(_photo);
        require(_amount==requiredValue,"Incorrect value sent");
        
    }

}