import { Metaplex } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import useSWR from "swr";
import { CANDY_MACHINE_ID } from "../../constants";
import { useMetaplex } from "./useMetaplex";

const metaplexFetcher = async (mx: Metaplex) => {
  const asset = await mx.candyMachinesV2().findByAddress({
    address: new PublicKey(CANDY_MACHINE_ID as string),
  });

  return asset;
};

function useCandyMachine() {
  const { metaplex } = useMetaplex();
  const { data, error, mutate } = useSWR(metaplex, metaplexFetcher, {
    revalidateOnFocus: false, //todo check these settings
    revalidateOnReconnect: false,
    dedupingInterval: 1000 * 60 * 15,
    refreshInterval: 1000 * 60 * 15,
  });
  return {
    loadingCandyMachine: !data && !error,
    candyMachine: data,
    mutate
  };
}

export default useCandyMachine;
