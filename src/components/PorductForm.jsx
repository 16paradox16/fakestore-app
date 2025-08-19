import { Card, Form, Button } from "react-bootstrap";

export default function ProductForm({ values, onChange, onSubmit, submitting, submitText }) {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" value={values.title} onChange={onChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control name="price" type="number" step="0.01" value={values.price} onChange={onChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control name="category" value={values.category} onChange={onChange} required />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={4} name="description" value={values.description} onChange={onChange} required />
          </Form.Group>
          <Button type="submit" disabled={submitting}>{submitting ? "Saving…" : submitText}</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
