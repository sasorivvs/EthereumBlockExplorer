import { ethers } from "./node_modules/ethers/dist/ethers.min.js";
import { alchemyApiKey } from "./config.js";



const provider = new ethers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
);

async function getLatestBlockNumber() {
  const blockNumber = await provider.getBlockNumber();
  return blockNumber;
}

async function getGasPrice() {
  const feeData = await provider.getFeeData();
  return feeData;
}

async function displayBlockNumber() {
  const blockNumber = await getLatestBlockNumber();
  const blockNumberElement = document.getElementById("blockNumber");
  blockNumberElement.textContent = `Latest Block Number: ${blockNumber}`;
}

async function displayGasPrice() {
  const feeData = await getGasPrice();
  const gasPriceWei = feeData.gasPrice;
  const maxFeePerGasWei = feeData.maxFeePerGas;
  const maxPriorityFeePerGasWei = feeData.maxPriorityFeePerGas;

  const gasPrice = gasPriceWei / BigInt(Math.pow(10, 9));
  const gasPriceElement = document.getElementById("gasPrice");
  gasPriceElement.textContent = `Gas price: ${gasPrice} gwei`;

  const maxFeePerGas = maxFeePerGasWei / BigInt(Math.pow(10, 9));
  const maxFeePerGasElement = document.getElementById("maxFeePerGas");
  maxFeePerGasElement.textContent = `Max fee per gas: ${maxFeePerGas} gwei`;

  const maxPriorityFeePerGas =
    maxPriorityFeePerGasWei / BigInt(Math.pow(10, 9));
  const maxPriorityFeePerGasElement = document.getElementById(
    "maxPriorityFeePerGas"
  );
  maxPriorityFeePerGasElement.textContent = `Max priority fee per gas: ${maxPriorityFeePerGas} wei`;
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", performSearch);

async function performSearch() {
  const searchInput = document.getElementById("searchInput").value.trim();

  // Reset displayed data before populating new search result
  resetDisplayedData();

  if (searchInput) {
    // Search for transaction by hash
    if (searchInput.length === 66 && searchInput.startsWith("0x")) {
      const transaction = await provider.getTransaction(searchInput);
      if (transaction) {
        displayTransactionInfo(transaction);
        return;
      }
      const block = await provider.getBlockB(searchInput);
      if (block) {
        displayBlockInfo(block);
        return;
      }
    }
    if (searchInput.length === 42 && searchInput.startsWith("0x")) {
      const balance = await provider.getBalance(searchInput);
      displayAccountBalance(balance, searchInput);
      return;
    }
  }

  // If no results found or input is empty, reset the displayed data
  resetDisplayedData();
}

// Function to display transaction information
function displayTransactionInfo(transaction) {
  const transactionResult = document.getElementById("transactionResult");
  transactionResult.style.display = "block"; // Make the result div element visible
  transactionResult.innerHTML = `
    <h2>Transaction Details</h2>
    <p>Hash: ${transaction.hash}</p>
    <p>From: ${transaction.from}</p>
    <p>To:   ${transaction.to}</p>
    <p>Value:${ethers.formatEther(transaction.value)} ETH</p>
    <p>Block Number: ${transaction.blockNumber}</p>
    <!-- Other transaction details -->
  `;
}

// Function to display block information
function displayBlockInfo(block) {
  const blockResult = document.getElementById("blockResult");
  blockResult.style.display = "block"; // Make the result div element visible
  blockResult.innerHTML = `
    <h2>Block Details</h2>
    <p>Block Number: ${block.number}</p>
    <p>Gas used: ${ethers.formatEther(block.gasUsed)} ETH</p>
    <p>Block Hash: ${block.hash}<p>
    <!-- Other block details -->
  `;
}

// Function to display account balance
function displayAccountBalance(balance, address) {
  const balanceResult = document.getElementById("balanceResult");
  balanceResult.style.display = "block"; // Make the result div element visible
  balanceResult.innerHTML = `
    <h2>Account Balance</h2>
    <p>Address: ${address}</p>
    <p>Balance: ${ethers.formatEther(balance).toString()} ETH</p>
  `;
}

// Function to reset the displayed data
function resetDisplayedData() {
  const resultElements = document.querySelectorAll(".result");
  resultElements.forEach((element) => {
    element.style.display = "none"; // Hide result div elements
    element.innerHTML = ""; // Clear previous content
  });
}

displayBlockNumber();
displayGasPrice();
