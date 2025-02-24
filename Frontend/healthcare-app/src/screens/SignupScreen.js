import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient");
  const [age, setAge] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");

  const handleSignup = async () => {
    try {
      let userData = { name, email, password, role };

      if (role === "Patient") {
        if (!age) return Alert.alert("Error", "Age is required for patients.");
        userData.age = parseInt(age);
        userData.medicalHistory = medicalHistory.split(",").map((item) => item.trim());
      } else if (role === "Doctor") {
        if (!specialization || !experience)
          return Alert.alert("Error", "Specialization and experience are required for doctors.");
        userData.specialization = specialization;
        userData.experience = parseInt(experience);
      }

      console.log("Sending user data:", userData);

      const response = await fetch("http://192.168.154.254:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      Alert.alert("Success", "Signup successful!");
      navigation.navigate("Login"); // Navigate to login screen

    } catch (error) {
      console.error("Error Response:", error.message);
      Alert.alert("Error", error.message || "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      {/* Role Selection */}
      <Picker selectedValue={role} style={styles.picker} onValueChange={(itemValue) => setRole(itemValue)}>
        <Picker.Item label="Patient" value="Patient" />
        <Picker.Item label="Doctor" value="Doctor" />
      </Picker>

      {/* Role-specific Fields */}
      {role === "Patient" ? (
        <>
          <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Medical History (comma separated)" value={medicalHistory} onChangeText={setMedicalHistory} />
        </>
      ) : (
        <>
          <TextInput style={styles.input} placeholder="Specialization" value={specialization} onChangeText={setSpecialization} />
          <TextInput style={styles.input} placeholder="Experience (years)" value={experience} onChangeText={setExperience} keyboardType="numeric" />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", height: 50, borderColor: "#ccc", borderWidth: 1, borderRadius: 8, marginBottom: 10, paddingHorizontal: 10 },
  picker: { height: 50, width: "100%", marginBottom: 10 },
  button: { backgroundColor: "#007BFF", padding: 15, borderRadius: 8, alignItems: "center", width: "100%" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  switchText: { marginTop: 10, color: "#007BFF" },
});

export default SignupScreen;