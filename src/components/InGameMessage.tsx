import { Message } from "../types"

const InGameMessage = ({ message }: {message: Message | null}) => {
    if (message) return <h4>{ message.text }</h4>
    return <></>
}

export default InGameMessage