import React from "react";
import { Grid, Segment, Label, Header, Button, Icon, Modal, Form } from "semantic-ui-react";
export default function GridEqualColumns() {
  const rows = [
    { name: "現金", amt: "678", date: "2022-09-01" },
    { name: "信用卡", amt: "4,567", date: "2022-01-08" },
    { name: "玉山", amt: "908", date: "2022-10-22" },
    { name: "中國信託", amt: "908", date: "2022-10-22" },
    { name: "土地銀行", amt: "908", date: "2022-10-22" },
  ];
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('')
  function saveRow() {
    console.log(name)
    setOpen(false);
  }
  return (
    <>
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
          <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="please enter your name" />
        </Form.Field>
        <Form.Field>
          <label>餘額</label>
          <input placeholder="please enter your amount" />
        </Form.Field>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button color="red" floated="left">
        <Icon name="remove" />
        Delete
      </Button>
      <Button color="green" onClick={saveRow}>
        <Icon name="check" />
        Save
      </Button>
    </Modal.Actions>
  </Modal>
    <Grid columns={3}>
      <Grid.Row>
        {rows.map((row, i) => {
            if(i<3)
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
      {rows.map((row, i) => {
        if(i>2)
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
        <Grid.Column>
            <Segment textAlign="center"  onClick={() => {
              setOpen(true);
            }}>
                <Label attached="top">
                 新增
                </Label>
               
                <Header>+</Header>
           
            
            
            </Segment>
       
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        
      </Grid.Row>
    </Grid>
       {/* <Button
            color="blue"
            floated="right"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Icon name="plus" />
            Create
          </Button> */}
    </>
  );
}
