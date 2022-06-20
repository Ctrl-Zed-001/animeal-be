import { Link } from 'react-router-dom'

const sidebar = () => {
    return (
        <div className="sidebar bg-theme p-4 text-white w-2/12 h-screen shadow">
            <h1>Animeal</h1>

            <ul className="pl-10">
                <Link to="/brands">
                    <li>
                        Brands
                    </li>
                </Link>
            </ul>
        </div>
    )
}
export default sidebar