import { Table, Header, Label } from "semantic-ui-react";
function Table2Rows({ rows }) {
  return (
    <div>
      {rows.map((row,i) => {
        return (
          <Table key={i} unstackable color="orange">
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">{row.name}</Header>
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <Label color="orange" circular>
                    提
                  </Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>2022-01-02</Table.Cell>
                <Table.Cell textAlign="right">{row.amt}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        );
      })}
    </div>
  );
}

export default Table2Rows;
