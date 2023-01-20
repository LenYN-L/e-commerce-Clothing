import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import st from './Product.module.css'
import { clothesDetail } from '../../../redux/actions';
import EditProduct from './EditingProduct';

export default function Product() {

    const { productId } = useParams() //usar el mismo nombre de variable que en la ruta principal
    const dispatch = useDispatch()
    let productInfo = useSelector((state) => state.clothesDetail)
    // console.log('SOY EL PRODUCT: ', productInfo)
    
    useEffect(() => {
        dispatch(clothesDetail(productId))
    }, [])

    let props = {}

    productInfo.name ?
        props = {
        id: productInfo._id,
        name: productInfo.name,
        brand: productInfo.brand,
        category: productInfo.category,
        description: productInfo.description,
        price: productInfo.price,
        sizes: productInfo.sizes,
        image: productInfo.image[0],
        stock: productInfo.stock,
        active: String(productInfo.active),
        }
    : console.log('Algo esta pasando')
        

    const [ editMode, setEditMode] = useState(false)

    const changePage = () => {
        // console.log('SOY EL EDIT MODE', editMode)
        editMode ?
        setEditMode(false) : setEditMode(true)
    }

    return (
        <div className={st.product}>
            <h1 className={st.productTitle}>Product</h1>

            {!editMode ?
                <div className={st.productInfo}>
                    <div className={st.productInfoTop}>
                        <div className={st.productInfoHeader}>
                            <span className={st.productName}>{props.name}</span>
                            <img
                                src={props.image}
                                alt="Product images"
                                className={st.productImage}
                            />
                        </div>
                        <div className={st.productInfoDetails}>
                            <div className={st.productInfoItem}>
                                <span className={st.productInfoKey}>ID:</span>
                                <span className={st.productInfoValue}>
                                    {props.id}
                                </span>
                            </div>
                            <div className={st.productInfoItem}>
                                <span className={st.productInfoKey}>Brand:</span>
                                <span className={st.productInfoValue}>
                                    {props.brand}
                                </span>
                            </div>
                            <div className={st.productInfoItem}>
                                <span className={st.productInfoKey}>Category:</span>
                                <span className={st.productInfoValue}>
                                    {props.category}
                                </span>
                            </div>
                            <div className={st.productInfoItem}>
                                <span className={st.productInfoKey}>
                                    Description:
                                </span>
                                <span className={st.productInfoValue}>
                                    {props.description}
                                </span>
                            </div>
                            <div className={st.productInfoItem}>
                                <span className={st.productInfoKey}>Price:</span>
                                <span className={st.productInfoValue}>
                                    USD {props.price}
                                </span>
                            </div>
                            <div className={st.productInfoItem}>
                                <span className={st.productInfoKey}>Active:</span>
                                <span className={st.productInfoValue}>
                                    {props.active}
                                </span>
                            </div>
                            <div className={st.productInfoItem}>
                                <div className={st.productInfoItemCont}>
                                    <span className={st.productInfoKey}>
                                        Sizes with stock:
                                    </span>
                                    <div>
                                        <span className={st.productInfoValue} >
                                        {Object.keys(props.stock || {}).map((key) => (
                                            <div key={key}>{key}: {props.stock[key]}</div>
                                        ))}
                                        </span> 
                                    </div>
                                </div>
                            </div>
                            <div className={st.productInfoItem}>
                                <button className={st.productEditButton} onClick={changePage}>
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={st.productUpdateCont}>

                    <EditProduct changePage={changePage} editMode={editMode}/>

                </div>
            }
        </div>
    )
}
