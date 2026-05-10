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

export const navButtonStyles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 8,
    margin: 6,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
});

export const berandaStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
  },
  date: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  headerIcon: {
    opacity: 0.8,
  },
  statsRow: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    flexDirection: 'row',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderLeftWidth: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 38,
    fontWeight: '800',
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  navGrid: {
    flexDirection: 'row',
    marginHorizontal: -6,
    marginBottom: 4,
  },
});
