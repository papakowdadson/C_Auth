import { ethers } from "hardhat";

async function main() {
    const cauth = await ethers.deployContract("CAuth");

    await cauth.waitForDeployment();

    console.log(`cauth deployed to ${cauth.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
