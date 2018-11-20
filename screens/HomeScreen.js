import React from 'react'
import {StyleSheet, Text, View, Button, TextInput, Alert, Modal, ScrollView, AsyncStorage, TouchableOpacity, Linking} from 'react-native'
import CheckBox from 'react-native-checkbox'
import Config from '../logic/Config'
import Api from '../api/Api'
import Content from '../resources/Content'
import {homeHelp} from "../resources/HelpText";

const termsOfUseText = Content.english.termsOfUse

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            helpModalVisible: false,
            termsModalVisible: false,
            termsAgreedUpon: false,
            limbo: false,
            limbo2: false,
            userId: ""
        }
    }
    
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: 'PlanetAction',
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
            }} onPress={() => params.openHelpModal()}><Text style={{
                fontSize: 20,
                fontWeight: "bold",
                color: Config.Color.PRIMARY,
                alignSelf: "center"
            }}>?</Text></TouchableOpacity>
        }}
    
    
    
    componentWillMount = async () => {
        this.setState({userId: await this.getIdFromStorage()})
        this.props.navigation.setParams({
            openHelpModal: () => this.setState({helpModalVisible: true})
        });
    }
    
    getIdFromStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
                return value
            }
        } catch (error) {
            console.log("failed to retreive ID from storage")
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
                <Modal
                    visible={this.state.helpModalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({helpModalVisible: false})}
                >
                    <View style={styles.modalContainer}>
                        <ScrollView>
                            <View style={styles.innerContainer}>
                                {homeHelp.map((section, i) =>
                                    <View key={section.title}>
                                        <Text style={styles.modalSubHeader}>{section.title}</Text>
                                        <Text>{section.text}</Text>
                                        {i === 2 && <Text style={{color: "blue", textDecorationLine: "underline"}} onPress={() => Linking.openURL("https://www.un.org/sustainabledevelopment/sustainable-development-goals/")}>https://www.un.org/sustainabledevelopment/sustainable-development-goals/</Text>}
                                    </View>
                                )}
                            </View>
                            <Button
                                onPress={() => this.setState({helpModalVisible: false})}
                                title="Close modal"
                            />
                        </ScrollView>
                    </View>
                </Modal>
                
                <View style={styles.topView}>
                    {this.state.limbo ?
                        this.state.limbo2 ?
                            <Text style={styles.header}>Your team is not finished suggesting yet...</Text> :
                            <Text style={styles.header}>Your team is not finished selecting yet...</Text>
                        :
                        <Text style={styles.header}>My team will help reach the Sustainable Development
                            Goals
                            2030</Text>}
                
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
                    <Text style={styles.or}>or</Text>
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
                            placeholder="Paste Team Key Here"
                            keyboardType="numeric"
                            value={this.state.userId}
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
                        <Text style={{fontSize: 8, maxWidth: '50%'}}>I accept to publicly share all our ideas and
                            agree to the <Text style={{textDecorationLine: 'underline', fontWeight: "bold"}}
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
            const status = Config.Dev ? parseInt(this.state.userId) : await Api.getGroupStatus(this.state.userId)
            switch (status) {
                case 0:
                    this.props.navigation.navigate('Selection', {userId: this.state.userId})
                    break
                case 1://limbo
                    this.setState({limbo: true})
                    setTimeout(() => (this.setState({limbo: false})), 4000)
                    //this.promptLimboAlert()
                    break
                case 2:
                    const top3Selections = await Api.getSelections(this.state.userId)
                    console.log("wtf")
                    console.log(top3Selections)
                    top3Selections && this.props.navigation.navigate('Suggestion', {userId: this.state.userId, selections: top3Selections})
                    break
                case 3:
                    this.setState({limbo: true, limbo2: true})
                    setTimeout(() => (this.setState({limbo: false, limbo2: false})), 4000)
                    //this.promptLimboAlert()
                    break
                case 4:
                    if(Config.Dev){
                        this.props.navigation.navigate('Results')
                    }else{
                        const results = await Api.getResults(this.state.userId)
                        console.log(JSON.stringify(results))
                        console.log(JSON.stringify({selections: [...Object.keys(results)], suggestions: results}))
                        this.props.navigation.navigate('Results', {selections: [...Object.keys(results)], suggestions: results})
                    }
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
    header: {
        fontFamily: 'Cochin',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "500",
        color: Config.Color.TEXT
    },
    or: {
        fontWeight: "bold",
        color: Config.Color.PRIMARY
    },
    topView: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
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
