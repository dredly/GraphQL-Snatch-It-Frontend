import { PlayerInfo } from "../types";
import { useContext } from "react"
import { UserContext } from ".."
import { useMutation } from "@apollo/client";
import { TOGGLE_READY } from "../graphql/mutations";

const PlayerInLobbyGame = ({player}: {player: PlayerInfo}) => {
	const currentPlayerId = useContext(UserContext)

	const [toggleReady] = useMutation(TOGGLE_READY)

	const toggleReadiness = () => {
		toggleReady({variables: {
			playerId: currentPlayerId
		}})
	}

	return (
		<div>
			{player.name} - {player.ready ? 'READY' : 'NOT READY'}
			{player.id === currentPlayerId 
				? <button onClick={toggleReadiness}>
					{player.ready ? 'not ready' : 'ready'}
				</button> 
				: null
			}
		</div>
	)
}

export default PlayerInLobbyGame;