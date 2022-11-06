import { Card, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import moment from "moment";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;

  return (
    <Container className="mt-4 mb-4">
      <Row>
        <Col md={4} className="mb-2">
          <Card body>
            <div className="d-flex gap-3">
              <div>
                <Image
                  src={`https://via.placeholder.com/70x70?text=${user.name[0]}`}
                  rounded
                />
              </div>
              <div>
                <h4>{user.name}</h4>
                <small>{user.email}</small> <br />
                <small>{`Joined ${moment(user.createdAt).fromNow()}`}</small>
              </div>
            </div>
          </Card>
        </Col>
        {auth?.user?.stripe_seller?.charges_enabled && (
          <>
            <Col md={4} className="mb-2">
              <Card body>Avaliable</Card>
            </Col>
            <Col md={4} className="mb-2">
              <Card body>Payouts</Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default UserInfo;
