import { GameInfo } from "../types"

const GameInLobbyOverview = (props: GameInfo) => {
    return (
        <div>
            <h3>Game with {props.players.length} players</h3>
            <p>{props.status}</p>
        </div>
    )
}

export default GameInLobbyOverview