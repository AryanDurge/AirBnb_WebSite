import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
// import { differenceInCalendarDays, format } from "date-fns";
// import PlaceImg from "../PlaceImg";
import {Link} from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings,setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
       <AccountNav />
       <div>
        <div className="grid gap-3">
          {bookings?.length > 0 && bookings.map(booking =>(
            <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden" key={booking}>
              <div className="w-48 h-32">
                <PlaceImg place={booking.place}/>
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="font-semibold text-xl border-b pb-2 border-gray-300">{booking.place.title}</h2>

                <div>
                  <BookingDates booking={booking}/>
                  <div className="flex gap-1 font-semibold mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                      Total price: ${booking.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}