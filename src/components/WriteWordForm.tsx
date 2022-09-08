import { SyntheticEvent } from "react"

const WriteWordForm = ({onSubmit}: {onSubmit: (evt: SyntheticEvent) => void}) => {
    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="wordInput" />
            <button type="submit">Write</button>
        </form>
    )
}

export default WriteWordForm