


```markdown
# VoteChain dApp



**VoteChain** is a decentralized governance application built on the **zkSync Sepolia Testnet**. It allows communities to create proposals, manage membership, and cast votes on-chain with real-time visual feedback.

> **Note:** This project demonstrates full-stack Web3 development skills, integrating a Next.js frontend with a Solidity smart contract.

## 🔗 Smart Contract

The core logic is deployed on the **zkSync Sepolia Testnet **.

- **Contract Address:** `0x2A1635227640d235D31Cb6Ad7b85F97f24Af4787`
- **Explorer Link:** [View on zkSync Explorer](https://sepolia.explorer.zksync.io/address/0x2A1635227640d235D31Cb6Ad7b85F97f24Af4787)

## ✨ Features

- **💼 Wallet Connection & Network Management:**
  - Seamless wallet integration.
  - **Auto-Network Switching:** Automatically detects if the user is on the wrong network and prompts a switch to zkSync Sepolia.
  
- **🗳️ Proposal System:**
  - Create on-chain proposals with descriptions.
  - Real-time character counting and validation.
  - "Editor-style" UI for a professional experience.

- **📊 Voting Dashboard:**
  - Visual progress bars for "Yes" vs "No" votes.
  - Live status tracking (Active/Executed).
  - Clean, "SaaS-like" technical aesthetic.


## 🛠️ Tech Stack

**Frontend:**
- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** Custom UI components (Shadcn/UI style), Lucide React Icons
- **Language:** TypeScript

**Blockchain:**
- **Network:** zkSync Sepolia Testnet
- **Interaction:** Wagmi / Viem Hooks
- **Smart Contract:** Solidity <Remix IDE>

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18 or higher)
- MetaMask (or any Web3 wallet)
- Testnet ETH on zkSync Sepolia 

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/goodylove/votechain-dapp.git](https://github.com/goodylove/votechain-dapp.git)
   cd votechain-dapp

```

2. **Install dependencies**
```bash
npm install
# or
yarn install

```


3. **Run the development server**
```bash
npm run dev

```


4. **Open your browser**
Navigate to `http://localhost:3000`.

## 🧪 How to Test

1. **Connect Wallet:** Click the "Connect Wallet" button. If you are not on zkSync Sepolia, the app will ask you to switch.
2. **Owner Actions:** The deployed contract owner is the address that deployed it. Only the owner can see and use the "Member Management" panel.
3. **Voting:**
* Members added via the admin panel can vote on active proposals.
* Click "Vote Yes" or "Vote No" and confirm the transaction in MetaMask.
* Watch the progress bars update after the transaction confirms.





## 📄 License






```