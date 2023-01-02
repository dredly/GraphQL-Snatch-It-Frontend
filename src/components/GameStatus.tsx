import { Status } from "../types";

const GameStatus = ({ status }: {status: Status}) => {
    const statusDisplay = new Map<Status, string>([
        ['NOT_STARTED', 'Not started'],
        ['IN_PROGRESS', 'In progress'],
        ['FINISHED', 'Finished']
    ]);

    return <p>status: {statusDisplay.get(status)}</p>

}

export default GameStatus;