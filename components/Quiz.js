import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Card, ListItem, Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  state = {
    index: 0,
    score: 0,
    viewAnswer: false,
    selectedAnswerType: false,
    isFinished: false,
    displayResult: ''
  }

  nextCard = () => {
    const { index } = this.state
    const { cards } = this.props

    if (index < (cards.length - 1)) {
      this.setState({ viewAnswer: false, displayResult: '' })
      this.setState((state) => {
        return { index: index + 1 }
      })
    } else {
      this.setState({ isFinished: true })
    }
  }

  submitAnswer = (userAnswer) => {
    const { index } = this.state
    const { cards } = this.props
    if (cards[index].answerType === userAnswer) {
      this.setState((prev) => {
        return { score: prev.score + 1 }
      })
      this.setState({ displayResult: 'Good job! 👍', selectedAnswerType: true })
    } else {
      this.setState({ displayResult: 'Wrong answer! 👎', selectedAnswerType: false })
    }
  }


  restartQuiz = () => {
    this.setState({
      index: 0,
      score: 0,
      viewAnswer: false,
      isFinished: false
    })
    clearLocalNotifications()
      .then(setLocalNotification)
  }

  backToDeck = () => {
    const { navigation } = this.props
    const backAction = NavigationActions.back()
    navigation.dispatch(backAction)
    clearLocalNotifications()
      .then(setLocalNotification)
  }

  render() {
    const { cards } = this.props
    const { index, isFinished, viewAnswer, displayResult, score, selectedAnswerType } = this.state

    let currentCard = cards[index]
    console.log(currentCard)

    if (!isFinished) {
      return (
        <View>
          <Card
            title={(index + 1) + " / " + cards.length}>
            <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 30}}>
              {currentCard.question}
            </Text>


            {(viewAnswer === false && displayResult.length === 0) && (
              <Button
                backgroundColor='#444444'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
                title='View Answer'
                onPress={() => this.setState({ viewAnswer: true })} />
            )}
            {(viewAnswer && displayResult.length === 0) && (
              <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 25, color: 'rgb(24, 4, 92)'}}>{currentCard.answer}</Text>
            )}

            {displayResult.length === 0 && (
              <View>
                <Button
                  backgroundColor='green'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
                  title='Correct'
                  disabled={!viewAnswer}
                  onPress={() => this.submitAnswer(true)} />
                <Button
                  backgroundColor='red'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
                  title='Incorrect'
                  disabled={!viewAnswer}
                  onPress={() => this.submitAnswer(false)} />
              </View>
            )}

            {displayResult.length > 0 && (
              <View>
                <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 25,
                      color: currentCard.answerType ? 'rgb(3, 136, 12)' : 'rgb(233, 48, 7)'}}>{currentCard.answer}</Text>
                <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 28,
                      color: selectedAnswerType ? 'rgb(3, 136, 12)' : 'rgb(233, 48, 7)'}}>{displayResult}</Text>
                <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 28,
                      color: 'rgb(24, 4, 92)'}}>{currentCard.comments}</Text>
                <Button
                  backgroundColor='#444444'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
                  title='NEXT'
                  onPress={this.nextCard} />
              </View>
            )}
          </Card>
        </View>
      )
    } else {
      return (
        <View>
          <Card
            title="Results 🏆">
            <Text style={{marginBottom: 20}}>
              Your score : {score + " / " + cards.length}
            </Text>
            <Button
              icon={{name: 'replay'}}
              backgroundColor='#ffe274'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
              title='Restart Quiz'
              onPress={this.restartQuiz} />
            <Button
              icon={{name: 'arrow-back'}}
              backgroundColor='#444444'
              onPress={this.backToDeck}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
              title='Back to Deck' />
          </Card>
        </View>
      )
    }
  }
}


function mapStateToProps (decks, { navigation }) {
  const { title } = navigation.state.params

  return {
    cards: decks[title].cards
  }
}

export default connect(mapStateToProps)(Quiz)
