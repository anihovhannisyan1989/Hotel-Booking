import { useEffect, useState } from "react";
import { sellerHotels } from "../../actions/hotels";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import HotelCard from "../cards/HotelCard";

const Connected = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [hotels, setHotels] = useState([]);

  const getSellerHotels = async () => {
    try {
      const res = await sellerHotels(token);
      if (res.data) {
        setHotels(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSellerHotels();
  }, []);

  return (
    <>
      <Row className="mt-4">
        <Col
          md={12}
          className="mb-4 d-flex justify-content-between align-items-center"
        >
          <h3 className="mb-0">Your hotels</h3>
          <Link className="btn btn-primary" to="/hotels/new">
            + Add hotel
          </Link>
        </Col>
      </Row>
      <Container>
        <Row>
          {hotels && hotels.length ? (
            hotels.map((hotel) => {
              return (
                <Col key={hotel._id} md={3}>
                  <Link
                    to={`/hotels/${hotel._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <HotelCard hotel={hotel} />
                  </Link>
                </Col>
              );
            })
          ) : (
            <h4 className="text-muted"> :( No Hotels Found!</h4>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Connected;
