import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { addCard } from '../actions'
import { styles } from '../utils/styles'
import { colors } from '../utils/colors'

class Deck extends Component {
  render() {
    const { deck, navigation } = this.props

    return (
      <View>
        <Card title={deck.title}>
          <Text style={[styles.text, {marginBottom: 20}]}>
            {deck.cards.length} card(s) are present in this deck
          </Text>
          <Button
            title='Add Card'
            icon={{name: 'add'}}
            backgroundColor={colors.LIGHT_BLUE}
            buttonStyle={styles.btn}
            onPress={() => navigation.navigate(
              'NewCard',
              { title: deck.title }
            )} />
          <Button
            title='Start Quiz'
            iconRight={{name: 'arrow-forward'}}
            backgroundColor={colors.BRIGHT_GREEN}
            disabled={deck.cards.length === 0}
            buttonStyle={styles.btn}
            onPress={() => navigation.navigate(
              'Quiz',
              { title: deck.title }
            )} />

          <Button
            title='Back to Home'
            icon={{name: 'arrow-back'}}
            backgroundColor={colors.ORANGE}
            buttonStyle={styles.btn}
            onPress={() => navigation.dispatch(
              NavigationActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
              })
            )} />
        </Card>
      </View>
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  const { title } = navigation.state.params

  return {
    deck: decks[title]
  }
}

export default connect(mapStateToProps)(Deck)
