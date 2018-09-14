import React from 'react'
import {StyleSheet, Text, View, Button, TextInput, Alert, Modal, ScrollView} from 'react-native'
import CheckBox from 'react-native-checkbox'
import Config from '../logic/Config'
import Api from '../api/Api'

const termsOfUseText = [
    {
        title: 'GENERAL TERMS',
        text: 'This is an agreement between you (”User”) and Save The Planet Oy (”STP”, ”Service Provider” or ”we”). By ' +
        'using our mobile app or web service (”Service”), you agree to be bound by the terms of use (”Terms”) of this ' +
        'Agreement. Some parts of the Service require registration. By using our service or registering, the User accepts' +
        'the Terms of this Agreement.\n\n' +
        'The Service provides a decision making platform for reaching the Sustainable Development Goals (SDG’s) of the' +
        'United Nations by 2030. The User is responsible for all decisions and actions based on using the Service.\n\n' +
        'The user also agrees to follow the instructions given by the Service Provider or by its contractual partners. We' +
        'may amend any of the Terms by publishing the revised Terms in the Service.'
    },
    {
        title: 'RIGHT TO USE AND USER INFORMATION',
        text: 'All information entered as an input in the service can be made Public. However, ' +
        'personal information and ' +
        'names of the Users will only be made public if the user explicitly authorizes this. ' +
        'By creating a Team, or by ' +
        'accepting an invitation to join an existing Team, the User gains the Right to Use ' +
        'the Service as defined in these ' +
        'Terms and other instructions and rules of the Service. The User is required to enter ' +
        'user information (”User ' +
        'Information”) for recognizing and identifying purposes. It is a violation of law to ' +
        'enter false User Information. ' +
        'By registering, the User accepts that the Service Provider or its contractual ' +
        'partners may validate the User ' +
        'Information by using databases created by the relevant authorities or service ' +
        'providers and/or personal ' +
        'identification documents.\n\n' +
        'The User is given a limited Right to Use the Service as defined in this Agreement. ' +
        'You may not record, publish, ' +
        'transfer, forward or use the Service or any of its contents, other than as allowed ' +
        'in these Terms and the ' +
        'applicable copyright laws. As a registered User, you agree to update any changes to ' +
        'your User Information ' +
        'without delay.\n\n' +
        'The Service Provider has the right to deny the Right to Use by registration, if the ' +
        'User has not provided ' +
        'complete and accurate User Information or if the User is otherwise deemed ineligible ' +
        'to Use the Service by the ' +
        'Service Provider.\n\n' +
        'The User must be in full legal capacity to register. Legal persons can also ' +
        'register. Legal person must possess ' +
        'full legal capacity to decide and be committed to all actions in the Service. One ' +
        'person is allowed to have only ' +
        'one user id. If a person wants to have more than one user id, he or she must get ' +
        'prior written permission from ' +
        'the Service Provider.\n\n' +
        'The Service Provider shall have the right to use User Information for maintenance ' +
        'purposes, communications ' +
        'regarding the Service, business planning and development and statistical and ' +
        'marketing research. With your ' +
        'permission, the Service Provider shall have the right to use User Information for ' +
        'direct marketing. All Users are ' +
        'registered into the customer registry of the Service Provider. The registry as ' +
        ' defined by the relevant law in ' +
        ' Finland is available at Save The Planet c/o Bonito Oy, PL 56, 00641 Helsinki, ' +
        'Finland. All communications ' +
        'regarding the right to see registry information shall be made in writing and signed ' +
        'to the address above, by ' +
        'visiting the registrar in person or by e-mailing to info@savetheplanet.com.'
    }
]


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            termsModalVisible: false,
            termsAgreedUpon: false,
            limbo: false,
            limbo2: false,
            userId: ""
        }
    }
    
    static navigationOptions = {
        title: 'Save the planet',
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
                <Modal
                    visible={this.state.termsModalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({termsModalVisible: false})}
                >
                    <View style={styles.modalContainer}>
                        <ScrollView>
                            <View style={styles.innerContainer}>
                                <Text style={styles.modalHeader}>Terms of Use</Text>
                                {termsOfUseText.map(section =>
                                    <View key={section.title}>
                                        <Text style={styles.modalSubHeader}>{section.title}</Text>
                                        <Text>{section.text}</Text>
                                    </View>
                                )}
                            </View>
                            <Button
                                onPress={() => this.setState({termsModalVisible: false})}
                                title="Close modal"
                            />
                        </ScrollView>
                    </View>
                </Modal>
                <View style={styles.topView}>
                    {this.state.limbo ?
                        this.state.limbo2 ?
                            <Text style={{fontWeight: 'bold'}}>Your team is not finished suggesting yet...</Text> :
                            <Text style={{fontWeight: 'bold'}}>Your team is not finished selecting yet...</Text>
                        :
                        <Text style={{fontFamily: 'Cochin'}}>What can we do to help reach the Sustainable Development
                            Goals
                            2030?</Text>}
                
                </View>
                <View style={styles.middleView}>
                    <View style={{
                        flexDirection: 'row',
                        borderWidth: 2,
                        borderColor: Config.Color.PRIMARY,
                        borderRadius: 5,
                        padding: 5,
                        marginBottom: 10
                    }}>
                        <Button
                            onPress={() => this.navigateFurther()}
                            title="Start New"
                            color={Config.Color.PRIMARY}
                        />
                    </View>
                    <Text>or</Text>
                    <View style={{
                        flexDirection: 'row',
                        borderWidth: 2,
                        borderColor: Config.Color.PRIMARY,
                        borderRadius: 5,
                        padding: 5,
                        marginTop: 10
                    }}>
                        <TextInput
                            style={{height: 40, width: 180}}
                            placeholder="Enter Team Key"
                            onChangeText={text => this.setState({userId: text})}
                        />
                        <Button
                            onPress={() => this.navigateDynamically()}
                            title="Go"
                            color={Config.Color.PRIMARY}
                        />
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <View style={styles.consentContainer}>
                        <Text style={{fontSize: 8, maxWidth: '50%'}}>I accept that my suggestions can be made public and
                            agree to the <Text style={{textDecorationLine: 'underline'}}
                                               onPress={() => this.setState({termsModalVisible: true})}>terms of
                                use</Text>
                        </Text>
                        <CheckBox
                            label=''
                            onChange={(checked) => this.setState({termsAgreedUpon: checked})}
                        />
                    </View>
                </View>
            </View>
        )
    }
    
    navigateDynamically = async () => {
        if (Config.Dev || this.state.termsAgreedUpon) {
            switch (Config.Dev ? 1 : await Api.getGroupStatus()) {
                case 0:
                    this.props.navigation.navigate('Selection')
                    break
                case 1://limbo
                    this.setState({limbo: true})
                    setTimeout(() => (this.setState({limbo: false})), 4000)
                    //this.promptLimboAlert()
                    break
                case 2:
                    this.props.navigation.navigate('Suggestions')
                    break
                case 3:
                    this.setState({limbo: true, limbo2: true})
                    setTimeout(() => (this.setState({limbo: false, limbo2: false})), 4000)
                    //this.promptLimboAlert()
                    break
                
            }
        } else {
            Alert.alert(
                'One thing',
                'Please agree to our terms of use before proceeding further',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            )
        }
    }
    
    navigateFurther = () => {
        if (Config.Dev || this.state.termsAgreedUpon) {
            this.props.navigation.navigate('GroupMasterInput')
        } else {
            Alert.alert(
                'One thing',
                'Please agree to our terms of use before proceeding further',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            )
        }
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Config.Color.SECONDARY,
        alignItems: 'stretch'
    },
    topView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    middleView: {
        flex: 1,
        alignItems: 'center'
    },
    bottomView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    consentContainer: {
        flexDirection: 'row'
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
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        color: Config.Color.PRIMARY
    },
    modalSubHeader: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 4,
        marginTop: 10,
        color: Config.Color.PRIMARY
    }
});
