import React, { useState } from "react";
import { View, Dimensions, Animated, TouchableOpacity, Modal, TextInput } from "react-native";
import { Text, Avatar, Badge, IconButton, Button, Portal ,Dialog} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import tw from 'twrnc';
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

export default function PatientDashboard() {
  const insets = useSafeAreaInsets();
  const [isWatchConnected, setIsWatchConnected] = useState(false);
  const [selectedVital, setSelectedVital] = useState('heart');
  const [showAddSymptom, setShowAddSymptom] = useState(false);
  const [newSymptom, setNewSymptom] = useState({ name: '', severity: '', notes: '' });
  const [symptoms, setSymptoms] = useState([]);

  const healthVitals = [
    { 
      id: 'heart',
      icon: "heart-pulse", 
      label: "Heart Rate", 
      value: "72", 
      unit: "BPM",
      status: "normal",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      threshold: { min: 60, max: 100 },
      trend: [68, 70, 71, 69, 72, 71, 72]
    },
    { 
      id: 'oxygen',
      icon: "lungs", 
      label: "SpO₂", 
      value: "98", 
      unit: "%",
      status: "normal",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      threshold: { min: 95, max: 100 },
      trend: [97, 98, 98, 97, 98, 98, 98]
    },
    { 
      id: 'steps',
      icon: "walk", 
      label: "Steps", 
      value: "8,459", 
      unit: "steps",
      status: "normal",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      trend: [7200, 8100, 7900, 8300, 8459, 7800, 8459]
    },
    { 
      id: 'sleep',
      icon: "sleep", 
      label: "Sleep", 
      value: "6.5", 
      unit: "hours",
      status: "warning",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
      trend: [7, 6.8, 6.2, 6.5, 6.7, 6.4, 6.5]
    }
  ];

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
      isCustom: true
    };
    
    setSymptoms([...symptoms, newCustomSymptom]);
    setNewSymptom({ name: '', severity: '', notes: '' });
    setShowAddSymptom(false);
  };

  const handleDeleteSymptom = (symptomId) => {
    setSymptoms(symptoms.filter(symptom => symptom.id !== symptomId));
    if (selectedVital === symptomId) {
      setSelectedVital('heart');
    }
  };

  const allVitals = [...healthVitals, ...symptoms];

  const quickActions = [
    {
      id: 'checkup',
      icon: "stethoscope",
      label: "Request Check-up",
      bgColor: "bg-blue-500"
    },
    {
      id: 'health',
      icon: "chart-line",
      label: "View Health Data",
      bgColor: "bg-purple-500"
    },
    {
      id: 'schedule',
      icon: "calendar",
      label: "Schedule Appointment",
      bgColor: "bg-indigo-500"
    },
    {
      id: 'report',
      icon: "file-document",
      label: "Health Reports",
      bgColor: "bg-green-500"
    }
  ];

  const AddSymptomModal = () => (
    <Portal
      // animationType="slide"
      // transparent={true}
      // visible={showAddSymptom}
      // onRequestClose={() => {
      //   setNewSymptom({ name: '', severity: '', notes: '' });
      //   setShowAddSymptom(false);
      // }}
    >
        <Dialog visible={showAddSymptom} onDismiss={() => setShowAddSymptom(false)}>
          <Dialog.Title>Add New Symptom</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
              placeholder="Enter symptom name"
              value={newSymptom.name}
              onChangeText={(text) => setNewSymptom({ ...newSymptom, name: text })}
            />
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
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-2 mb-4 h-20`}
              placeholder="Add any additional notes"
              multiline
              value={newSymptom.notes}
              onChangeText={(text) => setNewSymptom({ ...newSymptom, notes: text })}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowAddSymptom(false)}>Cancel</Button>
            <Button mode="contained" onPress={handleAddSymptom} disabled={!newSymptom.name || !newSymptom.severity}>
              Add Symptom
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
  );

  const VitalCard = ({ vital, onPress, isSelected }) => (
    <TouchableOpacity 
      onPress={() => onPress(vital.id)}
      style={tw`w-[48%] p-4 rounded-2xl bg-white shadow-sm mb-4
        ${vital.status === 'warning' ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'}
        ${isSelected ? 'border border-blue-200' : ''}`}
    >
      <View style={tw`flex-row justify-between items-start`}>
        <View style={tw`${vital.bgColor} w-12 h-12 rounded-full items-center justify-center mb-3`}>
          <MaterialCommunityIcons name={vital.icon} size={24} style={tw`${vital.iconColor}`} />
        </View>
        {vital.isCustom && (
          <TouchableOpacity 
            onPress={() => handleDeleteSymptom(vital.id)}
            style={tw`p-1`}
          >
            <MaterialCommunityIcons name="close" size={20} style={tw`text-gray-400`} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={tw`text-gray-600 text-sm mb-1`}>{vital.label}</Text>
      <View style={tw`flex-row items-baseline`}>
        <Text style={tw`text-xl font-bold text-gray-800`}>{vital.value}</Text>
        <Text style={tw`text-xs text-gray-500 ml-1`}>{vital.unit}</Text>
      </View>
      <Text style={tw`text-xs ${vital.status === 'normal' ? 'text-green-500' : 'text-red-500'}`}>
        {vital.status === 'normal' ? 'Normal' : 'Attention needed'}
      </Text>
      {vital.isCustom && vital.notes && (
        <Text style={tw`text-xs text-gray-500 mt-2`} numberOfLines={2}>
          Notes: {vital.notes}
        </Text>
      )}
    </TouchableOpacity>
  );
     const ActionButton = ({ action }) => (
      <TouchableOpacity style={tw`w-[48%] mb-4`}>
        <View style={tw`${action.bgColor} p-4 rounded-xl flex-row items-center`}>
          <MaterialCommunityIcons name={action.icon} size={24} color="white" />
          <Text style={tw`text-white font-medium ml-2 flex-1`}>{action.label}</Text>
        </View>
      </TouchableOpacity>
    );
  
    const TrendChart = ({ vital }) => (
      <View style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm`}>
        <Text style={tw`text-base font-bold text-gray-900 mb-2`}>{vital.label} Trend</Text>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              data: vital.trend
            }]
          }}
          width={width - 48}
          height={180}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: vital.id === 'sleep' ? 1 : 0,
            color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#3B82F6'
            }
          }}
          bezier
          style={tw`rounded-xl`}
        />
      </View>
  );
  
  

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <AddSymptomModal />
      <View style={[tw`flex-1`]}>
        {/* Fixed Header */}
        <View style={[tw`bg-white`, { paddingTop: insets.top }]}>
          <View style={tw`px-4 py-4 bg-white shadow-sm`}>
            <View style={tw`flex-row justify-between items-center`}>
              <View style={tw`flex-row items-center`}>
                <Avatar.Image 
                  size={50} 
                  source={{ uri: "https://via.placeholder.com/50" }}
                  style={tw`border-2 border-white mr-3`}
                />
                <View>
                  <Text style={tw`text-xl font-bold text-gray-900`}>Hi, Sarah Johnson!</Text>
                  <Text style={tw`text-gray-600`}>Welcome back</Text>
                </View>
              </View>
              <View style={tw`relative`}>
                <IconButton icon="bell-outline" size={24} style={tw`bg-gray-100 m-0`} />
                <Badge style={tw`absolute -top-2 -right-2 bg-red-500`}>3</Badge>
              </View>
            </View>

            {/* Smartwatch Status */}
            <View style={tw`flex-row items-center justify-between mt-4`}>
              <View style={tw`flex-row items-center`}>
                <MaterialCommunityIcons 
                  name="watch" 
                  size={24} 
                  style={tw`${isWatchConnected ? 'text-green-500' : 'text-gray-400'} mr-2`}
                />
                <Text style={tw`text-sm ${isWatchConnected ? 'text-green-500' : 'text-gray-500'}`}>
                  {isWatchConnected ? 'Smartwatch Connected' : 'Smartwatch Disconnected'}
                </Text>
              </View>
              {!isWatchConnected && (
                <Button 
                  mode="contained"
                  onPress={() => setIsWatchConnected(true)}
                  style={tw`bg-blue-500`}
                  labelStyle={tw`text-xs`}
                >
                  Connect Watch
                </Button>
              )}
            </View>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView 
          style={tw`flex-1`}
          contentContainerStyle={tw`pb-24`}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Content */}
          <View style={tw`p-4`}>
            {/* Health Vitals */}
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-lg font-bold text-gray-900`}>Health Vitals</Text>
              <Button 
                mode="contained"
                onPress={() => setShowAddSymptom(true)}
                style={tw`bg-blue-500`}
                labelStyle={tw`text-xs`}
              >
                Add Symptom
              </Button>
            </View>
            
            <View style={tw`flex-row flex-wrap justify-between`}>
              {allVitals.map((vital) => (
                <VitalCard 
                  key={vital.id} 
                  vital={vital}
                  onPress={setSelectedVital}
                  isSelected={selectedVital === vital.id}
                />
              ))}
            </View>

            {/* Selected Vital Trend */}
            {selectedVital && (
              <TrendChart vital={allVitals.find(v => v.id === selectedVital)} />
            )}

            {/* Quick Actions */}
            <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>Quick Actions</Text>
            <View style={tw`flex-row flex-wrap justify-between`}>
              {quickActions.map((action) => (
                <ActionButton key={action.id} action={action} />
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Fixed Bottom Navigation */}
        <View style={tw`bg-white border-t border-gray-100`}>
          <View style={tw`flex-row justify-around py-2`}>
            {[
              { icon: 'home', label: 'Home' },
              { icon: 'calendar', label: 'Schedule' },
              { icon: 'chat', label: 'Chat' },
              { icon: 'account', label: 'Profile' }
            ].map((item, index) => (
              <View key={item.icon} style={tw`items-center`}>
                <IconButton
                  icon={item.icon}
                  size={24}
                  style={tw`m-0`}
                  color={index === 0 ? '#3B82F6' : '#94A3B8'}
                />
                <Text style={tw`text-xs ${index === 0 ? 'text-blue-500' : 'text-gray-400'}`}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View> 
    </View>
  );
}