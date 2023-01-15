import { useQuery, useSubscription, useApolloClient, useMutation } from "@apollo/client"
import { useState, useContext } from "react"
import { ONE_GAME_IN_PROGRESS } from "../graphql/queries"
import Summary from "../components/Summary"
import { Game, GameSummary, Message } from "../types"
import PlayerInGame from "../components/PlayerInGame"
import { GameInProgressContext } from ".."
import { GAME_ENDED, GAME_UPDATED } from "../graphql/subscriptions"
import { END_GAME } from "../graphql/mutations"
import InGameMessage from "../components/InGameMessage"
import LetterPool from "../components/LetterPool"

const GamePage = () => {
    const client = useApolloClient()

    const [selectedWordIds, setSelectedWordIds] = useState<string[]>([])
    const [gameSummary, setGameSummary] = useState<GameSummary | null>(null)
    const [message, setMessage] = useState<Message | null>(null)

    const gameId = useContext(GameInProgressContext)

    const [endGame] = useMutation(END_GAME)

    const gameQueryResult = useQuery(ONE_GAME_IN_PROGRESS, {
        variables: {
            gameId
        }
    })

    useSubscription(GAME_UPDATED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const updatedGame: Game = subscriptionData.data.gameInProgressUpdated

            //Check if letters all used up
            if (!updatedGame.letters.unflipped.length) {

                setMessage({ text: "Letters have run out! You still have 30 seconds to play." })

                endGame({
                    variables: {
                        gameId: game.id
                    }
                })
                    .catch((err) => { console.log("Game has already been ended", err) } )
            }

            client.cache.updateQuery({query: ONE_GAME_IN_PROGRESS}, () => {
				return {
					oneGameInProgress: updatedGame,
				}
			})
        }
    })

    useSubscription(GAME_ENDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const gameSummaryData: GameSummary = subscriptionData.data.gameInProgressEnded
            setGameSummary(gameSummaryData)
        }
    })

    if (gameQueryResult.loading) {
		return <div>...loading</div>;
	}

	if (gameQueryResult.error) {
        console.log('error', gameQueryResult.error)
		return <div>Query error</div>
	}

    const game: Game = gameQueryResult.data.oneGameInProgress;

    if (gameSummary) {
        const scoreList = gameSummary.scoreList.map(ps => {
            const player = game.players.find(p => p.id === ps.id);
            if (!player) {
                throw new Error("Could not associate a player name with that id")
            }
            return { ...ps, name: player.name }
        })
        return (
            <Summary summary={{
                id: gameSummary.id,
                scoreList
            }}/>
        )
    }

    return (
        <div>
            <InGameMessage message={message}/>
            {game.players.map(p => {
                return (
                    <PlayerInGame 
                        player={p} game={game} key={p.id}
                        selectedWordIds={selectedWordIds}
                        setSelectedWordIds={setSelectedWordIds}
                        setMessage={setMessage} 
                    />
                )
            })}
            <h3>Letter Pool</h3>
            <LetterPool letters={game.letters.flipped}/>
        </div>
    )
}

export default GamePage