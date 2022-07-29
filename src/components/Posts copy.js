
import { Grid, Label, Icon, Container, Segment, Menu, Card, List, Button, Table,Header } from 'semantic-ui-react'
function Posts() {
    const rows = [{ name: '現金', amt: '678' }, { name: '信用卡', amt: '4,567' }, { name: '玉山', amt: '908' }]
    return (
        <>
            <Header></Header>
            <Container>
                <Grid columns="equal">
                    {/* <Grid.Row>
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

                    </Grid.Row> */}
                    <Grid.Row >
                        {rows.map((row, i) => {
                            return (
                                <Grid.Column key={i}>

                                    <Segment textAlign='center'>
                                        <Label color='teal' attached='top'>{row.name}</Label>
                                        <div>{row.amt}</div>
                                        {/* <Label color='teal'>
                                           
                                        </Label> */}




                                    </Segment>

                                </Grid.Column>
                            )
                        }
                        )}

                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>

                            <Table unstackable>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as="h4">Cash Bouns</Header>
                                          
                                            2022-01-09
                                        </Table.Cell>
                                        <Table.Cell textAlign="right">
                                            <Label color="teal" circular>存</Label>
                                            <br />7740
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>


                            <Table unstackable>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            買桌遊

                                            <br />
                                            2022-01-09
                                        </Table.Cell>
                                        <Table.Cell textAlign="right">
                                            <Label color="orange" circular>提</Label>
                                            <br />774
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>

                            <Segment>
                                <List horizontal size="large">
                                    <List.Item>

                                        <List.Content>
                                            {/* <List.Header> </List.Header> */}
                                            {/* <Label circular color='orange' >
                                                提
                                            </Label> */}
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>

                                        <List.Content>
                                            <List.Description as='a'>2022-07-29</List.Description>
                                            <List.Header> 現金股息</List.Header>

                                        </List.Content>
                                    </List.Item>
                                    <List.Item>

                                        <List.Content>
                                            <Label circular color='orange' >
                                                提
                                            </Label>
                                            <List.Header>1234</List.Header>

                                        </List.Content>
                                    </List.Item>

                                </List>
                            </Segment>
                            <Segment>
                                <List horizontal size="large">
                                    <List.Item>

                                        <List.Content>

                                            {/* <Label circular color='teal' >
                                                存
                                            </Label> */}
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>

                                        <List.Content>
                                            <List.Description as='a'>2022-07-29</List.Description>
                                            <List.Header> 玉山卡款扣 玉山卡款扣</List.Header>

                                        </List.Content>
                                    </List.Item>
                                    <List.Item>

                                        <List.Content color='teal'>
                                            <Label circular color='teal' >
                                                存
                                            </Label>
                                            <List.Header color='teal'>134</List.Header>

                                        </List.Content>
                                    </List.Item>

                                </List>
                            </Segment>
                            {/* <Segment>
                                <List divided size="large">
                                    <List.Item>
                                        <List.Icon name='github' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header>現金股息</List.Header>
                                            <List.Description as='a'>2022-07-29</List.Description>
                                        </List.Content>
                                    </List.Item>

                                </List>
                            </Segment> */}




                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>
        </>
    )


}
export default Posts