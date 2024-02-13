import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage(){    
    const {id} = useParams();
    const [place,setPlace] = useState(null)
    
    
    useEffect(()=>{
        if(!id){
           return;
        }
        axios.get(`/places/${id}`).then(response =>{
            setPlace(response.data)
        })
    }, [id]);
    
    if(!place) return '';
    
    return (
        <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-2xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>

            <PlaceGallery place={place} />
            
            {/* prevState => !prevState disabled={showMorePhotos} */}
            
            <div className="mt-8 mb-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
                <div className="my-4">
                    <h1 className="font-semibold text-2xl">Description</h1>
                    {place.description} <br/>
                    <div className="mt-2 font-semibold text-md">
                        Check-in: {place.checkIn} <br/>
                        Check-Out: {place.checkout} <br/>
                        Max Guests:{place.maxGuests} 
                    </div>
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 pt-8 border-t border-b">
                <div>
                    <h1 className="font-semibold text-2xl">Extra Info</h1>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                    {place.extraInfo}
                </div>
            </div>
        </div>
    )
}