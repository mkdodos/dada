import React from 'react';
import { db, auth } from '../utils/firebase';
import {
  Container,
  Dropdown,
  Form,
  Header,
  Segment,
  Grid,
  Icon,
  Button,
  Search,
  Divider,
  Statistic,
} from 'semantic-ui-react';

import {numFormat} from "../utils/stringFormat"

export default function Transfer() {
  const user = auth.currentUser;
  // 資料欄位
  // 帳戶 ID
  // const [currAcc, setCurrAcc] = React.useState();
  // const [accountFrom, setAccountFrom] = React.useState();
  const [accountFromId, setAccountFromId] = React.useState();
  const [accountFromName, setAccountFromName] = React.useState('');
  const [accountFromAmt, setAccountFromAmt] = React.useState('');

  const [accountToId, setAccountToId] = React.useState();
  const [accountToName, setAccountToName] = React.useState('');
  const [accountToAmt, setAccountToAmt] = React.useState('');
  // const [accountTo, setAccountTo] = React.useState();
  // 轉帳金額
  const [amt, setAmt] = React.useState(''); //需要有預設值,防止 onChange 出錯
  // 原帳戶餘額
  // const [amtFrom, setAmtFrom] = React.useState(0);
  // const [amtTo, setAmtTo] = React.useState(0);
  // 帳戶資料
  const [accounts, setAccounts] = React.useState([]);

  // 帳戶資料
  // const [setAccountFrom, setAccountFrom] = React.useState([]);

  // 下拉帳戶資料
  const [accountsOptions, setAccountsOptions] = React.useState([]);

  React.useEffect(() => {
    let col = db.collection('accounts').orderBy('prior');
    if (user) col = col.where('user', '==', user.email);

    col = col.onSnapshot((snapshot) => {
      const rows = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
        // return { text: d.name+d.balance, value: doc.id, key: doc.id, amt:d.balance };
      });
      const rowsOptions = snapshot.docs.map((doc) => {
        const d = doc.data();
        // console.log(d)
        // return d;
        return {
          text: d.name,
          value: doc.id,
          key: doc.id,
          content: <Header content={d.name} subheader={`$${d.balance}`} />,
        };
      });
      setAccounts(rows);
      console.log(rowsOptions);
      setAccountsOptions(rowsOptions);
      // setAccountToAmt('123')
    });
  }, []);

  function handleTrans() {
    db.collection('accounts')
      .doc(accountFromId)
      .update({ balance: accountFromAmt - amt * 1 })
      .then(() => {
        setAccountFromAmt(accountFromAmt - amt * 1);
      });
    db.collection('accounts')
      .doc(accountToId)
      .update({ balance: accountToAmt + amt * 1 })
      .then(() => {
        setAccountToAmt(accountToAmt + amt * 1);
      });

    setAmt('');

    // console.log(accountFrom);
    // console.log(amtFrom - amt * 1);
    // console.log(accountTo);
    // console.log(amtTo + amt * 1);
    // let col = db.collection('accounts').doc(accountFrom).update({balance:123});
  }

  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ];
  return (
    <Container>
      <Form>
        <Form.Group widths="equal">
          <Form.Dropdown
            selection
            fluid
            // label="類別"
            placeholder="轉出帳戶"
            value={accountFromId}
            options={accountsOptions}
            onChange={(e, obj) => {
              const currAcc = accounts.filter((acc) => acc.id == obj.value)[0];
              setAccountFromId(currAcc.id);
              setAccountFromName(currAcc.name);
              setAccountFromAmt(currAcc.balance);
            }}
          />
          <Form.Input
            type="number"
            placeholder="轉帳金額 $"
            value={amt}
            onChange={(e) => {
              setAmt(e.target.value);
            }}
          ></Form.Input>

          <Form.Dropdown
            selection
            fluid
            // label="類別"
            placeholder="轉出帳戶"
            value={accountToId}
            options={accountsOptions}
            onChange={(e, obj) => {
              const currAcc = accounts.filter((acc) => acc.id == obj.value)[0];
              setAccountToId(currAcc.id);
              setAccountToName(currAcc.name);
              setAccountToAmt(currAcc.balance);
            }}
          />
        </Form.Group>
        {/* <Form.Group> */}
        <Form.Button size="large" fluid color="teal" onClick={handleTrans}>
          轉帳
        </Form.Button>
        {/* </Form.Group> */}
      </Form>
      <Segment placeholder>
        <Grid columns={2} unstackable="true" textAlign="center">
          <Divider vertical></Divider>

          <Grid.Row verticalAlign="middle">
            <Grid.Column>
            <Statistic>
                <Statistic.Label>{accountFromName}</Statistic.Label>
                <Statistic.Value>{numFormat(accountFromAmt)}</Statistic.Value>
              </Statistic>
            </Grid.Column>

            <Grid.Column>
              <Statistic>
                <Statistic.Label>{accountToName}</Statistic.Label>
                <Statistic.Value>{numFormat(accountToAmt)}</Statistic.Value>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
}
