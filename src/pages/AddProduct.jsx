import { useState } from "react";
import { Container, Alert } from "react-bootstrap";
import client from "../api/client";
import ProductForm from "../components/ProductForm";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

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
      const { data } = await client.post("/products", payload);
      setMsg({ type: "success", text: `Created! (mock) id: ${data?.id ?? "—"}` });
      setForm({ title: "", price: "", description: "", category: "" });
    } catch {
      setMsg({ type: "danger", text: "Create failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <h2 className="mb-3">Add Product</h2>
      {msg.text && <Alert variant={msg.type}>{msg.text}</Alert>}
      <ProductForm
        values={form}
        onChange={onChange}
        onSubmit={onSubmit}
        submitting={submitting}
        submitText="Create Product"
      />
      <p className="text-muted mt-3">Note: FakeStoreAPI is a mock; writes won’t persist.</p>
    </Container>
  );
}
