import React from 'react'
import {StyleSheet, Text, View, Button, TextInput} from 'react-native'
import ScalableImage from '../components/ScalableImage'
import VC from '../logic/Config'

export default class SuggestionScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedIndex: 0,
            suggestions: ['', '', '']
        }
    }
    
    static navigationOptions = {
        title: 'Save the planet',
        headerStyle: {
            backgroundColor: VC.Color.PRIMARY,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }
    
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    Suggest solutions ( 15 min )
                </Text>
                <View style={styles.topView}>
                    <ScalableImage onPress={() => this.setState({selectedIndex: 0})} style={[this.state.selectedIndex === 0 && styles.selectedImg, styles.img]} source={require('../prototypeImages/goal_1.jpg')} width={80}/>
                    <ScalableImage onPress={() => this.setState({selectedIndex: 1})} style={[this.state.selectedIndex === 1 && styles.selectedImg, styles.img]} source={require('../prototypeImages/goal_2.jpg')} width={80}/>
                    <ScalableImage onPress={() => this.setState({selectedIndex: 2})} style={[this.state.selectedIndex === 2 && styles.selectedImg, styles.img]} source={require('../prototypeImages/goal_3.jpg')} width={80}/>
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
                        onPress={() => this.props.navigation.navigate('Results')}
                        title="Finish"
                        color={VC.Color.PRIMARY}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: VC.Color.SECONDARY,
        flexDirection: 'column'
    },
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
    },
    img: {
        borderRadius: 10
    },
    selectedImg: {
        borderWidth: 6,
        borderColor: 'yellow'
    },
    suggestionInput: {
        height: 160,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding:5,
        borderColor: VC.Color.PRIMARY,
    },
    headerText: {
        fontWeight: 'bold',
        margin: 5
    },
    opArea: {
        position: 'absolute',
        height: 38,
        width: '100%',
        backgroundColor: VC.Color.PRIMARY,
        justifyContent: 'flex-end',
        bottom: 0
    }
});
