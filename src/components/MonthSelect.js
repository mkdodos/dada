import {
  Container,
  Grid,
  Segment,
  Statistic,
  Dropdown,
} from "semantic-ui-react";
import React from "react";
export default function MonthSelect(props) {
  const [month, setMonth] = React.useState();
  const months = [];

  for (let i = 1; i <= 12; i++) {
    let num = i;
    if (i <= 9) num = "0" + i;
    months.push({
      key: num,
      text: num,
      value: num,
    });
    
  }
  return (
    <Dropdown
      selection
      value={month}
      placeholder="順位"
      options={months}
      onChange={props.onChange}
    ></Dropdown>
  )
  
}
