import { GameInfo } from "../types"
import { MAX_PLAYERS } from "../utils/constants"
import GameStatus from "./GameStatus"

const GameInLobbyOverview = (props: GameInfo) => {
    return (
        <div>
            <h3>{`${props.players[0].name}'s game`}</h3>
            <p>{props.players.length}/{MAX_PLAYERS} players</p>
            <GameStatus status={props.status} />
        </div>
    )
}

export default GameInLobbyOverview