import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {PublicKey} from "@solana/web3.js";
import {KronusLib} from "./kronus-sdk/kronus-lib";

export const WsSubscription = createContext<any[]>([]);
const programKey = new PublicKey('5gk9VvQLwJtAt2KxxccvYeeDkJkMsmUzyt1p8e4qMdBL');

export const WsSubscriptionProvider = ({ children }: { children: ReactNode }) => {

    const wallet = useWallet();
    const { connection } = useConnection();
    const address = wallet.publicKey?.toBase58();

    const [entries, setEntries] = useState<any[]>([]);
    const [sub, setSub] = useState<number | undefined>(undefined);

    const addEntry = useCallback(async (newEntry: any) => {
        if (!wallet) {
            return;
        }

        try {
            // @ts-ignore
            const newSdk = new KronusLib(programKey, connection, wallet);

            const res = await newSdk?.program.account.game.fetch(newEntry.accountId);
            setEntries([JSON.stringify(res), ...entries]);
        } catch (e) {
            console.error(e);
        }
    }, [entries]);

    useEffect(() => {
        if (!address) {
            return;
        }

        if (sub) {
            connection.removeProgramAccountChangeListener(sub).then();
        }

        const newSub = connection.onProgramAccountChange(programKey, addEntry);
        setSub(newSub);

        return () => {
            if (sub) {
                connection.removeProgramAccountChangeListener(sub).then();
            }
        }
    }, [address]);

    // @ts-ignore
    return <WsSubscription.Provider value={entries}>{children}</WsSubscription.Provider>;
};

export const useWsSubscription = () => {
    return useContext(WsSubscription);
};
