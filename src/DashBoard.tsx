import { useState } from "react";
import { useWriteContract, useReadContract } from "wagmi";
import { abi } from "./abi";
import { useAccount } from "wagmi";
import { GitHubRepoLink } from "./GitHubRepoLink.tsx";

export function Dashboard() {
    const { address } = useAccount();
    const [amount, setAmount] = useState("");
    const { data: hash, writeContract, isPending } = useWriteContract();
    const contractAddress = "0x51fac1b64f2329519e68595937ea58eb83803c91";

    return (
        <div
            className="h-screen w-screen flex flex-col justify-center items-center text-white
                 bg-gradient-to-br from-gray-900 via-purple-900 to-black"
        >
            {/* Warning Banner */}
            <p className="text-lg font-bold text-transparent bg-clip-text animate-pulse
                    bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500
                    drop-shadow-lg text-center py-2 w-full fixed top-0">
                ✨ Dapp is based on SEPOLIA network only! ✨
            </p>

            {/* Staking Card */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[400px] text-center space-y-4">
                <h1 className="text-3xl font-bold">🚀 Staking Dashboard</h1>

                {/* Input Field */}
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border-none rounded-md bg-gray-700 text-white text-lg text-center focus:ring-2 focus:ring-purple-500"
                />

                {/* Action Buttons */}
                <div className="flex justify-between gap-2">
                    <button
                        className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition"
                        disabled={isPending}
                        onClick={() => {
                            if (!address) {
                                alert("Connect to your wallet !");
                                return;
                            }
                            writeContract({
                                address: contractAddress,
                                abi,
                                functionName: "stake",
                                args: [BigInt(amount)],
                                value: BigInt(amount),
                            });
                        }}
                    >
                        {isPending ? "Staking..." : "Stake"}
                    </button>

                    <button
                        className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition"
                        onClick={() => {
                            if (!address) {
                                alert("Connect to your wallet !");
                                return;
                            }
                            writeContract({
                                address: contractAddress,
                                abi,
                                functionName: "unstake",
                                args: [BigInt(amount)],
                            });
                        }}
                    >
                        {isPending ? "Unstaking..." : "Unstake"}
                    </button>
                </div>

                {/* Transaction Hash */}
                {hash && (
                    <p className="mt-3 text-sm text-gray-400">
                        Transaction:{" "}
                        <a
                            href={`https://sepolia.etherscan.io/tx/${hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline"
                        >
                            View on Etherscan
                        </a>
                    </p>
                )}

                {/* Staked Balance */}
                <ShowStake />
            </div>
        </div>
    );
}

function ShowStake() {
    const { address } = useAccount();
    const { data: balance } = useReadContract({
        address: "0x51fac1b64f2329519e68595937ea58eb83803c91",
        abi,
        functionName: "stakedBalances",
        args: [address],
    });

    return (
        <div className="mt-4 p-3 border rounded-lg bg-gray-700 text-lg">
            You have staked:{" "}
            <span className="font-bold text-green-400">{balance?.toString() || "0"}</span> ETH
            <GitHubRepoLink />
        </div>
    );
}
