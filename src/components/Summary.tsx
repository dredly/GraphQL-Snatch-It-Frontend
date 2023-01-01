import { useMutation } from "@apollo/client"
import { useEffect } from "react"
import { REMOVE_GAME } from "../graphql/mutations"
import { GameSummaryWithNames } from "../types"

const Summary = ({summary}: {summary: GameSummaryWithNames}) => {
    const [removeGame] = useMutation(REMOVE_GAME)

    useEffect(() => {
        removeGame({
            variables: {
                gameId: summary.id
            }
        })
            .then(() => { console.log("Removed game") })
            .catch((err) => { console.log("Game has already been removed", err) } )
    }, [])

    return (
        <>
            <h2>Scores</h2>
            <ol>
                {summary.scoreList.map(ps => <li key={ps.id}>{ps.name} - {ps.score}</li>)}
            </ol>
        </>
    )
}

export default Summary