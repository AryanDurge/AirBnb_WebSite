import Perks from "./PerksLabels";
import PhotosUploader from "./photosUploader";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {useEffect} from 'react'
import { useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const {id} = useParams();
  console.log({id});
  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState('');
  const [extraInfo,setExtraInfo] = useState('');
  const [checkIn,setcheckIn] = useState('');
  const [checkout,setCheckOut] = useState('');
  const [maxGuests,setMaxGuests] = useState('');
  const [price,setPrice] = useState(100);
  const [redirect,setRedirect] = useState(false);
  
  
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/'+id).then(response=>{
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos)
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setcheckIn(data.checkIn);
      setCheckOut(data.checkout);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    })
  },[id])

  function inputHeader(text){
    return (
      <h2 className="text-sxl mt-4">{text}</h2>
    )
  }

  function inputDescription(text){
    return (
      <p className="text-gray-400 text-sm">{text}</p>
    )
  }

  function preInput(header,description){
    return(
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }

  async function savePlace(e){
    e.preventDefault();

    const placeDate = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkout, maxGuests, price
    }

    if(id){
      await axios.put('/places', {
        id,...placeDate
      })
      setRedirect(true)
    }
    else {
      await axios.post('/places', {
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkout, maxGuests, price,
      });
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <form onSubmit={savePlace}>
          {preInput('Title','Title for your place, should be short and catchy as possible')}
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="title, for my lovely apartment"/>
          {preInput('Address','Address to this place')}
          <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Address"/>

          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

          {preInput('Description','Description of the place')}
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} />
          {preInput('Perks','List of perks')}
          <div> 
            <Perks selected={perks} onChange={setPerks}/>
          </div>
          {preInput("Extra info","House rules")}
          <textarea value={extraInfo} onChange={(e)=>setExtraInfo(e.target.value)}/>
          {preInput("Check in&Out times","add check in and out times, remeber to have some time window for cleaning the room between guests")}
          <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input type="text" value={checkIn} onChange={(e)=>setcheckIn(e.target.value)} placeholder="14"></input>
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input type="text" value={checkout} onChange={(e)=>setCheckOut(e.target.value)} placeholder="11"></input>
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max Guests</h3>
              <input type="text" value={maxGuests} onChange={(e)=>setMaxGuests(e.target.value)} placeholder="14:00"></input>
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per Night</h3>
              <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="14:00"></input>
            </div>
          </div>

          <div>
            <button className="primary my-4">Save</button>
          </div>
        </form>
    </div>
  );
}