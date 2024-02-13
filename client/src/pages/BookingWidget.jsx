import { useContext, useState, useEffect } from "react"
import {differenceInCalendarDays} from 'date-fns';
import axios from 'axios'
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext"; 

export default function BookingWidget({place}){
    const [checkIn,setChechIn] = useState('')
    const [checkout,setChechOut] = useState('')
    const [NumberofGuest,setNumberofGuest] = useState('')
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [redirect,setRedirect] = useState('')
    const {user} = useContext(UserContext)

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    },[user])

    let numberOfNights = 0;
    if(checkIn && checkout){
        numberOfNights = differenceInCalendarDays(new Date(checkout), new Date(checkIn))
    }

    async function bookThisPlace(){
        const response = await axios.post('/bookings',{
            checkIn,checkout,NumberofGuest,name,phone,
            place:place._id,
            price:numberOfNights * place.price,
        });
        // await axios.post('/bookings',response)
        const bookingId = response.data._id;
        // console.log("bookingId",bookingId)
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return(
        <div className="px-1">
            <div className="shadow shadow-gray-500 px-2 py-2 bg-white rounded-2xl">
                <div className="text-2xl text-center mb-1">
                    Price: ${place.price} / per night
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className="border py-3 px-4">
                            <label>Check in:</label>
                            <input type="date" 
                                value={checkIn} 
                                onChange={(e)=>setChechIn(e.target.value)}
                            />
                        </div>
                        <div className="border py-3 px-4 border-t">
                            <label>Check Out:</label>
                            <input type="date" 
                                value={checkout} 
                                onChange={(e)=>setChechOut(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="border py-3 px-4 border-t">
                        <label>Number of Guests</label>
                        <input type="number" 
                            value={NumberofGuest} 
                            onChange={(e)=>setNumberofGuest(e.target.value)}
                        />
                    </div>
                    {numberOfNights > 0 && (<>
                        <div className="border py-3 px-4 border-t">
                            <label>Your Full Name:</label>
                            <input type="text" 
                                value={name} 
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className="border py-3 px-4 border-t">
                            <label>Your Phone Number:</label>
                            <input type="tel" 
                                value={phone} 
                                onChange={(e)=>setPhone(e.target.value)}
                            />
                        </div>
                        </>
                    )}
                </div>
                <button onClick={bookThisPlace} className="mt-2 primary">
                    Book this place
                    {numberOfNights > 0 && (
                        <span>${numberOfNights * place.price}</span>
                    )}
                </button>
            </div>
        </div>
    )
}