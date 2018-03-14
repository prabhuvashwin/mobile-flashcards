import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { getDecks } from '../actions'
import { AppLoading } from 'expo'
import { getAllDecks } from '../utils/api'

class DeckList extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    getAllDecks()
      .then((decks) => dispatch(getDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  renderItem(deck) {
    const { navigation } = this.props
    let { item } = deck
    return (
      <ListItem
        roundAvatar
        key={item.title}
        title={item.title}
        subtitle={item.cards.length + ' cards'}
        onPress={() => navigation.navigate(
          'Deck',
          { title: item.title }
        )} />
    )
  }

  render() {
    const { ready } = this.state
    const { decks } = this.props

    if (!ready) {
      return <AppLoading />
    }
    return (
      <View>
        <List>
          <FlatList
            data={decks}
            keyExtractor={(item, index) => index}
            renderItem={this.renderItem.bind(this)} />
        </List>
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks: Object.values(decks)
  }
}

export default connect(mapStateToProps)(DeckList)
