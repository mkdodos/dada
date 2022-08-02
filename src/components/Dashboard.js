import {
  Container,
  Grid,
  Segment,
  Statistic,
  Dropdown,
} from "semantic-ui-react";
import { db, auth } from "../utils/firebase";
import React from "react";
import { numFormat } from "../utils/stringFormat";
function Dashboard() {
  const months = [];
  // const i = "5"
  for (let i = 1; i <= 12; i++){
    let num = i;
    if(i<=9)num='0'+i
    months.push({
      key: num,
      text: num,
      value: num,
    });
    console.log(num)
  }
  
   
  const user = auth.currentUser;
  const [total, setTotal] = React.useState({});
  const [month, setMonth] = React.useState();
  //   const m = "07"
  React.useEffect(() => {
    db.collection("balances")
      .where("user", "==", user.email)
      .where("date", ">=", `2022-${month}-01`)
      .where("date", "<=", `2022-${month}-31`)
      .get()
      .then((snapshot) => {
        let income = 0;
        let expense = 0;
        snapshot.docs.map((doc) => {
          if (doc.data().income) income += doc.data().income * 1;
          if (doc.data().expense) expense += doc.data().expense * 1;
        });
        setTotal({ income: income, expense: expense });
      });
  }, [month]);
  return (
    <Container>
      <Dropdown
        selection
        value={month}
        placeholder="順位"
        options={months}
        onChange={(e, obj) => {
          setMonth(obj.value);
        }}
      ></Dropdown>
      <Grid columns={1}>
        <Grid.Row stretched>
          <Grid.Column textAlign="center">
            <Segment color="teal">
              <Statistic>
                <Statistic.Label>本月收入</Statistic.Label>
                <Statistic.Value>{numFormat(total.income)}</Statistic.Value>
              </Statistic>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column textAlign="center">
            <Segment color="orange">
              <Statistic>
                <Statistic.Label>本月支出</Statistic.Label>
                <Statistic.Value>{numFormat(total.expense)}</Statistic.Value>
              </Statistic>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Dashboard;
