import { Stack } from "expo-router";
import { useEffect } from "react";
import { AppProvider } from "../context/AppContext";
import { initDatabase, seedDatabase, resetDatabase } from "../database/database";

export default function RootLayout() {
  // return <Stack />;

  useEffect(() => {

    const setup = async () => {

      await initDatabase();

      await seedDatabase();
    };

    setup();

  }, []);

  // useEffect(() => {
  //   const setup = async () => {

  //     await resetDatabase();
  //   };
  //   setup();
  // }, []);

  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name='(tabs)/_layout' /> */}
      </Stack>
    </AppProvider>
  )
}
