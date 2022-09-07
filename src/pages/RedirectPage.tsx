import { Link } from "react-router-dom"

const RedirectPage = () => {
    return (
        <div>
            <p>
                Please enter a player name and join the Lobby
            </p>
            <Link to='/'>Enter Name</Link>
        </div>
        
    )
}

export default RedirectPage