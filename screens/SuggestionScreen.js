import React from 'react'
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Modal, ScrollView} from 'react-native'
import ScalableImage from '../components/ScalableImage'
import Config from '../logic/Config'
import Api from '../api/Api'
import Requirer from '../logic/Requirer'
import {suggestionHelp} from "../resources/HelpText";

export default class SuggestionScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            helpModalVisible: false,
            selectedIndex: 0,
            suggestions: ['', '', '']
        }
    }
    
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: 'Share Our Actions',
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
        }
    }
    
    componentWillMount = () => {
        this.props.navigation.setParams({
            openHelpModal: () => this.setState({helpModalVisible: true})
        });
    }
    
    render() {
        const selections = Config.Dev ? [1, 2, 3] : this.props.navigation.state.params.selections
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
                                {suggestionHelp.map((section, i) =>
                                    <View key={section.title}>
                                        <Text style={styles.modalSubHeader}>{section.title}</Text>
                                        <Text>{section.text}</Text>
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
                <Text style={styles.headerText}>
                    Describe, very briefly, your best ideas and proven actions. Be specific. The goal is that other organizations can learn from you and follow your lead.
                </Text>
                <View style={styles.topView}>
                    {Config.Dev ?
                        [<ScalableImage onPress={() => this.setState({selectedIndex: 0})}
                                        style={[this.state.selectedIndex === 0 && styles.selectedImg, styles.img]}
                                        source={Requirer.dynamicImgRequire(selections[0])} width={80}/>,
                            <ScalableImage onPress={() => this.setState({selectedIndex: 1})}
                                           style={[this.state.selectedIndex === 1 && styles.selectedImg, styles.img]}
                                           source={Requirer.dynamicImgRequire(selections[1])} width={80}/>,
                            <ScalableImage onPress={() => this.setState({selectedIndex: 2})}
                                           style={[this.state.selectedIndex === 2 && styles.selectedImg, styles.img]}
                                           source={Requirer.dynamicImgRequire(selections[2])} width={80}/>]
                        :
                        [<ScalableImage onPress={() => this.setState({selectedIndex: 0})}
                                        style={[this.state.selectedIndex === 0 && styles.selectedImg, styles.img]}
                                        source={require('../prototypeImages/goal_1.jpg')} width={80}/>,
                            <ScalableImage onPress={() => this.setState({selectedIndex: 1})}
                                           style={[this.state.selectedIndex === 1 && styles.selectedImg, styles.img]}
                                           source={require('../prototypeImages/goal_2.jpg')} width={80}/>,
                            <ScalableImage onPress={() => this.setState({selectedIndex: 2})}
                                           style={[this.state.selectedIndex === 2 && styles.selectedImg, styles.img]}
                                           source={require('../prototypeImages/goal_3.jpg')} width={80}/>]}
                
                </View>
                <View>
                    <TextInput
                        style={styles.suggestionInput}
                        placeholder="WHAT did we do? HOW did it help? Be specific. Be brief."
                        multiline={true}
                        numberOfLines={6}
                        onChangeText={(text) => {
                            const suggestions = this.state.suggestions
                                .map((suggestion, i) => i === this.state.selectedIndex ? text : suggestion)
                            this.setState({suggestions})
                        }}
                        value={this.state.suggestions[this.state.selectedIndex]}
                    />
                </View>
                <View style={styles.opArea}>
                    <Button
                        onPress={() => {
                            if (!Config.Dev) {
                                if (this.state.suggestions.filter(s => s).length === 3) {
                                    Api.sendSuggestions({
                                        suggestions: this.state.suggestions,
                                        userId: this.props.navigation.state.params.userId
                                    })
                                    this.props.navigation.goBack()
                                } else {
                                    alert("Please write about all three causes")
                                }
                            }else{
                                this.props.navigation.goBack()
                            }
                        }}
                        title="SAVE AND SHARE RESULTS"
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
        flexDirection: 'column'
    },
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 4,
    },
    img: {
        borderRadius: 10
    },
    selectedImg: {
        borderWidth: 4,
        borderColor: Config.Color.TEXT
    },
    suggestionInput: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderColor: Config.Color.PRIMARY,
        color: "black"
    },
    headerText: {
        fontWeight: 'bold',
        margin: 5,
        color: Config.Color.TEXT
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
        marginBottom: 10,
        padding: 10,
        height: 38,
        width: '100%',
        justifyContent: 'flex-end'
    }
});
