import { useState } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import Player from './components/Player';
import Log from './components/Log';

function App() {
	const [gameTurns, setGameTurns] = useState([]);
	const [activePlayer, setActivePlayer] = useState('X');

	function handleSelectSquare(row, col) {
		setActivePlayer((current) => (current === 'X' ? 'O' : 'X'));
		setGameTurns((prevTurns) => {
			let currentPlayer = 'X';

			if (prevTurns.length && prevTurns[0].player === 'X') {
				currentPlayer = 'O';
			}

			const updatedTurns = [
				{ square: { row, col }, player: currentPlayer },
				...prevTurns
			];
			return updatedTurns;
		});
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
				<GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
