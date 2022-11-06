import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { allHotels } from "../actions/hotels";
import HotelCard from "./cards/HotelCard";
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

const Hotels = () => {
    const [hotels, setHotels] = useState("");

    const getAllHotels = async () => {
        try {
            const res = await allHotels();
            // console.log("HOTELS -> ", res);
            if(res.data){
                //console.log(res.data);
                setHotels(res.data);
            }

        } catch (err) {
            toast.error(err.response.data);
        }
    }

    useEffect(() => {
        getAllHotels();
    }, []);

  return (
    <>
    {
        hotels && hotels.length ? 
        hotels.map(hotel => <Col key={hotel._id} md={3}>
            <Link to={`/hotels/${hotel._id}`} className="text-decoration-none text-dark">
                <HotelCard hotel={hotel} />
            </Link>
        </Col>)
        : 
        <span>no hotels found</span>
    }
    </>
  )
}

export default Hotels