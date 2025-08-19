import { Alert } from "react-bootstrap";
export default function ErrorAlert({ message }) {
  return <Alert variant="danger" className="my-3">{message}</Alert>;
}
