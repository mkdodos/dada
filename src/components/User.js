import { auth } from "../utils/firebase";
import { Button, Container, Card, Image, Icon, Grid,Modal,Header,Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import sea from "../images/avatar/large/matthew.png";
import girl from "../images/avatar/large/kristy.png";
import React from "react";
export default function User() {
  const history = useHistory();
  const user = auth.currentUser;
  // 編輯視窗顯示控制
  const [open, setOpen] = React.useState(false);
    // 資料欄位
  const [name, setName] = React.useState("");
  function saveRow() {
    const row = {
      displayName: name,
    };
    user.updateProfile(row).then(()=>{
      setOpen(false)
    });
  }

  return (
    <Container>
      <Modal
        closeIcon
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Header>編輯帳戶</Header>
        <Modal.Content>
          <Form size="large">
            <Form.Field>
              <label>名稱</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={saveRow}>
            <Icon name="check" />
            Save
          </Button>
        </Modal.Actions>
      </Modal>
      <Grid centered>
        <Grid.Row columns={3}>
          <Grid.Column mobile={1} tablet={3} computer={5}>
            {/* <Image size='tiny' src={user?.email=='mkdodos@gmail.com'?sea:girl} wrapped ui={false} /> */}
          </Grid.Column>
          <Grid.Column mobile={13} tablet={10} computer={6}>
            <Card fluid>
              <Image
                src={user?.email == "mkdodos@gmail.com" ? sea : girl}
                size="large"
              />
              <Card.Content>
                <Card.Header>{user?.displayName}</Card.Header>
                <Card.Meta>
                  <span className="date">Joined in 2015</span>
                </Card.Meta>
                <Card.Description>{user && user.email}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  onClick={() => {
                    auth.signOut().then(() => {
                      history.push("/login");
                    });
                  }}
                >
                  SignOut
                </Button>
                <Button
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  Edit
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column mobile={1} tablet={3} computer={5}>
            {/* <Image src="/images/wireframe/image.png" /> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
