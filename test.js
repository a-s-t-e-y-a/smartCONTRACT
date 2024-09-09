const { ethers } = require("ethers");
const fs = require("fs");

// Load the ABI and address
const artifact = JSON.parse(
  fs.readFileSync("./artifacts/contracts/retick.sol/TicketReselling.json")
);
const contractABI = artifact.abi;
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Replace with your deployed contract address

// Define your Ethereum provider and wallet
const provider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/93ff7932c75e44e2a1df514ba12cc89c"
); // Replace with your provider URL
const wallet = new ethers.Wallet(
  "d5cc5dcc33d1f87e7f3a377704fd7f9ddfb879d80f3102531045cd9e1d79d77b",
  provider
); // Replace with your private ke

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function main() {
  try {
    // Create an event
    const createEventTx = await contract.createEvent(
      1,
      100,
      "Concert",
      ethers.utils.parseEther("0.1"),
      Math.floor(Date.now() / 1000) + 3600
    );
    await createEventTx.wait();
    console.log("Event created.");

    // Buy a ticket
    const buyTicketTx = await contract.buyTicket(1, 1, {
      value: ethers.utils.parseEther("0.1"),
    });
    await buyTicketTx.wait();
    console.log("Ticket bought.");

    // List the ticket for resale
    const listTicketTx = await contract.listTicketForResale(
      1,
      1,
      ethers.utils.parseEther("0.15")
    );
    await listTicketTx.wait();
    console.log("Ticket listed for resale.");

    // Buy the resale ticket
    const buyResaleTicketTx = await contract.buyResaleTicket(1, 1, {
      value: ethers.utils.parseEther("0.15"),
    });
    await buyResaleTicketTx.wait();
    console.log("Resale ticket bought.");
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
