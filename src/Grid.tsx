import React from "react";
import GridSquare from "./GridSquare";
import "./Grid.css";

interface Props {
    grid: string[];
    onClick: (i: number) => void;
    disabled: boolean;
}

function Grid({ grid, onClick, disabled }: Props) {
    return (
        <div className="board">
            {grid.map((item, i) => (
                <GridSquare key={i} value={item} onClick={() => onClick(i) } disabled={disabled} />
            ))}
        </div>
    )
}

export default Grid;
