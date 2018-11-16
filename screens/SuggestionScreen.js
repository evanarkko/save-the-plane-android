import React from 'react'
import {StyleSheet, Text, View, Button, TextInput} from 'react-native'
import ScalableImage from '../components/ScalableImage'
import Config from '../logic/Config'
import Api from '../api/Api'
import Requirer from '../logic/Requirer'

export default class SuggestionScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            suggestions: ['', '', '']
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
        const selections = Config.Dev ? [1, 2, 3] : this.props.navigation.state.params.selections
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    Suggest solutions ( 15 min )
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
                        placeholder="How could we support this?"
                        multiline={true}
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
                        title="Finished"
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
        borderWidth: 3,
        borderColor: Config.Color.TEXT
    },
    suggestionInput: {
        height: 120,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderColor: Config.Color.PRIMARY,
    },
    headerText: {
        fontWeight: 'bold',
        margin: 5,
        color: Config.Color.TEXT
    },
    opArea: {
        marginBottom: 10,
        padding: 10,
        height: 38,
        width: '100%',
        justifyContent: 'flex-end'
    }
});
