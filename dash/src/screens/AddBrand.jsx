import axios from 'axios'
import { useState, useEffect } from 'react'
import SingleImageUploadCard from '../components/SingleImageUploadCard'
import slugCreator from '../helpers/CreateSlug'
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
    const [active, setActive] = useState(true)

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
                    setActive(res.data.data.isActive)
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
            isActive: active
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
            <h1 className="text-2xl font-semibold uppercase">{pageHeading}</h1>

            <div className="card bg-white rounded p-4 mt-6 shadow">
                <h1 className="font-semibold mb-4">Basic Information</h1>
                <div className='flex items-center justify-between gap-20 text-sm'>
                    <div className="formbox flex-1">
                        <label htmlFor="name">Name</label>
                        <br />
                        <input
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                setSlug(slugCreator(e.target.value))
                            }} type="text" className="border-2 border-gray-200 mt-2 rounded p-1 w-full" />
                    </div>
                    <div className="formbox flex-1">
                        <label htmlFor="name">Slug</label>
                        <br />
                        <input value={slug} disabled type="text" className="border-2 border-gray-200 mt-2 rounded p-1 w-full" />
                    </div>
                    <div className="formbox flex-1">
                        <label htmlFor="name">Is Active</label>
                        <br />
                        <select value={active} onChange={(e) => setActive(e.target.value)} type="text" className="border-2 border-gray-200 mt-2 rounded p-1 w-full">
                            <option value={true}>True</option>
                            <option value={false} >False</option>
                        </select>
                    </div>
                </div>

            </div>

            <div className="flex gap-10 items-center justify-between mt-6">

                <SingleImageUploadCard image={desktopIcon} setImage={setDesktopIcon} title="Upload Desktop Icon" />

                <SingleImageUploadCard image={desktopBanner} setImage={setDesktopBanner} title="Upload Desktop Banner" />

                <SingleImageUploadCard image={mobileIcon} setImage={setMobileIcon} title="Upload Mobile Icon" />

                <SingleImageUploadCard image={mobileBanner} setImage={setMobileBanner} title="Upload Mobile Banner" />

            </div>

            <div className="flex justify-end gap-4 mt-6">
                <button className='bg-red-500 text-white rounded py-1 px-3' onClick={() => navigate("/brands")}>Cancel</button>
                {
                    loading ?
                        <button onClick={addBrand} className='bg-gray-100 text-theme rounded py-1 px-3 flex gap-2 items-center' disabled>
                            <AiOutlineLoading3Quarters className='animate-spin' />
                            saving...
                        </button> :
                        <button onClick={addBrand} className='bg-theme text-white rounded py-1 px-3'>Save</button>
                }

            </div>
        </div>
    )
}
export default AddBrand