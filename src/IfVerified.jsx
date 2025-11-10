import React from "react";
import { motion } from "framer-motion";

export default function VerifiedKYC({ info }) {

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
        Loading KYC details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex justify-center items-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-gray-900/70 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-3xl p-10 text-center text-gray-200"
      >

        <h1 className="text-4xl font-extrabold text-emerald-400 mb-4 drop-shadow-lg">
          ✅ KYC Verified Successfully
        </h1>

        <p className="text-gray-400 mb-10 text-lg">
          Your identity has been authenticated and stored as a Soulbound NFT.
        </p>

        {/* Profile + Signature */}
        <div className="flex justify-center gap-10 mb-10">
          <div className="text-center">
            <img
              src={`https://gateway.pinata.cloud/ipfs/${info.profileImage}`}
              alt="Profile"
              className="w-32 h-32 rounded-full border border-emerald-500 shadow-lg object-cover"
            />
            <p className="text-gray-400 mt-2 text-sm">Profile Image</p>
          </div>

          <div className="text-center">
            <img
              src={`https://gateway.pinata.cloud/ipfs/${info.signatureImage}`}
              alt="Signature"
              className="w-64 h-32 rounded-xl border border-purple-500 shadow-lg object-cover bg-white"
            />
            <p className="text-gray-400 mt-2 text-sm">Signature</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/40 border border-gray-700 rounded-2xl p-8 text-left shadow-inner"
        >
          <h2 className="text-2xl font-bold text-purple-300 mb-6">
            Verified KYC Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Detail label="Full Name" value={info.name} />
            <Detail label="Age" value={info.age} />
            <Detail label="Nationality" value={info.nationality} />
            <Detail label="Phone Number" value={info.phone} />
            <Detail label="Aadhar Number" value={info.aadhar} />
            <Detail label="PAN Number" value={info.pan} />
            <Detail label="Bank Account No." value={info.bank} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10"
        >
          <button
            onClick={() => (window.location.href = "/")}
            className="px-8 py-3 bg-emerald-600 text-white text-lg font-semibold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-900/40 transition-all"
          >
            Go to Dashboard
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700 shadow">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-lg font-medium text-white">{value}</p>
    </div>
  );
}
