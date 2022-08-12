import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_PLAYER } from "../mutations"

const JoinForm = ({setCurrentPlayer}: {setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>}) => {
	const [playerName, setPlayerName] = useState('')
	const [join] = useMutation(CREATE_PLAYER)
	
	const handleSubmit = (evt: { preventDefault: () => void }) => {
		evt.preventDefault()
		console.log(`Welcome ${playerName}`)
		join({variables: {name: playerName}})
		setCurrentPlayer(playerName)
		setPlayerName('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>Please enter your name
				<input 
					type="text" 
					value={playerName}
					onChange={({target}) => setPlayerName(target.value)} 
				/>
			</label>
			<button type="submit">Confirm</button>
		</form>
	)
}

export default JoinForm