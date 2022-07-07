import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'


const ViewBrand = () => {
    const [brandDetail, setBrandDetail] = useState()

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            axios.post(`${import.meta.env.VITE_API_URI}/brands/getone`, {
                id: params.id
            })
                .then(res => {
                    setBrandDetail(res.data.data)
                })
                .catch(err => console.log(err))
        }
    }, [])


    return (
        <div className="container p-4">
            <h1 className="text-2xl font-semibold uppercase">{brandDetail?.name}</h1>
            <p>Slug : {brandDetail?.slug}</p>
            <p>Created on : {dayjs(brandDetail?.createdAt).format("DD - MMM - YYYY")}</p>


            <div className="flex justify-between mt-12">
                <div className="image-box">
                    <h1>Desktop Icon</h1>
                    <img src={brandDetail?.icon_desktop} alt="" />
                </div>
                <div className="image-box">
                    <h1>Desktop Banner</h1>
                    <img src={brandDetail?.icon_desktop} alt="" />
                </div>
                <div className="image-box">
                    <h1>Mobile Icon</h1>
                    <img src={brandDetail?.icon_desktop} alt="" />
                </div>
                <div className="image-box">
                    <h1>Mobile Banner</h1>
                    <img src={brandDetail?.icon_desktop} alt="" />
                </div>
            </div>


        </div>
    )
}
export default ViewBrand