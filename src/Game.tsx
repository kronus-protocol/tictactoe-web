import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import calculateWinner from './Winner';
import './Game.css';
import useLocalStorage from './hooks/useLocalStorage';
import Api from "./Api";
import {useWallet} from "@solana/wallet-adapter-react";
import {useMirage} from "./MirageProvider";

interface Props {
    gameId: string;
}

const api = new Api();

function Game({gameId}: Props) {
    const wallet = useWallet();
    const {publicKey} = wallet;
    const mirage = useMirage();

    if (!publicKey) {
        return (<></>);
    }

    const mockTransaction = async () => {
        try {
            await mirage?.buyToken('8ohg71HpVKkT9UjyLfoiYpPyJbdCBafdc5qoE1vgYxxK', 0);
        } catch (e) {}
    };

    // Set initial grid to be empty
    const initialGrid = Array(9).fill('');
    const [grid, setGrid] = useState(initialGrid);
    const [player, setPlayer] = useState('1');
    const [xWinCount, setXWinCount] = useLocalStorage('xscore', 0);
    const [oWinCount, setOWinCount] = useLocalStorage('oscore', 0);
    const [draw, setDraw] = useLocalStorage('tie', 0);
    const winner = calculateWinner(grid);
    const [disable, setDisable] = useState(false);

    // Periodically refresh state
    useEffect(
        () => {
            let timer1 = setInterval(() => {
                api.getGameState().then(res => {
                    const gameState = res.data[gameId];
                    const playr = gameState.pubkey0 === publicKey?.toBase58() ? '1' : '2';
                    setGrid(gameState.grid);
                    setPlayer(playr);
                    const moves = gameState.grid.filter((el: string) => el !== '').length;

                    if (playr === '1' && moves % 2 === 0) {
                        setDisable(false);
                    } else if (playr === '1') {
                        setDisable(true);
                    }
                    if (playr === '2' && moves % 2 === 1) {
                        setDisable(false);
                    } else if (playr === '2') {
                        setDisable(true);
                    }
                });
            }, 1000);

            return () => {
                clearTimeout(timer1);
            };
        }, [player]);

    useEffect(() => {
        api.getGameState().then(res => {
            const gameState = res.data[gameId];
            setGrid(gameState.grid);
            const playr = gameState.pubkey0 === publicKey?.toBase58() ? '1' : '2';
            setPlayer(playr);
        });
    }, [gameId])

    const handleClick = (i: number) => {
        mockTransaction().then(() => {
            if (disable) return;
            setDisable(true);
            // using spread syntax to copy the current grid
            const curGrid = [...grid];
            // return if winner already determine or grid already has element
            if (winner || curGrid[i]) {
                setDisable(false);
                return;
            }

            // @ts-ignore
            api.makeMove(gameId, publicKey.toString(), i).then((res) => {
                // determine player
                if (player === '1') {
                    curGrid[i] = 'o';
                    setGrid(curGrid);
                } else if (player === '2') {
                    curGrid[i] = 'x';
                    setGrid(curGrid);
                }

                calculateWinner(curGrid);
            });
        }).catch((e) => {
            console.log(e);
        });
    };

    const showWinner = () => {
        if (winner) {
            return (
                <p className={`winner ${winner}`}>
                    {winner === 'x' ? 'X wins' : winner === 'o' ? 'O wins' : "It's a tie"}
                </p>
            );
        }
    };

    useEffect(() => {
        const updateScore = () => {
            if (winner === 'x') {
                setXWinCount((prev: number) => prev + 1);
            } else if (winner === 'o') {
                setOWinCount((prev: number) => prev + 1);
            } else if (winner === 'tie') {
                setDraw((prev: number) => prev + 1);
            }
        };
        updateScore();
    }, [winner]);

    return (
        <div id='main' className="main-cont">
            <h3>Game ID: {gameId}</h3>
            <h3>{!disable ? 'Your Turn' : 'Waiting for opponents move'}</h3>
            <Grid grid={grid} onClick={handleClick} disabled={disable} />
            {showWinner()}
            <div className='controls'>
                <div className='playerone'>Player X</div>
                <div className='tie'>Tie</div>
                <div className='playertwo'>Player O</div>
                <div className='playerOneScore'>{xWinCount}</div>
                <div className='tieScore'>{draw}</div>
                <div className='playerTwoScore'>{oWinCount}</div>
            </div>
        </div>
    );
}

export default Game;
