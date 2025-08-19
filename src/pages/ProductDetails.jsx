import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, Button, Badge } from "react-bootstrap";
import client from "../api/client";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import ConfirmModal from "../components/ConfirmModal";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // <-- modal state

  useEffect(() => {
    let mounted = true;
    client.get(`/products/${id}`)
      .then(res => { if (mounted) setProduct(res.data); })
      .catch(() => { if (mounted) setError("Could not load product."); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await client.delete(`/products/${id}`);
      alert("Deleted (mock). Redirecting to products…");
      navigate("/products");
    } catch {
      alert("Delete failed. Please try again.");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  if (loading) return <Loader />;
  if (error)   return <ErrorAlert message={error} />;
  if (!product) return <ErrorAlert message="Product not found." />;

  return (
    <>
      <Row className="gy-4">
        <Col md={5} className="d-flex justify-content-center">
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: "100%", maxHeight: 420, objectFit: "contain" }}
          />
        </Col>
        <Col md={7}>
          <h3 className="mb-2">{product.title}</h3>
          <div className="mb-3">
            <Badge bg="secondary" className="me-2 text-capitalize">{product.category}</Badge>
            <span className="fs-5 fw-bold">${product.price?.toFixed?.(2)}</span>
          </div>
          <p className="text-muted">{product.description}</p>

          <div className="d-flex gap-2 mt-4">
            <Button as={Link} to="/products" variant="outline-secondary">Back to Products</Button>
            <Button as={Link} to={`/edit-product/${product.id}`} variant="outline-primary">Edit</Button>
            <Button
              onClick={() => setShowConfirm(true)}
              variant="danger"
              disabled={deleting}
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </div>
        </Col>
      </Row>

      {/* Confirmation modal */}
      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
