import { GameInfo } from "../types"
import { useContext } from "react"
import { UserContext } from ".."

const Game = (props: GameInfo) => {
	const currentPlayerId = useContext(UserContext)
	
	return (
		<div>
			<h2>{`${props.players[0].name}'s game`}</h2>
			<p>Not yet started</p>
			{props.players.map(p => p.id).includes(currentPlayerId)
				? null
				: <button>Join</button>
			}
		</div>
	)
}

export default Game