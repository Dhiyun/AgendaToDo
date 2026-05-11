import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp, Task } from '../../context/AppContext';
import { globalStyles } from '../../styles/global';
import { Colors } from '../../constants/Colors';
import { useState, useMemo } from 'react';

type FilterType = 'semua' | 'penting' | 'biasa' | 'selesai' | 'belum';

const FILTERS: { label: string; value: FilterType; icon: string }[] = [
    { label: 'Semua', value: 'semua', icon: 'apps-outline' },
    { label: 'Penting', value: 'penting', icon: 'alert-circle-outline' },
    { label: 'Biasa', value: 'biasa', icon: 'list-outline' },
    { label: 'Selesai', value: 'selesai', icon: 'checkmark-circle-outline' },
    { label: 'Belum', value: 'belum', icon: 'ellipse-outline' },
];

const FILTER_COLOR: Record<FilterType, string> = {
    semua: Colors.biasa,
    penting: Colors.penting,
    biasa: Colors.biasa,
    selesai: Colors.biasa,
    belum: Colors.penting,
};

export default function DaftarTugasScreen() {
    const { tasks, toggleTask, deleteTask } = useApp();
    const [activeFilter, setActiveFilter] = useState<FilterType>('semua');

    const filteredTasks = useMemo(() => {
        switch (activeFilter) {
            case 'penting': return tasks.filter(t => t.category === 'penting');
            case 'biasa': return tasks.filter(t => t.category === 'biasa');
            case 'selesai': return tasks.filter(t => t.is_completed === 1);
            case 'belum': return tasks.filter(t => t.is_completed === 0);
            default: return tasks;
        }
    }, [tasks, activeFilter]);

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={[globalStyles.screenPadding, { paddingBottom: 0 }]}>
                <View style={{ marginBottom: 16 }}>
                    <Text style={globalStyles.title}>Daftar Tugas</Text>
                    <Text style={globalStyles.subtitle}>
                        {filteredTasks.length} tugas ditampilkan
                    </Text>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8, paddingBottom: 16 }}
                >
                    {FILTERS.map(filter => {
                        const isActive = activeFilter === filter.value;
                        const color = FILTER_COLOR[filter.value];
                        return (
                            <TouchableOpacity
                                key={filter.value}
                                onPress={() => setActiveFilter(filter.value)}
                                activeOpacity={0.8}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 6,
                                    paddingHorizontal: 14,
                                    paddingVertical: 8,
                                    borderRadius: 20,
                                    borderWidth: 1.5,
                                    borderColor: isActive ? color : Colors.border,
                                    backgroundColor: isActive ? color + '15' : '#fff',
                                }}
                            >
                                <Ionicons
                                    name={filter.icon as any}
                                    size={14}
                                    color={isActive ? color : Colors.textMuted}
                                />
                                <Text style={{
                                    fontSize: 13,
                                    fontWeight: '700',
                                    color: isActive ? color : Colors.textMuted,
                                }}>
                                    {filter.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {filteredTasks.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="document-text-outline" size={80} color={Colors.border} />
                    <Text style={{ marginTop: 12, fontSize: 18, fontWeight: '700', color: Colors.textMuted }}>
                        Tidak ada tugas
                    </Text>
                    <Text style={{ marginTop: 4, color: Colors.textMuted, fontSize: 14 }}>
                        Tidak ada tugas untuk filter ini
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredTasks}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 12,
                        paddingBottom: 30,
                        paddingHorizontal: 10,
                        paddingTop: 4,
                    }}
                    renderItem={({ item }) => {
                        const isPenting = item.category === 'penting';
                        const mainColor = isPenting ? Colors.penting : Colors.biasa;
                        const isSelesai = item.is_completed === 1;

                        return (
                            <View style={[
                                globalStyles.card,
                                {
                                    borderLeftWidth: 5,
                                    borderLeftColor: isSelesai ? '#10B981' : mainColor,
                                    opacity: isSelesai ? 0.75 : 1,
                                }
                            ]}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                }}>
                                    <View style={{ flex: 1, paddingRight: 10 }}>
                                        <View style={{
                                            alignSelf: 'flex-start',
                                            backgroundColor: mainColor + '15',
                                            paddingHorizontal: 8,
                                            paddingVertical: 2,
                                            borderRadius: 6,
                                            marginBottom: 6,
                                        }}>
                                            <Text style={{ fontSize: 11, fontWeight: '700', color: mainColor }}>
                                                {isPenting ? 'PENTING' : 'BIASA'}
                                            </Text>
                                        </View>

                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: '700',
                                            textDecorationLine: isSelesai ? 'line-through' : 'none',
                                            color: isSelesai ? Colors.textMuted : '#111827',
                                        }}>
                                            {item.title}
                                        </Text>

                                        {item.description ? (
                                            <Text style={{ marginTop: 4, color: Colors.textMuted }}>
                                                {item.description}
                                            </Text>
                                        ) : null}
                                    </View>

                                    <TouchableOpacity onPress={() =>
                                        toggleTask(item.id, isSelesai ? 0 : 1)
                                    }>
                                        <Ionicons
                                            name={isSelesai ? 'checkmark-circle' : 'ellipse-outline'}
                                            size={30}
                                            color={isSelesai ? '#10B981' : mainColor}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                        <Ionicons name="calendar-outline" size={16} color={Colors.textMuted} />
                                        <Text style={{ color: Colors.textMuted }}>{item.due_date}</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                        <Ionicons name="trash-outline" size={22} color="#EF4444" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }}
                />
            )}
        </SafeAreaView>
    );
}
