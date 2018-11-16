import React from 'react'
import {StyleSheet, Text, View, Button, Alert, TouchableOpacity} from 'react-native'
import ScalableImage from '../components/ScalableImage'
import Requirer from '../logic/Requirer'
import Config, {explanationArray} from '../logic/Config'
import Api from '../api/Api'
import Convert from '../logic/Convert'
import DraggableImage from '../components/DraggableImage'
import {swapSpots, makeRoomInstert} from "../logic/ArrayLogic";
import {Dimensions} from "react-native"

const hardWidth = 360
const hardHeight = 598



export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selections: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
            explainIndex: 0,
            scaleFactorX: hardWidth / Dimensions.get('window').width,
            scaleFactorY: hardHeight / Dimensions.get('window').height
        }
        console.log("width: " +  Dimensions.get('window').width) //MAKE DIMENSION ADJUSTMENTS WITH THIS (and height)
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
        },
        headerRight: <TouchableOpacity style={{
            padding: 5,
            paddingLeft: 7,
            paddingRight: 7,
            borderWidth: 1,
            borderColor: Config.Color.TEXT,
            borderRadius: 3,
            color: Config.Color.TEXT,
            marginRight: 8
        }} onPress={() => alert('info')}><Text style={{
            fontSize: 17,
            fontWeight: "bold",
            color: Config.Color.TEXT
        }}>?</Text></TouchableOpacity>
    }
    
    
    coordinatesToIndex = (x, y) => {
        const x1 = 20 * this.state.scaleFactorX
        const x2 = 110 * this.state.scaleFactorX
        const x3 = 195 * this.state.scaleFactorX
        const x4 = 284 * this.state.scaleFactorX
    
    
        const y1 = 130 * this.state.scaleFactorY
        const y2 = 210 * this.state.scaleFactorY
        const y3 = 300 * this.state.scaleFactorY
        const y4 = 378 * this.state.scaleFactorY
        const y5 = 455 * this.state.scaleFactorY
    
        const blockWidthX = 65 * this.state.scaleFactorX
        const blockWidthY = 65 * this.state.scaleFactorY
        
        
        //1st row
        if (x1 < x && x < x1 + blockWidthX  &&  y1 < y && y < y1 + blockWidthY) return 0
        if (x2 < x && x < x2 + blockWidthX  &&  y1 < y && y < y1 + blockWidthY) return 1
        if (x3 < x && x < x3 + blockWidthX  &&  y1 < y && y < y1 + blockWidthY) return 2
        if (x4 < x && x < x4 + blockWidthX  &&  y1 < y && y < y1 + blockWidthY) return 3
        
        //2nd..
        if (x1 < x && x < x1 + blockWidthX  &&  y2 < y && y < y2 + blockWidthY) return 4
        if (x2 < x && x < x2 + blockWidthX  &&  y2 < y && y < y2 + blockWidthY) return 5
        if (x3 < x && x < x3 + blockWidthX  &&  y2 < y && y < y2 + blockWidthY) return 6
        if (x4 < x && x < x4 + blockWidthX  &&  y2 < y && y < y2 + blockWidthY) return 7
    
        if (x1 < x && x < x1 + blockWidthX  &&  y3 < y && y < y3 + blockWidthY) return 8
        if (x2 < x && x < x2 + blockWidthX  &&  y3 < y && y < y3 + blockWidthY) return 9
        if (x3 < x && x < x3 + blockWidthX  &&  y3 < y && y < y3 + blockWidthY) return 10
        if (x4 < x && x < x4 + blockWidthX  &&  y3 < y && y < y3 + blockWidthY) return 11
    
        if (x1 < x && x < x1 + blockWidthX  &&  y4 < y && y < y4 + blockWidthY) return 12
        if (x2 < x && x < x2 + blockWidthX  &&  y4 < y && y < y4 + blockWidthY) return 13
        if (x3 < x && x < x3 + blockWidthX  &&  y4 < y && y < y4 + blockWidthY) return 14
        if (x4 < x && x < x4 + blockWidthX  &&  y4 < y && y < y4 + blockWidthY) return 15
    
        if (x1 < x && x < x1 + blockWidthX  &&  y5 < y && y < y5 + blockWidthY) return 16
        
        return -1
    }
    
    swapSelections = (x, y) => {
        this.setState({selections: makeRoomInstert(this.state.selections, x, y), explainIndex: y})
    }
    
    onBlockRelease = (x, y, iDragged) => {
        if (this.coordinatesToIndex(x, y) > -1) this.swapSelections(iDragged, this.coordinatesToIndex(x, y))
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    Sort ALL symbols. Order from TOP = where your organization has made most impact to BOTTOM = least.
                </Text>
                
                <View style={styles.pickArea}>
                    <ImageGrid
                        selectImage={this.selectImage}
                        deselectImage={this.deselectImage}
                        selections={this.state.selections}
                        onBlockRelease={this.onBlockRelease}
                        coordinateToIndex={this.coordinatesToIndex}
                        explainIndex={this.state.explainIndex}
                        setExplainIndex={(explainIndex) => this.setState({explainIndex})}
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

const ImageGrid = ({selectImage, deselectImage, selections, onBlockRelease, coordinateToIndex, explainIndex, setExplainIndex}) => {
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
                    explainIndex={explainIndex}
                    setExplainIndex={setExplainIndex}
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

const ImageColumns = ({y, selectImage, deselectImage, selections, onBlockRelease, coordinateToIndex, explainIndex, setExplainIndex}) => {
    
    const width = 80
    let cols = []
    for (let x = 0; x < 4; x++) {
        const boxIndex = (y * 4) + x + 1
        const image =
            boxIndex < 18
                ?
                <DraggableImage
                    onClick={() => {setExplainIndex(boxIndex-1)}}
                    isBeingExplained={explainIndex === boxIndex-1}
                    index={selections[boxIndex - 1] - 1}
                    onRelease={(x, y) => {
                    onBlockRelease(x, y, boxIndex - 1)
                }}/>
                : boxIndex === 18 ?
                <Text style={styles.explanation}>{explanationArray[selections[explainIndex] - 1]}</Text>
                : null
        
        cols.push(
            <View key={x} style={styles.imageCol}>
                {boxIndex < 4 &&
                <TouchableOpacity style={[styles.selectedImg, {borderColor: 'green'}]}>
                    <Text style={styles.selectedIndex}>{boxIndex}</Text>
                </TouchableOpacity>}
    
                {boxIndex >= 15 && boxIndex <= 17 &&
                <TouchableOpacity style={[styles.selectedImg, {borderColor: 'red'}]}>
                    <Text style={styles.selectedIndex}>{boxIndex}</Text>
                </TouchableOpacity>}
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

/**/


const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Config.Color.SECONDARY,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    infoButton: {
        padding: 5,
        borderWidth: 1,
        borderColor: Config.Color.TEXT,
        fontSize: 17,
        fontWeight: "bold"
    },
    instructions: {
        flex: 1,
        padding: 5,
        fontSize: 15,
        fontWeight: "bold",
        color: Config.Color.TEXT
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
        borderWidth: 5,
        width: 90,
        height: 90,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255, 0.4)',
        position: 'absolute',
        borderColor: "white"
    },
    selectedIndex: {
        fontWeight: '900',
        fontSize: 26
    },
    explanation: {
        marginLeft: 5,
        marginTop: 5,
        paddingLeft: 5,
        paddingTop: 5,
        width: 250,
        color: Config.Color.TEXT,
        fontSize: 20,
        fontWeight: "bold"
    },
    opArea: {
        height: 38,
        backgroundColor: Config.Color.PRIMARY,
        justifyContent: 'flex-end'
    }
    
});
