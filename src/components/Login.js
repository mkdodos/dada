import { Form, Modal, Container, Button, Grid, Segment } from "semantic-ui-react";
export default function Login() {
  return (
    <Container>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={3} computer={5}>
            
          </Grid.Column>
          <Grid.Column mobile={16} tablet={10} computer={6}>
           <Segment>
           <Form size="large">
              <Form.Field>
                <label>Email</label>
                <input></input>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input></input>
              </Form.Field>
              <Button size="large" fluid color="blue">
                Login
              </Button>
            </Form>
           </Segment>
            
          </Grid.Column>
          <Grid.Column mobile={16} tablet={3} computer={5}>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
