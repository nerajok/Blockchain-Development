pragma solidity ^0.5.0;

contract newProxyContract {
    address public owner;
    uint version;
    address public delegate;  // contract to delegate calls to

    event LogResult(bytes result);

    constructor(address delegateAddress) public {
        owner = msg.sender;
        delegate = delegateAddress;
        // version = _version;
    }

    function() external {
        (bool success, bytes memory returnData) = delegate.call(msg.data);
        require(success, "external call failed");
        emit LogResult(returnData);
    }
}