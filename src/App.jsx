import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import { Routes, Route, useNavigate } from "react-router-dom";
import VerifiedKYC from "./IfVerified";

const CONTRACT_ADDRESS = "Your_Contract_Address";

const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Burned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Minted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burnSoulbound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getInfo",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "profileImage",
            type: "string",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "age",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "nationality",
            type: "string",
          },
          {
            internalType: "string",
            name: "phoneNumber",
            type: "string",
          },
          {
            internalType: "string",
            name: "aadharNo",
            type: "string",
          },
          {
            internalType: "string",
            name: "pancardNo",
            type: "string",
          },
          {
            internalType: "string",
            name: "bankAccountNo",
            type: "string",
          },
          {
            internalType: "string",
            name: "signatureImage",
            type: "string",
          },
        ],
        internalType: "struct SoulboundStudentNFT.Info",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    name: "isValid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "profileImage",
            type: "string",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "age",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "nationality",
            type: "string",
          },
          {
            internalType: "string",
            name: "phoneNumber",
            type: "string",
          },
          {
            internalType: "string",
            name: "aadharNo",
            type: "string",
          },
          {
            internalType: "string",
            name: "pancardNo",
            type: "string",
          },
          {
            internalType: "string",
            name: "bankAccountNo",
            type: "string",
          },
          {
            internalType: "string",
            name: "signatureImage",
            type: "string",
          },
        ],
        internalType: "struct SoulboundStudentNFT.MintData",
        name: "data",
        type: "tuple",
      },
    ],
    name: "mintSoulbound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    name: "tokenOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function App() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const [status, setStatus] = useState("");
  const [hasNFT, setHasNFT] = useState(false);
  const [info, setInfo] = useState(null);

  const [profileImage, setProfileImage] = useState("");
  const [signatureImage, setSignatureImage] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [bank, setBank] = useState("");
  const [profilePreview, setProfilePreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  useEffect(() => {
    if (hasNFT && info) {
      const timer = setTimeout(() => navigate("/verified"), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasNFT, info, navigate]);

  useEffect(() => {
    if (window.ethereum) {
      const p = new BrowserProvider(window.ethereum);
      setProvider(p);
    }
  }, []);

  async function connectWallet() {
  try {
    setLoading(true);
    if (!provider) throw new Error("Install MetaMask");

    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const acc = accounts[0];
    const signer_ = await provider.getSigner();
    const c = new Contract(CONTRACT_ADDRESS, ABI, signer_);

    setSigner(signer_);
    setContract(c);
    setAccount(acc);
    setStatus("Wallet Connected");
  } catch (err) {
    setStatus(err.message);
  } finally {
    setLoading(false);
  }
}

async function checkNFT() {
  try {
    setLoading(true);

    if (!contract) throw new Error("Connect wallet first");

    const token = await contract.tokenOf(account);
    const tid = Number(token);

    if (tid === 0) {
      setHasNFT(false);
      setInfo(null);
      setStatus("No NFT found");
      return;
    }

    const data = await contract.getInfo(tid);

    setInfo({
      profileImage: data.profileImage,
      name: data.name,
      age: Number(data.age),
      nationality: data.nationality,
      phone: data.phoneNumber,
      aadhar: data.aadharNo,
      pan: data.pancardNo,
      bank: data.bankAccountNo,
      signatureImage: data.signatureImage,
    });

    setHasNFT(true);
    setStatus("NFT Verified");
  } catch (err) {
    setStatus(err.message);
  } finally {
    setLoading(false);
  }
}


  async function mint(e) {
  e.preventDefault();

  try {
    if (!contract) throw new Error("Connect wallet first");

    setLoading(true);
    setStatus("Minting... Please wait.");

    const tx = await contract.mintSoulbound({
      profileImage,
      name,
      age: Number(age),
      nationality,
      phoneNumber: phone,
      aadharNo: aadhar,
      pancardNo: pan,
      bankAccountNo: bank,
      signatureImage,
    });

    await tx.wait();

    setStatus("Minted successfully");
    checkNFT();
  } catch (err) {
    let message = "Something went wrong";

    if (err?.reason?.includes("AlreadyMinted")) {
      message = "You already have a Soulbound NFT.";
    }

    if (err?.message.includes("user rejected")) {
      message = "Transaction rejected.";
    }

    setStatus(message);
  } finally {
    setLoading(false);
  }
}



  async function handleProfileImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setProfileImage(data.cid);
    } catch (err) {
      console.log(err);
      setStatus("Image upload failed");
    }
  }

  async function handleSignatureUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setSignaturePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setSignatureImage(data.cid);
    } catch (err) {
      console.log(err);
      setStatus("Signature upload failed");
    }
  }
