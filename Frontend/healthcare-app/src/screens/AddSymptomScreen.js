import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";
import tw from "twrnc";

export default function AddSymptomScreen({ navigation, route }) {
  const [newSymptom, setNewSymptom] = useState({ name: '', severity: '', notes: '' });

  const handleAddSymptom = () => {
    if (!newSymptom.name || !newSymptom.severity) {
      return;
    }

    const severity = parseInt(newSymptom.severity);
    if (isNaN(severity) || severity < 1 || severity > 10) {
      return;
    }

    const newCustomSymptom = {
      id: `symptom-${Date.now()}`,
      icon: "alert-circle",
      label: newSymptom.name,
      value: newSymptom.severity,
      unit: "severity",
      status: severity > 7 ? "warning" : "normal",
      bgColor: severity > 7 ? "bg-red-50" : "bg-yellow-50",
      iconColor: severity > 7 ? "text-red-500" : "text-yellow-500",
      notes: newSymptom.notes,
      trend: [severity],
      isCustom: true,
    };

    route.params.addSymptom(newCustomSymptom);
    navigation.goBack();
  };

  return (
    <View style={tw`flex-1 justify-center p-4`}>
      <Text style={tw`text-xl font-bold mb-4`}>Add New Symptom</Text>

      <Text style={tw`text-gray-600 mb-2`}>Symptom Name</Text>
      <TextInput
        style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
        placeholder="Enter symptom name"
        value={newSymptom.name}
        onChangeText={(text) => setNewSymptom({ ...newSymptom, name: text })}
      />

      <Text style={tw`text-gray-600 mb-2`}>Severity (1-10)</Text>
      <TextInput
        style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
        placeholder="Enter severity (1-10)"
        keyboardType="numeric"
        value={newSymptom.severity}
        onChangeText={(text) => {
          const value = parseInt(text);
          if (!text || (value >= 1 && value <= 10)) {
            setNewSymptom({ ...newSymptom, severity: text });
          }
        }}
      />

      <Text style={tw`text-gray-600 mb-2`}>Notes</Text>
      <TextInput
        style={tw`border border-gray-300 rounded-lg p-2 mb-4 h-20`}
        placeholder="Add any additional notes"
        multiline
        value={newSymptom.notes}
        onChangeText={(text) => setNewSymptom({ ...newSymptom, notes: text })}
      />

      <Button mode="contained" style={tw`bg-blue-500`} onPress={handleAddSymptom}>
        Add Symptom
      </Button>
    </View>
  );
}
