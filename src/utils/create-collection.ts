import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
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

async function createCollection() {
    const connection = new Connection(clusterApiUrl("devnet"));
    const user = await getKeypairFromFile();
    console.log("Wallet public key:", user.publicKey.toBase58());

    await airdropIfRequired(
        connection,
        user.publicKey,
        1 * LAMPORTS_PER_SOL,
        0.1 * LAMPORTS_PER_SOL,
    );

    // Connect to Metaplex and Irys
    const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(user))
        .use(
            irysStorage({
                address: "https://devnet.irys.xyz",
                providerUrl: "https://api.devnet.solana.com",
                timeout: 60000,
            }),
    );
    
    // Create the collection
    const collectionNftData = {
        name: "Certificate Collection",
        symbol: "CERT",
        description: "A collection of certificates issued by Studihub.",
        sellerFeeBasisPoints: 100,
        imageFile: "assets/collection.png",
        isCollection: true,
        collectionAuthority: user,
    }

    // Upload offchain data to Irys
    // Load file into Metaplex
    const buffer = readFileSync(collectionNftData.imageFile);
    const file = toMetaplexFile(buffer, collectionNftData.imageFile);

    // upload image and get image uri
    const imageUri = await metaplex.storage().upload(file);
    console.log("image uri:", imageUri);

    // upload metadata and get metadata uri (off chain metadata)
    const uploadMetadataOutput = await metaplex.nfts().uploadMetadata({
        name: collectionNftData.name,
        symbol: collectionNftData.symbol,
        description: collectionNftData.description,
        image: imageUri,
    });

    const collectionUri = uploadMetadataOutput.uri;
    console.log("Collection offchain metadata URI:", collectionUri);

    // Make the collection
    // create a collection NFT using the URI from the metadata
    const createNftOutput = await metaplex.nfts().create(
        {
            uri: collectionUri,
            name: collectionNftData.name,
            sellerFeeBasisPoints: collectionNftData.sellerFeeBasisPoints,
            symbol: collectionNftData.symbol,
            isCollection: true,
        },
        { commitment: "finalized" }
    );

    const collectionNft = createNftOutput.nft;

    console.log(
        `Collection NFT: https://explorer.solana.com/address/${collectionNft.address.toString()}?cluster=devnet`
    );

    console.log(`Collection NFT address is`, collectionNft.address.toString());

    console.log("✅ Finished successfully!");
}

createCollection().catch(console.error);