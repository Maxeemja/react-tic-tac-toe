import { useRef } from 'react';
import { useState } from 'react';

function Player({ initialName, symbol, isActive }) {
	const [name, setName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);
	const inputRef = useRef();

	return (
		<li className={isActive ? 'active' : undefined}>
			<span className='player'>
				{isEditing ? (
					<input
						ref={inputRef}
						type='text'
						required
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				) : (
					<span className='player-name'>{name}</span>
				)}
				<span className='player-symbol'>{symbol}</span>
			</span>
			<button onClick={() => setIsEditing((editing) => !editing)}>
				{isEditing ? 'Save' : 'Edit'}
			</button>
		</li>
	);
}

export default Player;
