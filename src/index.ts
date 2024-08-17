import {
    Connection,
    clusterApiUrl,
    PublicKey,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
    getKeypairFromFile,
    airdropIfRequired,
} from "@solana-developers/helpers";
import {
    Metaplex,
    keypairIdentity,
    irysStorage,
    toMetaplexFile,
} from "@metaplex-foundation/js";
import { mintNFT } from "./utils/mint-nfts";
import { sendNFT } from "./utils/send-nfts";
import { StudentInfo } from "./type";

async function main() {
    const connection = new Connection(clusterApiUrl("devnet"));
    const user = await getKeypairFromFile();
    console.log("Wallet public key:", user.publicKey.toBase58());

    // Student info
    const studentInfo: StudentInfo = {
        name: "Jack",
        courseName: "C98",
        completionDate: "2024-08-17",
        grade: "A",
        instructor: "Dr. B",
        certificateUrl: "studihub.io",
    };

    // Mint NFT
    const nft = await mintNFT(connection, user, studentInfo);
    console.log("NFT minted successfully!");

    // Send NFT
    const STUDENT_PUBLIC_KEY = "9QN21Scfjr6dh3TiaPCpZ1hb1XSotPkn1AXBxJ37FtFZ";
    const recipientPublicKey = new PublicKey(STUDENT_PUBLIC_KEY);
    await sendNFT(connection, user, nft, recipientPublicKey);

    console.log("✅ Finished successfully!");
}

main().catch(console.error);