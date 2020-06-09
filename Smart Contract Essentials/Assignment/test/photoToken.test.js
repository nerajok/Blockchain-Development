const photoToken = artifacts.require('./photoToken.sol');
require('chai')
	.use(require('chai-as-promised'))
	.should()
const truffleAssert = require('truffle-assertions');

contract('photoToken',(accounts) => {
	let contract;

	before(async () => {
		contract = await photoToken.deployed();
	})

describe('deployment',async() => {
	it('deploys successfully', async () => {
		contract = await photoToken.deployed();
		const address = contract.address;
		console.log(address);
		assert.notEqual(address, '');
		assert.notEqual(address, 0x0);
		assert.notEqual(address, null);
		assert.notEqual(address, undefined);
	})

	it('has a name', async () => {
		const name = await contract.name();
		assert.equal(name, 'Photo');
	})

	it('has a symbol', async () => {
		const symbol = await contract.symbol();
		assert.equal(symbol, 'PIC');
	})
})

describe('ERC 165 compliance', async() => {
	it('Checks if Contract is ERC 165 compliant', async() => {
		const ERC165test = await contract.supportsInterface.call('0x01ffc9a7');
		assert.equal(ERC165test,true,'Contract is ERC165 compliant');
	})

})

describe('mint test', async() => {
	it('checks minting', async () => {
		const first_photo = {
			photo_id: 11111,
			name: scenary,
			size: 10,
			originality: True
		};
		const checkBalance = await contract.balanceOf.call(accounts[0]);
		assert.equal(checkBalance,0,'zero balance');
		const result = await contract.mint(first_photo);
		const totalSupply = await contract.totalSupply();

		assert.equal(totalSupply,1);
		const event = result.logs[0].args;
		assert.equal(event.tokenId.toNumber(),0,'id is correct');
		assert.equal(event.from,'0x0000000000000000000000000000000000000000','from is correct');
		assert.equal(event.to,accounts[0],'to is correct');

		await contract.mint({
			photo_id: 11111,
			name: scenary,
			originality: True
		}).should.be.rejected;
	})
})

describe('balanceOf test', async() => {
	it('checks balance', async() => {
		const balanceOf1 = await contract.balanceOf.call(accounts[0]);
		assert.equal(balanceOf1,1,'Balance has been updated');
	})
})

describe('ownerOf test', async() => {
	it('checks owner for photoId', async() => {
		const ownerOf = await contract.ownerOf.call(0);
		assert.equal(ownerOf,accounts[0],'Rightful owner');
	})
})

describe('approval test', async() => {
	it('Checks approval function',async() => {
	const approve = await contract.approve(accounts[1],0, {from: accounts[0]});
	const approvedAddress = await contract.getApproved.call(0);
	assert.equal(approvedAddress,accounts[1],'approval test success');
	})

	it('checks setApprovalForAll',async() => {
		const setApprovalForAll = await contract.setApprovalForAll(accounts[1],true);

		truffleAssert.eventEmitted(setApprovalForAll, 'ApprovalForAll test success');
	})

	it('checks getApproved', async() => {
		const getApproved = await contract.getApproved(0);

		assert.equal(getApproved,accounts[1],'getApproved test success');
	})

	it('Checks isApprovedForAll', async() => {
		const isApprovedForAll = await contract.isApprovedForAll.call(accounts[0],accounts[1]);
		assert.equal(isApprovedForAll,true,'isApprovedForAll test success');
	})
})


describe('transfer test', async() => {
	it('Checks transferFrom', async() => {

		await contract.mint({
			photo_id: 22222,
			name: "familyPic",
			size: 15,
			originality: True
		});

		await contract.transferFrom(accounts[0],accounts[1],2);

		const ownerOf = await contract.ownerOf.call(2);

		assert.equal(ownerOf,accounts[1],'Owner verified');
	})
	it('Checks safeTransferFrom', async() => {

		const ownerOf1 = await contract.ownerOf.call(0);

		assert.equal(ownerOf1,accounts[0],'Token owner verified');

		const safeTX = await contract.safeTransferFrom(accounts[0],accounts[1],0);
		
		const ownerOf2 = await contract.ownerOf.call(0);
		assert.equal(ownerOf2,accounts[1],'Token successfully transferred');
	})
	it('Checks safeTransferFrom', async() =>{

		await contract.mint({
			photo_id: 33333,
			name: "Vacation",
			size: 50,
			originality: False
		});

		const checkBalance = await contract.balanceOf.call(accounts[0]);

		assert.equal(checkBalance,1,'Balance verified');

		await contract.safeTransferFrom(accounts[0],accounts[1], 1, '0x987123');

		const ownerOf = await contract.ownerOf.call(1);

		assert.equal(ownerOf,accounts[1],'Owner verified');
	})
})

})