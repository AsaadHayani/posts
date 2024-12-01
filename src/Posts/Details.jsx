import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyHelmet from "../MyHelmet";

const Details = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const responsePost = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const responseComments = await axios.get(
        `https://jsonplaceholder.typicode.com/comments/${id}`
      );
      setComments(responseComments.data);
      setPost(responsePost.data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      navigate("/");
      console.log("deleted");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <Container className="mt-3">
      <MyHelmet title="Detais" />
      <Card className="text-center border border-success shadow">
        <Card.Header className="text-success fs-4">{post.title}</Card.Header>
        <Card.Body>
          <Card.Text>{post.body}</Card.Text>
          <div className="d-flex justify-content-around">
            <Link to={`/edit/${post.id}`} className="shadow btn btn-warning">
              Update
            </Link>
            <Button
              variant="danger"
              onClick={() => handleDelete(post.id)}
              className="shadow"
            >
              Delete
            </Button>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">User ID: {post.userId}</Card.Footer>
      </Card>

      <h5 className="my-3 text-success text-center">Comments :</h5>
      <Card className="border border-success shadow">
        <Card.Header className="text-success fs-5">{comments.name}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>{comments.email}</p>
            <footer className="blockquote-footer">{comments.body}</footer>
          </blockquote>
        </Card.Body>
      </Card>
      <Link className="btn btn-success w-100 shadow mt-3" to="/">
        Home
      </Link>
    </Container>
  );
};

export default Details;