const LoaderOverlay = () => (
  <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col justify-center items-center z-50">
    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-purple-300 text-lg font-semibold">Processing...</p>
  </div>
);

  return (
    <>
    
      {loading && <LoaderOverlay />}
    
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen flex justify-center p-6 bg-gradient-to-br from-black via-gray-900 to-gray-800">
            <div className="w-full max-w-xl bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8 ">
              <h1 className="text-3xl font-bold text-center text-white">
                KYC Soulbound NFT
              </h1>

              <p className="text-center text-gray-300 mb-6">
                Secure Non-Transferable Identity NFT
              </p>

              <div className="flex justify-center gap-3 mb-6">
                <button
                  onClick={connectWallet}
                  className="px-5 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 shadow-lg"
                >
                  {account
                    ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                    : "Connect Wallet"}
                </button>

                <button
                  onClick={checkNFT}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg"
                >
                  Check NFT
                </button>
              </div>

              {status && (
                <div className="p-3 mb-4 text-center rounded-xl bg-gray-900 border border-gray-700 text-gray-200">
                  {status}
                </div>
              )}

              {hasNFT && info && (
                <div className="bg-emerald-900/40 p-5 rounded-xl border border-emerald-700 shadow mb-6 text-white">
                  <h2 className="text-xl font-semibold mb-2">
                    KYC Verified
                  </h2>

                  <p>
                    <strong>Name:</strong> {info.name}
                  </p>
                  <p>
                    <strong>Age:</strong> {info.age}
                  </p>
                  <p>
                    <strong>Phone:</strong> {info.phone}
                  </p>

                  <p className="text-gray-300 mt-2">Redirecting...</p>
                </div>
              )}

              {!hasNFT && (
                <form onSubmit={mint} className="space-y-4">
                  <h3 className="text-xl font-semibold text-purple-300 text-center">
                    Complete Your KYC
                  </h3>
                  <div>
                    <label className="block font-medium text-gray-300 mb-1">
                      Profile Image
                    </label>

                    <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-6 cursor-pointer bg-gray-900 hover:bg-gray-800 transition">
                      <span className="text-gray-400">
                        Click to select profile photo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileImageUpload}
                      />
                    </label>

                    {profilePreview && (
                      <img
                        src={profilePreview}
                        alt="Profile Preview"
                        className="mt-3 w-40 h-40 object-cover rounded-xl border border-gray-700 shadow"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block font-medium text-gray-300 mb-1">
                      Signature Image
                    </label>

                    <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-6 cursor-pointer bg-gray-900 hover:bg-gray-800 transition">
                      <span className="text-gray-400">
                        Click to select signature photo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleSignatureUpload}
                      />
                    </label>

                    {signaturePreview && (
                      <img
                        src={signaturePreview}
                        alt="Signature Preview"
                        className="mt-3 w-80 h-40 object-cover rounded-xl border border-gray-700 shadow"
                      />
                    )}
                  </div>

                  <input
                    className="w-full p-2 border rounded-xl bg-gray-900 text-gray-200 border-gray-700"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    className="w-full p-2 border rounded-xl bg-gray-900 text-gray-200 border-gray-700"
                    placeholder="Age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />

                  <select
                    className="w-full p-2 border rounded-xl bg-gray-900 text-gray-200 border-gray-700"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                  >
                    <option value="">Select Nationality</option>
                    <option>India</option>
                    <option>USA</option>
                    <option>Australia</option>
                    <option>Canada</option>
                    <option>UAE</option>
                  </select>

                  <input
                    className="w-full p-2 border rounded-xl bg-gray-900 text-gray-200 border-gray-700"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <input
                    className="w-full p-2 border rounded-xl bg-gray-900 text-gray-200 border-gray-700"
                    placeholder="Aadhar Number"
                    value={aadhar}
                    onChange={(e) => setAadhar(e.target.value)}
                  />

                  <input
                    className="w-full p-2 border rounded-xl bg-gray-900 text-gray-200 border-gray-700"
                    placeholder="PAN Number"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                  />

                  <input
                    className="w-full p-2 border rounded-xl bg-gray-900 text-gray-200 border-gray-700"
                    placeholder="Bank Account Number"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  />

                  <button
                    type="submit"
                    className="w-full py-3 bg-purple-700 text-white rounded-xl hover:bg-purple-800 font-semibold shadow-lg"
                  >
                    Submit KYC & Mint NFT
                  </button>
                </form>
              )}
            </div>
          </div>
        }
      />

      <Route path="/verified" element={<VerifiedKYC info={info} />} />
    </Routes>
    </>
  );
}
