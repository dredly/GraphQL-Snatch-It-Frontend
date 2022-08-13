import { useQuery, useSubscription } from "@apollo/client"
import { ALL_GAMES } from "../queries"
import { GAME_ADDED } from "../subscriptions"
import { GameInfo } from "../types"
import Game from "./Game"

const Lobby = () => {
	useSubscription(GAME_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			console.log(subscriptionData)
		}
	})

	const queryResult = useQuery(ALL_GAMES)

	if (queryResult.loading) {
		return <div>...loading</div>;
	}

	const games = queryResult.data.allGames as GameInfo[];

	const handleNewGame = () => {
		addGame({variables: {playerId: }})
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