const { assert } = require('chai');

const Ertex = artifacts.require('Ertex');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('Ertex', (accounts) => {
    let contract;

    before(async () => {
        contract = await Ertex.deployed();
    });

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = contract.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it('has a name', async () => {
            const name = await contract.name();
            assert.equal(name, 'Ertex');
        });

        it('has a symbol', async () => {
            const symbol = await contract.symbol();
            assert.equal(symbol, 'ERTX');
        });
    });

    describe('minting', async () => {
        it('creates a new token', async () => {
            const result = await contract.mint('https...1');
            const totalSupply = await contract.totalSupply();

            // Éxito
            assert.equal(totalSupply, 1);
            const event = result.logs[0].args;
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is the contract');
            assert.equal(event.to, accounts[0], 'to is msg.sender');
            
            
            await contract.mint('https...1').should.be.rejected;
        });
    });

    describe('indexing', async () => {
        it('lists nfts successfully', async () => {
            
            await contract.mint('https...2');
            await contract.mint('https...3');
            await contract.mint('https...4');
            const totalSupply = await contract.totalSupply();

            let result = [];
            let nft;
            
            for (let i = 0; i < totalSupply; i++) {
                nft = await contract.ErtexNFTS(i);
                result.push(nft);
            }
        });
    });
});