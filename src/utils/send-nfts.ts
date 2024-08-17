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

import { setupMetaplex } from "./setup-metaplex";

export async function sendNFT(connection: Connection, user: any, nft: any, recipientPublicKey: any) {
    const metaplex = await setupMetaplex(connection, user);

    await metaplex.nfts().transfer({
        nftOrSft: nft,
        authority: user,
        fromOwner: user.publicKey,
        toOwner: recipientPublicKey,
    });

    console.log("NFT transferred to student wallet successfully!");
}