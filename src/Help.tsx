import React from 'react';
import { useState, useEffect } from 'react';
import './Help.css';

export default function Help() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

    }, [show]);

    return (
        <>
            <button className='help-icon' onClick={() => setShow(true)}>
                <i className='far fa-question-circle fa-2x'></i>
            </button>
            <div className='howtoplay' style={{ display: show ? 'block' : 'none' }}>
                <div className='title'>
                    <h2>HOW TO PLAY</h2>
                    <button onClick={() => setShow(false)}>X</button>
                </div>

                <p>1. The game is played on a square grid of 3 by 3 size.</p>
                <p>
                    2. You are <strong>X</strong>, your friend (or the computer) is{' '}
                    <strong>O</strong>. Players take turns putting their marks in an empty
                    square.
                </p>
                <p>
                    3. The first player to get 3 of their marks in a row (up, down,
                    across, or diagonally) is the winner.
                </p>
                <p>
                    4. When all 9 squares are full, the game is over. If no player has 3
                    marks in a row, the game ends in a tie.
                </p>
            </div>
        </>
    );
}
