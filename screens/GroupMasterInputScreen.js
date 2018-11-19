import React from 'react'
import {StyleSheet, TextInput, Text, View, Button, Picker, TouchableOpacity} from 'react-native'
import Config from "../logic/Config";

const organizationTypes = ["Private", "State", "Municipal", "Association", "Other"]
const countries = ["Finland", "Iceland", "Norway", "Sweden"]

export default class GroupMasterInputScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            email: "",
            organizationType: "",
            country: ""
        }
    }
    
    static navigationOptions = {
        title: 'Create Team Identity',
        headerStyle: {
            backgroundColor: Config.Color.PRIMARY,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerRight: <TouchableOpacity style={{
            padding: 4,
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 18,
            width: 36,
            height: 36,
            color: "white",
            marginRight: 8,
            backgroundColor: "white"
        }} onPress={() => alert('info')}><Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: Config.Color.PRIMARY,
            alignSelf: "center"
        }}>?</Text></TouchableOpacity>
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="My  email"
                        onChangeText={text => this.setState({email: text})}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="My first name"
                        onChangeText={text => this.setState({email: text})}
                    />
                </View>
                <View>
                    <Text style={styles.subHeader}>Organization type</Text>
                    <Picker
                        selectedValue={this.state.organizationType}
                        onValueChange={(itemValue, itemIndex) => this.setState({organizationType: itemValue})}>
                        {organizationTypes.map(ot => <Picker.Item key={ot} label={ot} value={ot} />)}
                    </Picker>
                </View>
                <View>
                    <Text style={styles.subHeader}>Country</Text>
                    <Picker
                        selectedValue={this.state.country}
                        onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}>
                        {countries.map(c => <Picker.Item key={c} label={c} value={c} />)}
                    </Picker>
                </View>
                
                <View style={{flexGrow: 1}}/>
                <View style={styles.opArea}>
                    <Button
                        onPress={() => {
                            if(Config.Dev || this.state.email) {
                                this.props.navigation.navigate('Selection', {organizationType: this.state.organizationType, country: this.state.country, email: this.state.email})
                            }
                        }}
                        title="Save and Continue"
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
        alignItems: 'stretch'
    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: Config.Color.PRIMARY,
        borderRadius: 5,
        padding: 5,
        margin: 10
    },
    subHeader: {
        marginTop: 8,
        marginLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: Config.Color.PRIMARY
    },
    input: {
        height: 40,
        flexGrow: 1
    },
    opArea: {
        height: 38,
        backgroundColor: Config.Color.PRIMARY,
        justifyContent: 'flex-end'
    }
});

