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

  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(0);
  await txn.wait();

  // Get the value of the NFT's URI.
  // let returnedTokenUri = await gameContract.tokenURI(1);
  // console.log("Token URI:", returnedTokenUri);

  txn = await gameContract.attackBoss();
  await txn.wait();
  txn = await gameContract.attackBoss();
  await txn.wait();
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