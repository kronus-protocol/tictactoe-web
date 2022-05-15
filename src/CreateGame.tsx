import React, {useState} from 'react';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import './Game.css';
import Api from "./Api";
import {KronusLib} from "./kronus-sdk/kronus-lib";
import {PublicKey} from "@solana/web3.js";
import {Wallet} from "@project-serum/anchor";

interface Props {
    initGame: (i: string) => void;
}

const programKey = new PublicKey('5gk9VvQLwJtAt2KxxccvYeeDkJkMsmUzyt1p8e4qMdBL');
const api = new Api();

const CreateGame = ({initGame}: Props) => {
    const wallet = useWallet();
    const {connection} = useConnection();
    const {publicKey} = wallet;
    const [gameId, setGameId] = useState('');
    const [inviteKey, setInviteKey] = useState('');

    if (!publicKey) {
        return (<></>);
    }

    const initKronusSdk = () => {
        return new KronusLib(programKey, connection, wallet as unknown as Wallet);
    }

    const initTransaction = async (gameId: string, publicKey: PublicKey, signerPubKey: PublicKey, publicKey2: PublicKey) => {
        const sdk = initKronusSdk();

        const transaction = await sdk.initializeGame(gameId, publicKey, signerPubKey, publicKey2)

        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.feePayer = publicKey;

        // @ts-ignore
        const signed = await wallet.signTransaction(transaction);
        const tx = await connection.sendRawTransaction(signed!.serialize())

        const txInfo = await connection.confirmTransaction(tx);
        console.log("Signature: " + tx);
        console.log(txInfo);
    }

    const joinTransaction = async (gameId: string, publicKey: PublicKey,signerPubKey: PublicKey) => {
        const sdk = initKronusSdk();

        const transaction = await sdk.acceptGame(gameId, publicKey, signerPubKey);

        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.feePayer = publicKey;

        // @ts-ignore
        const signed = await wallet.signTransaction(transaction);
        const tx = await connection.sendRawTransaction(signed!.serialize())

        const txInfo = await connection.confirmTransaction(tx);
        console.log("Signature: " + tx);
        console.log(txInfo);
    }

    const createGameCall = () => {
        api.initGame(publicKey.toString(), inviteKey).then((res) => {
            const signerPubKey = res.data.pubkey0_signer;
            const gameId = res.data.game_id;

            return Promise.all([
                initTransaction(gameId, publicKey, new PublicKey(signerPubKey), new PublicKey(inviteKey)),
                res.data.game_id
            ]);
        }).then(([_, gameId]) => {
            console.log("HERE???")
            console.log(gameId)
            initGame(gameId);
        });
    }

    const joinGameCall = () => {
        api.joinGame(gameId, publicKey.toString()).then((res) => {
            const signerPubKey = res.data.pubkey1_signer;
            const gameId = res.data.game_id;

            return Promise.all([
                joinTransaction(gameId, publicKey, signerPubKey),
                res.data.game_id
            ]);
        }).then(([_, gameId]) => {
            initGame(gameId);
        });
    }

    const onJoinGameChange = (e: any) => {
        setGameId(e.target.value);
    }

    const onInviteKeyChange = (e: any) => {
        setInviteKey(e.target.value);
    }

    return (
        <div className="main-cont">
            <div className="buttons">
                <div>
                    <input placeholder="Invite Public Key" onChange={onInviteKeyChange} value={inviteKey} style={{marginRight: '10px'}}/>
                    <button disabled={!inviteKey} onClick={createGameCall}>Create Game</button>
                </div>
            </div>
            <div className="buttons">
                <div>
                    <input placeholder="Game ID" onChange={onJoinGameChange} value={gameId} style={{marginRight: '10px'}}/>
                    <button disabled={!gameId} onClick={joinGameCall}>Join the Game</button>
                </div>
            </div>
        </div>
    )
}

export default CreateGame;
