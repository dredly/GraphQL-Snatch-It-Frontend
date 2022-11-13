import { GameSummaryWithNames } from "../types"

const Summary = ({summary}: {summary: GameSummaryWithNames}) => {
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