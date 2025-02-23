const hre = require("hardhat");

const main = async () => {
    const contractFactory = await hre.ethers.getContractFactory("TaskContract");

    // Lấy gas price mới từ network
    const feeData = await hre.ethers.provider.getFeeData();
    const gasPrice = feeData.gasPrice || hre.ethers.parseUnits("10", "gwei"); // Mặc định 10 gwei nếu undefined

    // Triển khai hợp đồng với gas price tối ưu
    const contract = await contractFactory.deploy({ gasPrice: gasPrice });

    await contract.waitForDeployment(); // ethers v6 dùng waitForDeployment() thay vì deployed()
    console.log("Contract deployed to:", await contract.getAddress());
};

const runMain = async () => {    
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error("Deployment failed:", error);
        process.exit(1);
    }
};

runMain();
