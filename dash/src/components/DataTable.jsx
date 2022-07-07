import { BiSearchAlt, BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import TableDetailRow from './TableDetailRow'
import Pagination from './Pagination'

const DataTable = ({ data, page }) => {
    return (
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
                        data.data.map((rowData, index) => {
                            return (
                                <TableDetailRow key={index} index={index} rowData={rowData} page={page} />
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="flex items-center justify-center mt-8">
                <Pagination total={data.total} paginate={(pageNumber) => setPage(pageNumber)} />
            </div>
        </div>
    )
}
export default DataTable