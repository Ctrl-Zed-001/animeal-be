const Pagination = (props) => {
    let totalPages = Math.ceil(props.total / 10)

    return (
        <div className="pagination flex justify-between items-center gap-2">
            {
                [...Array(totalPages)].map((page, i) => {
                    return (
                        <div onClick={() => props.paginate(i + 1)} key={i} className="page py-1 px-2 bg-theme text-sm rounded cursor-pointer" >
                            {i + 1}
                        </div>
                    )
                })
            }
        </div >
    )
}
export default Pagination