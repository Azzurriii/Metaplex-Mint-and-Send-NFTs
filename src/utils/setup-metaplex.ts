import {
    Connection,
    clusterApiUrl,
    PublicKey,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import {
    Metaplex,
    keypairIdentity,
    irysStorage,
    toMetaplexFile,
} from "@metaplex-foundation/js";

export async function setupMetaplex(connection: Connection, user: any) {
    return Metaplex.make(connection)
        .use(keypairIdentity(user))
        .use(
            irysStorage({
                address: "https://devnet.irys.xyz",
                providerUrl: "https://api.devnet.solana.com",
                timeout: 60000,
            }),
        );
}