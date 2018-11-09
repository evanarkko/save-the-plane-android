import React, { Component } from "react";
import {
    StyleSheet,
    View,
    PanResponder,
    Animated
} from "react-native";
import Requirer from "../logic/Requirer"

export default class Draggable extends Component {
    constructor() {
        super();
        this.state = {
            pan: new Animated.ValueXY()
        };
    }
    
    componentWillMount() {
        // Add a listener for the delta value change
        this._val = { x:0, y:0 }
        this.state.pan.addListener((value) => this._val = value);
        // Initialize PanResponder with move handling
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: Animated.event([
                null, { dx: this.state.pan.x, dy: this.state.pan.y }
            ]),
            onPanResponderRelease: (evt, gestureState) => {
                this.props.onRelease(evt.nativeEvent.pageX, evt.nativeEvent.pageY)
                Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5
                }).start();
            }
        });
            // adjusting delta value
            //this.state.pan.setValue({ x:0, y:0})
        console.log(this.state.pan.x)
    
    }
    
    render() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
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

let CIRCLE_RADIUS = 40;
let styles = StyleSheet.create({
    circle: {
        backgroundColor: "skyblue",
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: 10
    }
});
