import { Spinner } from "react-bootstrap";
export default function Loader() {
  return (
    <div className="d-flex justify-content-center py-5">
      <Spinner animation="border" role="status" aria-label="loading" />
    </div>
  );
}
