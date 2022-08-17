import { useMutation, useQuery, useSubscription, useApolloClient } from "@apollo/client"
import { ALL_GAMES } from "../queries"
import { CREATE_GAME } from "../mutations"
import { GAME_ADDED, PLAYER_JOINED } from "../subscriptions"
import { GameInfo } from "../types"
import Game from "./Game"
import { useState, useContext } from "react"
import { UserContext } from ".."

const Lobby = () => {
	const client = useApolloClient()
	const [inGame, setInGame] =  useState(false)
	const currentPlayerId = useContext(UserContext)

	useSubscription(GAME_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedGame = subscriptionData.data.gameAdded
			client.cache.updateQuery({query: ALL_GAMES}, ({ allGames }) => {
				return {
					allGames: allGames.concat(addedGame),
				}
			})
		}
	})

	useSubscription(PLAYER_JOINED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const updatedGame = subscriptionData.data.playerJoined
			const gameId = updatedGame.id
			client.cache.updateQuery({query: ALL_GAMES}, ({ allGames }) => {
				return {
					allGames: allGames.map((g: { id: string }) => g.id === gameId ? updatedGame : g),
				}
			})
		}
	})

	const queryResult = useQuery(ALL_GAMES)

	const [addGame] = useMutation(CREATE_GAME)

	if (queryResult.loading) {
		return <div>...loading</div>;
	}

	const games = queryResult.data.allGames as GameInfo[];

	const handleNewGame = () => {
		setInGame(true)
		addGame({variables: {playerId: currentPlayerId}})
	}

	return (
		<div>
			<h1>{games.length} games currently open</h1>
			{games.map(g => (
				<Game players={g.players} id={g.id} key={g.id} />
			))}
			{inGame
				? null
				: <button onClick={handleNewGame}>Create a new game</button>
			}
		</div>
	)
}

export default Lobby