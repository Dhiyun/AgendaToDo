import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { globalStyles } from '../../styles/global';
import { Colors } from '../../constants/Colors';

export default function SettingsScreen() {
    const {
        changePassword,
        logout,
    } = useApp();

    const [currentPassword, setCurrentPassword] =
        useState('');

    const [newPassword, setNewPassword] =
        useState('');

    const handleChangePassword = async () => {

        if (!currentPassword || !newPassword) {
            Alert.alert(
                'Validasi',
                'Semua field wajib diisi'
            );
            return;
        }

        const success = await changePassword(
            currentPassword,
            newPassword
        );

        if (!success) {
            Alert.alert(
                'Gagal',
                'Password saat ini salah'
            );
            return;
        }

        Alert.alert(
            'Berhasil',
            'Password berhasil diganti'
        );

        setCurrentPassword('');
        setNewPassword('');
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="height"
            >
                <ScrollView contentContainerStyle={{
                    flexGrow: 1,
                }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[globalStyles.screenPadding, { flex: 1 }]}>
                        <Text style={[globalStyles.title, { marginBottom: 8 }]}>
                            Pengaturan
                        </Text>
                        <Text style={[globalStyles.subtitle, { marginBottom: 24 }]}>
                            Kelola akun aplikasi
                        </Text>

                        {/* PASSWORD */}
                        <View style={[globalStyles.card, { marginBottom: 20 }]} >
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '700',
                                marginBottom: 16,
                            }}
                            >
                                Ganti Password
                            </Text>

                            <TextInput
                                placeholder="Password saat ini"
                                secureTextEntry
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                style={{
                                    borderWidth: 1,
                                    borderColor: Colors.border,
                                    borderRadius: 14,
                                    padding: 14,
                                    marginBottom: 12,
                                    backgroundColor: '#fff',
                                }}
                            />

                            <TextInput
                                placeholder="Password baru"
                                secureTextEntry
                                value={newPassword}
                                onChangeText={setNewPassword}
                                style={{
                                    borderWidth: 1,
                                    borderColor: Colors.border,
                                    borderRadius: 14,
                                    padding: 14,
                                    marginBottom: 16,
                                    backgroundColor: '#fff',
                                }}
                            />

                            <TouchableOpacity
                                onPress={handleChangePassword}
                                style={{
                                    backgroundColor: Colors.primary,
                                    paddingVertical: 14,
                                    borderRadius: 14,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: '700', }}>
                                    Simpan Password
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* DEVELOPER */}
                        <View
                            style={[
                                globalStyles.card,
                                {
                                    alignItems: 'center',
                                    marginTop: 'auto',
                                }
                            ]}
                        >
                            <Image source={require('../../../assets/images/profile.jpg')}
                                style={{
                                    width: 90,
                                    height: 90,
                                    borderRadius: 45,
                                    marginBottom: 12,
                                }}
                            />
                            <Text style={{ fontSize: 18, fontWeight: '700', }}>
                                Dhika Wahyu Nugroho
                            </Text>
                            <Text style={{ color: Colors.textMuted, marginTop: 4, }}>
                                2241720056
                            </Text>
                            <Text
                                style={{
                                    marginTop: 12,
                                    color: Colors.textDev,
                                    fontSize: 13,
                                    fontWeight: '700',
                                }}
                            >
                                DEVELOPER APLIKASI
                            </Text>
                        </View>

                        {/* LOGOUT */}
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    'Logout',
                                    'Yakin ingin keluar dari akun ini?',
                                    [
                                        {
                                            text: 'Batal',
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'Keluar',
                                            style: 'destructive',
                                            onPress: logout,
                                        },
                                    ]
                                );
                            }}
                            style={{
                                backgroundColor: '#e71414',
                                paddingVertical: 14,
                                borderRadius: 14,
                                alignItems: 'center',
                                marginVertical: 20,
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
