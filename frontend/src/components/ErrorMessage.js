import Alert from "react-bootstrap/Alert";

function ErrorMessage(props) {
  return <Alert variant={props.variant || "info"}>{props.children}</Alert>;
}
export default ErrorMessage;
