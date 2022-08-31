import { Web3Provider } from "@ethersproject/providers";
import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle";
import { BigNumber, providers, Wallet } from "ethers";

const dotenv = require('dotenv');
dotenv.config()

const CHAIN_ID = 1;
const provider = new providers.InfuraProvider(CHAIN_ID)
const FLASHBOTS_ENDPOINT = "https://relay-goerli.flashbots.net"
const GWEI = BigNumber.from(10).pow(9)
const ETHER = BigNumber.from(10).pow(18)


async function main() {

    const flashBotsProvider = await FlashbotsBundleProvider.create(provider,Wallet.createRandom(),FLASHBOTS_ENDPOINT)
    
    if(process.env.WALLET_PRIVATE_KEY === undefined)
    {
        console.error("Please Provide WALLET_PRIVATE_KEY env")
        process.exit(1);
    }
    const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY,provider)


    const transaction = await provider.getTransactionReceipt("0xee0c7dcdf5e7f7645498fe578129352df6f89b729e2f0f5bb05783ef56d8ba89");
    console.log(transaction)

    var block = await provider.getBlock("13819572");
    console.log(block);

    // provider.on('block',async (blockNumber)=>{
    //   console.log(blockNumber)
    //   var blockInfo = await provider.getBlock(blockNumber)
    //   console.log(blockInfo)
    // })
}

main();


