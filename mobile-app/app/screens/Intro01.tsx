import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../navigation/RouteNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { INTRO_SCREEN_01 } from "../utils/constants";
import { Artwork01 } from "../components/artworks/Artwork01";
import { useTheme } from "@react-navigation/native";
import { ScreenIndicators } from "../components/ScreenIndicators";
import PrimaryButton from "../components/PrimaryButton";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export const Intro01 = ({
  navigation,
}: RootStackScreenProps<"Intro01">) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.card, flex: 1 }}>
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
      >
        <Artwork01 width={300} height={300} />
      </Animated.View>
      <View style={{ padding: 24 }}>
        <Animated.Text
          entering={FadeInDown.duration(1000).springify()}
          style={{ fontSize: 38, fontWeight: "800", color: theme.colors.text }}
        >
          {INTRO_SCREEN_01.title}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(100).duration(1000).springify()}
          style={{
            opacity: 0.5,
            marginTop: 16,
            fontSize: 16,
            color: theme.colors.text,
          }}
        >
          {INTRO_SCREEN_01.description}
        </Animated.Text>
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
        >
          <ScreenIndicators count={8} activeIndex={0} />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={{ alignItems: "center" }}
        >
          <PrimaryButton
            label="Next"
            onPress={() => navigation.replace("Intro02")}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};