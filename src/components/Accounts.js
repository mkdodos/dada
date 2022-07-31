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
  Dropdown,
} from "semantic-ui-react";
import firebase, { db } from "../utils/firebase";
import { numFormat } from "../utils/stringFormat";

export default function Accounts() {
  // 編輯視窗顯示控制
  const [open, setOpen] = React.useState(false);

  // 資料欄位
  //  { name: "土地銀行1", balance: "908", prior: "1" },
  const [docID, setDocID] = React.useState("");
  const [name, setName] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [prior, setPrior] = React.useState("");

  // 區塊顯示
  const [gridRows, setGridRows] = React.useState([]);

  React.useEffect(() => {
    db.collection("accounts")
      .orderBy("prior")
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
                  setPrior(row.prior);
                  setBalance(row.balance);
                }}
              >
                <Label color="teal" attached="top">
                  {row.name}
                </Label>
                <Header>{numFormat(row.balance)}</Header>
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
      db.collection("accounts").doc(docID).update({
        name: name,
        balance: balance,
        prior: prior,
        updatedAt: firebase.firestore.Timestamp.now(),
      });
    } else {
      db.collection("accounts").add({
        name: name,
        balance: balance,
        prior,
        createdAt: firebase.firestore.Timestamp.now(),
      });
    }

    setDefalut();
  }

  function deleteRow() {
    if (docID) {
      db.collection("accounts")
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
    setPrior("");
  }

  

  const friendOptions = [
    {
      key: "1",
      text: "1",
      value: "1",
    },
    {
      key: "2",
      text: "2",
      value: "2",
    },
    {
      key: "3",
      text: "3",
      value: "3",
    },
    {
      key: "4",
      text: "4",
      value: "4",
    },
  ];

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
          setDefalut();
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
            <Form.Field>
              <label>順位</label>
              <Dropdown
                selection
                value={prior}
                placeholder="順位"
                options={friendOptions}
                onChange={(e, obj) => {
                  setPrior(obj.value);
                }}
              ></Dropdown>
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
