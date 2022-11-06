import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getHotelById } from "../../actions/hotels";
import { toast } from "react-toastify";
import { diffDays } from "../../actions/hotels";
import { BiBed, BiCalendar } from "react-icons/bi";
import { TiLocation } from "react-icons/ti";

const SingleHotel = () => {
  const [hotel, setHotel] = useState({});
  const params = useParams();

  const getSingleHotel = async () => {
    try {
      const response = await getHotelById(params.id);
      console.log(response);
      if (response.data) {
        setHotel(response.data);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    getSingleHotel();
  }, []);
  return (
    <>
      {Object.keys(hotel).length && (
        <Container className="mt-4">
          <Row>
            <Col md={6}>
              <img
                src={`${import.meta.env.VITE_APP_API}/hotel/image/${params.id}`}
                alt={hotel.title}
                className="w-100 position-sticky top-30"
              />
            </Col>
            <Col md={6}>
              <h2>{hotel.title}</h2>
              <p>{hotel.content}</p>
              <p>
                <TiLocation />
                {hotel.location}
              </p>
              <p>
                {" "}
                <BiCalendar />
                for {diffDays(hotel.from, hotel.to)}{" "}
                {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
              </p>
              <p>
                {" "}
                <BiBed />
                {hotel.bed}
              </p>
              <p>Available from {new Date(hotel.from).toLocaleDateString()}</p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default SingleHotel;
