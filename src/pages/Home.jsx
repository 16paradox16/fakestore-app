import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container>
      <h1 className="mb-3">Welcome to FakeStore</h1>
      <p className="text-muted">Browse products, view details, and test add/edit/delete features.</p>
      <Button as={Link} to="/products">Go to Products</Button>
    </Container>
  );
}
