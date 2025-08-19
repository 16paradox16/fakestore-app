import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import client from "../api/client";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    client.get("/products")
      .then(res => { if (mounted) setProducts(res.data || []); })
      .catch(() => { if (mounted) setError("Could not load products. Please try again."); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <>
      <h2 className="mb-3">Products</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {products.map(p => (
          <Col key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </>
  );
}
