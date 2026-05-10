import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles, navButtonStyles, berandaStyles } from '../../styles/global';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';

interface NavButtonProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  color: string;
  bgColor: string;
  onPress: () => void;
}

function NavButton({ icon, label, color, bgColor, onPress }: NavButtonProps) {
  return (
    <TouchableOpacity
      style={[navButtonStyles.button, { borderColor: color + '30' }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[navButtonStyles.iconWrap, { backgroundColor: bgColor }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text style={navButtonStyles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const { user, tasks } = useApp();

  const totalSelesai = useMemo(() => {
    return tasks.filter(task => Number(task.is_completed) === 1).length;
  }, [tasks]);

  const totalBelum = useMemo(() => {
    return tasks.filter(task => Number(task.is_completed) === 0).length;
  }, [tasks]);

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
            Agenda Nusantara, {user?.username ?? ' '} 👋
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
              {totalSelesai}
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
              {totalBelum}
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

        <Text style={[berandaStyles.sectionTitle, { paddingHorizontal: 4, marginTop: 12 }]}>
          MENU UTAMA
        </Text>
        <View style={berandaStyles.navGrid}>
          <NavButton
            icon="add-circle"
            label="Tambah Tugas Penting"
            color={Colors.penting}
            bgColor={Colors.pentingLight}
            onPress={() => router.push('/tambah-tugas-penting')}
          />
          <NavButton
            icon="add-circle"
            label="Tambah Tugas Biasa"
            color={Colors.biasa}
            bgColor={Colors.biasaLight}
            onPress={() => router.push('/tambah-tugas-biasa')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
