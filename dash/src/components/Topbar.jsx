import { HiMenuAlt1 } from 'react-icons/hi'
import { RiUser4Fill } from 'react-icons/ri'

const Topbar = () => {
    return (
        <div className="topbar py-2 px-4 h-16 bg-white w-10/12 flex items-center justify-between fixed z-10 shadow-lg">
            <HiMenuAlt1 className='h-6 w-6' />
            <RiUser4Fill className='h-6 w-6 text-theme z-10' />
        </div>
    )
}
export default Topbar