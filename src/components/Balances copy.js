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
  Dropdown,
  Divider,
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
  const [isIncome, setIsIncome] = React.useState("expense");
  // 記錄原來是否為收入,做為計算餘額用
  const [isIncomeOld, setIsIncomeOld] = React.useState("");
  // 選取帳戶
  const [activeAccount, setActiveAccount] = React.useState() || null;

  const [loading, setIsLoding] = React.useState(false);

  const [activeItem, setActiveItem] = React.useState("");
  const [activeBalance, setActiveBalance] = React.useState(0);
  const [balances, setBalances] = React.useState([]);
  const [topAccounts, setTopAccounts] = React.useState([]);

  const [cate, setCate] = React.useState();
  const [cates, setCates] = React.useState([]);
  // 全部帳戶的筆數
  const [accountsTotalRows, setAccountsTotalRows] = React.useState(0);

  // 記錄最後一筆帳戶
  const lastAccountRef = React.useRef();

  // 記錄第一筆帳戶
  const firstAccountRef = React.useRef();

  // 記錄前3筆帳戶
  const top3Accounts = React.useRef();

  React.useEffect(() => {
    // 帳戶資料
    let col = db.collection("accounts");
    if (user) col = col.where("user", "==", user.email);
    // 帳戶筆數
    col.get().then((snapshot) => {
      setAccountsTotalRows(snapshot.size);
      console.log(snapshot.size);
    });

    // if (lastAccountRef.current) col = col.startAfter(lastAccountRef.current);
    col.limit(3).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      top3Accounts.current = data;
      firstAccountRef.current = snapshot.docs[0];
      // 最後一筆文件的參照
      // if(!lastAccountRef.current)
      lastAccountRef.current = snapshot.docs[snapshot.docs.length - 1];
      console.log(data);
      setTopAccounts(data);
      if (activeAccount)
        setActiveBalance(
          data.filter((account) => account.id == activeAccount.id)[0].balance
        );
    });
  }, []);

  React.useEffect(() => {
    // 類別資料
    let colCates = db.collection("cates").orderBy("prior");
    if (user) colCates = colCates.where("user", "==", user.email);

    colCates = colCates.onSnapshot((snapshot) => {
      const rows = snapshot.docs.map((doc) => {
        const d = doc.data();
        return { text: d.name, value: d.name, key: doc.id };
      });
      setCates(rows);
    });

    // 收支資料
    let colBalances = db.collection("balances");
    if (user) colBalances = colBalances.where("user", "==", user.email);
    if (activeAccount) {
      colBalances = colBalances.where("account.id", "==", activeAccount.id);
    }
    colBalances.orderBy("date", "desc").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setBalances(data);
    });
  }, [activeAccount]);

  function saveRow() {
    setIsLoding(true);
    let row = {
      title,
      date,
      cate,
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
        setIsLoding(false);
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

              {/* <Form.Input width={8} label="Last name" placeholder="Last name" /> */}
              <Form.Select
                selection
                fluid
                label="類別"
                placeholder=""
                value={cate}
                options={cates}
                onChange={(e, obj) => {
                  setCate(obj.value);
                  console.log(obj.value);
                }}
              />

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
        <Grid columns={3}>
          {topAccounts.map((row, i) => (
            <Grid.Column key={row.id}>
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
          ))}
        </Grid>
        {activeAccount && (
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column
                onClick={() => {
                  // 帳戶資料
                  let col = db.collection("accounts");
                  if (user) col = col.where("user", "==", user.email);
                  col.limit(3);

                  col = col
                    .startAfter(lastAccountRef.current)

                    .onSnapshot((snapshot) => {
                      const data = snapshot.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id };
                      });
                      setTopAccounts(data);
                      lastAccountRef.current =
                        snapshot.docs[snapshot.docs.length - 1];
                      // 最後一筆文件的參照
                      if (snapshot.size == 0) {
                        // 帳戶資料
                        let col = db.collection("accounts");
                        if (user) col = col.where("user", "==", user.email);

                        col.limit(3).onSnapshot((snapshot) => {
                          const data = snapshot.docs.map((doc) => {
                            return { ...doc.data(), id: doc.id };
                          });
                          setTopAccounts(data);
                          lastAccountRef.current =
                            snapshot.docs[snapshot.docs.length - 1];
                        });

                        console.log(lastAccountRef.current);
                      }
                    });
                }}
              >
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
                  }}
                >
                  <Icon name="plus" /> Create
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}

        {/*資料表格*/}
        <Grid>
          <Grid.Row>
            <Grid.Column>
              {balances.map((row, i) => {
                return (
                  <Table key={row.id} unstackable>
                    <Table.Body>
                      <Table.Row
                        onClick={() => {
                          setOpen(true);
                          setDocID(row.id);
                          setTitle(row.title);
                          setDate(row.date);
                          setAccount(row.account);
                          setCate(row.cate);
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
                            <Label color="teal">{row.account.name}</Label>
                          )}
                          {row.cate && <Label>{row.cate}</Label>}
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
