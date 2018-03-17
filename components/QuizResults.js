import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Card, Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'
import { styles } from '../utils/styles'
import { colors } from '../utils/colors'

class QuizResults extends Component {
  restartQuiz = () => {
    const { navigation, title } = this.props
    clearLocalNotifications()
      .then(setLocalNotification)
    const restart = NavigationActions.back({
      params: { title },
      actions: [NavigationActions.navigate({ routeName: 'Quiz' })],
    })

    navigation.dispatch(restart)
  }

  toDeck = () => {
    const { navigation, title } = this.props
    clearLocalNotifications()
      .then(setLocalNotification)
    const back = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'Deck', params: { title } })],
    })

    navigation.dispatch(back)
  }

  render() {
    const { score, numOfCards } = this.props
    return (
      <View>
        <Card
          title="Quiz Results">
          <Text style={[styles.text, {marginBottom: 20, fontSize: 22}]}>
            {'Your score: ' + ((score / numOfCards) * 100).toFixed(2) + "%\n"}
            {score + " / " + numOfCards + " answered correctly"}
          </Text>
          <Button
            icon={{name: 'replay'}}
            backgroundColor={colors.DARK_BLUE}
            buttonStyle={styles.btn}
            title='Restart Quiz'
            onPress={this.restartQuiz} />
          <Button
            icon={{name: 'arrow-back'}}
            backgroundColor={colors.GREYISH_BROWN}
            onPress={this.toDeck}
            buttonStyle={styles.btn}
            title='Back to Deck' />
        </Card>
      </View>
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  const { score, numOfCards, title } = navigation.state.params

  return {
    score,
    numOfCards,
    title
  }
}

export default connect(mapStateToProps)(QuizResults)
