import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { RootStackScreenProps } from "../navigation/RouteNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import { Artwork03 } from "../components/artworks/Artwork03";
import { LOG_IN_SCREEN } from "../utils/constants";
import { PrimaryButton } from "../components/PrimaryButton";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useAuth } from "../hooks/useAuth";

export const SignIn = ({ navigation }: RootStackScreenProps<"SignIn">) => {
  const theme = useTheme();
  const dimensions = useWindowDimensions();
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = () => {
    signIn(email, password)
      .then(() => navigation.navigate("DailyHistory"))
      .catch(error => alert(error.message));
  };

  
    return (
      <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: theme.colors.card,
            minHeight: dimensions.height,
          }}
        >
          <Animated.View
            entering={FadeInUp.duration(1000).springify()}
            style={{
              paddingHorizontal: 24,
              height: 52,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => navigation.replace("Intro08")}>
              <Icons name="arrow-back-ios" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </Animated.View>
  
          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Artwork03 width={240} height={240} />
          </Animated.View>
  
          <View style={{ padding: 24 }}>
            <Animated.Text
              entering={FadeInDown.duration(1000).springify()}
              style={{
                fontSize: 40,
                fontWeight: "800",
                color: theme.colors.text,
              }}
            >
              {LOG_IN_SCREEN.title}
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
              {LOG_IN_SCREEN.description}
            </Animated.Text>
  
            <View style={{ alignItems: "center", gap: 16, marginTop: 32 }}>
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                style={{ position: "relative", width: "100%" }}
              >
                <TextInput
                  placeholder="メールアドレス"
                  value={email}
                  onChangeText={setEmail}
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: theme.colors.text,
                    paddingLeft: 48,
                    paddingRight: 12,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: theme.colors.background,
                    width: "100%",
                  }}
                  textContentType="emailAddress"
                />
                <Icons
                  name="email"
                  size={24}
                  color={theme.colors.text}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 12,
                    opacity: 0.5,
                  }}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                style={{ position: "relative", width: "100%" }}
              >
                <TextInput
                  placeholder="パスワード"
                  value={password}
                  onChangeText={setPassword}
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: theme.colors.text,
                    paddingLeft: 48,
                    paddingRight: 12,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: theme.colors.background,
                    width: "100%",
                  }}
                  textContentType="password"
                />
                <Icons
                  name="lock"
                  size={24}
                  color={theme.colors.text}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 12,
                    opacity: 0.5,
                  }}
                />
              </Animated.View>
              <View style={{ width: "100%", alignItems: 'flex-end', marginTop: 5 }}>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text style={{ color: theme.colors.primary, fontSize: 13 }}>
                    アカウント登録はこちら
                  </Text>
                </TouchableOpacity>
              </View>

              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
              >
                <PrimaryButton
                  label="ログイン"
                  onPress={handleSignIn}
                />
              </Animated.View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  };