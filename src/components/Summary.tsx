import { GameSummary } from "../types"

const Summary = ({summary}: {summary: GameSummary}) => {
    return (
        <>
            <h2>Scores</h2>
            <ol>
                {summary.scoreList.map(ps => <li key={ps.id}>{ps.score}</li>)}
            </ol>
        </>
    )
}

export default Summary