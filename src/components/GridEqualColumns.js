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
import firebase, { db } from "../utils/firebase";
export default function GridEqualColumns() {
  const [open, setOpen] = React.useState(false);
  const [docID, setDocID] = React.useState("");
  const [name, setName] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [gridRows, setGridRows] = React.useState([]);

  React.useEffect(() => {
    // const rows = [
    //     { name: "土地銀行1", balance: "908", date: "2022-10-22" },
    //
    //   ];
    db.collection("topics")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const rows = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        const grid = [];
        let i = 0;
        let columns = [];
        // 沒有資料時,顯示新增鈕
        if (rows.length == 0) {
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
          grid.push(<Grid.Row key={i}>{columns}</Grid.Row>);
        }
        for (let row of rows) {
          // 資料區塊最前面放置新增鈕
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
          // 資料區塊
          columns.push(
            <Grid.Column key={i + 1}>
              <Segment
                textAlign="center"
                onClick={() => {
                  setOpen(true);
                  setDocID(row.id);
                  setName(row.name);
                  setBalance(row.balance);
                }}
              >
                <Label color="teal" attached="top">
                  {row.name}
                </Label>
                <Header>{numberFormat(row.balance)}</Header>
              </Segment>
            </Grid.Column>
          );
          // 每列3筆區塊
          // i = 1,4,7... 或最後一筆時加入一列
          // + 0 1
          // 2 3 4
          // 5 6
          if (i % 3 == 1 || i == rows.length - 1) {
            grid.push(<Grid.Row key={i}>{columns}</Grid.Row>);
            columns = [];
          }

          i++;
        }
        setGridRows(grid);
      });
  }, []);

  function saveRow() {
    if (docID) {
      db.collection("topics").doc(docID).update({
        name: name,
        balance: balance,
        updatedAt: firebase.firestore.Timestamp.now(),
      });
    } else {
      db.collection("topics").add({
        name: name,
        balance: balance,
        createdAt: firebase.firestore.Timestamp.now(),
      });
    }

    setDefalut();
  }

  function deleteRow() {
    if (docID) {
      db.collection("topics")
        .doc(docID)
        .delete()
        .then(() => {
          setDefalut();
        });
    }
  }

  function setDefalut() {
    setOpen(false);
    setName("");
    setBalance("");
  }

  // 數字格式  2,500
  function numberFormat(total){
    var formatter = new Intl.NumberFormat("en-US", {     
      currency: "USD"
    });  
    return formatter.format(total);     
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
              <input
                type="number"
                value={balance}
                onChange={(e) => {
                  setBalance(e.target.value);
                }}
                placeholder="please enter your amount"
              />
            </Form.Field>
            
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" floated="left" onClick={deleteRow}>
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
