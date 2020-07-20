pragma solidity ^0.6.8; 
// Imagine a big integer that the whole world could share
contract SimpleStorage {
    uint storedData;

    event result (uint x);

    function set(uint x) public {
        storedData = x;
    }

    function get() view public returns (uint) {
        return storedData;
    }
    
    function increment (uint n) public {
        storedData = storedData + n;
        return;
    }
    
    function decrement (uint n) public {
        storedData = storedData - n;
        return;
    }
    
    function multiply (uint n) private {
        storedData = storedData * n;
        emit result (storedData);
        return;
    }
    
}

 


