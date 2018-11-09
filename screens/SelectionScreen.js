import React from 'react'
import {StyleSheet, Text, View, Button, Alert, TouchableOpacity} from 'react-native'
import ScalableImage from '../components/ScalableImage'
import Requirer from '../logic/Requirer'
import Config from '../logic/Config'
import Api from '../api/Api'
import Convert from '../logic/Convert'
import DraggableImage from '../components/DraggableImage'
import {swapSpots} from "../logic/ArrayLogic";
import {Dimensions} from "react-native"

const hardWidth = 360
const hardHeight = 598

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selections: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
        }
        console.log("width: " + Dimensions.get('window').width) //MAKE DIMENSION ADJUSTMENTS WITH THIS (and height)
        console.log("height: " + Dimensions.get('window').height) //for x use (hardWidth/Dimensions.get('window').width) * x and so on
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
    
    
    coordinatesToIndex = (x, y) => {
        const x1 = 20
        const x2 = 110
        const x3 = 195
        const x4 = 284
    
    
        const y1 = 130
        const y2 = 210
        const y3 = 300
        const y4 = 378
        const y5 = 455
        
        const blockWidth = 65
        
        //1st row
        if (x1 < x && x < x1 + blockWidth  &&  y1 < y && y < y1 + blockWidth) return 0
        if (x2 < x && x < x2 + blockWidth  &&  y1 < y && y < y1 + blockWidth) return 1
        if (x3 < x && x < x3 + blockWidth  &&  y1 < y && y < y1 + blockWidth) return 2
        if (x4 < x && x < x4 + blockWidth  &&  y1 < y && y < y1 + blockWidth) return 3
        
        //2nd..
        if (x1 < x && x < x1 + blockWidth  &&  y2 < y && y < y2 + blockWidth) return 4
        if (x2 < x && x < x2 + blockWidth  &&  y2 < y && y < y2 + blockWidth) return 5
        if (x3 < x && x < x3 + blockWidth  &&  y2 < y && y < y2 + blockWidth) return 6
        if (x4 < x && x < x4 + blockWidth  &&  y2 < y && y < y2 + blockWidth) return 7
    
        if (x1 < x && x < x1 + blockWidth  &&  y3 < y && y < y3 + blockWidth) return 8
        if (x2 < x && x < x2 + blockWidth  &&  y3 < y && y < y3 + blockWidth) return 9
        if (x3 < x && x < x3 + blockWidth  &&  y3 < y && y < y3 + blockWidth) return 10
        if (x4 < x && x < x4 + blockWidth  &&  y3 < y && y < y3 + blockWidth) return 11
    
        if (x1 < x && x < x1 + blockWidth  &&  y4 < y && y < y4 + blockWidth) return 12
        if (x2 < x && x < x2 + blockWidth  &&  y4 < y && y < y4 + blockWidth) return 13
        if (x3 < x && x < x3 + blockWidth  &&  y4 < y && y < y4 + blockWidth) return 14
        if (x4 < x && x < x4 + blockWidth  &&  y4 < y && y < y4 + blockWidth) return 15
    
        if (x1 < x && x < x1 + blockWidth  &&  y5 < y && y < y5 + blockWidth) return 16
        
        
        
        return -1
    }
    
    swapSelections = (x, y) => {
        this.setState({selections: swapSpots(this.state.selections, x, y)})
    }
    
    onBlockRelease = (x, y, iDragged) => {
        if (this.coordinatesToIndex(x, y) > -1) this.swapSelections(this.coordinatesToIndex(x, y), iDragged)
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    Select your priority for the goals. The orders of top 3 and bottom 3 are most important.
                </Text>
                
                <View style={styles.pickArea}>
                    <ImageGrid
                        selectImage={this.selectImage}
                        deselectImage={this.deselectImage}
                        selections={this.state.selections}
                        onBlockRelease={this.onBlockRelease}
                        coordinateToIndex={this.coordinatesToIndex}
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
            if (this.props.navigation.state.params.userId) {
                Api.sendSelections({
                    selections: Convert.arrayToCSV(this.state.selections),
                    userId: this.props.navigation.state.params.userId
                })
                this.props.navigation.goBack()
                //go to previous screen (Home)
            } else {
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

const ImageGrid = ({selectImage, deselectImage, selections, onBlockRelease, coordinateToIndex}) => {
    let rows = []
    for (let y = 0; y < 5; y++) {
        rows.push(
            <View key={y} style={styles.imageRow}>
                <ImageColumns
                    y={y}
                    selectImage={selectImage}
                    deselectImage={deselectImage}
                    selections={selections}
                    onBlockRelease={onBlockRelease}
                    coordinateToIndex={coordinateToIndex}
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

const ImageColumns = ({y, selectImage, deselectImage, selections, onBlockRelease, coordinateToIndex}) => {
    const width = 80
    let cols = []
    for (let x = 0; x < 4; x++) {
        const boxIndex = (y * 4) + x + 1
        const image =
            boxIndex < 18
                ?
                <DraggableImage index={selections[boxIndex - 1] - 1} onRelease={(x, y) => {
                    onBlockRelease(x, y, boxIndex - 1)
                }}/> /*<ScalableImage
                    style={styles.image}
                    source={Requirer.dynamicImgRequire(selections[boxIndex-1]-1)}
                    width={width}/>*/
                : null
        cols.push(
            <View key={x} style={styles.imageCol}>
                {image}
            
            
            </View>
        )
    }
    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
            {cols}
        </View>
    )
}

/*{boxIndex < 4 &&
                <TouchableOpacity style={[styles.selectedImg, {borderColor: 'green'}]}>
                    <Text style={styles.selectedIndex}>{boxIndex}</Text>
                </TouchableOpacity>}
                
                {boxIndex >= 15 && boxIndex <= 17 &&
                <TouchableOpacity style={[styles.selectedImg, {borderColor: 'red'}]}>
                    <Text style={styles.selectedIndex}>{boxIndex}</Text>
                </TouchableOpacity>}*/


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Config.Color.SECONDARY,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    instructions: {
        flex: 1,
        padding: 5,
        fontSize: 15,
        fontWeight: "bold"
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
