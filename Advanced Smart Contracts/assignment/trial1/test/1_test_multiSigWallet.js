const multiSigWallet = artifacts.require('multiSigWallet')

contract("multiSigWallet", accounts => {
   let wallet

   before(() => {
      return multiSigWallet.deployed().then(instance => {
            wallet = instance
      })
   })
   
    it("should be able to send value to contract", async () => {
          await wallet.recieve({value: web3.utils.toWei('10', 'ether')})
          let walletBalance= await wallet.getBalance()
         assert.equal("10000000000000000000", walletBalance,"Contract successfully recieved ethers")    
     })

     it("should be able to get balance of the contract", async () => {
      let walletBalance= await wallet.getBalance()
     assert.equal("10000000000000000000", walletBalance,"Contract balance checked")    
      })
    
     it("should be able to add new Owner to  contract", async () => {
      await wallet.addOwner(accounts[1])
      let res= await wallet.isOwner(accounts[1])
      assert.equal(true,res, "Owner Successfully added")
     })

     it("should be able to remove Owner from contract", async () => {
      await wallet.removeOwner(accounts[1])
      let res= await wallet.isOwner(accounts[1])
      assert.equal(false,res, "Owner Successfully removed")
     })

     it("should be able to safely destroy the contract", async () => {
      await wallet.destroy()
      let expected = Error;
      let res= await wallet.isOwner(accounts[1])
      assert.throws(res,expected)
     })

  
})