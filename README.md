# EthereumBlockExplorer

## Getting Started

Clone this project to pull down some basic starter code.
After that cd into the base directory of the project and run `npm install` to download all the project dependencies.

## 1. Create a unique Alchemy API key

If you have not already done so, create a unique Alchemy API Mainnet key

## 2. Add your API key to as an environment variable for the project

Create an empty `config.js` file in the base directory of this project.
Add the following line to the `config.js` file replacing `alchemyApiKey` with your api key:
const alchemyApiKey = "your API key";
export { alchemyApiKey };

## 3. Start the webserver

`npm start`

Running the command above will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The webpage will automatically reload when you make code changes.

What you'll see in the browser is Ethereum Mainnet's current block number, Gas price, Max fee per gas, Max priority fee per gas.
Also you can use search to get info about account ETH balance, information about transaction/block by their hashes.
