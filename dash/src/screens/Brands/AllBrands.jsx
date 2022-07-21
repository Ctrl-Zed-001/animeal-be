import { BiLoader } from 'react-icons/bi'
import { useState } from 'react'
import { useQuery } from 'react-query'
import DataTable from '../../components/DataTable'


const AllBrands = () => {

    const [page, setPage] = useState(1)


    const fetchData = async (newPage) => {
        let res = await fetch(`${import.meta.env.VITE_API_URI}/brands/getall?page=${newPage - 1}`)
        return res.json()
    }

    const { isLoading, isError, data, isPreviousData } = useQuery(['pageData', page], () => fetchData(page), { keepPreviousData: true })



    return (
        <div className="container p-4">
            <h1 className="text-lg font-semibold uppercase">Brands</h1>

            {isLoading && <BiLoader className="mx-auto animate-spin mt-10 text-xl" />}

            {isError && <p className='text-center font-bold mt-10 text-red-500'>Error Connecting to the server.</p>}

            {
                data &&
                <DataTable data={data} page={page} buttonText="add new brand" link="/brands/add" />
            }


        </div>
    )
}
export default AllBrands