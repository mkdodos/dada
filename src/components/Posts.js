import { db } from "../utils/firebase";
import React from "react";
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
} from "semantic-ui-react";
function Posts() {
  const rows = [
    { name: "現金", amt: "678", date: "2022-09-01" },
    { name: "信用卡", amt: "4,567", date: "2022-01-08" },
    { name: "玉山", amt: "908", date: "2022-10-22" },
    { name: "中國信託", amt: "908", date: "2022-10-22" },
  ];

  const [activeItem, setActiveItem] = React.useState("");
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
    db.collection("posts")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setPosts(data);
      });
  }, []);

  function saveRow() {
    db.collection("posts")
      .add({
        title: "add",
        expense: 76,
        date: "2022-12-31",
      })
      .then(() => {});
  }
  return (
    <>
      <Header></Header>
      <Container>
        <Grid columns="equal">
          <Grid.Row>
            {topAccounts.map((row,i) => {
              return <Grid.Column key={i}>
                <Segment textAlign="center"
                  onClick={() => {
                    setActiveItem(row.name);
                  }}
                  color={activeItem === row.name ? "teal" : "grey"}
                >
                  {row.name}
                </Segment>
              </Grid.Column>;
            })}

            {/* <Grid.Column>
              <Segment
                onClick={() => {
                  setActiveItem("b");
                }}
                color={activeItem === "b" ? "teal" : "grey"}
              >
                a
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment
                onClick={() => {
                  setActiveItem("c");
                }}
                color={activeItem === "c" ? "teal" : "grey"}
              >
                a
              </Segment>
            </Grid.Column> */}
          </Grid.Row>
          {activeItem && (
            <Grid.Row>
              <Grid.Column>
                <Statistic horizontal>
                  <Statistic.Value>5,550</Statistic.Value>
                  <Statistic.Label>玉山</Statistic.Label>
                </Statistic>
              </Grid.Column>

              <Grid.Column verticalAlign="middle">
                <Button floated="right" color="blue" onClick={saveRow}>
                  <Icon name="plus" /> Create
                </Button>
              </Grid.Column>
            </Grid.Row>
          )}

          <Grid.Row>
            <Grid.Column>
              {posts.map((row, i) => {
                return (
                  <Table key={i} unstackable>
                    <Table.Body>
                      <Table.Row>
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
                          <br></br>${row.income ? row.income : row.expense + ""}
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
