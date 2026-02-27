import {
  Niramit_400Regular,
  Niramit_700Bold,
  useFonts,
} from "@expo-google-fonts/niramit";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Niramit_400Regular,
    Niramit_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
  <Drawer
    screenOptions={{
      headerShown: true,
      headerTintColor: "#ffffff",
      drawerStyle: {
        backgroundColor: "#d0c4ff"
      },
      headerTitleStyle: {
        fontFamily: "Niramit_700Bold",
        fontSize: 20
      },
      headerShadowVisible: false,
    }}
  >
    <Drawer.Screen
      name="home"
      options={{
        drawerLabel: "หน้าแรก",
        title: "แนะนำจังหวัด",
        headerStyle: { backgroundColor: "#ad02b6" },
        drawerItemStyle: {
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
          marginBottom: 10,
        },
        drawerLabelStyle: { fontFamily: "Niramit_700Bold", fontSize: 20 },
      }}
    />

    <Drawer.Screen
      name="travel"
      options={{
        drawerLabel: "✈️ สถานที่ท่องเที่ยวแนะนำ",
        title: "✈️ สถานที่ท่องเที่ยวแนะนำ",
        headerStyle: { backgroundColor: "#2D0046" },
        drawerLabelStyle: { fontFamily: "Niramit_700Bold", fontSize: 18 },
      }}
    />

    <Drawer.Screen
      name="food"
      options={{
        drawerLabel: "🍔 ร้านอาหารแนะนำ",
        title: "🍔 ร้านอาหารแนะนำ",
        headerStyle: { backgroundColor: "#4B0082" },
        drawerLabelStyle: { fontFamily: "Niramit_700Bold", fontSize: 18 },
      }}
    />

    <Drawer.Screen
      name="coffee"
      options={{
        drawerLabel: "☕ ร้านกาแฟแนะนำ",
        title: "☕ ร้านกาแฟแนะนำ",
        headerStyle: { backgroundColor: "#21130D" },
        drawerLabelStyle: { fontFamily: "Niramit_700Bold", fontSize: 18 },
      }}
    />

    <Drawer.Screen
      name="temple"
      options={{
        drawerLabel: "🛕 วัดแนะนำ",
        title: "🛕 วัดแนะนำ",
        headerStyle: { backgroundColor: "#B8860B" },
        drawerLabelStyle: { fontFamily: "Niramit_700Bold", fontSize: 18 },
      }}
    />

    <Drawer.Screen
      name="tradition"
      options={{
        drawerLabel: "🤝 วัฒนธรรมแนะนำ",
        title: "🤝 วัฒนธรรมแนะนำ",
        headerStyle: { backgroundColor: "#F57C00" },
        drawerLabelStyle: { fontFamily: "Niramit_700Bold", fontSize: 18 },
      }}
    />
  </Drawer>
</GestureHandlerRootView>
  );
  
}