import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { t } from "react-native-tailwindcss";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.154.254:5000/api/auth"; // Adjust for real devices
const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 1000, useNativeDriver: true, easing: Easing.out(Easing.exp) }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      await AsyncStorage.setItem("token", data.token);
      navigation.replace(data.role === "Doctor" ? "DocterDashboard" : "Dashboard");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#E6F7FF", "#FFFFFF"]} style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[t.flex1, t.justifyCenter, t.wFull]}>
        <Animated.View style={[t.itemsCenter, t.pX4, t.wFull, { opacity, transform: [{ translateY }] }]}> 
          <Text style={[t.text3xl, t.fontBold, t.textPrimary, t.mB8, t.textCenter]}>Login to MediConnect</Text>

          {/* Email Input */}
          <View style={[t.wFull, t.mB4]}>
            <View style={[t.flexRow, t.itemsCenter, t.borderB, t.borderGray400, t.pY2]}>
              <Feather name="mail" size={24} color="#4A5568" style={t.mR2} />
              <TextInput
                style={[t.flex1, t.textLg]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={[t.wFull, t.mB6]}>
            <View style={[t.flexRow, t.itemsCenter, t.borderB, t.borderGray400, t.pY2]}>
              <Feather name="lock" size={24} color="#4A5568" style={t.mR2} />
              <TextInput
                style={[t.flex1, t.textLg]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureTextEntry}
              />
              <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Feather name={secureTextEntry ? "eye-off" : "eye"} size={24} color="#4A5568" style={t.mL2} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[t.bgPrimary, t.pY4, t.pX8, t.roundedFull, t.shadow2xl, t.wFull, t.flexRow, t.justifyCenter]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={[t.textWhite, t.textLg, t.fontBold, t.textCenter]}>Login</Text>}
          </TouchableOpacity>

          {/* Signup Navigation */}
          <TouchableOpacity style={[t.mT4]} onPress={() => navigation.navigate("SignupScreen")}>
            <Text style={[t.textPrimary, t.textBase]}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;