import { Stack } from "expo-router";

import { useEffect } from 'react';

import {
  initDatabase,
  seedDatabase,
} from '../database/database';

export default function RootLayout() {
  // return <Stack />;

  useEffect(() => {

    const setup = async () => {

      await initDatabase();

      await seedDatabase();
    };

    setup();

  }, []);

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
