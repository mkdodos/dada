import {
  Container,
  Grid,
  Segment,
  Statistic,
  Dropdown,
  Placeholder,
  Button,
} from "semantic-ui-react";
import { db, auth } from "../utils/firebase";
import React from "react";
import { numFormat } from "../utils/stringFormat";
import MonthSelect from "./MonthSelect";
import { MonthButton } from "./MonthSelect";
import {useHistory} from 'react-router-dom'
function Dashboard() {
  const history = useHistory()
  const user = auth.currentUser;
  const [total, setTotal] = React.useState({ income: 0, expense: 0 });
  const [loading, setIsLoding] = React.useState(false);
  const [month, setMonth] = React.useState(`0${new Date().getMonth() + 1}`);
 
  React.useEffect(() => {
    setIsLoding(true);
    let col = db.collection("balances");
    if (user) col = col.where("user", "==", user?.email);
    col = col
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
        setIsLoding(false);
      });
  }, [month]);
  return (
    <Container>
     
      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column><Button onClick={()=>{
            history.push('/transfer')

          }}>轉帳</Button></Grid.Column>
        
        </Grid.Row>
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
