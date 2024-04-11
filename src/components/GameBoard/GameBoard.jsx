import { useState } from 'react';

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

function GameBoard({ onSelectSquare, turns }) {
	let gameBoard = initialGameBoard;

	for (let turn of turns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}

	// const [gameBoard, setGameBoard] = useState(initialGameBoard);

	// function handleSelect(rowIndex, colIndex) {
	// 	setGameBoard((prev) => {
	// 		const updatedBoard = [...prev.map((inner) => [...inner])];
	// 		updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
	// 		return updatedBoard;
	// 	});

	// 	onSelectSquare();
	// }

	return (
		<ol id='game-board'>
			{gameBoard.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button onClick={() => onSelectSquare(rowIndex, colIndex)}>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}

export default GameBoard;
