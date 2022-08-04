import {
  Container,
  Grid,
  Segment,
  Statistic,
  Dropdown,
  Placeholder,
} from "semantic-ui-react";
import { db, auth } from "../utils/firebase";
import React from "react";
import { numFormat } from "../utils/stringFormat";
import MonthSelect from "./MonthSelect";
import { MonthButton } from "./MonthSelect";
function Dashboard() {
  const user = auth.currentUser;
  const [total, setTotal] = React.useState({ income: 0, expense: 0 });
  const [loading, setIsLoding] = React.useState(false);
  const [month, setMonth] = React.useState(`0${new Date().getMonth() + 1}`);
  //   const m = "07"
  React.useEffect(() => {
    setIsLoding(true);
    let col = db.collection("balances");
    if (user) col = col.where("user", "==", user?.email);
    col.where("date", ">=", `2022-${month}-01`);
    col
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
        setIsLoding(false);
      });
  }, [month]);
  return (
    <Container>
      <Grid columns={1}>
        <Grid.Row stretched>
          <Grid.Column textAlign="center">
            <Segment color="teal">
              <Statistic>
                <Statistic.Label>本月收入</Statistic.Label>
                {loading ? (
                  <Placeholder>
                    <Placeholder.Image rectangular />
                  </Placeholder>
                ) : (
                  <Statistic.Value>{numFormat(total.income)}</Statistic.Value>
                )}
              </Statistic>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column textAlign="center">
            <Segment color="orange">
              <Statistic>
              <Statistic.Label>本月支出</Statistic.Label>
              {loading ? (
                  <Placeholder>
                     <Placeholder.Image rectangular />
                  </Placeholder>
                ) : (
                  <Statistic.Value>{numFormat(total.expense)}</Statistic.Value>
                )}
                
                
              </Statistic>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Dashboard;
