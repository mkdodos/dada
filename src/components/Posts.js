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

  const posts = [
    { name: "現金股息", income: "678", date: "2022-09-01" },
    { name: "信用卡", amt: "4,567", date: "2022-01-08" },
    { name: "玉山", amt: "908", date: "2022-10-22" },
    { name: "薪資", income: "50975", date: "2022-10-05" },
  ];
  return (
    <>
      <Header></Header>
      <Container>
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
                  <Table key={i} unstackable>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">{row.name}</Header>
                          {row.date}
                        </Table.Cell>
                        <Table.Cell textAlign="right">
                          {row.income ? (
                            <>
                              <Label color="teal" circular>
                                存
                              </Label>
                              <br />
                              {row.income}
                            </>
                          ) : (
                            <>
                              <Label color="orange" circular>
                                提
                              </Label>
                              <br />
                              {row.amt}
                            </>
                          )}
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
