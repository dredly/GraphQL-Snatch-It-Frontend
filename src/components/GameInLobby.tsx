import { GameInfo, Message } from "../types"
import { useContext } from "react"
import { UserContext } from ".."
import PlayerInLobbyGame from "./PlayerInLobbyGame"
import { useMutation } from "@apollo/client"
import { CREATE_GAME_IN_PROGRESS, JOIN_GAME, START_GAME } from "../graphql/mutations"
import GameStatus from "./GameStatus"
import { MAX_PLAYERS } from "../utils/constants"

const GameInLobby = (
		{ gameInfo, setMessage }: { gameInfo: GameInfo, setMessage: React.Dispatch<React.SetStateAction<Message | null>> }
	) => {

	const currentPlayerId = useContext(UserContext)

	const [join] = useMutation(JOIN_GAME)
	const [start] = useMutation(START_GAME)
	const [createInProgress] = useMutation(CREATE_GAME_IN_PROGRESS)

	const joinGame = async () => {
		await join({variables: {playerId: currentPlayerId, gameId: gameInfo.id}})
		setMessage({
			text: `Joined ${gameInfo.players[0].name}'s game`
		})
	}

	const startGame = async () => {
		const startedGameResult = await start({variables: {playerId: currentPlayerId}})
		const startedGame: GameInfo = startedGameResult.data.startGame;
		const gameInput = {
			id: startedGame.id,
			players: startedGame.players.map(p => ({id: p.id, name: p.name, ready: p.ready})),
		}
		await createInProgress({ variables: {game: gameInput}})
	}

	const allPlayersReady: boolean = gameInfo.players.filter(p => p.ready).length === gameInfo.players.length
	
	return (
		<div>
			<h2>{`${gameInfo.players[0].name}'s game`}</h2>
			<GameStatus status={gameInfo.status} />
			<h3>{gameInfo.players.length}/{MAX_PLAYERS} players</h3>
			{gameInfo.players.map(p => (
				<PlayerInLobbyGame player={p} key={p.id}/>
			))}
			{gameInfo.players.map(p => p.id).includes(currentPlayerId)
				? null
				: <button onClick={joinGame}>Join</button>
			}
			<div>
				{currentPlayerId === gameInfo.players[0].id
					? <button disabled={!allPlayersReady} onClick={startGame}>Start game</button>
					: null
				}
			</div>
		</div>
	)
}

export default GameInLobby