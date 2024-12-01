import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CloseButton,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import MyHelmet from "../MyHelmet";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [changeView, setChangeView] = useState(false);

  const fetchPosts = async () => {
    const api = `https://jsonplaceholder.typicode.com/posts`;
    try {
      const response = await axios.get(api);
      setPosts(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const updatedData = posts.filter((item) => item.id !== id);
      setPosts(updatedData);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Container>
      <MyHelmet title="Home" />

      <Button
        onClick={() => {
          setChangeView(!changeView);
        }}
        className="btn btn-primary shadow my-3 w-100"
      >
        Change view{" "}
        <i class={`fa-solid ${changeView ? "fa-grip" : "fa-border-all"}`} />
      </Button>

      {changeView ? (
        <Row xs={1} md={3} lg={4} className="gap-3 justify-content-center">
          {posts.map((post) => {
            return (
              <Col key={post.id}>
                <Card className="text-center border border-black shadow position-relative">
                  <CloseButton
                    className="rounded-circle p-2 position-absolute top-0 translate-middle shadow-none bg-danger"
                    onClick={() => handleDelete(post.id)}
                  />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.body}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Link
                        to={`/details/${post.id}`}
                        className="shadow btn btn-success"
                      >
                        Details
                      </Link>
                      <Link
                        to={`/edit/${post.id}`}
                        className="shadow btn btn-warning"
                      >
                        Update
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <div className="table-responsive shadow-lg">
          <Table striped hover bordered className="text-center align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Body</th>
                <th>Details</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.length !== 0 ? (
                posts.map((post) => {
                  return (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.body}</td>
                      <td>
                        <Link
                          to={`/details/${post.id}`}
                          className="shadow btn btn-success"
                        >
                          Details
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/edit/${post.id}`}
                          className="shadow btn btn-warning"
                        >
                          Update
                        </Link>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(post.id)}
                          className="shadow"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-danger fs-5">
                    The Elements is Not Found, Or Wrong
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default Posts;
