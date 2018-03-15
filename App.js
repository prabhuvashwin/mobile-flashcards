import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { View, Platform, StatusBar, AsyncStorage, StyleSheet, Text } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import Deck from './components/Deck'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      swipeEnabled: true,
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      swipeEnabled: true,
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#0e0787' : 'white',
    labelStyle: {
      fontSize: 15,
    },
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : '#0e0787',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({navigation}) => ({
      title: 'Flashcards',
      headerBackTitle: 'back',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#444444',
        height: 30
      }
    }),
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Flashcards',
      headerBackTitle: 'back',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#444444',
        height: 30
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Flashcards',
      headerBackTitle: 'back',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#444444',
        height: 30
      }
    }
  }
})

export default class App extends Component {

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={'#444444'} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
