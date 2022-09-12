import { SyntheticEvent } from "react"

const WriteWordForm = ({onSubmit, submitButtonText}: {onSubmit: (evt: SyntheticEvent) => void, submitButtonText: string}) => {
    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="wordInput" />
            <button type="submit">{submitButtonText}</button>
        </form>
    )
}

export default WriteWordForm