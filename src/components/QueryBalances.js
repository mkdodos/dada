import { Container, Button, Grid, Menu, Table } from "semantic-ui-react";
import { MonthButton } from "./MonthSelect";
import React from "react";
import { db } from "../utils/firebase";
export default function QueryBalances() {
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [balances, setBalances] = React.useState([]);
  React.useEffect(() => {
    // 收支資料
    let colBalances = db.collection("balances");
    colBalances = colBalances
      .where("date", ">=", `2022-0${month}-01`)
      .where("date", "<=", `2022-0${month}-31`);
    colBalances.orderBy("date", "desc").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setBalances(data);
      console.log(data);
    });
  }, [month]);

  return (
    <Container>
      <MonthButton
        text={`${month} 月`}
        onPlusClick={() => {
          if (month == 12) setMonth(1);
          else setMonth(month + 1);
        }}
        onClick={() => {
          setMonth(new Date().getMonth() + 1);
        }}
        onMinusClick={() => {
          if (month == 1) setMonth(12);
          else setMonth(month - 1);
        }}
      ></MonthButton>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>日期</Table.HeaderCell>
            <Table.HeaderCell>項目</Table.HeaderCell>
            <Table.HeaderCell width={3}>收入</Table.HeaderCell>
            <Table.HeaderCell>支出</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {balances.map((row, i) => (
            <Table.Row key={i}>
              <Table.Cell>{row.date.slice(5,10)}</Table.Cell>
              <Table.Cell>{row.title}</Table.Cell>
              <Table.Cell>{row.income}</Table.Cell>
              <Table.Cell>{row.expense}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}
