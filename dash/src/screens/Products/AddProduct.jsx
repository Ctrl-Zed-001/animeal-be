import MultipleImageUpload from "../../components/MultipleImageUpload"
import ImageUploadCard from "../../components/SingleImageUploadCard"
import Select from 'react-select'
import { useState } from "react"
import slugCreator from '../../utils/CreateSlug'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const AddProduct = () => {

    const [productData, setProductData] = useState({})
    const [loading, setLoading] = useState(false)


    const addProduct = () => {

    }

    return (
        <div className="addproduct container p-4">


            <div className="flex justify-between items-center mt-6 gap-4">
                <h1 className="text-lg font-semibold uppercase">Add New Product</h1>
                <div>
                    <button className='bg-theme text-white rounded py-1 px-3 mr-4' onClick={() => navigate("/brands")}>Publish</button>
                    {
                        loading ?
                            <button onClick={addProduct} className='bg-gray-100 text-theme rounded py-1 px-3 flex gap-2 items-center' disabled>
                                <AiOutlineLoading3Quarters className='animate-spin' />
                                saving...
                            </button> :
                            <button onClick={addProduct} className='bg-gray-300 text-gray-800 rounded py-1 px-3'>Save</button>
                    }
                </div>
            </div>


            {/* BASIC INFO */}
            <div className="card bg-white rounded p-4 mt-6 shadow">
                <h1 className="font-semibold mb-4 text-gray-600">Basic Information</h1>

                <div className="flex justify-between items-center gap-10">
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="name">Name</label>
                        <br />
                        <input
                            value={productData.name ? productData.name : ''}
                            onChange={(e) => setProductData({ ...productData, name: e.target.value, slug: slugCreator(e.target.value) })}
                            type="text" className="border-2 border-gray-200 mt-2 rounded p-1 w-full" />
                    </div>
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="slug">Slug</label>
                        <br />
                        <input value={productData.slug ? productData.slug : ''} disabled type="text" className="border-2 border-gray-200 mt-2 rounded p-1 w-full" />
                    </div>
                </div>

                <div className="flex justify-between items-center gap-10 mt-6">
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="category">Select brand</label>
                        <Select
                            onChange={(value) => setProductData({ ...productData, brands: value })}
                            defaultValue={productData.brands ? productData.brands : []}
                            isClearable
                            isMulti
                            name="brands"
                            className=" mt-2 rounded p-1 w-full"
                            options={[{ value: 'pedigree', label: 'Pedigree' }, { value: 'whiskas', label: 'Whiskas' }]}
                        />
                    </div>
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="category">Select animal</label>
                        <Select
                            onChange={(value) => setProductData({ ...productData, animals: value })}
                            defaultValue={productData.animals ? productData.animals : []}
                            isClearable
                            isMulti
                            name="animals"
                            className=" mt-2 rounded p-1 w-full"
                            options={[{ value: 'cat', label: 'Cat' }, { value: 'dog', label: 'Dog' }]}
                        />
                    </div>
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="category">Select category</label>
                        <Select
                            onChange={(value) => setProductData({ ...productData, categories: value })}
                            defaultValue={productData.categoies ? productData.categories : []}
                            isClearable
                            isMulti
                            name="categories"
                            className=" mt-2 rounded p-1 w-full"
                            options={[{ value: 'food', label: 'Food' }, { value: 'medicine', label: 'Medicine' }]}
                        />
                    </div>
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="category">Select sub-category</label>
                        <Select
                            onChange={(value) => setProductData({ ...productData, subcategories: value })}
                            defaultValue={productData.subcategories ? productData.subcategories : []}
                            isClearable
                            isMulti
                            name="subcategories"
                            className=" mt-2 rounded p-1 w-full"
                            options={[{ value: 'dryfood', label: 'Dry Food' }, { value: 'wetfood', label: 'Wet Food' }]}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center gap-10 mt-6">
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="shortdesc">Short Description</label>
                        <textarea value={productData.short_description ? productData.short_description : ''}
                            onChange={(e) => setProductData({ ...productData, short_description: e.target.value })}
                            name="shortdesc" id="" cols="30" rows="6" className="border-2 border-gray-200 mt-2 rounded p-1 w-full"></textarea>
                    </div>
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="longdesc">Long Description</label>
                        <textarea value={productData.long_description ? productData.long_description : ''}
                            onChange={(e) => setProductData({ ...productData, long_description: e.target.value })} name="longdesc" id="" cols="30" rows="6" className="border-2 border-gray-200 mt-2 rounded p-1 w-full"></textarea>
                    </div>
                </div>
            </div>


            {/* IMAGES */}
            <div className="flex justify-between items-center gap-10 mt-6">

                <div className="flex-1">
                    <ImageUploadCard title="Set main product image" />
                </div>

                <div className="flex-1">
                    <MultipleImageUpload title="Additional product images" />
                </div>

            </div>

            {/* PRICE AND Stock */}
            <div className="card bg-white p-4 mt-6 shadow rounded">
                <h1 className="font-semibold mb-4 text-gray-600">Stock and Price</h1>

                <div className="flex justify-between items-center gap-10">
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="MRP">MRP</label>
                        <br />
                        <input
                            value={productData.mrp ? productData.mrp : 0}
                            onChange={(e) => setProductData({ ...productData, mrp: parseInt(e.target.value) })}
                            type="number"
                            className="border-2 border-gray-200 mt-2 rounded p-1 w-full"
                        />
                    </div>
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="selling-price">Selling Price</label>
                        <br />
                        <input
                            value={productData.price ? productData.price : 0}
                            onChange={(e) => setProductData({ ...productData, price: parseInt(e.target.value) })}
                            type="number"
                            className="border-2 border-gray-200 mt-2 rounded p-1 w-full"
                        />
                    </div>
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="available-stock">Available Stock</label>
                        <br />
                        <input
                            value={productData.stock ? productData.stock : 0}
                            onChange={(e) => setProductData({ ...productData, stock: parseInt(e.target.value) })}
                            type="number"
                            className="border-2 border-gray-200 mt-2 rounded p-1 w-full"
                        />
                    </div>
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="available-stock">Minimum quantity</label>
                        <br />
                        <input
                            value={productData.min_quantity ? productData.min_quantity : 1}
                            onChange={(e) => setProductData({ ...productData, min_quantity: parseInt(e.target.value) })}
                            type="number"
                            className="border-2 border-gray-200 mt-2 rounded p-1 w-full"
                        />
                    </div>
                </div>
            </div>

            {/* SEO */}
            <div className="card bg-white p-4 mt-6 shadow rounded">
                <h1 className="font-semibold mb-4 text-gray-600">SEO</h1>

                <div className="flex justify-between items-center gap-10">
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="MRP">Meta Title</label>
                        <br />
                        <input value={productData.title ? productData.title : 0} onChange={(e) => setProductData({ ...productData, title: e.target.value })} type="text" className="border-2 border-gray-200 mt-2 rounded p-1 w-full" />
                    </div>
                    <div className="formbox flex-1">
                        <label className="text-sm" htmlFor="available-stock">Meta Keywords</label>
                        <br />
                        <input value={productData.keywords ? productData.keywords : 0} onChange={(e) => setProductData({ ...productData, keywords: e.target.value })} type="text" className="border-2 border-gray-200 mt-2 rounded p-1 w-full" />
                    </div>
                </div>
                <div className="formbox flex-1 mt-4">
                    <label className="text-sm" htmlFor="selling-price">Meta Description</label>
                    <br />
                    <textarea value={productData.description ? productData.description : 0} onChange={(e) => setProductData({ ...productData, description: e.target.value })} className="border-2 border-gray-200 mt-2 rounded p-1 w-full" />
                </div>
            </div>


        </div>
    )
}
export default AddProduct