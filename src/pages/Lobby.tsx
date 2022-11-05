import { useMutation, useQuery, useSubscription, useApolloClient } from "@apollo/client"
import { ALL_GAMES } from "../graphql/queries"
import { CREATE_GAME } from "../graphql/mutations"
import { GAME_INFO_ADDED, GAME_INFO_UPDATED, GAME_STARTED } from "../graphql/subscriptions"
import { GameInfo } from "../types"
import GameInLobby from "../components/GameInLobby"
import { useState, useContext } from "react"
import { UserContext } from ".."
import RedirectPage from "./RedirectPage"

const Lobby = () => {
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

	// TODO: Only redirect to the game page for players who are actually in the game
	useSubscription(GAME_STARTED, {
		onSubscriptionData: ({ subscriptionData }) => {
			console.log('Got subscription data for starting game in progress')
			const startedGame = subscriptionData.data.gameInProgressStarted
			const gameId = startedGame.id
			console.log(`Starting game with id = ${gameId}`)
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
				<GameInLobby players={g.players} id={g.id} key={g.id} />
			))}
			{inGame
				? null
				: <button onClick={handleNewGame}>Create a new game</button>
			}
		</div>
	)
}

export default Lobby