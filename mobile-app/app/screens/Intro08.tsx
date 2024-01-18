import { View, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../navigation/RouteNavigator";
import { useTheme } from "@react-navigation/native";
import { PrimaryButton } from "../components/PrimaryButton";
import { ScreenIndicators } from "../components/ScreenIndicators";
import { INTRO_SCREEN_08 } from "../utils/constants";
import Icons from "@expo/vector-icons/MaterialIcons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Artwork08 } from "../components/artworks/Artwork08";

export const Intro08 = ({
  navigation,
}: RootStackScreenProps<"Intro08">) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.card, flex: 1 }}>
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        style={{
          paddingHorizontal: 24,
          height: 52,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.replace("Intro07")}>
          <Icons name="arrow-back-ios" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        entering={FadeInUp.delay(200).duration(1000).springify()}
        style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
      >
        <Artwork08 width={300} height={300} />
      </Animated.View>
      <View style={{ padding: 24 }}>
        <Animated.Text
          entering={FadeInDown.duration(1000).springify()}
          style={{ fontSize: 40, fontWeight: "800", color: theme.colors.text }}
        >
          {INTRO_SCREEN_08.title}
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
          {INTRO_SCREEN_08.description}
        </Animated.Text>
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
        >
          <ScreenIndicators count={8} activeIndex={7} />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={{ alignItems: "center" }}
        >
          <PrimaryButton
            label="次へ"
            onPress={() => navigation.replace("SignIn")}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};