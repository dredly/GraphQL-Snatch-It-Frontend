import { GameSummaryWithNames } from "../types"
import { useMutation } from "@apollo/client";
import { REMOVE_GAME } from "../graphql/mutations";
import { useEffect } from "react";

const Summary = ({summary}: {summary: GameSummaryWithNames}) => {
    const [removeGame] = useMutation(REMOVE_GAME);

    useEffect(() => {
        removeGame({
            variables: {
                gameId: summary.id
            }
        })
    }, []);

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