import styled from "styled-components"
import { Message } from "../types"

const MessageContainer = styled.div`
    height: 25px;
`

const InGameMessage = ({ message }: {message: Message | null}) => {
    return (
        <MessageContainer>
            <h4>{ message ? message.text : "" }</h4>
        </MessageContainer>
    )

}

export default InGameMessage