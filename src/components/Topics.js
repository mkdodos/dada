import React from "react";
import Table2Rows from "./Table2Rows";
import GridEqualColumns from "./GridEqualColumns";
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
  Modal,
  Form,
} from "semantic-ui-react";
function Topics() {
  const rows = [
    { name: "現金", amt: "678", date: "2022-09-01" },
    { name: "信用卡", amt: "4,567", date: "2022-01-08" },
    { name: "玉山", amt: "908", date: "2022-10-22" },
    
  ];
 

  React.useEffect(() => {});
  

  return (
    <>
      <Container>
        {/* <Table2Rows rows={rows}></Table2Rows> */}
        <GridEqualColumns/>
      </Container>
    </>
  );
}
export default Topics;
