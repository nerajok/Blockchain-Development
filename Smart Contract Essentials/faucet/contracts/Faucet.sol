// SPDX-License-Identifer: MIT

//github repository:  https://github.com/nerajok/Blockchain-Development/tree/master/Smart%20Contract%20Essentials/faucet

pragma solidity >0.5.0 <0.6.0;

contract Faucet {

    event Withdrawal(address indexed to, uint amount);
    event Deposit(address indexed from, uint amount);

    // give out ether to anyone who asks
    function withdraw(uint withdraw_amount) public {
        // check for sufficient funds
        require(address(this).balance >= withdraw_amount, "Faucet: Insufficient balance for withdrawal request");
        require(withdraw_amount<=0.1 ether,"Faucet:Greedy! Trying to withdraw more than 0.1 ether");
        msg.sender.transfer(withdraw_amount);
        emit Withdrawal(msg.sender, withdraw_amount);
    }

    function () external payable {
        emit Deposit(msg.sender, msg.value);
    }
}