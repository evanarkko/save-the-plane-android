import React from 'react'
import {StyleSheet, Text, View, Button, Alert, TouchableOpacity} from 'react-native'
import ScalableImage from '../components/ScalableImage'
import Requirer from '../logic/Requirer'
import Config from '../logic/Config'
import Api from '../api/Api'
import Convert from '../logic/Convert'


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selections: [2, 5, 3, 4, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
        }
    }
    
    static navigationOptions = {
        title: 'Set My Priority',
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
                <Text style={styles.instructions}>
                    Tänne voi hölötellä selitykset että eräjormakin tajuaa mitäs vittua pitää tehdö
                </Text>
                <View style={styles.pickArea}>
                    <ImageGrid
                        selectImage={this.selectImage}
                        deselectImage={this.deselectImage}
                        selections={this.state.selections}
                    />
                </View>
                <View style={styles.opArea}>
                    <Button
                        onPress={() => this.navigateFurther()}
                        title="Ready"
                        color={Config.Color.PRIMARY}
                    />
                </View>
            </View>
        )
    }
    
    selectImage = (index) => {
        if (this.state.selections.includes(index)) {
            //remove from selections (unnecessary as of now, bc img not rendered after selection)
        } else {
            const selections = this.state.selections.concat(index)
            this.setState({selections})
        }
    }
    
    deselectImage = async (value) => {
        this.setState({selections: this.state.selections.splice(0, this.state.selections.indexOf(value))})
    }
    
    navigateFurther = () => {
        if (Config.Dev || this.state.selections.length === 17) {
            if(this.props.navigation.state.params.userId) {
                Api.sendSelections({selections: Convert.arrayToCSV(this.state.selections), userId: this.props.navigation.state.params.userId})
                this.props.navigation.goBack()
                //go to previous screen (Home)
            } else {
                console.log(this.props.navigation.state.params)
                this.props.navigation.navigate('Share', {selections: this.state.selections, ...this.props.navigation.state.params})
            }
        } else {
            Alert.alert(
                'A little more',
                'Please finish selecting before proceeding further',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            )
        }
    }
}

const ImageGrid = ({selectImage, deselectImage, selections}) => {
    let rows = []
    for (let y = 0; y < 5; y++) {
        rows.push(
            <View key={y} style={styles.imageRow}>
                <ImageColumns
                    y={y}
                    selectImage={selectImage}
                    deselectImage={deselectImage}
                    selections={selections}
                />
            </View>
        )
    }
    return (
        <View style={{flex: 1, padding: 5}}>
            {rows}
        </View>
    )
}

const ImageColumns = ({y, selectImage, deselectImage, selections}) => {
    let cols = []
    for (let x = 0; x < 4; x++) {
        const boxIndex = (y * 4) + x + 1
        const image =
            boxIndex < 18
                ? <ScalableImage
                    style={styles.image}
                    source={Requirer.dynamicImgRequire(selections.indexOf(boxIndex)+1)}
                    onPress={() => selectImage(boxIndex)}
                    width={85}/>
                : null
        
        cols.push(
            <View key={x} style={styles.imageCol}>
                {image}
                {boxIndex < 4 &&
                <TouchableOpacity style={[styles.selectedImg, {borderColor: 'green'}]}
                                  onPress={() => deselectImage(boxIndex)}>
                    <Text style={styles.selectedIndex}>{boxIndex}</Text>
                </TouchableOpacity>}
                
                {boxIndex >= 15 && boxIndex <= 17 &&
                <TouchableOpacity style={[styles.selectedImg, {borderColor: 'red'}]}
                                  onPress={() => deselectImage(boxIndex)}>
                    <Text style={styles.selectedIndex}>{boxIndex}</Text>
                </TouchableOpacity>}
            
            </View>
        )
    }
    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
            {cols}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Config.Color.SECONDARY,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    instructions: {
        flex: 1,
        padding: 5
    },
    pickArea: {
        flex: 8
    },
    imageRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    imageCol: {
        flex: 1,
        flexWrap: 'wrap'
    },
    image: {
        borderRadius: 10
    },
    
    selectedImg: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        width: 85,
        height: 85,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255, 0.4)',
        position: 'absolute'
    },
    selectedIndex: {
        fontWeight: '900',
        fontSize: 26
    },
    opArea: {
        height: 38,
        backgroundColor: Config.Color.PRIMARY,
        justifyContent: 'flex-end'
    }
    
});
