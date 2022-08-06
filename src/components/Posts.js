import { db } from "../utils/firebase";
import React from "react";
import { numFormat } from "../utils/stringFormat";

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
  Statistic,
  Modal,
  Form,
} from "semantic-ui-react";
function Posts() {
  const rows = [
    { name: "現金", amt: "678", date: "2022-09-01" },
    { name: "信用卡", amt: "4,567", date: "2022-01-08" },
    { name: "玉山", amt: "908", date: "2022-10-22" },
    { name: "中國信託", amt: "908", date: "2022-10-22" },
  ];
  // 編輯視窗顯示控制
  const [open, setOpen] = React.useState(false);
  // 資料欄位
  const [docID, setDocID] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [income, setIncome] = React.useState("");
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));

  const [isIncome, setIsIncome] = React.useState("income");

  const [activeItem, setActiveItem] = React.useState("");
  const [activeBalance, setActiveBalance] = React.useState(0);
  const [posts, setPosts] = React.useState([]);
  const [topAccounts, setTopAccounts] = React.useState([]);
  React.useEffect(() => {
    db.collection("topics")
      .where("prior", "<=", "3")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setTopAccounts(data);
        console.log(data);
      });

    db.collection("posts").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setPosts(data);
    });
  }, []);

  function saveRow() {
    let row = {
      title,
      date
    };
    if(isIncome=='income'){
      row.income = income;
    }else{
      row.expense = income;
    }
    
    if (docID) {
      db.collection("posts")
        .doc(docID)
        .set(row)
        .then(() => {
          setDefalut();
        });
    } else {
      db.collection("posts")
        .add(row)
        .then(() => {
          setDefalut();
        });
    }
  }

  function deleteRow() {
    if (docID) {
      db.collection("posts")
        .doc(docID)
        .delete()
        .then(() => {
          console.log("add");
          setDefalut();
        });
    }
  }

  function setDefalut() {
    setOpen(false);
    setDocID("");
    setTitle("");
    setIncome("");
  }

  function handleItemClick(e, { name }) {
      setIsIncome(name)
  }
  return (
    <>
      <Header></Header>
      <Container>
        <Modal
          closeIcon
          open={open}
          onClose={() => {
            setOpen(false);
            setDefalut();
          }}
        >
          <Header>編輯收支</Header>
          <Modal.Content>
            <Menu fluid widths={2} pointing secondary  >
              <Menu.Item 
              color='teal'
              
                name="income"
                active={isIncome === "income"}
                onClick={handleItemClick}
              >收入</Menu.Item>
              <Menu.Item
              color='orange'
                name="expense"
                active={isIncome === "expense"}
                onClick={handleItemClick}
              >支出</Menu.Item>
              
            </Menu>
            <Form size="large">
            <Form.Field>
                <label>日期</label>
                <input
                type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>項目</label>
                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>金額</label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => {
                    setIncome(e.target.value);
                  }}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            {docID && <Button color="red" floated="left" onClick={deleteRow}>
              <Icon name="remove" />
              Delete
            </Button>}
            
            <Button color="green" onClick={saveRow}>
              <Icon name="check" />
              Save
            </Button>
          </Modal.Actions>
        </Modal>
        {/* 帳戶 */}
        <Grid columns="equal">
          <Grid.Row>
            {topAccounts.map((row, i) => {
              return (
                <Grid.Column key={i}>
                  <Segment
                    textAlign="center"
                    onClick={() => {
                      setActiveItem(row.name);
                      setActiveBalance(row.balance+12389);
                    }}
                    color="teal"
                    inverted={activeItem === row.name}
                  >
                    {row.name}
                  </Segment>
                </Grid.Column>
              );
            })}
          </Grid.Row>
          {activeItem && (
            <Grid.Row>
              <Grid.Column>
                <Statistic horizontal>
                  <Statistic.Value>{numFormat(activeBalance)}</Statistic.Value>
                  {/* <Statistic.Label>玉山</Statistic.Label> */}
                </Statistic>
              </Grid.Column>

              <Grid.Column verticalAlign="middle">
                <Button
                  floated="right"
                  color="blue"
                  onClick={() => {
                    setOpen(true);
                    // setIsIncome('income')
                  }}
                >
                  <Icon name="plus" /> Create
                </Button>
              </Grid.Column>
            </Grid.Row>
          )}
          {/*資料表格*/}
          <Grid.Row>
            <Grid.Column>
              {posts.map((row, i) => {
                return (
                  <Table key={i} unstackable>
                    <Table.Body>
                      <Table.Row
                        onClick={() => {
                          setOpen(true);
                          setDocID(row.id);
                          setTitle(row.title);
                          setDate(row.date)
                          if(row.income){
                            setIsIncome('income')
                            setIncome(row.income);
                          }else{
                            setIsIncome('expense')
                            setIncome(row.expense);

                          }
                          
                        }}
                      >
                        <Table.Cell>
                          <Header as="h4">{row.title}</Header>
                          {row.date}
                        </Table.Cell>
                        <Table.Cell textAlign="right">
                          {row.income ? (
                            <Label color="teal" circular>
                              存
                            </Label>
                          ) : (
                            <Label color="orange" circular>
                              提
                            </Label>
                          )}
                          <br></br>${" "}
                          {row.income ? row.income : row.expense + ""}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                );
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
}
export default Posts;
