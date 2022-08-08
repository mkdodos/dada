import React from 'react';
import { db, auth } from '../utils/firebase';
import { Container, Dropdown, Form } from 'semantic-ui-react';
export default function Transfer() {
  const user = auth.currentUser;
  // 資料欄位
  const [accountFrom, setAccountFrom] = React.useState();
  const [accountTo, setAccountTo] = React.useState();
  const [amt, setAmt] = React.useState('');//需要有預設值,防止 onChange 出錯
  // 下拉帳戶資料
  const [accounts, setAccounts] = React.useState([]);

  React.useEffect(() => {
    let col = db.collection('accounts').orderBy('prior');
    if (user) col = col.where('user', '==', user.email);

    col = col.onSnapshot((snapshot) => {
      const rows = snapshot.docs.map((doc) => {
        const d = doc.data();
        return { text: d.name, value: d.balance, key: doc.id };
      });
      setAccounts(rows);
    });
  }, []);


  function handleTrans() {
    console.log(accountFrom)
    // let col = db.collection('accounts').doc(accountFrom).update({balance:123});

  }
  return (
    <Container>
      <Form>
        <Form.Group unstackable>
          <Form.Select
            width={4}
            selection
            fluid
            // label="類別"
            placeholder="轉出"
            value={accountFrom}
            options={accounts}
            onChange={(e, obj) => {
              setAccountFrom(obj);
            }}
          />
          <Form.Input
            type="number"
            width={4}
            value={amt}
            onChange={(e) => {
              setAmt(e.target.value);
            }}
          ></Form.Input>

          <Form.Select
            width={4}
            selection
            fluid
            placeholder="轉入"
            value={accountTo}
            options={accounts}
            onChange={(e, obj) => {
              setAccountTo(obj.value);
            }}
          />
          <Form.Button color='teal'
            onClick={handleTrans}
          >
            轉帳
          </Form.Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
