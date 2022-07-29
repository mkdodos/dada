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
function Topics() {
  const rows = [
    { name: "現金", amt: "678", date: "2022-09-01" },
    { name: "信用卡", amt: "4,567", date: "2022-01-08" },
    { name: "玉山", amt: "908", date: "2022-10-22" },
  ];

  return (
    <>
      
      <Container>
        <Grid columns="equal">
          <Grid.Row>
            {rows.map((row, i) => {
              return (
                <Grid.Column key={i}>
                  <Segment textAlign="center">
                    <Label color="teal" attached="top">
                      {row.name}
                    </Label>
                    <Header>{row.amt}</Header>
                  </Segment>
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </Grid>
        <Table unstackable color="orange">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4">現金股息</Header>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <Label color="orange" circular>
                        提
                      </Label>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>2022-01-02</Table.Cell>
                    <Table.Cell textAlign="right">2,345</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Table unstackable color="teal">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4">現金股息</Header>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <Label color="teal" circular>
                        存
                      </Label>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>2022-01-02</Table.Cell>
                    <Table.Cell textAlign="right">2,345</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
      </Container>
    </>
  );
}
export default Topics;
