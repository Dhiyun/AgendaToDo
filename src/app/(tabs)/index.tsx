import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../../styles/global';

import { Colors } from '../../constants/Colors';

export default function HomeScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        contentContainerStyle={
          globalStyles.screenPadding
        }
      >
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text style={globalStyles.title}>
            Agenda Nusantara 👋
          </Text>

          <Text style={globalStyles.subtitle}>
            Kelola tugas harianmu
          </Text>
        </View>

        {/* Stats */}
        <View
          style={[
            globalStyles.row,
            globalStyles.gap12,
            {
              marginBottom: 20,
            },
          ]}
        >
          <View
            style={[
              globalStyles.card,
              {
                flex: 1,
                borderLeftWidth: 5,
                borderLeftColor:
                  Colors.biasa,
              },
            ]}
          >
            <Text
              style={globalStyles.statsLabel}
            >
              TUGAS SELESAI
            </Text>

            <Text
              style={[
                globalStyles.statsValue,
                {
                  color: Colors.biasa,
                },
              ]}
            >
              12
            </Text>
          </View>

          <View
            style={[
              globalStyles.card,
              {
                flex: 1,
                borderLeftWidth: 5,
                borderLeftColor:
                  Colors.penting,
              },
            ]}
          >
            <Text
              style={globalStyles.statsLabel}
            >
              BELUM SELESAI
            </Text>

            <Text
              style={[
                globalStyles.statsValue,
                {
                  color: Colors.penting,
                },
              ]}
            >
              5
            </Text>
          </View>
        </View>

        {/* Card */}
        <View style={globalStyles.card}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 6,
            }}
          >
            Menu Utama
          </Text>

          <Text style={globalStyles.subtitle}>
            Tambah dan kelola tugasmu
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
