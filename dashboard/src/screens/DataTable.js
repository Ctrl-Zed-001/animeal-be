import { BiSearchAlt, BiPlus } from 'react-icons/bi'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TableDetailRow from '../components/TableDetailRow'


const DataTable = () => {

    const [brands, setBrands] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(
            `${process.env.REACT_APP_API_URI}/brands/getall?page=${page - 1}`,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        )
            .then(res => {
                setBrands(res.data.data)
                setTotalCount(res.data.total)
            })
            .catch(err => console.log(err))
    }, [page])

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
                                    <TableDetailRow ikey={index} index={index} brand={brand} />
                                )
                            })
                        }
                    </tbody>
                </table>

                <div className="flex items-center justify-center mt-8">
                    {/* <Pagination count={Math.round(totalCount / 10) + 1} color="primary" onChange={(e, newPage) => setPage(newPage)} /> */}
                </div>

            </div>
        </div>
    )
}
export default DataTable