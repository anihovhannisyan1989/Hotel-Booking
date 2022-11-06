import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BiHomeAlt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";

const NotConnected = () => {
  // Will be deleted
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  // ###############
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      const authTemp = { ...auth };

      authTemp.user.stripe_seller = {
        charges_enabled: true,
      };

      window.localStorage.setItem("auth", JSON.stringify(authTemp));

      dispatch({
        type: "LOGGED_IN_USER",
        payload: authTemp,
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          <div className="p-5 pointer">
            <BiHomeAlt className="h1" />
            <h4>Setup payouts to post hotel rooms</h4>
            <p className="lead">
              <strong>HotelBooking.am</strong> partners with stripe to transfer
              earnings to your bank account
            </p>
            <button
              className="btn btn-primary mb-3"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : "Setup Payouts"}
            </button>
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process.
              </small>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotConnected;
