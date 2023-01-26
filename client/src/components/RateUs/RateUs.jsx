import React, { useEffect, useState  } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux'
import { addRate,getUsersDetails } from '../../redux/actions';

function RateUs() {
    const dispatch = useDispatch();   
    const use = useSelector(state => state.usersDetails);
    const [feedback, setFeedback] = useState({
        userId:use._id,
        score:0,
        comment:''
    })

  console.log('esto es use',feedback)

        
    function handleRate(e) {
        e.preventDefault()
        console.log('feedback rate', feedback)
        setFeedback({
            ...feedback,
            score:e.target.value
        })        
    }
    function handleComment(e) {
        e.preventDefault()
        console.log('feedback coment', feedback)
        setFeedback({
            ...feedback,
            comment:e.target.value
        })        
    }
    function handleSubmit(e) {
        e.preventDefault()
       dispatch(addRate(feedback))
    }

    
    return (
        <div>
            <h1>Componente review compra</h1>
            <div>
                <select  onChange={handleRate}>
                    <option value='All rates'>All rates</option>
                    <option value='5'>5  ☆</option>
                    <option value='4'>4  ☆</option>
                    <option value='3'>3  ☆</option>
                    <option value='2'>2  ☆</option>
                    <option value='1'>1  ☆</option>
                </select>
            </div>
            <div><input type='text' placeholder='Ingrese su comentario' onChange={handleComment}/></div>
            <button type='submit' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default RateUs; 