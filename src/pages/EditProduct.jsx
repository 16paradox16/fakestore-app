import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import client from "../api/client";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import ProductForm from "../components/ProductForm";

export default function EditProduct() {
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Prefill with existing product
  useEffect(() => {
    let mounted = true;
    client
      .get(`/products/${id}`)
      .then((res) => {
        if (!mounted) return;
        const p = res.data || {};
        setForm({
          title: p.title ?? "",
          // keep price as a string for the input; cast to Number on submit
          price: p.price != null ? String(p.price) : "",
          description: p.description ?? "",
          category: p.category ?? "",
        });
      })
      .catch(() => mounted && setError("Could not load product."))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setSubmitting(true);
    try {
      const payload = {
        title: form.title.trim(),
        price: Number(form.price),
        description: form.description.trim(),
        category: form.category.trim(),
        image: "https://i.pravatar.cc/300",
      };
      const { data } = await client.put(`/products/${id}`, payload);
      setMsg({ type: "success", text: `Updated! (mock) id: ${data?.id ?? id}` });
    } catch {
      setMsg({ type: "danger", text: "Update failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <Container>
      <h2 className="mb-3">Edit Product</h2>
      {msg.text && <Alert variant={msg.type}>{msg.text}</Alert>}
      <ProductForm
        values={form}
        onChange={onChange}
        onSubmit={onSubmit}
        submitting={submitting}
        submitText="Save Changes"
      />
      <p className="text-muted mt-3">Mock API: updates won’t persist after refresh.</p>
    </Container>
  );
}
