import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_PLAYER } from "../mutations"
import { useNavigate } from "react-router-dom"

const JoinForm = ({setCurrentPlayer}: {setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>}) => {
	const navigate = useNavigate()
	const [playerName, setPlayerName] = useState('')
	const [join] = useMutation(CREATE_PLAYER)
	
	const handleSubmit = async (evt: { preventDefault: () => void }) => {
		evt.preventDefault()
		console.log(`Welcome ${playerName}`)
		const { data } = await join({variables: {name: playerName}})
		setCurrentPlayer(data.createPlayer.id)
		setPlayerName('')
		navigate('/lobby')
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