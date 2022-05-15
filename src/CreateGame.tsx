import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import './Game.css';
import Api from "./Api";

interface Props {
    initGame: (i: string) => void;
}

const api = new Api();

const CreateGame = ({initGame}: Props) => {
    const { publicKey } = useWallet();
    const [gameId, setGameId] = useState('')

    if (!publicKey) {
        return (<></>);
    }

    const createGameCall = () => {
        api.initGame(publicKey.toString()).then((res) => {
            initGame(res.data.game_id);
        });
    }

    const joinGameCall = () => {
        api.joinGame(gameId, publicKey.toString()).then((res) => {
            console.log(res.data.game_id);
            initGame(res.data.game_id);
        });
    }

    const onJoinGameChange = (e: any) => {
        setGameId(e.target.value);
    }

    return (
        <div className="main-cont">
            <div className="buttons">
                <button onClick={createGameCall}>Create New Game</button>
            </div>
            <div className="buttons">
                <div>
                    <input placeholder="Game ID" onChange={onJoinGameChange} value={gameId} style={{marginRight: '10px'}}/>
                    <button id="userButton" disabled={!gameId} onClick={joinGameCall}>Join the Game</button>
                </div>
            </div>
        </div>
    )
}

export default CreateGame;
