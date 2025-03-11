import { motion } from "framer-motion";

export function ConnectWalletPrompt() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
                background: "linear-gradient(135deg, #1A1F36 0%, #4F5BD5 50%, #8A5CD9 100%)",
            }}
        >
            <motion.div
                className="bg-gray-800 p-8 rounded-xl shadow-lg text-center"
                initial={{ y: -10 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
                <h2 className="text-2xl font-bold mb-3">Connect Your Wallet</h2>
                <p className="text-gray-400 mb-5">To access the staking dashboard, please connect your wallet.</p>

            </motion.div>
        </motion.div>
    );
}
