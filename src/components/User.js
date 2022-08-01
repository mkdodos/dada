import { auth } from "../utils/firebase";
import { Button, Container } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
export default function () {
  const history = useHistory();
  const user = auth.currentUser;
  return (
    <Container>
      <Button
        onClick={() => {
          auth.signOut().then(() => {
            history.push("/login");
          });
        }}
      >
        {user && user.email}
      </Button>
    </Container>
  );
}
