import React, { Component } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { getDecks, removeDeck } from '../actions'
import { AppLoading } from 'expo'
import { getAllDecks, removeOneDeck } from '../utils/api'
import Swipeout from 'react-native-swipeout'

class DeckList extends Component {
  state = {
    ready: false,
    activeRowKey: null
  }

  componentDidMount() {
    const { dispatch } = this.props
    getAllDecks()
      .then((decks) => dispatch(getDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.decks !== this.props.decks) {
      this.setState(() => ({ ready: true }))
    }
  }

  refreshFlatList = (item) => {
    const { dispatch } = this.props
    dispatch(removeDeck(item.title))
    removeOneDeck(item.title)
  }

  renderItem(deck) {
    const { navigation, decks } = this.props
    const { activeRowKey } = this.state
    let { item, index } = deck

    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if(activeRowKey != null) {
            this.setState({ activeRowKey: null });
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: item.title });
      },
      right: [{
        onPress: () => {
          Alert.alert(
            'Alert',
            'Are you sure you want to delete ?',
            [
              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Yes', onPress: () => {
                this.refreshFlatList(item);
              }},
            ],
            { cancelable: true }
          );
        },
        text: 'Delete', type: 'delete'
      }],
      rowId: index,
      sectionId: 1
    };
    return (
      <Swipeout {...swipeSettings}>
        <ListItem
          roundAvatar
          key={item.title}
          title={item.title}
          subtitle={item.cards.length + ' cards'}
          onPress={() => navigation.navigate(
            'Deck',
            { title: item.title }
          )} />
      </Swipeout>
    )
  }

  render() {
    const { ready } = this.state
    const { decks } = this.props

    console.log(1)
    console.log(decks)

    if (!ready) {
      return <AppLoading />
    }
    return (
      <View style={{marginTop: 15}}>
        <FlatList
          data={decks}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem.bind(this)} />
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
