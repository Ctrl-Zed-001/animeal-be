import { BiLoader } from 'react-icons/bi'
import { useState } from 'react'
import { useQuery } from 'react-query'
import DataTable from '../../components/DataTable'

const AllProducts = () => {
    const [page, setPage] = useState(1)


    const fetchData = async (newPage) => {
        let res = await fetch(`${import.meta.env.VITE_API_URI}/products/getall?page=${newPage - 1}`)
        return res.json()
    }

    const { isLoading, isError, data, isPreviousData } = useQuery(['pageData', page], () => fetchData(page), { keepPreviousData: true })



    return (
        <div className="container p-4">
            <h1 className="text-2xl font-semibold uppercase">Products</h1>

            {isLoading && <BiLoader className="mx-auto animate-spin mt-10 text-xl" />}

            {isError && <p className='text-center font-bold mt-10 text-red-500'>Error Connecting to the server.</p>}

            {
                data &&
                <DataTable data={data} page={page} />
            }


        </div>
    )
}
export default AllProducts