import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';
import { globalStyles } from '@/styles/global';
import { Colors } from '../constants/Colors';
import { useApp } from '../context/AppContext';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

type Category = 'penting' | 'biasa';

interface TaskFormProps {
    category: Category;
}

export default function TaskForm ({
    category,
}: TaskFormProps) {
    const { addTask } = useApp();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const isPenting = category === 'penting';
    const mainColor = isPenting ? Colors.penting : Colors.biasa;
    const screenTitle = isPenting ? 'Tambah Tugas Penting' : 'Tambah Tugas Biasa';
    
    const formatDate = (data: Date) => {
        const year = data.getFullYear();
        const month = String(data.getMonth() + 1).padStart(2, '0');
        const day = String(data.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowPicker(false);

        if (selectedDate) {
            setDueDate(selectedDate);
        }
    };

    const handleSubmit = async () => {
        if (!title) {
            Alert.alert('Validasi', 'Judul wajib diisi.');
            return;
        }

        if (!dueDate) {
            Alert.alert('Validasi', 'Deadline wajib dipilih.');
            return;
        }

        await addTask({
            title,
            description,
            due_date: formatDate(dueDate),
            category,
        });

        Alert.alert('Sukses', 'Tugas berhasil ditambahkan!', [
            { text: 'OK', onPress: () => router.back() },
        ]);
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="height"
            >
                <ScrollView
                    contentContainerStyle={[
                        globalStyles.screenPadding,
                        {
                            flexGrow: 1,
                        },
                    ]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    <View>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            activeOpacity={0.7}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 20,
                                alignSelf: 'flex-start',
                            }}
                        >
                            <Ionicons name="arrow-back" size={24} color={mainColor} />
                            <Text style={{ color: mainColor, fontSize: 16, fontWeight: '600' }}>Kembali</Text>
                        </TouchableOpacity>

                        <Text style={[globalStyles.title, { marginBottom: 8 }]}>{screenTitle}</Text>
                        <Text style={[globalStyles.subtitle, { marginBottom: 24 }]}>Tambahkan tugas harian baru</Text>

                        {/* Judul */}
                        <View style={{ marginBottom: 16 }}>
                            <Text style={{ marginBottom: 8, fontWeight: '600' }}>Judul</Text>
                            <TextInput
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Masukkan judul"
                                style={{
                                    backgroundColor: Colors.white,
                                    borderWidth: 1,
                                    borderColor: Colors.border,
                                    padding: 14,
                                    borderRadius: 14,
                                    fontSize: 16,
                                }}
                            />
                        </View>

                        {/* Deskripsi */}
                        <View style={{ marginBottom: 16 }}>
                            <Text style={{ marginBottom: 8, fontWeight: '600' }}>Deskripsi</Text>
                            <TextInput
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Masukkan deskripsi"
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                                style={{
                                    backgroundColor: Colors.white,
                                    borderWidth: 1,
                                    borderColor: Colors.border,
                                    padding: 14,
                                    borderRadius: 14,
                                    fontSize: 16,
                                    height: 150,
                                }}
                            />
                        </View>
                        <View style={{ marginBottom: 24 }}>
                            <Text style={{ marginBottom: 8, fontWeight: '600' }}>Deadline</Text>

                            <TouchableOpacity
                                onPress={() => setShowPicker(true)}
                                activeOpacity={0.8}
                                style={{
                                    backgroundColor: Colors.white,
                                    borderWidth: 1,
                                    borderColor: Colors.border,
                                    borderRadius: 14,
                                    padding: 14,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ fontSize: 16, color: dueDate ? Colors.text : Colors.border }}>
                                    {dueDate ? formatDate(dueDate) : 'Pilih tanggal deadline'}
                                </Text>
                                <Ionicons name="calendar-outline" size={20} color={mainColor} />
                            </TouchableOpacity>

                            {showPicker && (
                                <DateTimePicker
                                    value={dueDate ?? new Date()}
                                    mode="date"
                                    display='default'
                                    minimumDate={new Date()}
                                    onChange={handleDateChange}
                                />
                            )}
                        </View>

                        <TouchableOpacity
                            onPress={handleSubmit}
                            activeOpacity={0.8}
                            style={{
                                backgroundColor: mainColor,
                                paddingVertical: 16,
                                borderRadius: 16,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: Colors.white, fontSize: 16, fontWeight: '700' }}>Simpan Tugas</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
