import { ethers } from "./ethers.min.js";

// Connect to the Ethereum node at localhost
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Connect to the contract
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_data",
        "type": "string"
      }
    ],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, signer);

async function storeData(value) {
  try {
    // Call the store function
    const tx = await contract.store(value);
    await tx.wait();
    console.log("Transaction completed: ", tx);
  } catch (error) {
    console.error("Failed to store data: ", error);
  }
}

async function retrieveData() {
  try {
    // Call the retrieve function
    const data = await contract.retrieve();
    console.log("Retrieved data: ", data);
    document.getElementById("retrievedData").innerText = `Retrieved Data: ${data}`;
  } catch (error) {
    console.error("Failed to retrieve data: ", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const storeButton = document.getElementById("storeButton");
  if (storeButton) {
    storeButton.addEventListener("click", async () => {
      const value = document.getElementById("data").value;
      if (value) {
        storeData(value);
      }
    });
  }

  const retrieveButton = document.getElementById("retrieveButton");
  if (retrieveButton) {
    retrieveButton.addEventListener("click", async () => {
      retrieveData();
    });
  }
});