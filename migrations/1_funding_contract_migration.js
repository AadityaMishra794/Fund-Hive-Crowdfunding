const Crowdfunding = artifacts.require("Crowdfunding");

module.exports = async function(deployer) {
  try {
    // Campaign parameters
    const name = "Test Campaign";
    const description = "Test Description";
    const goalInWei = "1000000000000000000"; // 1 ETH in Wei
    const durationInDays = 30;

    // Deploy the contract
    await deployer.deploy(
      Crowdfunding,
      name,
      description,
      goalInWei,
      durationInDays
    );
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
};