import { StyleSheet } from 'react-native';

import { Colors } from '../constants/Colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  screenPadding: {
    padding: 20,
  },

  card: {
    backgroundColor: Colors.white,

    borderRadius: 20,

    padding: 20,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 3,
  },

  row: {
    flexDirection: 'row',
  },

  gap12: {
    gap: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
  },

  statsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textLight,
    marginBottom: 8,
  },

  statsValue: {
    fontSize: 38,
    fontWeight: '800',
  },
});