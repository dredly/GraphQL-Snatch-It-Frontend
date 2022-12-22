import { useMutation, useQuery, useSubscription, useApolloClient } from "@apollo/client"
import { ALL_GAMES } from "../graphql/queries"
import { CREATE_GAME } from "../graphql/mutations"
import { GAME_INFO_ADDED, GAME_INFO_UPDATED, GAME_STARTED } from "../graphql/subscriptions"
import { GameInfo, Player } from "../types"
import GameInLobby from "../components/GameInLobby"
import GameInLobbyOverview from "../components/GameInLobbyOverview"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from ".."
import RedirectPage from "./RedirectPage"

const Lobby = ({setGameInProgressId}: {setGameInProgressId: React.Dispatch<React.SetStateAction<string>>}) => {
	const navigate = useNavigate()
	const client = useApolloClient()
	const [inGame, setInGame] =  useState(false)
	const currentPlayerId = useContext(UserContext)

	useSubscription(GAME_INFO_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			console.log('Got subscription data for adding game')
			const addedGame = subscriptionData.data.gameAdded
			console.log()
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

	useSubscription(GAME_STARTED, {
		onSubscriptionData: ({ subscriptionData }) => {
			console.log('Got subscription data for starting game in progress')
			const startedGame = subscriptionData.data.gameInProgressStarted
			const gameId = startedGame.id

			// Only redirect to the game page for players who are actually in the game
			const inGamePlayerIds: string[] = startedGame.players.map((p: Player) => p.id)
			if (inGamePlayerIds.includes(currentPlayerId)) {
				setGameInProgressId(gameId)
				navigate('/game')
			} else {
				client.cache.updateQuery({query: ALL_GAMES}, ({ allGames }) => {
					return {
						// This might mess up because of returning a gameInProgress instead of a lobbyGame, lets see
						// TODO: fix to use proper types
						allGames: allGames.map((g: { id: string }) => g.id === gameId ? startedGame : g)
					}
				})
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
		addGame({variables: {playerId: currentPlayerId}})
	}

	if (!currentPlayerId)  {
		return <RedirectPage />
	}

	return (
		<div>
			<h1>{games.length} games currently open</h1>
			{games.map(g => (
				g.status === "NOT_STARTED"
					? <GameInLobby status={g.status} players={g.players} id={g.id} key={g.id} />
					: <GameInLobbyOverview status={g.status} numPlayers={g.players.length} key={g.id} />
			))}
			{inGame
				? null
				: <button onClick={handleNewGame}>Create a new game</button>
			}
		</div>
	)
}

export default Lobby