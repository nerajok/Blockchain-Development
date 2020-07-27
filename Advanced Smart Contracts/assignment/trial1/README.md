## AdvancedSmartContractFinalAssignment
Neraj Obla Kumarbabu
101275194
## Overview
 This is a multisignature wallet tha requires approval from all the owners to make a transaction.

## Description
The contract ensures that every owner has signed and authorized a transaction before it is made. The number of owners ranges from 0 to 4. It involves the functionality to add and remove the owners.  

## Sending the ethers
Sending the ethers requires approval from all the owners. Once the owner commits to a transaction, their approval flag will be changed to true. After every owner commits and the transaction is processed, the approval flag is turned back to false. 

## Gas optimization/ Effieciency
The smart contract has been optimized as much as possible right from variable declaration to consideration of number of "require" statements to be used. Necessary loops had to be used in order to cycle through different owners in various cases. Every loop has been checked that they terminate and never run infinitely. Since signature generation process has been moved off-chain, this contract requires gas only for verification and transaction.

## Security 
Contract functionalities have been checked for vulnerabilities. "require" conditions are used as much as possible to ensure right conditions are met without spending too much gas. While consensus has been designed for transactions, they are not designed for contract ownership which might call for a heirarchy of owners according to their authority or power level. For example, who has the authority to remove a peer owner. This is beyond the scope of this project and hence ommited. However, a condition which requires all the other owners to be removed before destroying the smart contract has been implemented.

## Additional notes:
1.A javascript program has been included for off-chain signature generation. Reference: https://medium.com/@angellopozo/ethereum-signing-and-validating-13a2d7cb0ee3

2.One of the tests probably the last will be failing which is a self destruct functionality test. It will be ending up in error due to the contract being no longer accessible which actually means the contract was destroyed and the test is a success. 

## Steps for interaction:
1.Deploy the contract with some ethers.
2.Add owner(s).
3.Enter the payee address, ethers to be sent and signature for commiting the transaction.
4.Change owners and repeat the commitment process.
5.Enter the payee address and ethers to be sent and hit the Transact function.
6.Remove all the owners before destroying the contract. 








