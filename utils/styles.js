import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from './colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 5,
    marginBottom: 25
  },
  chkBox: {
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center'
  },
  txtInput: {
    height: 40,
    borderColor: colors.GREY,
    marginBottom: 20,
    marginLeft: 10,
    fontSize: 14,
  },
  flipContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flipCard: {
    height: 200,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    position: 'absolute',
    width: '100%',
    top: 0
  },
  text: {
    textAlign: 'center'
  },
})
