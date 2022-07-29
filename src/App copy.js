import { db } from './utils/firebase'
import { useState, useEffect } from 'react'
import { Grid, Label, Icon, Container, Segment, Menu } from 'semantic-ui-react'
function App() {
    const [rows, setRows] = useState([])

    useEffect(() => {
        const col = db.collection('topics').get().then((snapshot) => {
            const data = snapshot.docs.map(doc => {
                return doc.data()
            })
            setRows(data)
            console.log(data)
        })
    }, [])


    // console.log(db)
    return (
        <div>
            <Container>
                <Menu>
                    <Menu.Item>a</Menu.Item>
                </Menu>


                <Grid columns="equal">
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            <Label color='teal'>
                                123456
                            </Label>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Label color='teal'>
                                12345
                            </Label>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Label color='teal'>
                                6789
                            </Label>
                        </Grid.Column>

                    </Grid.Row>
                    <Grid.Row >
                        {rows.map((row, i) => {
                            return (
                                <Grid.Column key={i}>
                                    {/* <Label color='teal'>
                                        1234567890
                                    </Label> */}
                                    <Segment color='teal' textAlign='center'>
                                        {row.name}
                                    </Segment>

                                </Grid.Column>
                            )
                        }
                        )}

                    </Grid.Row>
                </Grid>

            </Container>
        </div>
    )



}

// const Abc=function() {
//     return 'my app is done'
// }

export default App