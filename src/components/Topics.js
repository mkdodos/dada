import React from "react";

import {
  Grid,
  Label,
  Icon,
  Container,
  Segment,
  Menu,
  Card,
  List,
  Button,
  Table,
  Header,
  Modal,
  Form,
} from "semantic-ui-react";
function Topics() {
  const rows = [
    { name: "現金", amt: "678", date: "2022-09-01" },
    { name: "信用卡", amt: "4,567", date: "2022-01-08" },
    { name: "玉山", amt: "908", date: "2022-10-22" },
  ];
  const [open, setOpen] = React.useState(false);

  function saveRow() {
    setOpen(false)
  }

  return (
    <>
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
                <label>帳戶名稱</label>
                <input placeholder="please enter your name" />
              </Form.Field>
              <Form.Field>
                <label>餘額</label>
                <input placeholder="please enter your amount" />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" floated="left"><Icon name="remove"/>Delete</Button>
            <Button color="green" onClick={saveRow}><Icon name="check"/>Save</Button>

          </Modal.Actions>
        </Modal>
        <Grid columns="equal">
          <Grid.Row>
            {rows.map((row, i) => {
              return (
                <Grid.Column key={i}>
                  <Segment textAlign="center">
                    <Label color="teal" attached="top">
                      {row.name}
                    </Label>
                    <Header>{row.amt}</Header>
                  </Segment>
                </Grid.Column>
              );
            })}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button
                color="blue"
                floated="right"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <Icon name="plus" />
                Create
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Table unstackable color="orange">
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">現金股息</Header>
              </Table.Cell>
              <Table.Cell textAlign="right">
                <Label color="orange" circular>
                  提
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>2022-01-02</Table.Cell>
              <Table.Cell textAlign="right">2,345</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table unstackable color="teal">
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">現金股息</Header>
              </Table.Cell>
              <Table.Cell textAlign="right">
                <Label color="teal" circular>
                  存
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>2022-01-02</Table.Cell>
              <Table.Cell textAlign="right">2,345</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </>
  );
}
export default Topics;
