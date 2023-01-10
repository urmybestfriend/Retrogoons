import { useWallet } from "@solana/wallet-adapter-react";
import useSWR from "swr";
import { tokenAccountFetcher } from "./utils";
import BN from "bn.js";

type PrizeMoneyTokenAccounts = {
    userSplAmount?: number;
    userSolAmount?: number;
    sufficientBalance: boolean;
    loadingPrizeMoneyTokenAccounts: boolean;
    error: any;
}

function usePrizeMoneyTokenAccounts(splMint?: string, splPrice?: number) {
    const wallet = useWallet()

    const { data: userTokenAccounts, error } = useSWR(
        wallet && wallet.publicKey ? [
            wallet.publicKey.toString(),
            'usePrizeMoneyTokenAccounts'
        ] : null,
        tokenAccountFetcher,
    );

    const result: PrizeMoneyTokenAccounts = {
        loadingPrizeMoneyTokenAccounts: !error && !userTokenAccounts,
        sufficientBalance: false,
        error,
    };
    if (userTokenAccounts && userTokenAccounts.value) {
        // get users spl token account
        const prizeSplTokenAccount = userTokenAccounts.value.filter(x => x.account.data.parsed.info.mint === splMint)
        // if token account exists, check if sufficient balance
        if (prizeSplTokenAccount.length > 0 && splPrice) {
            result.userSplAmount = prizeSplTokenAccount[0].account.data.parsed.info.tokenAmount.uiAmount
            result.sufficientBalance = new BN(prizeSplTokenAccount[0].account.data.parsed.info.tokenAmount.amount).gte(new BN(splPrice))
        }
    }
    // get users sol balance & check if sufficient balance
    // const { balance, loadingSolBalance } = useSolBalance()
    // result.loadingPrizeMoneyTokenAccounts ||= loadingSolBalance
    // if (balance && constants) {
    //     result.userSolAmount = balance
    //     result.sufficientBalance &&= balance >= (constants.solAmount / LAMPORTS_PER_SOL)
    // }

    return result
}

export default usePrizeMoneyTokenAccounts;