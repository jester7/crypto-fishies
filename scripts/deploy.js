const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('CryptoFishies');
  const gameContract = await gameContractFactory.deploy(
    ["CryptoFishy Nemo", "CryptoFishy Marlin", "CryptoFishy Dory"],       // Names
    ["https://jester.cafe/wp-content/uploads/2021/11/crypto-fishy1.png", // Images
      "https://jester.cafe/wp-content/uploads/2021/11/crypto-fishy2.png",
      "https://jester.cafe/wp-content/uploads/2021/11/crypto-fishy3.png"],
    [400, 500, 1000],                    // HP values
    [75, 50, 100],                       // Attack damage values
    "Great White Shark", // Boss name
    "https://jester.cafe/wp-content/uploads/2021/11/shark.png",
    10000, // Boss hp
    50 // Boss attack damage
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();