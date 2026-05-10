import { Stack } from "expo-router";

export default function RootLayout() {
  // return <Stack />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='(tabs)/_layout' />
    </Stack>
  )
}
