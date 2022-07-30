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
} from "semantic-ui-react";
function Posts() {
  const rows = [
    { name: "現金", amt: "678", date: "2022-09-01" },
    { name: "信用卡", amt: "4,567", date: "2022-01-08" },
    { name: "玉山", amt: "908", date: "2022-10-22" },
  ];

  // const posts = [
  //   { name: "現金股息", income: "678", date: "2022-09-01" },
  //   { name: "信用卡", amt: "4,567", date: "2022-01-08" },
  //   { name: "玉山", amt: "908", date: "2022-10-22" },
  //   { name: "薪資", income: "50975", date: "2022-10-05" },
  // ];
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
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
        <Button onClick={saveRow}>Create</Button>
        <Grid columns="equal">
          {/* <Grid.Row>
            <Grid.Column textAlign="center">
              <Label color="teal">123456</Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="teal">12345</Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="teal">6789</Label>
            </Grid.Column>
          </Grid.Row> */}

          <Grid.Row>
            <Grid.Column>
              {posts.map((row, i) => {
                return (
                  <Table key={i} unstackable celled>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">{row.title}</Header>
                          {row.date}
                        </Table.Cell>
                        <Table.Cell textAlign="right">yyy</Table.Cell>
                        <Table.Cell textAlign="right">
                          {row.income ? row.income : row.expense}
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
