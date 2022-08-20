import { Player } from "../types";
import { useContext } from "react"
import { UserContext } from ".."
import { useMutation } from "@apollo/client";
import { DECLARE_READINESS } from "../mutations";

const PlayerInGame = ({player}: {player: Player}) => {
	const currentPlayerId = useContext(UserContext)

	const [toggleReady] = useMutation(DECLARE_READINESS)

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

export default PlayerInGame;