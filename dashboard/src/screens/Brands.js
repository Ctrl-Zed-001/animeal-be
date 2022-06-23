import { BiSearchAlt, BiPlus } from 'react-icons/bi'
import { MdEdit } from 'react-icons/md'
import { FiTrash } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Brands = () => {

    const [brands, setBrands] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URI}/brands/getall`)
            .then(res => {
                setBrands(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="container p-4">
            <h1 className="text-2xl font-semibold uppercase">Brands</h1>

            <div className="text-theme card bg-white p-4 rounded mt-8">
                <div className="flex justify-between items-center">
                    <div className="input-holder relative">
                        <BiSearchAlt className='h-5 w-5 absolute top-3 left-2' />
                        <input type="text" className="rounded border border-black p-2 pl-8" />
                    </div>
                    <Link to="/brands/add" className=' flex items-center rounded bg-theme p-2'>
                        <BiPlus className='h-5 w-5 mr-1' />
                        add new brand
                    </Link>
                </div>


                <table className='w-full mt-8 rounded text-left'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='text-sm font-medium p-1'>#</th>
                            <th className='text-sm font-medium p-1'>Icon</th>
                            <th className='text-sm font-medium p-1'>Name</th>
                            <th className='text-sm font-medium p-1'>Slug</th>
                            <th className='text-sm font-medium p-1'>Status</th>
                            <th className='text-sm font-medium p-1'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            brands?.map((brand, index) => {
                                return (
                                    <tr key={index} className='border-b'>
                                        <td className='text-sm font-medium px-1 py-3'>{index + 1}</td>
                                        <td className='text-sm font-medium px-1 py-3'>
                                            <img src={brand.icon_desktop} className='rounded-full h-8 w-8' alt="" />
                                        </td>
                                        <td className='text-sm font-medium px-1 py-3'>{brand.name}</td>
                                        <td className='text-sm font-medium px-1 py-3'>{brand.slug}</td>
                                        <td className='text-sm font-medium px-1 py-3'>{brand.status}</td>
                                        <td className='text-sm font-medium px-1 py-3 flex items-center'>
                                            <MdEdit className='h-4 w-4 mr-2 text-gray-500 cursor-pointer' />
                                            <FiTrash className='h-4 w-4 text-red-500 cursor-pointer' />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>


            </div>
        </div>
    )
}
export default Brands