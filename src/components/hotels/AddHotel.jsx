import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { DatePicker } from "antd";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import moment from "moment";
import { createHotel } from "../../actions/hotels";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const { RangePicker } = DatePicker;

const AddHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "",
    location: "",
    from: "",
    to: "",
    bed: "",
  });
  
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("location", values.location);
      formData.append("price", values.price);
      formData.append("bed", values.bed);
      formData.append("from", values.from);
      formData.append("to", values.to);
      values.image && formData.append("image", values.image);

      const res = await createHotel(token, formData);
      console.log(res);

      toast.success("New hotel is posted");
    } catch (err) {
      console.log(err);
    }
    console.log(values);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>

      <Container className="mt-4 mb-4">
        <Row>
          <Col md={{ span: 4, offset: 2 }}>
            <p>
              <img
                src={preview}
                alt="preview_image"
                className="img img-fluid m-2"
              />
            </p>
          </Col>
          <Col md={{ span: 4 }}>
            <Form onSubmit={handleSubmit}>
              <label className="btn btn-outline-secondary btn-block m-2 text-left">
                Image
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
              </label>

              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  name="content"
                  as="textarea"
                  value={values.content}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  name="location"
                  type="text"
                  value={values.location}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Number of beds</Form.Label>
                <Form.Select
                  name="bed"
                  className="mb-3"
                  value={values.bed}
                  onChange={handleChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="3">4</option>
                </Form.Select>
              </Form.Group>

              <RangePicker
                onChange={(date, dateString) => {
                  setValues({
                    ...values,
                    from: dateString[0],
                    to: dateString[1],
                  });
                }}
                format="YYYY-MM-DD"
              />

              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddHotel;
