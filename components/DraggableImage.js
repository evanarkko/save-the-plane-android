import React, { Component } from "react";
import {
    StyleSheet,
    View,
    PanResponder,
    Animated
} from "react-native";
import Requirer from "../logic/Requirer"
import Config from '../logic/Config'

export default class Draggable extends Component {
    constructor() {
        super();
        this.state = {
            pan: new Animated.ValueXY(),
            elevated: false
        };
    }
    
    componentWillMount() {
        // Add a listener for the delta value change
        this._val = { x:0, y:0 }
        this.state.pan.addListener((value) => this._val = value);
        // Initialize PanResponder with move handling
        this.panResponder = PanResponder.create({
            onPanResponderStart: (e, gestureState) => {
                this.props.onClick && this.props.onClick()
                this.setState({elevated: true})
            },
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: Animated.event([
                null, { dx: this.state.pan.x, dy: this.state.pan.y }
            ]),
            onPanResponderRelease: (evt, gestureState) => {
                this.props.onRelease(evt.nativeEvent.pageX, evt.nativeEvent.pageY)
                Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: 0 },
                    speed: 1000,
                    bounciness: 0
                }).start();
                this.setState({elevated: false})
            }
        });
            // adjusting delta value
            //this.state.pan.setValue({ x:0, y:0})
        console.log(this.state.pan.x)
    
    }
    
    render() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform(),
            zIndex: this.state.elevated ? 1 : 0,
            borderWidth: this.props.isBeingExplained ? 4 : 0,
            
        }
        return (
            <Animated.Image
                source={Requirer.dynamicImgRequire(this.props.index || 0)}
                {...this.panResponder.panHandlers}
                style={[panStyle, styles.circle]}
            />
        );
    }
}

let CIRCLE_RADIUS = 79;
let styles = StyleSheet.create({
    circle: {
        backgroundColor: "skyblue",
        width: CIRCLE_RADIUS,
        height: CIRCLE_RADIUS,
        borderRadius: 10,
        borderColor: Config.Color.TEXT
    }
});
