import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/global';
import { Colors } from '../constants/Colors';
import { useApp } from '../context/AppContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const { login } = useApp();

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Gagal', 'Username atau password salah');
    }
  };

  return (
    <SafeAreaView
      style={globalStyles.container}
    >
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
          <View
            style={[
              globalStyles.screenPadding,
              {
                flex: 1,
                justifyContent: 'center',
              },
            ]}
          >

            <Text
              style={[
                globalStyles.title,
                {
                  marginBottom: 8,
                },
              ]}
            >
              Agenda Nusantara
            </Text>

            <Text
              style={[
                globalStyles.subtitle,
                {
                  marginBottom: 32,
                },
              ]}
            >
              Login untuk melanjutkan
            </Text>

            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={{
                backgroundColor: Colors.white,
                padding: 16,
                borderRadius: 16,
                marginBottom: 16,
              }}
            />

            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={{
                backgroundColor: Colors.white,
                padding: 16,
                borderRadius: 16,
                marginBottom: 24,
              }}
            />

            <TouchableOpacity
              onPress={handleLogin}
              style={{
                backgroundColor: Colors.primary,
                padding: 18,
                borderRadius: 16,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: '700',
                  fontSize: 16,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
