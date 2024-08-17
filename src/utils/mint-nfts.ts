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
import { readFileSync } from "fs";
import { setupMetaplex } from "./setup-metaplex";
import { StudentInfo } from "../type";

const COLLECTION_NFT_ADDRESS = new PublicKey("HeFN8oVzjZZwoAd1YUAuCw663bQNgKvR4av8sjpQ8JEy");

export async function uploadImageAndMetadata(metaplex: any, nftData: any, studentInfo: any) {
    const buffer = readFileSync(nftData.imageFile);
    const file = toMetaplexFile(buffer, nftData.imageFile);
    const imageUri = await metaplex.storage().upload(file);
    console.log("Image URI:", imageUri);

    const { uri: metadataUri } = await metaplex.nfts().uploadMetadata({
        name: nftData.name,
        symbol: nftData.symbol,
        description: nftData.description,
        image: imageUri,
        attributes: [
            { trait_type: "Student Name", value: studentInfo.name },
            { trait_type: "Course Name", value: studentInfo.courseName },
            { trait_type: "Completion Date", value: studentInfo.completionDate },
            { trait_type: "Grade", value: studentInfo.grade },
            { trait_type: "Instructor", value: studentInfo.instructor },
        ],
        properties: {
            files: [{ uri: imageUri, type: "image/png" }],
            category: "image",
            creators: [{ address: metaplex.identity().publicKey, share: 100 }],
        },
        external_url: studentInfo.certificateUrl,
    });
    console.log("Metadata URI:", metadataUri);

    return metadataUri;
}

export async function mintNFT(connection: Connection, user: any, studentInfo: any) {
    const metaplex = await setupMetaplex(connection, user);

    const nftData = {
        name: `Studihub Certificate`,
        symbol: "CERT",
        description: `This NFT certifies that ${studentInfo.name} has successfully completed the course "${studentInfo.courseName}" on Studihub.`,
        sellerFeeBasisPoints: 500,
        imageFile: "assets/certificate.png",
    };

    const metadataUri = await uploadImageAndMetadata(metaplex, nftData, studentInfo);

    const { nft } = await metaplex.nfts().create(
        {
            uri: metadataUri,
            name: nftData.name,
            sellerFeeBasisPoints: nftData.sellerFeeBasisPoints,
            symbol: nftData.symbol,
            collection: COLLECTION_NFT_ADDRESS,
        },
        { commitment: "finalized" },
    );

    console.log(`Token Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`);

    await metaplex.nfts().verifyCollection({
        mintAddress: nft.mint.address,
        collectionMintAddress: COLLECTION_NFT_ADDRESS,
        isSizedCollection: true,
    });

    console.log(`Created NFT address is`, nft.address.toString());

    return nft;
}