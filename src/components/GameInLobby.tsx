import { GameInfo } from "../types"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from ".."
import PlayerInLobbyGame from "./PlayerInLobbyGame"
import { useMutation } from "@apollo/client"
import { JOIN_GAME, START_GAME } from "../mutations"

const GameInLobby = (props: GameInfo) => {
	const navigate = useNavigate()

	const currentPlayerId = useContext(UserContext)

	const [join] = useMutation(JOIN_GAME)
	const [start] = useMutation(START_GAME)

	const joinGame = async () => {
		await join({variables: {playerId: currentPlayerId, gameId: props.id}})
	}

	const startGame = async () => {
		console.log('About to start game')
		await start({variables: {gameId: props.id}})
		console.log('Started game')
		navigate(`/game/${props.id}`)
	}

	const allPlayersReady: boolean = props.players.filter(p => p.ready).length === props.players.length
	
	return (
		<div>
			<h2>{`${props.players[0].name}'s game`}</h2>
			<p>Not yet started</p>
			<h3>Players</h3>
			{props.players.map(p => (
				<PlayerInLobbyGame player={p} key={p.id}/>
			))}
			{props.players.map(p => p.id).includes(currentPlayerId)
				? null
				: <button onClick={joinGame}>Join</button>
			}
			<div>
				{currentPlayerId === props.players[0].id
					? <button disabled={!allPlayersReady} onClick={startGame}>Start game</button>
					: null
				}
			</div>
		</div>
	)
}

export default GameInLobby