import { GameInfo } from "../types"
import { useContext } from "react"
import { UserContext } from ".."
import PlayerInLobbyGame from "./PlayerInLobbyGame"
import { useMutation } from "@apollo/client"
import { CREATE_GAME_IN_PROGRESS, JOIN_GAME, START_GAME } from "../graphql/mutations"
import GameStatus from "./GameStatus"
import { MAX_PLAYERS } from "../utils/constants"

const GameInLobby = (props: GameInfo) => {

	const currentPlayerId = useContext(UserContext)

	const [join] = useMutation(JOIN_GAME)
	const [start] = useMutation(START_GAME)
	const [createInProgress] = useMutation(CREATE_GAME_IN_PROGRESS)

	const joinGame = async () => {
		await join({variables: {playerId: currentPlayerId, gameId: props.id}})
	}

	const startGame = async () => {
		const startedGameResult = await start({variables: {playerId: currentPlayerId}})
		console.log('Started game')
		const startedGame: GameInfo = startedGameResult.data.startGame;
		const gameInput = {
			id: startedGame.id,
			players: startedGame.players.map(p => ({id: p.id, name: p.name, ready: p.ready})),
		}
		console.log('Game input')
		console.dir(gameInput, {depth: null})
		const gameInProgressResult = await createInProgress({ variables: {game: gameInput}})
		console.dir(gameInProgressResult, {depth: null})
	}

	const allPlayersReady: boolean = props.players.filter(p => p.ready).length === props.players.length
	
	return (
		<div>
			<h2>{`${props.players[0].name}'s game`}</h2>
			<GameStatus status={props.status} />
			<h3>{props.players.length}/{MAX_PLAYERS} players</h3>
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