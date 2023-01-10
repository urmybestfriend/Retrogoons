import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import useSWR from "swr";
import { connection } from "../../constants";

const solFetcher = async (keyRaw: string) => {
  const key = new PublicKey(keyRaw);
  const res = await connection.getBalance(key);
  return res;
};

function useSolBalance() {
    const wallet = useWallet();
    const { data: balance, error } = useSWR(
        wallet && wallet.publicKey ? [
            wallet.publicKey.toString(),
            'useSolBalance'
        ] : null,
        solFetcher,
    );
    return {
        balance: balance ? balance / LAMPORTS_PER_SOL : 0,
        loadingSolBalance: !error && !balance,
        error,
    }
}

export default useSolBalance;