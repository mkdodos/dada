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
import { auth } from "../utils/firebase";
import MonthSelect from "./MonthSelect";

function Balances() {
  const user = auth.currentUser;
  // 編輯視窗顯示控制
  const [open, setOpen] = React.useState(false);
  // 資料欄位
  const [docID, setDocID] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [income, setIncome] = React.useState("");
  const [account, setAccount] = React.useState();
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [oldAmt, setOldAmt] = React.useState("");

  // 收支判斷
  const [isIncome, setIsIncome] = React.useState("income");
  // 記錄原來是否為收入,做為計算餘額用
  const [isIncomeOld, setIsIncomeOld] = React.useState("");
  // 選取帳戶
  const [activeAccount, setActiveAccount] = React.useState() || null;

  const [loading, setIsLoding] = React.useState(false);

  const [activeItem, setActiveItem] = React.useState("");
  const [activeBalance, setActiveBalance] = React.useState(0);
  const [balances, setBalances] = React.useState([]);
  const [topAccounts, setTopAccounts] = React.useState([]);

  React.useEffect(() => {
    // 收支資料
    let colBalances = db.collection("balances");
    if (user) colBalances = colBalances.where("user", "==", user.email);
    if (activeAccount) {colBalances = colBalances.where("account.id", "==", activeAccount.id)}
    colBalances.orderBy('date','desc').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setBalances(data);
    });

    // 帳戶資料
    let col = db.collection("accounts");
    if (user) col = col.where("user", "==", user.email);
    col.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      // console.log(data)

      setTopAccounts(data);
      if (activeAccount)
        setActiveBalance(
          data.filter((account) => account.id == activeAccount.id)[0].balance
        );
    });
  }, [activeAccount]);

  function saveRow() {
    setIsLoding(true)
    let row = {
      title,
      date,
    };
    if (isIncome == "income") {
      row.income = income;
    } else {
      row.expense = income;
    }
    if (account) {
      row.account = account;
    }

    if (activeAccount) {
      row.account = activeAccount;
    }

    if (user) {
      row.user = user.email;
    }

    if (docID) {
      db.collection("balances")
        .doc(docID)
        .set(row)
        .then(() => {
          let temp = 0;

          // 原本為收入改支出
          if (isIncomeOld == "income" && isIncome == "expense")
            temp = temp - income * 1 - oldAmt * 1;
          // 支出=>收入
          else if (isIncomeOld == "expense" && isIncome == "income")
            temp = temp + income * 1 + oldAmt * 1;
          else if (isIncome == "income") temp = income - oldAmt;
          else if (isIncome == "expense") temp = oldAmt - income;
          updateBalance(temp);

          // else updateBalance(income * -1);
        });
    } else {
      db.collection("balances")
        .add(row)
        .then(() => {
          if (isIncome == "income") updateBalance(income);
          else updateBalance(income * -1);
          setDefalut();
        });
    }
  }

  // 更新帳戶餘額
  function updateBalance(amt) {
    // const temp = activeBalance *1
    db.collection("accounts")
      .doc(activeAccount.id)
      .update({
        balance: activeBalance * 1 + amt * 1,
      })
      .then(() => {
        setDefalut();
        setIsLoding(false)
        // setActiveAccount(account)
        // setActiveBalance(900)
        // console.log("ok");
      });
  }

  function deleteRow() {
    if (docID) {
      db.collection("balances")
        .doc(docID)
        .delete()
        .then(() => {
          if (isIncome == "expense") updateBalance(income);
          else updateBalance(income * -1);
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
    setIsIncome(name);
  }
  return (
    <>

      {/* <Header>{isIncomeOld}</Header> */}
      <Container>
        {/* <MonthSelect onChange={(e,obj)=>{
          console.log(obj.value)
        }}/> */}
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
            <Menu fluid widths={2} pointing secondary>
              <Menu.Item
                color="teal"
                name="income"
                active={isIncome === "income"}
                onClick={handleItemClick}
              >
                收入
              </Menu.Item>
              <Menu.Item
                color="orange"
                name="expense"
                active={isIncome === "expense"}
                onClick={handleItemClick}
              >
                支出
              </Menu.Item>
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
            {docID && (
              <Button color="red" floated="left" onClick={deleteRow}>
                <Icon name="remove" />
                Delete
              </Button>
            )}

            <Button color="green" loading={loading} onClick={saveRow}>
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
                      setActiveBalance(row.balance);
                      setActiveAccount(row);
                    }}
                    color="teal"
                    inverted={activeAccount?.name === row.name}
                  >
                    {row.name}
                  </Segment>
                </Grid.Column>
              );
            })}
          </Grid.Row>
          {activeAccount && (
            <Grid.Row>
              <Grid.Column>
                <Statistic horizontal>
                  <Statistic.Value>
                    {numFormat(activeBalance)}
                    {/* {numFormat(topAccounts.filter(account=>account.id==activeAccount.id)[0].balance)} */}
                    {/* {numFormat(activeAccount.balance)} */}
                    {/* {topAccounts[0].balance} */}
                  </Statistic.Value>
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
              {balances.map((row, i) => {
                return (
                  <Table key={i} unstackable>
                    <Table.Body>
                      <Table.Row
                        onClick={() => {
                          setOpen(true);
                          setDocID(row.id);
                          setTitle(row.title);
                          setDate(row.date);
                          setAccount(row.account);
                          setActiveAccount(row.account);

                          if (row.income) {
                            setIsIncome("income");
                            setIncome(row.income);
                            // 記錄原金額
                            setOldAmt(row.income);
                            setIsIncomeOld("income");
                          } else {
                            setIsIncome("expense");
                            setIncome(row.expense);
                            // 記錄原金額
                            setOldAmt(row.expense);
                            setIsIncomeOld("expense");
                          }
                        }}
                      >
                        <Table.Cell>
                          <Header as="h4">{row.title}</Header>
                          <span>{row.date} </span>
                          {!activeAccount && (
                            <Label>{row.account && row.account.name}</Label>
                          )}
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
                          {row.income
                            ? numFormat(row.income)
                            : numFormat(row.expense) + ""}
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

export default Balances;
