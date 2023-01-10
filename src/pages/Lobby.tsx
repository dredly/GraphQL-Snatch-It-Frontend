import { useMutation, useQuery, useSubscription, useApolloClient } from "@apollo/client"
import { ALL_GAMES } from "../graphql/queries"
import { CREATE_GAME } from "../graphql/mutations"
import { GAME_ENDED_LOBBY, GAME_INFO_ADDED, GAME_INFO_UPDATED, GAME_REMOVED_LOBBY, GAME_STARTED, GAME_STARTED_LOBBY } from "../graphql/subscriptions"
import { Game, GameInfo, Message, Player } from "../types"
import GameInLobby from "../components/GameInLobby"
import GameInLobbyOverview from "../components/GameInLobbyOverview"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from ".."
import RedirectPage from "./RedirectPage"
import InGameMessage from "../components/InGameMessage"

const Lobby = ({setGameInProgressId}: {setGameInProgressId: React.Dispatch<React.SetStateAction<string>>}) => {
	const navigate = useNavigate()
	const client = useApolloClient()

	const [inGame, setInGame] =  useState(false)
	const [message, setMessage] = useState<Message | null>(null)
	
	const currentPlayerId = useContext(UserContext)

	useSubscription(GAME_INFO_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedGame = subscriptionData.data.gameAdded
			client.cache.updateQuery({query: ALL_GAMES}, ({ allGames }) => {
				return {
					allGames: allGames.concat(addedGame),
				}
			})
		}
	})

	useSubscription(GAME_INFO_UPDATED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const updatedGame = subscriptionData.data.gameUpdated
			const gameId = updatedGame.id
			client.cache.updateQuery({query: ALL_GAMES}, ({ allGames }) => {
				return {
					allGames: allGames.map((g: { id: string }) => g.id === gameId ? updatedGame : g),
				}
			})
		}
	})

	useSubscription(GAME_STARTED_LOBBY, {
		onSubscriptionData: ({ subscriptionData }) => {
			const startedGame: GameInfo = subscriptionData.data.gameStarted
			const gameId = startedGame.id
			client.cache.updateQuery({query: ALL_GAMES}, ({ allGames }) => {
				return {
					allGames: allGames.map((g: { id: string }) => g.id === gameId ? startedGame : g)
				}
			})
		}
	})

	useSubscription(GAME_ENDED_LOBBY, {
		onSubscriptionData: ({ subscriptionData }) => {
			const endedGame: GameInfo = subscriptionData.data.gameEnded
			const gameId = endedGame.id
			client.cache.updateQuery({query: ALL_GAMES}, ({ allGames }) => {
				return {
					allGames: allGames.map((g: { id: string }) => g.id === gameId ? endedGame : g)
				}
			})
		}
	})

	useSubscription(GAME_REMOVED_LOBBY, {
		onSubscriptionData: ({ subscriptionData }) => {
			const removedGame: GameInfo = subscriptionData.data.gameRemoved
			const gameId = removedGame.id
			client.cache.updateQuery({query: ALL_GAMES}, ({ allGames }) => {
				return {
					allGames: allGames.filter((g: { id: string }) => g.id !== gameId)
				}
			})
		}
	})

	useSubscription(GAME_STARTED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const startedGame: Game = subscriptionData.data.gameInProgressStarted
			const gameId = startedGame.id
			// Only redirect to the game page for players who are actually in the game
			const inGamePlayerIds: string[] = startedGame.players.map((p: Player) => p.id)
			if (inGamePlayerIds.includes(currentPlayerId)) {
				setGameInProgressId(gameId)
				navigate('/game')
			}
		}
	})

	const queryResult = useQuery(ALL_GAMES)

	const [addGame] = useMutation(CREATE_GAME)

	if (queryResult.loading) {
		return <div>...loading</div>;
	}

	if (queryResult.error) {
		return <div>Query error</div>
	}

	const games: GameInfo[] = queryResult.data.allGames;

	const handleNewGame = () => {
		setInGame(true)
		setMessage({ text: "Created Game" })
		addGame({variables: {playerId: currentPlayerId}})
	}

	if (!currentPlayerId)  {
		return <RedirectPage />
	}

	return (
		<div>
			<InGameMessage message={message}/>
			<h1>{games.length} games currently open</h1>
			{games.map(g => (
				g.status === "NOT_STARTED"
					? <GameInLobby gameInfo={g} setMessage={setMessage} key={g.id} />
					: <GameInLobbyOverview status={g.status} players={g.players} id={g.id} key={g.id} />
			))}
			{inGame
				? null
				: <button onClick={handleNewGame}>Create a new game</button>
			}
		</div>
	)
}

export default Lobby