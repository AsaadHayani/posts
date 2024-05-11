import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    const api = `https://jsonplaceholder.typicode.com/posts`;
    try {
      const response = await axios.post(api, {
        title,
        body,
        userId: 1,
      });
      console.log(response.data);
      navigate(`/`);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Container>
      <Form
        method="POST"
        className="border border-primary mx-auto mt-5 p-3 shadow w-75"
      >
        <Form.Group className="mb-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="border-primary shadow-none"
            defaultValue={title}
            placeholder="Title"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Body:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setBody(e.target.value)}
            className="border-primary shadow-none"
            defaultValue={body}
            placeholder="Body"
            required
          />
        </Form.Group>
        <Button className="w-100 shadow" onClick={handleCreate}>
          Add Post
        </Button>
      </Form>
    </Container>
  );
};

export default Add;
