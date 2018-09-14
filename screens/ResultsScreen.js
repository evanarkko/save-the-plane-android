import React from 'react'
import TestShare from '../logic/TestShare'
import VC from '../logic/Config'

export default class ResultsScreen extends React.Component {
    static navigationOptions = {
        title: 'Your results',
        headerStyle: {
            backgroundColor: VC.Color.PRIMARY,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }
    
    
    render() {
        return <TestShare/>
    }
}
