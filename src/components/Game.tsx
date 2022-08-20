import { GameInfo } from "../types"
import { useContext } from "react"
import { UserContext } from ".."
import PlayerInGame from "./PlayerInGame"
import { useMutation } from "@apollo/client"
import { JOIN_GAME } from "../mutations"

const Game = (props: GameInfo) => {
	const currentPlayerId = useContext(UserContext)

	const [join] = useMutation(JOIN_GAME)

	const joinGame = async () => {
		await join({variables: {playerId: currentPlayerId, gameId: props.id}})
	}

	const allPlayersReady: boolean = props.players.filter(p => p.ready).length === props.players.length
	
	return (
		<div>
			<h2>{`${props.players[0].name}'s game`}</h2>
			<p>Not yet started</p>
			<h3>Players</h3>
			{props.players.map(p => (
				<PlayerInGame player={p} key={p.id}/>
			))}
			{props.players.map(p => p.id).includes(currentPlayerId)
				? null
				: <button onClick={joinGame}>Join</button>
			}
			<div>
				{currentPlayerId === props.players[0].id
					? <button disabled={!allPlayersReady}>Start game</button>
					: null
				}
			</div>
		</div>
	)
}

export default Game