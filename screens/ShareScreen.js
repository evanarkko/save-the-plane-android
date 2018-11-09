import React from 'react'
import {StyleSheet, Text, View, Button, TextInput} from 'react-native'
import emailValidator from 'email-validator'
import ScalableImage from '../components/ScalableImage'
import Requirer from '../logic/Requirer'
import Config from '../logic/Config'
import { NavigationActions } from 'react-navigation'
import {AsyncStorage} from "react-native"
import Api from '../api/Api'
import Convert from '../logic/Convert'


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            new_email: '',
            emails: []
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
    
    saveIdToStorage = async (res) => {
        const user = res.data.generatedUsers[0]
        console.log(user)
        const userId = user.substring(12, 48)
        console.log(userId)
        try {
            await AsyncStorage.setItem('id', userId);
        } catch (error) {
            console.log("failed to save ID")
        }
    }
    
    deleteEmail = (index) => {
        this.setState({emails: this.state.emails.filter((email, i) => index !== i)})
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    Your personal TOP 3 priorities:
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
                <Text style={styles.headerText}>
                    Pick All Team Members:
                </Text>
                <View style={styles.middleView}>
                    <View>
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
                                        !this.state.emails.includes(this.state.new_email) && this.setState({emails: this.state.emails.concat(this.state.new_email)})
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
                <Text style={[styles.headerText]}>
                    My Team
                </Text>
                <View>
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
                        onPress={async () => {
                            const res = await Api.groupGenesis({addresses: Convert.arrayToCSV(this.state.emails), ...this.props.navigation.state.params})
                            this.props.navigation.goBack(null)
                            this.props.navigation.goBack(null)
                            this.props.navigation.goBack(null)
                            await this.saveIdToStorage(res)
                        }}
                        title="Invite all"
                        color={Config.Color.PRIMARY}
                    />
                </View>
            </View>
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
        marginTop: 10,
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
        marginTop:25,
        padding:10,
        height: 38,
        backgroundColor: Config.Color.SECONDARY,
        justifyContent: 'flex-end'
    }
});
