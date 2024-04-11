import { useState } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning_combinations';
import GameOver from './components/GameOver';

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

function deriveActivePlayer(gameTurns) {
	let currentPlayer = 'X';

	if (gameTurns.length && gameTurns[0].player === 'X') {
		currentPlayer = 'O';
	}
	return currentPlayer;
}

function App() {
	const [gameTurns, setGameTurns] = useState([]);
	// const [hasWinner, setHasWinner] = useState(false);

	const activePlayer = deriveActivePlayer(gameTurns);

	let gameBoard = [...initialGameBoard.map((array) => [...array])];

	for (let turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}

	let winner = null;

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol =
			gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol =
			gameBoard[combination[2].row][combination[2].column];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = firstSquareSymbol;
		}
	}

	let isDraw = gameTurns.length == 9 && !winner;

	function handleSelectSquare(row, col) {
		setGameTurns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);
			const updatedTurns = [
				{ square: { row, col }, player: currentPlayer },
				...prevTurns
			];
			return updatedTurns;
		});
	}

	function reset() {
		// winner = null;
		// isDraw = false;
		// gameBoard = initialGameBoard;
		setGameTurns([]);
	}

	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player
						initialName='Player 1'
						symbol='X'
						isActive={activePlayer === 'X'}
					/>
					<Player
						initialName='Player 2'
						symbol='O'
						isActive={activePlayer === 'O'}
					/>
				</ol>
				{(winner || isDraw) && <GameOver onRematch={reset} winner={winner} />}
				<GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
