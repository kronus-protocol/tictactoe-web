import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import { Mirage, MIRAGE_AUCTION_HOUSE_AUTHORITY, NFT_STORAGE_API_KEY } from "@mirrorworld/mirage.core";
import { Wallet } from "@project-serum/anchor";

export const MirageContext = createContext<Mirage | undefined>(undefined);

export const MirageProvider = ({ children }: { children: ReactNode }) => {

    const wallet = useWallet();
    const { connection } = useConnection();
    const address = wallet.publicKey?.toBase58();

    const [mirage, setMirage] = useState<Mirage | undefined>(undefined);

    useEffect(() => {
        if (!address) {
            return;
        }
        // @ts-ignore
        const newMirage = new Mirage({connection, wallet: wallet as Wallet,
            auctionHouseAuthority: MIRAGE_AUCTION_HOUSE_AUTHORITY,
            NFTStorageAPIKey: NFT_STORAGE_API_KEY,
        });
        setMirage(newMirage);
    }, [address]);

    // @ts-ignore
    return <MirageContext.Provider value={mirage}>{children}</MirageContext.Provider>;
};

export const useMirage = () => {
    return useContext(MirageContext);
};
