# **KYC Soulbound NFT**

A decentralized identity system that turns verified KYC data into a **non-transferable Soulbound NFT** on the blockchain.

## ✅ **What This Project Does**

This project creates a secure on-chain KYC system.
A user completes a KYC form, uploads profile and signature images, and then mints a **Soulbound NFT** that stores their verified identity.
The NFT cannot be sold or transferred, which makes it perfect for identity verification.

## ✅ **Main Features**

* Soulbound (non-transferable) KYC NFT
* Secure storage of profile image and signature on **IPFS (Pinata)**
* A React dashboard to connect wallet, submit KYC, check NFT status
* Auto-redirect to a **Verified KYC page** if the NFT exists
* Full verification details displayed with smooth animations
* Minting allowed only once per wallet
* Ability to fetch all identity details from smart contract
* Auto-generated metadata using Base64

# 🧱 **Project Architecture**

### **1. Smart Contract (Solidity – Remix IDE)**

The contract:

* Mints one Soulbound NFT per wallet
* Stores user details:

  * Name
  * Age
  * Nationality
  * Phone
  * Aadhar
  * PAN
  * Bank account number
  * Profile image CID
  * Signature image CID
* Disables all transfer and approval functions
* Includes a burn function for owner/admin
* Returns full metadata with tokenURI

### **Smart Contract Name:**

`SoulboundKYCNFT`

### **Key Contract Functions**

| Function                 | Description                      |
| ------------------------ | -------------------------------- |
| `mintSoulbound(data)`    | Mints the KYC Soulbound NFT      |
| `getInfo(tokenId)`       | Fetches stored KYC details       |
| `tokenOf(address)`       | Gets token owned by a wallet     |
| `isValid(address)`       | Checks if wallet has a valid NFT |
| `burnSoulbound(tokenId)` | Burns the NFT                    |
| `tokenURI(tokenId)`      | Returns encoded metadata         |

---

# 🌐 **Frontend (React + Ethers.js + Framer Motion)**

The frontend allows users to:

### **Home Dashboard**

* Connect MetaMask
* Check if they already have an NFT
* If not, fill out the KYC form
* Upload profile photo & signature (IPFS via backend)
* Mint their Soulbound NFT

### **Verified Page**

After successful minting:

* Shows profile image
* Shows signature
* Displays all KYC details
* Includes animated UI using Framer Motion

# 🔗 **Backend (Node.js + Express + Pinata + Multer)**

Handles image uploads to IPFS.

### Backend Flow:

1. User uploads image
2. Multer saves temporary file
3. Backend sends file to Pinata
4. Returns CID to frontend
5. Image served through:

   ```
   https://gateway.pinata.cloud/ipfs/<CID>
   ```

### Key Endpoint:

```
POST /upload
```

Returns:

```
{ "cid": "<IPFS_Hash>" }
```

---

# ⚙️ **How It Works (Step-by-Step)**

### ✅ Step 1. User connects their MetaMask wallet

App captures the wallet address and signer.

### ✅ Step 2. User fills out KYC form

Uploads:

* Profile photo
* Signature photo

Enters:

* Name, age, nationality
* Phone
* Aadhar, PAN
* Bank account number

### ✅ Step 3. Images uploaded to Pinata

Backend returns CID for each.

### ✅ Step 4. Smart contract mints Soulbound NFT

User signs mint transaction.

### ✅ Step 5. Frontend checks `tokenOf(wallet)`

If found:

* Fetches info
* Redirects to **Verified Page**

### ✅ Step 6. Verified Page shows:

* Profile photo
* Signature
* All details
* Non-transferable badge (Soulbound)

# 📦 **Tech Stack**

### **Smart Contract**

* Solidity
* Remix IDE
* OpenZeppelin ERC721
* Base64 + Strings

### **Frontend**

* React
* Vite
* TailwindCSS
* Ethers.js
* React Router
* Framer Motion

### **Backend**

* Node.js
* Express
* Multer
* Pinata API
* Axios
* Form-Data

# 🚀 **How to Run Locally**

### 1. Clone Project

```
git clone https://github.com/your-username/KYC-Soulbound-NFT.git
cd KYC-Soulbound-NFT
```

### 2. Install frontend

```
npm install
npm run dev
```

### 3. Start backend

```
cd backend
npm install
node index.js
```
Backend runs at:

```
http://localhost:5000
```

### 4. Deploy smart contract

Use Remix IDE and replace:

```
Your_Contract_Address
Your_Pinata_Key
Your_Pinata_Secret
```

# ✅ **Soulbound Behavior Explanation**

This NFT cannot be:

* transferred
* approved
* sold
* traded

The contract blocks:

* `transferFrom`
* `safeTransferFrom`
* `approve`

So the NFT stays permanently with the user’s wallet.

# 📸 **Screenshots You Can Add Later**

* Wallet connection
* KYC form
* Image upload
* Mint success
* Verified page

# ✅ **Purpose of This Project**

This system can be used for:

* Student identity verification
* Employee onboarding
* Banking KYC
* Web3 user verification
* DAO membership verification

