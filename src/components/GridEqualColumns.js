import React from "react";
import {
  Grid,
  Segment,
  Label,
  Header,
  Button,
  Icon,
  Modal,
  Form,
} from "semantic-ui-react";
import firebase,{db} from "../utils/firebase"
export default function GridEqualColumns() {
  
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [gridRows, setGridRows] = React.useState([]);

  React.useEffect(() => {
    // const rows = [
    //     { name: "土地銀行1", amt: "908", date: "2022-10-22" },
    //     { name: "土地銀行1", amt: "908", date: "2022-10-22" },
    //     { name: "土地銀行1", amt: "908", date: "2022-10-22" },
    //     { name: "土地銀行1", amt: "908", date: "2022-10-22" },
    //     { name: "土地銀行1", amt: "908", date: "2022-10-22" },
    //   ];
    db.collection('topics').orderBy('createdAt','desc').onSnapshot(snapshot=>{
        const rows = snapshot.docs.map(doc=>{
            return doc.data();
        })

        const grid = [];
        let i = 0;
        let columns = [];
        for (let row of rows) {
          if (i == 0) {
            columns.push(
              <Grid.Column key="0">
                <Segment
                  textAlign="center"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <Label attached="top">新增</Label>
    
                  <Header>+</Header>
                </Segment>
              </Grid.Column>
            );
          }
          columns.push(
            <Grid.Column key={i + 1}>
              <Segment textAlign="center">
                <Label color="teal" attached="top">
                  {row.name}
                </Label>
                <Header>{row.balance}</Header>
              </Segment>
            </Grid.Column>
          );
          if (i % 3 == 1 || i == rows.length - 1) {
            grid.push(<Grid.Row key={i}>{columns}</Grid.Row>);
            columns = [];
          }
    
          i++;
        }
        setGridRows(grid);
    })  
   
  }, []);

  function saveRow() {
    db.collection('topics').add(
        { name:name, balance: "908",createdAt:firebase.firestore.Timestamp.now() }
    )
    // console.log(rows);
    // rows.push({ name: "土地銀行1", amt: "908", date: "2022-10-22" });
    // console.log(rows);
    setOpen(false);
  }
  return (
    <>
      <div className="App">
        <Grid columns={3}>{gridRows}</Grid>
      </div>

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
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="please enter your name"
              />
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
    </>
  );
}
