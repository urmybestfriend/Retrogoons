import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connection } from "../../constants";

export const tokenAccountFetcher = async (keyRaw: string) => {
  const key = new PublicKey(keyRaw);
  const res = await connection
    .getParsedTokenAccountsByOwner(key, {
      programId: new PublicKey(TOKEN_PROGRAM_ID),
    });
  return res;
};

export const solFetcher = async (keyRaw: string) => {
  const key = new PublicKey(keyRaw);
  const res = await connection
    .getBalance(key);
  return res;
};