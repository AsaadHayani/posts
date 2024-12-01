import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MyHelmet from "../MyHelmet";

const Edit = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  const fetchPost = async () => {
    const api = `https://jsonplaceholder.typicode.com/posts/${id}`;
    try {
      const response = await axios.get(api);
      setPost(response.data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleEdit = async () => {
    const api = `https://jsonplaceholder.typicode.com/posts/${id}`;
    try {
      const response = await axios.put(api, {
        title,
        body,
      });
      console.log(response.data);
      navigate(`/`);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  return (
    <Container>
      <MyHelmet title="Edit" />
      <Form
        method="POST"
        className="border border-warning mx-auto mt-5 p-3 shadow w-75"
      >
        <Form.Group className="mb-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={post.title}
            className="border-warning shadow-none"
            placeholder="Title"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Body:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setBody(e.target.value)}
            defaultValue={post.body}
            className="border-warning shadow-none"
            placeholder="Body"
            required
          />
        </Form.Group>
        <Button className="w-100 shadow" variant="warning" onClick={handleEdit}>
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default Edit;
