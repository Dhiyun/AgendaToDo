import { Redirect } from 'expo-router';

// Langsung redirect ke Beranda tanpa login
export default function Index() {
  return <Redirect href="/(tabs)" />;
}
