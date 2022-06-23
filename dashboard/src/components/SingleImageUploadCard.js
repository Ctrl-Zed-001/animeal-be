import { useRef, useState, useEffect } from "react"
import { BsImage } from 'react-icons/bs'
import { RiCloseFill } from 'react-icons/ri'

const ImageUploadCard = (props) => {
    const fileInput = useRef(null)
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (props.preview) {
            setPreview(preview)
        }
    }, [props.preview])

    return (
        <div className="image-upload-card bg-white p-2 rounded shadow">
            {
                preview ?
                    <div className="image-preview relative">
                        <img src={preview} alt="" className='h-60 w-60 object-cover' />
                        <RiCloseFill
                            onClick={() => {
                                props.setImage();
                                setPreview()
                            }}
                            className="h-5 w-5 cursor-pointer bg-red-500 rounded-full text-white absolute top-2 right-2" />
                    </div> :
                    <div onClick={() => fileInput.current.click()} className="border-2 border-dashed border-gray-300 rounded p-16 text-center cursor-pointer">
                        <input
                            onChange={(e) => {
                                let objectUrl = URL.createObjectURL(e.target.files[0])
                                props.setImage(e.target.files[0])
                                setPreview(objectUrl)
                            }}
                            ref={fileInput} type="file" className="hidden" />
                        <BsImage className='h-16 w-16 mx-auto mb-2' />
                        <p>{props.title}</p>
                    </div>
            }
        </div>
    )
}
export default ImageUploadCard