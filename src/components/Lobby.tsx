import { useMutation, useQuery, useSubscription, useApolloClient } from "@apollo/client"
import { ALL_GAMES } from "../queries"
import { CREATE_GAME } from "../mutations"
import { GAME_ADDED } from "../subscriptions"
import { GameInfo } from "../types"
import Game from "./Game"

const Lobby = ({ currentPlayerId }: {currentPlayerId: string}) => {
	const client = useApolloClient()

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

	const queryResult = useQuery(ALL_GAMES)

	const [addGame] = useMutation(CREATE_GAME)

	if (queryResult.loading) {
		return <div>...loading</div>;
	}

	const games = queryResult.data.allGames as GameInfo[];

	const handleNewGame = () => {
		addGame({variables: {playerId: currentPlayerId}})
	}

	return (
		<div>
			<h1>{games.length} games currently open</h1>
			{games.map(g => (
				<Game players={g.players} id={g.id} key={g.id} />
			))}
			<button onClick={handleNewGame}>Create a new game</button>
		</div>
	)
}

export default Lobby