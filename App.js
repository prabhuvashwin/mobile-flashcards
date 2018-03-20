import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { View, Platform, StatusBar, AsyncStorage, StyleSheet, Text } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import Deck from './components/Deck'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import QuizResults from './components/QuizResults'
import { styles } from './utils/styles'
import { colors } from './utils/colors'

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
      tabBarLabel: 'Current Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list-box-outline' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      swipeEnabled: true,
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle-outline' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: colors.DARK_BLUE,
    inactiveTintColor: colors.DARK_BLUE,
    labelStyle: {
      fontSize: 15,
    },
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? colors.WHITE : colors.YELLOW,
      shadowColor: colors.SHADOW_BLACK,
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
    navigationOptions: {
      title: 'Flashcards',
      headerBackTitle: 'back',
      headerTintColor: colors.DARK_BLUE,
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? colors.GREYISH_BROWN : colors.YELLOW,
        height: 30
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Flashcards',
      headerBackTitle: 'back',
      headerTintColor: colors.DARK_BLUE,
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? colors.WHITE : colors.YELLOW,
        height: 30
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Flashcards',
      headerBackTitle: 'back',
      headerTintColor: colors.DARK_BLUE,
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? colors.WHITE : colors.YELLOW,
        height: 30
      }
    }
  },
  QuizResults: {
    screen: QuizResults,
    navigationOptions: {
      title: 'Flashcards',
      headerBackTitle: 'back',
      headerTintColor: colors.DARK_BLUE,
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? colors.WHITE : colors.YELLOW,
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
          <AppStatusBar backgroundColor={colors.GREYISH_BROWN} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
