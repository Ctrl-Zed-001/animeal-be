import { NavLink } from 'react-router-dom'
import { BsBoxSeam } from 'react-icons/bs'
import { FaCertificate } from 'react-icons/fa'
import { MdSpaceDashboard } from 'react-icons/md'

const sidebar = () => {
    return (
        <div className="sidebar bg-theme p-4 text-white w-2/12 h-screen shadow fixed">
            <h1 className='text-xl text-center'>Animeal</h1>

            <ul className="pl-6 mt-10 text-sm">
                <NavLink to="/">
                    <li className='my-4 flex items-center gap-3'>
                        <MdSpaceDashboard />
                        Dashboard
                    </li>
                </NavLink>
                <NavLink to="/brands">
                    <li className='my-4 flex items-center gap-3'>
                        <FaCertificate />
                        Brands
                    </li>
                </NavLink>
                <NavLink to="/products">
                    <li className='my-4 flex items-center gap-3'>
                        <BsBoxSeam />
                        Products
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}
export default sidebar