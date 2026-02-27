import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Index() {
    useEffect(() => {
      const timer = setTimeout(() => {
        router.replace("/home");
      }, 3000);

      return () => clearTimeout(timer);
    });

  return (
    <LinearGradient colors={["#ad02b6", "#e9fe27"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
    <View >
      <ImageBackground 
          source={require("../assets/images/splashbackground.png")}
          style={styles.box}
          imageStyle={{ borderRadius: 20, opacity: 0.8 }}
        >
        <Image
          source={require("../assets/images/Tak.png")}
          style={{ width: 150, height: 150 }}
        />
        <Text
          style={{
            color: "#eeff00",
            marginTop: 20,
            fontFamily: "Niramit_700Bold",
            fontSize: 50,
          }}
        >
          เที่ยวไทย
        </Text>
        <Text
          style={{
            color: "#eeff00",
            marginTop: 20,
            fontFamily: "Niramit_700Bold",
            fontSize: 50,
          }}
        >
          จังหวัดตาก
        </Text>
        <ActivityIndicator
          size="large"
          color="#eeff00"
          style={{ marginTop: 20 }}
        />
      </ImageBackground>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    margin: 20,
    width: 320,
    height: 720,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});