import { useRef } from 'react';
import { useState } from 'react';

function Player({ initialName, symbol, isActive, onChangeName }) {
	const [name, setName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	function handleEditSave() {
		setIsEditing((editing) => !editing);

		if (isEditing) {
			onChangeName(symbol, name);
		}
	}

	return (
		<li className={isActive ? 'active' : undefined}>
			<span className='player'>
				{isEditing ? (
					<input
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
			<button onClick={handleEditSave}>{isEditing ? 'Save' : 'Edit'}</button>
		</li>
	);
}

export default Player;
