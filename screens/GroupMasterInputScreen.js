import React from 'react'
import {StyleSheet, TextInput, Text, View, Button, Picker, TouchableOpacity, Modal, ScrollView} from 'react-native'
import Config from "../logic/Config";
import countries from "../resources/Countries"
import {groupMasterInputHelp} from "../resources/HelpText";
import emailValidator from 'email-validator'

const organizationTypes = ["Private Sector", "National Government", "Regional Government", "Local Government", "Association", "Other"]

export default class GroupMasterInputScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            helpModalVisible: false,
            email: "",
            firstName: "",
            organizationType: "Private Sector",
            country: "Finland"
        }
    }
    
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
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
                backgroundColor:Config.Color.SECONDARY
            }} onPress={() => params.openHelpModal()}><Text style={{
                fontSize: 20,
                fontWeight: "bold",
                color: Config.Color.PRIMARY,
                alignSelf: "center"
            }}>?</Text></TouchableOpacity>
        }
    }
    
    componentWillMount = () => {
        this.props.navigation.setParams({
            openHelpModal: () => this.setState({helpModalVisible: true})
        });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.state.helpModalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({helpModalVisible: false})}
                >
                    <View style={styles.modalContainer}>
                        <ScrollView>
                            <View style={styles.innerContainer}>
                                {groupMasterInputHelp.map((section, i) =>
                                    <View key={section.title}>
                                        <Text style={styles.modalSubHeader}>{section.title}</Text>
                                        <Text>{section.text}</Text>
                                    </View>
                                )}
                            </View>
                            <Button
                                onPress={() => this.setState({helpModalVisible: false})}
                                title="Close info"
                                color={Config.Color.PRIMARY}
                            />
                        </ScrollView>
                    </View>
                </Modal>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="My email"
                        keyboardType="email-address"
                        onChangeText={text => this.setState({email: text})}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="My first name"
                        onChangeText={text => this.setState({firstName: text})}
                    />
                </View>
                <View>
                    <Text style={styles.subHeader}>Organization type</Text>
                    <Picker
                        selectedValue={this.state.organizationType}
                        onValueChange={(itemValue, itemIndex) => this.setState({organizationType: itemValue})}>
                        {organizationTypes.map(ot => <Picker.Item key={ot} label={ot} value={ot}/>)}
                    </Picker>
                </View>
                <View>
                    <Text style={styles.subHeader}>Country</Text>
                    <Picker
                        selectedValue={this.state.country}
                        onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}>
                        {countries.map(c => <Picker.Item key={c} label={c} value={c}/>)}
                    </Picker>
                </View>
                
                <View style={{flexGrow: 1}}/>
                <View style={styles.opArea}>
                    <Button
                        onPress={() => {
                            if (Config.Dev || (this.state.email && this.state.firstName && emailValidator.validate(this.state.email))) {
                                this.props.navigation.navigate('Selection', {
                                    organizationType: this.state.organizationType,
                                    country: this.state.country,
                                    email: this.state.email,
                                    firstName: this.state.firstName
                                })
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Config.Color.SECONDARY,
    },
    innerContainer: {
        alignItems: 'center',
        margin: 10
    },
    modalSubHeader: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 4,
        marginTop: 10,
        color: Config.Color.PRIMARY
    },
    opArea: {
        height: 38,
        backgroundColor: Config.Color.PRIMARY,
        justifyContent: 'flex-end'
    }
});

