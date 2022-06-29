import { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { FiTrash } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const TableDetailRow = (props) => {

    const [isActive, setIsActive] = useState(props.brand.isActive)
    const navigate = useNavigate()

    const changeStatus = (status) => {
        axios.post(`${process.env.REACT_APP_API_URI}/brands/changestatus`, {
            id: props.brand._id,
            isActive: status
        })
            .then(res => {
                setIsActive(status)
            })
            .catch(err => console.log(err))
    }


    return (
        <tr key={props.index} className='border-b'>
            <td className='text-sm font-medium px-1 py-3'>{props.index + 1}</td>
            <td className='text-sm font-medium px-1 py-3'>
                <img src={props.brand.icon_desktop} className='rounded-full h-8 w-8' alt="" />
            </td>
            <td className='text-sm font-medium px-1 py-3 cursor-pointer text-blue-500' onClick={() => navigate(`/brands/view/${props.brand._id}`)}>{props.brand.name}</td>
            <td className='text-sm font-medium px-1 py-3'>{props.brand.slug}</td>
            <td className='text-sm font-medium px-1 py-3'>
                {
                    isActive ?
                        <span onClick={() => changeStatus(false)} className='text-green-600 text-sm bg-green-200 p-1 rounded cursor-pointer'>active</span> :
                        <span onClick={() => changeStatus(true)} className='text-red-600 text-sm bg-red-200 p-1 rounded cursor-pointer'>inactive</span>
                }
            </td>
            <td className='text-sm font-medium px-1 py-3 flex items-center'>
                <MdEdit onClick={() => navigate(`/brands/edit/${props.brand._id}`)} className='h-4 w-4 mr-2 text-gray-500 cursor-pointer' />
                {/* <FiTrash className='h-4 w-4 text-red-500 cursor-pointer' /> */}
            </td>
        </tr>
    )
}
export default TableDetailRow