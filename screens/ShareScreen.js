import React from 'react'
import {StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView} from 'react-native'
import ScalableImage from '../components/ScalableImage'
import emailValidator from 'email-validator'
import Requirer from '../logic/Requirer'
import Config from '../logic/Config'


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            new_email: '',
            emails: ['emiller.arkko@gmail.com', 'HC.jatka@hellowrold.co.uk', 'aafdnae@skefm.com']
        }
        
    }
    
    static navigationOptions = {
        title: 'Create a Team',
        headerStyle: {
            backgroundColor: Config.Color.PRIMARY,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }
    
    deleteEmail = (index) => {
        this.setState({emails: this.state.emails.filter((email, i) => index !== i)})
    }
    
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} enabled={true}>
                <Text style={styles.headerText}>
                    Your preference:
                </Text>
                <View style={styles.topView}>
                    {
                        Config.Dev ?
                            [1, 2, 3].map(it => <ScalableImage style={styles.img} key={it}
                                                               source={Requirer.dynamicImgRequire(it)} width={80}/>)
                            :
                            this.props.navigation.state.params.selections
                                .filter((sel, i) => i < 3)
                                .map(sel => <ScalableImage style={styles.img} key={sel}
                                                           source={Requirer.dynamicImgRequire(sel)} width={80}/>)
                    }
                </View>
                <View style={styles.middleView}>
                    <View>
                        <Text style={styles.headerText}>
                            Create a team:
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type an email here!"
                            onChangeText={(text) => this.setState({new_email: text})}
                            keyboardType="email-address"
                            value={this.state.new_email}
                        />
                        <Button
                            onPress={() => {
                                if (this.state.new_email) {
                                    if (emailValidator.validate(this.state.new_email)) {
                                        this.setState({emails: this.state.emails.concat(this.state.new_email)})
                                    } else {
                                        alert('email not valid')
                                    }
                                    this.setState({new_email: ""})
                                }
                            }}
                            title="+"
                            color={Config.Color.PRIMARY}
                        />
                    </View>
                </View>
                <View>
                    <Text style={[styles.headerText]}>
                        Your Team
                    </Text>
                    <View style={{marginBottom: 6, marginLeft: 4}}>
                        {this.state.emails.length !== 0
                            ?
                            this.state.emails.map((email, i) =>
                                <View key={email} style={{flexDirection: 'row', marginBottom: 6}}>
                                    <Text onPress={() => this.deleteEmail(i)} style={styles.deleteButton}>-</Text>
                                    <Text style={styles.email}>{email}</Text>
                                </View>)
                            :
                            <Text style={{fontFamily: 'Cochin', marginLeft: 15}}>It is lonely here. . .</Text>}
                    </View>
                
                </View>
                <View style={styles.opArea}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Suggestion')}
                        title="Invite"
                        color={Config.Color.PRIMARY}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Config.Color.SECONDARY,
    },
    topView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    middleView: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    bottomView: {
        flex: 4,
        flexDirection: 'column'
    },
    img: {
        borderRadius: 10
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 5,
        marginTop: 10
    },
    input: {
        height: 40,
        width: 180,
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Config.Color.PRIMARY,
        padding: 5
    },
    email: {
        marginLeft: 4,
        marginBottom: 3
    },
    deleteButton: {
        fontWeight: 'bold',
        color: 'red',
        width: 20,
        height: 20,
        textAlign: 'center',
        alignSelf: 'flex-end',
        
    },
    opArea: {
        height: 38,
        backgroundColor: Config.Color.PRIMARY,
        justifyContent: 'flex-end'
    }
});
