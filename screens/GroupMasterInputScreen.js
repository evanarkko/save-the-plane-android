import React from 'react'
import {StyleSheet, TextInput, Text, View, Button, Picker} from 'react-native'
import Config from "../logic/Config";

const organizationTypes = ["private", "state", "municipal", "association", "other"]
const countries = ["Finland", "Iceland", "Norway", "Sweden"]

export default class GroupMasterInputScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            organizationType: "",
            country: ""
        }
    }
    
    static navigationOptions = {
        title: 'Start a Team',
        headerStyle: {
            backgroundColor: Config.Color.PRIMARY,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Your email"
                        onChangeText={text => this.setState({userId: text})}
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
                        onPress={() => this.props.navigation.navigate('Selection')}
                        title="Continue"
                        color="white"
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
        marginLeft: 10,
        fontWeight: "bold",
        color: Config.Color.PRIMARY
    },
    input: {
        height: 40
    },
    opArea: {
        height: 38,
        backgroundColor: Config.Color.PRIMARY,
        justifyContent: 'flex-end'
    }
});

