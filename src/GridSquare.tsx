import React from "react";
import "./GridSquare.css";

interface Props {
    value: string;
    onClick: () => void;
    disabled: boolean;
}

function GridSquare({value, onClick, disabled}: Props) {

    return (
        <button className={`square ${value ? value: ""}`} onClick={onClick} disabled={disabled}><span>{value}</span></button>
    )
}

export default GridSquare;
