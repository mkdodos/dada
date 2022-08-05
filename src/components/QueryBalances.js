import {
  Container,
  Button,
  Grid,
  Menu,
  Table,
  Label,
  Icon,
} from "semantic-ui-react";
import { MonthButton } from "./MonthSelect";
import React from "react";
import { db, auth } from "../utils/firebase";

import { numFormat } from "../utils/stringFormat";

export default function QueryBalances() {
  const user = auth.currentUser;
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  // 中間按鈕按下切換全年或當月
  const [isMonth, setIsMonth] = React.useState(false);

  const [balances, setBalances] = React.useState([]);
  const [cate, setCate] = React.useState();
  const [cates, setCates] = React.useState([]);
  React.useEffect(() => {
    // 類別資料
    let colCates = db.collection("cates").orderBy("prior");
    if (user) colCates = colCates.where("user", "==", user.email);

    colCates = colCates.onSnapshot((snapshot) => {
      const rows = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setCates(rows);
    });
    // 收支資料
    let colBalances = db.collection("balances");
    if (user) colBalances = colBalances.where("user", "==", user.email);
    if (month !== 0)
      colBalances = colBalances
        .where("date", ">=", `2022-0${month}-01`)
        .where("date", "<=", `2022-0${month}-31`);
    if (cate) colBalances = colBalances.where("cate", "==", cate);

    colBalances.orderBy("date", "desc").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setBalances(data);
      // console.log(data);
    });
  }, [month, cate]);

  function handleItemClick(e, { name }) {
    setCate(name);
  }

  return (
    <Container>
      <MonthButton
        text={month !== 0 ? `${month} 月` : "全年"}
        onPlusClick={() => {
          if (month == 12) setMonth(0);
          else setMonth(month + 1);
        }}
        // 中間按鈕按下切換全年或當月
        onClick={() => {
          if (isMonth) {
            setMonth(new Date().getMonth() + 1);
            setIsMonth(false);
          } else {
            setMonth(0);
            setIsMonth(true);
          }
        }}
        onDoubleClick={() => {
          setMonth(0);
        }}
        onMinusClick={() => {
          if (month == 0) setMonth(12);
          else setMonth(month - 1);
        }}
      ></MonthButton>
      <Menu color="blue" pointing secondary>
        {cates.map((obj, i) => (
          <Menu.Item
            key={i}
            name={obj.name}
            active={cate === obj.name}
            onClick={handleItemClick}
          >
            {obj.name}
          </Menu.Item>
        ))}
        <Menu.Item
          name="all"
          active={!cate}
          onClick={() => {
            setCate();
          }}
        >
          全部
        </Menu.Item>
      </Menu>
      {/* <Label
        as="a"
        color={cate=='加油' ?'teal':'grey' }
      
        onClick={(e, obj) => {
          console.log(obj.children);
          if (!cate) setCate(obj.children);
          else setCate();
        }}
      >
        加油
      </Label> */}

      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>日期</Table.HeaderCell>
            <Table.HeaderCell>項目</Table.HeaderCell>
            <Table.HeaderCell width={3} textAlign="right">收支</Table.HeaderCell>
            {/* <Table.HeaderCell>支出</Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {balances.map((row, i) => (
            <Table.Row key={i}>
              <Table.Cell>{row.date.slice(5, 10)}</Table.Cell>
              <Table.Cell>
                <Label>{row.cate}</Label>
                {`  ${row.title}`}
              </Table.Cell>
              <Table.Cell textAlign="right"> {row.income ?<Label color="teal">{numFormat(row.income)}</Label> :
             numFormat(row.expense)  }</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}
