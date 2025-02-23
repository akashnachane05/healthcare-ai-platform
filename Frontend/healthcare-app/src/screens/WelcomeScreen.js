

import { useEffect, useRef } from "react"
import { View, Text, Image, TouchableOpacity, Animated, Easing, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { t } from "react-native-tailwindcss"

const { width } = Dimensions.get("window")

const WelcomeScreen = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(50)).current
  const scale = useRef(new Animated.Value(0.9)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start()
  }, [opacity, scale, translateY])

  const animatedStyle = {
    opacity,
    transform: [{ translateY }, { scale }],
  }

  return (
    <LinearGradient colors={["#E6F7FF", "#FFFFFF"]} style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
      <Animated.View style={[t.itemsCenter, t.pX4, animatedStyle]}>
        <Text style={[t.text4xl, t.fontBold, t.textPrimary, t.mB2, t.textCenter]}>Welcome to MediConnect</Text>
        <Text style={[t.textLg, t.textGray700, t.mB8, t.textCenter, t.mX4]}>
          Revolutionizing patient care with artificial intelligence
        </Text>

        <Image
          source={require("../../assets/image.png")}
          style={[{ width: width * 0.8, height: width * 0.6 }, t.mB8]}
          resizeMode="contain"
        />

        <View style={[t.flexRow, t.justifyCenter, t.wFull, t.mT4]}>
          <TouchableOpacity
            style={[t.bgPrimary, t.pY4, t.pX8, t.roundedFull, t.mR4, t.shadow2xl]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={[t.textWhite, t.textLg, t.fontBold]}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[t.border2, t.borderPrimary, t.pY4, t.pX8, t.roundedFull]}>
            <Text style={[t.textPrimary, t.textLg, t.fontBold]}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View style={[t.absolute, t.bottom0, t.mB8, animatedStyle]}>
        <Text style={[t.textGray600, t.textBase]}>Powered by AI</Text>
      </Animated.View>
    </LinearGradient>
  )
}

export default WelcomeScreen

