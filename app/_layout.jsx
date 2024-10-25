import React from "react";
import { Stack } from "expo-router";
import { DatabaseProvider } from "../context/DatabaseContext";

const RootLayout = () => {
  return (
    <DatabaseProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="selector" options={{ headerShown: false }} />
        <Stack.Screen name="list-editor" options={{ headerShown: false }} />
      </Stack>
    </DatabaseProvider>
  );
};

export default RootLayout;
