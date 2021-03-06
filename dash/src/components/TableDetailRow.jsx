import { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { FiTrash } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useQueryClient, useMutation } from 'react-query'

const TableDetailRow = (props) => {

    const navigate = useNavigate()
    let queryClient = useQueryClient()

    const changeStatus = (status) => {
        return axios.post(`${import.meta.env.VITE_API_URI}/brands/changestatus`, {
            id: props.rowData._id,
            isActive: status
        })
    }

    const { mutate } = useMutation(changeStatus, {
        onSuccess: (data, variables, context) => {
            queryClient.setQueryData(['pageData', props.page], (oldQuery) => {
                let oldData = oldQuery.data.filter(item => item._id === data.data.data._id)

                let updateIndex = oldQuery.data.indexOf(oldData[0])

                let newData = [...oldQuery.data]
                newData[updateIndex] = data.data.data

                return {
                    ...oldQuery,
                    data: [...newData]
                }
            })
        }
    })


    return (
        <tr key={props.index} className='border-b'>
            <td className='text-sm font-medium px-1 py-3'>{props.index + 1}</td>
            <td className='text-sm font-medium px-1 py-3'>
                <img src={props.rowData.icon_desktop} className='rounded-full h-8 w-8' alt="" />
            </td>
            <td className='text-sm font-medium px-1 py-3 cursor-pointer text-blue-500' onClick={() => navigate(`/brands/view/${props.rowData._id}`)}>{props.rowData.name}</td>
            <td className='text-sm font-medium px-1 py-3'>{props.rowData.slug}</td>
            <td className='text-sm font-medium px-1 py-3'>
                {
                    props.rowData.isActive ?
                        <span onClick={() => mutate(false)} className='text-green-600 text-sm bg-green-200 p-1 rounded cursor-pointer'>active</span> :
                        <span onClick={() => mutate(true)} className='text-red-600 text-sm bg-red-200 p-1 rounded cursor-pointer'>inactive</span>
                }
            </td>
            <td className='text-sm font-medium px-1 py-3 flex items-center'>
                <MdEdit onClick={() => navigate(`/brands/edit/${props.rowData._id}`)} className='h-4 w-4 mr-2 text-gray-500 cursor-pointer' />
                {/* <FiTrash className='h-4 w-4 text-red-500 cursor-pointer' /> */}
            </td>
        </tr>
    )
}
export default TableDetailRow