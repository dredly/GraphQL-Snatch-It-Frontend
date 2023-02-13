import styled from "styled-components"
import { Message, MessageColour } from "../types"

interface Props {
    colour: MessageColour
}

const MessageContainer = styled.div`
    height: 25px;
`

const MessageText = styled.h4<Props>`
    color: ${props => props.colour};
`

const InGameMessage = ({ message }: {message: Message | null}) => {
    return (
        <MessageContainer>
            {
                message 
                ? <MessageText colour={message.colour}>{message.text}</MessageText> 
                : null
            }
        </MessageContainer>
    )

}

export default InGameMessage