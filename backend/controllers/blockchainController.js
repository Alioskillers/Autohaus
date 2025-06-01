const { ethers } = require("ethers");
const contractABI = require("../blockchain/abi/CarPurchase.json");
const contractAddress = process.env.CAR_PURCHASE_CONTRACT_ADDRESS;

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

exports.recordPurchase = async (req, res) => {
  const { carId, amount } = req.body;
  try {
    const tx = await contract.recordPurchase(carId, amount);
    await tx.wait();

    res.status(200).json({
      message: "Purchase recorded on blockchain",
      txHash: tx.hash,
    });
  } catch (error) {
    console.error("Blockchain error:", error);
    res.status(500).json({ error: "Blockchain transaction failed" });
  }
};