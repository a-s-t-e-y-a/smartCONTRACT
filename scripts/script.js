// scripts/getAbi.js
const hre = require("hardhat");

async function main() {
  const ContractName = "TicketReselling"; // Replace with your contract's name
  const artifact = await hre.artifacts.readArtifact(ContractName);

  console.log("ABI:", JSON.stringify(artifact.abi, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
