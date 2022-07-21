import axios from 'axios'
import { useState, useEffect } from 'react'
import SingleImageUploadCard from '../../components/SingleImageUploadCard'
import slugCreator from '../../utils/CreateSlug'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const AddBrand = () => {

    const [desktopIcon, setDesktopIcon] = useState()
    const [mobileIcon, setMobileIcon] = useState()
    const [desktopBanner, setDesktopBanner] = useState()
    const [mobileBanner, setMobileBanner] = useState()

    const [pageHeading, setPageHeading] = useState("")
    const [loading, setLoading] = useState(false)

    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')

    let navigate = useNavigate();
    const params = useParams()


    useEffect(() => {
        if (params.id) {
            setPageHeading(`Edit Brand : ${params.id}`)
            axios.post(`${import.meta.env.VITE_API_URI}/brands/getone`, {
                id: params.id
            })
                .then(res => {
                    setId(res.data.data._id)
                    setName(res.data.data.name)
                    setSlug(res.data.data.slug)
                    setDesktopIcon(res.data.data.icon_desktop)
                    setDesktopBanner(res.data.data.banner_desktop)
                    setMobileIcon(res.data.data.icon_mobile)
                    setMobileBanner(res.data.data.banner_mobile)
                })
                .catch(err => console.log(err))
        } else {
            setPageHeading("Add new brand")
        }
    }, [])

    const addBrand = () => {
        setLoading(true)
        axios.post(`${import.meta.env.VITE_API_URI}/brands/savebrand`, {
            id: id,
            name: name,
            slug: slug,
            isActive: true
        })

            .then(res => {
                if (desktopIcon || mobileIcon || desktopBanner || mobileBanner) {
                    uploadImages(res.data.data)
                } else {
                    setLoading(false)
                    navigate("/brands")
                }
            })
            .catch(err => {
                setLoading(false)
                toast.error("Error writing data");
            })
    }

    const uploadImages = (brand) => {
        const formData = new FormData();
        formData.append(
            "id",
            brand._id
        )
        formData.append(
            "icon_desktop",
            desktopIcon
        );
        formData.append(
            "banner_desktop",
            desktopBanner
        );
        formData.append(
            "icon_mobile",
            mobileIcon
        );
        formData.append(
            "banner_mobile",
            mobileBanner
        );
        axios.post(
            `${import.meta.env.VITE_API_URI}/brands/saveimages`,
            formData
        )
            .then(res => {
                setLoading(false)
                navigate("/brands")

            })
            .catch(err => {
                setLoading(false)
            })
    }

    return (
        <div className="addbrand container p-4">
            <Toaster />
            <div className="flex justify-between gap-4 mt-6">
                <h1 className="text-lg font-semibold uppercase">{pageHeading}</h1>
                <div>
                    <button className='bg-theme text-white rounded py-1 px-3 mr-4' onClick={() => navigate("/brands")}>Publish</button>
                    {
                        loading ?
                            <button onClick={addBrand} className='bg-gray-100 text-theme rounded py-1 px-3 flex gap-2 items-center' disabled>
                                <AiOutlineLoading3Quarters className='animate-spin' />
                                saving...
                            </button> :
                            <button onClick={addBrand} className='bg-gray-300 text-gray-800 rounded py-1 px-3'>Save</button>
                    }
                </div>

            </div>


            <div className="card bg-white rounded p-4 mt-6 shadow">
                <h1 className="font-semibold mb-4 text-gray-600">Basic Information</h1>
                <div className='flex items-center justify-between gap-10 text-sm'>
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="name">Name</label>
                        <br />
                        <input
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                setSlug(slugCreator(e.target.value))
                            }} type="text" className="border-2 border-gray-200 mt-2 rounded p-1 w-full" />
                    </div>
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="name">Slug</label>
                        <br />
                        <input value={slug} disabled type="text" className="border-2 border-gray-200 mt-2 rounded p-1 w-full" />
                    </div>
                </div>

            </div>

            <div className="flex gap-10 items-center justify-between mt-6">

                <SingleImageUploadCard image={desktopIcon} setImage={setDesktopIcon} title="Upload Desktop Icon" />

                <SingleImageUploadCard image={desktopBanner} setImage={setDesktopBanner} title="Upload Desktop Banner" />

                <SingleImageUploadCard image={mobileIcon} setImage={setMobileIcon} title="Upload Mobile Icon" />

                <SingleImageUploadCard image={mobileBanner} setImage={setMobileBanner} title="Upload Mobile Banner" />

            </div>


        </div>
    )
}
export default AddBrand