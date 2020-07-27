pragma solidity ^0.6.2;

contract multiSigWallet{

  //Global variable declaration

  uint32 constant maxOwners = 4;
  address[] public owners;
  mapping(address=> mapping (bytes32 => bool)) approvals;
  event Received(address src, uint amount);

  //Push the msg.sender as default owner
  constructor() public {
    owners.push(msg.sender);
  }

  modifier _isOwner{
  bool check;
  for(uint i = 0; i < owners.length;i++){
    check = (owners[i] == msg.sender);
    if(check)
    break;
  }
  require(check,"Not a owner");
   _;
  }

// Add a new owner
  function addOwner(address _owner) public _isOwner{
  require(owners.length < maxOwners,"Owner limit reached");
  for(uint i = 0; i < owners.length;i++){
   require(!(owners[i] == _owner),"Owner already exists");
  }
  owners.push(_owner);
 }

// Remove a owner - Not fully tested
  function removeOwner(address _owner) public _isOwner{
  for(uint i = 0; i < owners.length;i++){
   require(!(owners[i] == _owner),"Owner not found");
   owners.pop();
  }
 }

//Get the list of owners
  function ownerList() public view returns (address[] memory) {
	return owners;
  }

//Get the Current Contract balance
  function getBalance() external view returns (uint) {
   return address(this).balance;
  }

//Commit a transaction. Must be done by all the owners to proceed to transaction
  function Commit(address _to,uint _value, bytes memory signature) public  _isOwner {
   require(_value <= address(this).balance,"Not enough balance");
   bytes32 hash = keccak256(abi.encodePacked(_to, _value));
   require(verifySign(msg.sender,hash,signature), "Invalid Signature");
   approvals[msg.sender][hash] = true;
  }

// Transact from the contract after every owner approves
  function Transact(address payable _to, uint _value) public payable  _isOwner {
      require(_value <= address(this).balance,"Not enough balance");
      bytes32 hash = keccak256(abi.encodePacked(_to, _value));
      require(consensus(hash),"Transaction not yet approved");
      _to.transfer(_value);
      reset(hash);
  }


// Makes the contract to receive ethers
  function recieve() external payable {
    emit Received(msg.sender, msg.value);
  }

// Destroy Contract -- Known bug - Any owner can destroy the contract without consensus
  function destroy() public _isOwner{
   require(owners.length == 1,"Remove other owners before destroying");
   selfdestruct(msg.sender);
  }

// verify the signature for the commit
  function verifySign(address signee,bytes32 hash,bytes memory signature) internal pure returns (bool)
  {
    bytes32 signedMessage = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    bytes32 r;
    bytes32 s;
    uint8 v;
    bool check;
    require(signature.length == 65,"Invalid Signature!");
     assembly{
      r := mload(add(signature, 32))
      s := mload(add(signature, 64))
      v := byte(0, mload(add(signature, 96)))
    }

    if(ecrecover(signedMessage, v, r, s) == signee){
      check = true;
    }
    return check;
  }

// Checks if all the owners have approved the transaction
  function consensus(bytes32 hash) internal view returns(bool){
   bool approved = true;
    for(uint i = 0; i < owners.length; i++){
     approved = approvals[owners[i]][hash];
    if(!approved){
      break;
    }
  }
     return approved;
  }

//Reset all the approvals after the transaction succeeds
  function reset(bytes32 hash) public {
    for(uint i = 0; i < owners.length; i++){
		approvals[owners[i]][hash] = false;
	}
  }

//Checks if the given account is an owner.
  function isOwner(address _owner) external view returns (bool) {
    for(uint i = 0; i < owners.length;i++){
    if (owners[i] == _owner)
     return true;
  }
    return false;
  }

}