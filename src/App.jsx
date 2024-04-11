import { useState } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning_combinations';
import GameOver from './components/GameOver';

const PLAYERS = {
	X: 'Player 1',
	O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
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

function deriveWinner(gameBoard, players) {
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
			winner = players[firstSquareSymbol];
		}
	}
	return winner;
}

function deriveGameBoard(gameTurns) {
	let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

	for (let turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}

	return gameBoard;
}

function App() {
	const [players, setPlayers] = useState(PLAYERS);

	const [gameTurns, setGameTurns] = useState([]);

	const activePlayer = deriveActivePlayer(gameTurns);

	const gameBoard = deriveGameBoard(gameTurns);

	const winner = deriveWinner(gameBoard, players);

	const isDraw = gameTurns.length == 9 && !winner;

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
		setGameTurns([]);
	}

	function handlePlayerNameChange(symbol, newName) {
		setPlayers((prevPlayers) => ({
			...prevPlayers,
			[symbol]: newName
		}));
	}

	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player
						initialName={PLAYERS.X}
						symbol='X'
						isActive={activePlayer === 'X'}
						onChangeName={handlePlayerNameChange}
					/>
					<Player
						initialName={PLAYERS.O}
						symbol='O'
						isActive={activePlayer === 'O'}
						onChangeName={handlePlayerNameChange}
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
