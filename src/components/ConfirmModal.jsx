import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({
  show,
  onHide,
  onConfirm,
  title = "Confirm deletion",
  body = "Are you sure you want to delete this product? (Mock API: success won’t persist)"
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}
