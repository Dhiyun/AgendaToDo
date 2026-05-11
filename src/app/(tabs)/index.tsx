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
import { router, Redirect } from 'expo-router';
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

function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 90 }}>
      {data.map((item, i) => (
        <View key={i} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 10, color: Colors.textMuted }}>
            {item.value > 0 ? item.value : ''}
          </Text>
          <View style={{
            width: '100%',
            height: Math.max((item.value / maxValue) * 60, item.value > 0 ? 6 : 2),
            backgroundColor: item.value > 0 ? Colors.biasa : Colors.border,
            borderRadius: 4,
          }} />
          <Text style={{ fontSize: 9, color: Colors.textMuted }}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

export default function HomeScreen() {
  const { user, tasks, isLoggedIn } = useApp();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  };

  const totalSelesai = useMemo(() => {
    return tasks.filter(task => Number(task.is_completed) === 1).length;
  }, [tasks]);

  const totalBelum = useMemo(() => {
    return tasks.filter(task => Number(task.is_completed) === 0).length;
  }, [tasks]);

  // ↓ Tambahan baru
  const chartData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const full = `${yyyy}-${mm}-${dd}`;
      return {
        label: `${dd}/${mm}`,
        value: tasks.filter(t => t.is_completed === 1 && t.updated_at === full).length,
      };
    });
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
            Hallo, {user?.username ?? ' '} 👋
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
                { color: Colors.biasa, },
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
                { color: Colors.penting, },
              ]}
            >
              {totalBelum}
            </Text>
          </View>
        </View>

        {/* Card */}
        <View style={globalStyles.card}>
          <Text style={{ fontSize: 14, fontWeight: '700', marginBottom: 12, color: '#111827' }}>
            Tugas Selesai per Hari
          </Text>
          <BarChart data={chartData} />
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
