# Metaplex-Mint-and-Send-NFTs
Mint and Send NFT is a blockchain-based project designed to simplify the creation and distribution of NFTs (Non-Fungible Tokens) on the Solana blockchain. 

---

## Overview

The **Mint and Send NFT** project allows users to mint NFTs on the Solana blockchain and send them to specified wallet addresses. This project integrates with the Metaplex Sugar framework to handle the NFT minting process efficiently.

## Features

- Mint NFTs with custom metadata.
- Send NFTs to any Solana wallet address.
- Integrated with Metaplex Sugar for NFT management.

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Solana CLI**: To interact with the Solana blockchain.
- **Metaplex CLI**: For NFT management and deployment.

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Azzurriii/Metaplex-Mint-and-Send-NFTs.git
   cd mint-and-send-nft
   ```

2. **Install Dependencies**

   ```bash
   npm install "@solana/web3.js" "@solana-developers/helpers" "@metaplex-foundation/js"
   ```

3. **Configure Solana CLI**

   Ensure you have the Solana CLI configured with the appropriate network.

   ```bash
   solana config set --url https://api.devnet.solana.com
   ```

4. **Setup Metaplex Sugar**

   Follow the Metaplex documentation to set up Metaplex Sugar. Ensure your Metaplex environment is properly configured.

## Usage

1. **Create collecion**

   To create a new Collection, use the following command:

   ```bash
   npx esrun src/utils/create-collection.ts
   ```

2. **Mint and Send an NFT**

   To send an NFT to a wallet address:
   Replace "STUDENT_PUBLIC_KEY" field in `index.ts` with the recipient’s wallet address.
   Run the command

   ```bash
   npx esrun src/index.ts
   ```

## Troubleshooting

- Ensure you have the correct Node.js version.
- Verify Solana CLI configuration and network settings.
- Check Metaplex Sugar setup for any issues.

## Contributing

Feel free to open issues or submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to adjust the content to better fit your specific setup and requirements!
## You can adjust to your own assets and metadata!
