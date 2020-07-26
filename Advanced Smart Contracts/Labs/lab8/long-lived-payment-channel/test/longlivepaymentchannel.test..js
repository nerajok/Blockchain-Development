const LongLivedPaymentChannel = artifacts.require("LongLivedPaymentChannel");

contract(
  "Recipient should be able to withdraw amount and then close",
  (accounts) => {
    // declare all global variables here
    let contractInstance;
    let contractAddress;
    const skey =
      "dec072ad7e4cf54d8bce9ce5b0d7e95ce8473a35f6ce65ab414faea436a2ee86"; // private key
    web3.eth.accounts.wallet.add(`0x${skey}`);
    const masterAccount = accounts[0];
    const sender = web3.eth.accounts.wallet[0].address;
    const senderSkey = web3.eth.accounts.wallet[0].privateKey;
    const recipient = accounts[1];
    const closeDuration = 200;
    const depositAmount = web3.utils.toWei("2", "ether");

    // sender can open the channel (deploy contract and deposit funds)
    before(async () => {
      await web3.eth.sendTransaction({
        from: masterAccount,
        to: sender,
        value: web3.utils.toWei("5", "ether"),
        gas: 21000,
      });

      contractInstance = new web3.eth.Contract(LongLivedPaymentChannel.abi);

      const gas = await contractInstance
        .deploy({
          data: LongLivedPaymentChannel.bytecode,
          from: sender,
          value: depositAmount,
          arguments: [recipient, closeDuration],
        })
        .estimateGas();

      longLivedPaymentChannelTx = await contractInstance
        .deploy({
          data: LongLivedPaymentChannel.bytecode,
          arguments: [recipient, closeDuration],
        })
        .send({
          from: sender,
          gas,
          value: depositAmount,
        });

      contractAddress = longLivedPaymentChannelTx.options.address;

      const actualSender = await longLivedPaymentChannelTx.methods.sender().call({
        from: recipient,
      });
      const actualRecipient = await longLivedPaymentChannelTx.methods.recipient().call({
        from: accounts[2]
      });
      const actualCloseDuration = await longLivedPaymentChannelTx.methods.closeDuration().call({
        from: accounts[2]
      })
      const actualDepositedAmount = await web3.eth.getBalance(contractAddress);

      // assertions
      assert.equal(actualSender, sender, "Sender is not as expected");
      assert.equal(
        actualDepositedAmount,
        depositAmount,
        "The deposited amount is as expected"
      );
      assert.equal(
        actualRecipient,
        recipient,
        "The recipient is as expected"
      );
      assert.equal(actualCloseDuration, closeDuration, "closeDuration is not as expected")

    });

    it("the recipient should be able to withdraw from the channel", async () => {
      const withdrawAmount = web3.utils.toWei("2", "ether");
      const contractBalanceBefore = await web3.eth.getBalance(contractAddress);
      const recipientBalanceBefore = await web3.eth.getBalance(recipient);

      const msg = web3.utils.soliditySha3(
        { t: "address", v: contractAddress },
        { t: "uint256", v: withdrawAmount }
      );

      const signedMsg = await web3.eth.accounts.sign(msg, senderSkey);

      const withdrawTransaction = await longLivedPaymentChannelTx.methods
        .withdraw(withdrawAmount, signedMsg.signature)
        .send({ from: recipient });

      const recipientBalanceAfter = await web3.eth.getBalance(recipient);
      const contractBalanceAfter = await web3.eth.getBalance(contractAddress);

      const tx = await web3.eth.getTransaction(withdrawTransaction.transactionHash);

      const transactionFee = web3.utils
        .toBN(tx.gasPrice)
        .mul(web3.utils.toBN(withdrawTransaction.gasUsed));

      const recipientBalanceExpected = web3.utils
        .toBN(recipientBalanceBefore)
        .add(web3.utils.toBN(withdrawAmount))
        .sub(web3.utils.toBN(transactionFee));

      const contractBalanceExpected = web3.utils
        .toBN(contractBalanceBefore)
        .sub(web3.utils.toBN(withdrawAmount));

      assert.equal(recipientBalanceExpected, recipientBalanceAfter, "recipient balance mismatch");
      assert.equal(contractBalanceExpected, contractBalanceAfter, "contract balance mismatch");
    });

    it("Recipient should able to close the payment channel", async () => {
      await web3.eth.sendTransaction({
        from: masterAccount,
        to: sender,
        value: web3.utils.toWei("5", "ether"),
        gas: 21000,
      });
      contractInstance = new web3.eth.Contract(LongLivedPaymentChannel.abi);

      const gas = await contractInstance
        .deploy({
          data: LongLivedPaymentChannel.bytecode,
          from: sender,
          value: depositAmount,
          arguments: [recipient, closeDuration],
        })
        .estimateGas();

      const longLivedPaymentChannelTx = await contractInstance
        .deploy({
          data: LongLivedPaymentChannel.bytecode,
          arguments: [recipient, closeDuration],
        })
        .send({
          from: sender,
          gas,
          value: depositAmount,
        });
      contractAddress = longLivedPaymentChannelTx.options.address;

      const senderBalanceBefore = await web3.eth.getBalance(sender);

      const amount = web3.utils.toWei("1", "ether");
      const msg = web3.utils.soliditySha3(
        { t: "address", v: contractAddress },
        { t: "uint256", v: amount }
      );

      const sign = await web3.eth.accounts.sign(msg, senderSkey);
      const Signature = sign.signature;

      const recipientBalanceBefore = await web3.eth.getBalance(recipient);

      const closeTransaction = await longLivedPaymentChannelTx.methods
        .close(amount, Signature)
        .send({ from: recipient });

      const recipientBalanceAfter = await web3.eth.getBalance(recipient);
      const senderBalanceAfter = await web3.eth.getBalance(sender);

      const tx = await web3.eth.getTransaction(closeTransaction.transactionHash);

      const transactionFee = web3.utils
        .toBN(tx.gasPrice)
        .mul(web3.utils.toBN(closeTransaction.gasUsed));

      const senderBalanceExpected = web3.utils
        .toBN(senderBalanceBefore)
        .add(web3.utils.toBN(web3.utils.toWei("1", "ether")));

      const recipientBalanceExpected = web3.utils
        .toBN(recipientBalanceBefore)
        .add(web3.utils.toBN(amount))
        .sub(web3.utils.toBN(transactionFee));

      assert.equal(senderBalanceExpected,senderBalanceAfter,"sender balance mismatch");
      assert.equal(recipientBalanceExpected,recipientBalanceAfter,"recipient balance mismatch");
    });
  }
);