import { Status } from "../types"

interface GameInLobbyOverviewProps {
    status: Status
    numPlayers: number
}

const GameInLobbyOverview = (props: GameInLobbyOverviewProps) => {
    return (
        <div>
            <h3>Game with {props.numPlayers} players</h3>
            <p>{props.status}</p>
        </div>
    )
}

export default GameInLobbyOverview