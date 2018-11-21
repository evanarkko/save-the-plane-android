import React from 'react'
import {createStackNavigator} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import ShareScreen from './screens/ShareScreen'
import SelectionScreen from './screens/SelectionScreen'
import GroupMasterInputScreen from './screens/GroupMasterInputScreen'
import SuggestionScreen from './screens/SuggestionScreen'
import ResultsScreen from './screens/ResultsScreen'


const RootStack = createStackNavigator({
        Home: {
            screen: HomeScreen
        },
        GroupMasterInput: {
            screen: GroupMasterInputScreen
        },
        Selection: {
            screen: SelectionScreen
        },
        Suggestion: {
            screen: SuggestionScreen
        },
        Share: {
            screen: ShareScreen
        },
        Results: {
            screen: ResultsScreen
        }
    },
    {
        initialRouteName: 'Results'
    }
);

export default class App extends React.Component {
    
    render() {
        return (
            <RootStack/>
        );
    }
}
