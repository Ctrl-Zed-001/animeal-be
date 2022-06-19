import { HiMenuAlt1 } from 'react-icons/hi'
import { RiUser4Fill } from 'react-icons/ri'

const Topbar = () => {
    return (
        <div className="topbar p-2 h-16 bg-white w-full flex items-center justify-between">
            <HiMenuAlt1 className='h-6 w-6' />
            <RiUser4Fill className='h-6 w-6 text-theme' />
        </div>
    )
}
export default Topbar