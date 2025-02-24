import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc'; // Import twrnc for Tailwind styling
import { Avatar, IconButton, Badge } from "react-native-paper";

const DoctorDashboard = () => {
  const doctor = {
    name: 'Dr. Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  };

  const checkupRequests = [
    { id: 1, name: 'John Doe', reason: 'Annual Check-up', date: '2023-05-15', time: '10:00 AM', status: 'Pending' },
    { id: 2, name: 'Jane Smith', reason: 'Fever', date: '2023-05-16', time: '11:30 AM', status: 'In Progress' },
  ];

  const aiInsights = [
    { id: 1, patientName: 'Mike Johnson', risk: 'High', vitals: 'Abnormal Heart Rate', status: 'Critical' },
    { id: 2, patientName: 'Emily Brown', risk: 'Moderate', vitals: 'Elevated Blood Pressure', status: 'Moderate' },
  ];

  const assignedPatients = [
    { id: 1, name: 'Alice Williams', lastCheckup: '2023-05-01' },
    { id: 2, name: 'Bob Taylor', lastCheckup: '2023-05-05' },
    { id: 3, name: 'Carol Martinez', lastCheckup: '2023-05-10' },
  ];

  const renderCheckupRequest = (request) => (
    <View key={request.id} style={tw`bg-white rounded-lg p-4 mb-4 shadow-sm border-l-4 ${request.status === 'Pending' ? 'border-yellow-500' : 'border-blue-500'}`}>
      <View style={tw`flex-row items-center mb-2`}>
        <Image source={{ uri: `https://randomuser.me/api/portraits/men/${request.id}.jpg` }} style={tw`w-12 h-12 rounded-full mr-4`} />
        <View>
          <Text style={tw`font-bold text-lg text-gray-900`}>{request.name}</Text>
          <Text style={tw`text-gray-600`}>{request.reason}</Text>
        </View>
      </View>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <Text style={tw`text-gray-500`}>{`${request.date} at ${request.time}`}</Text>
        <Text style={tw`text-sm font-semibold ${request.status === 'Pending' ? 'text-yellow-600' : 'text-blue-600'}`}>{request.status}</Text>
      </View>
      <TouchableOpacity style={tw`bg-blue-500 rounded py-2 items-center`}>
        <Text style={tw`text-white font-semibold`}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-white px-4 py-4 shadow-sm flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center p-3`}>
          <Avatar.Image size={50} source={{ uri: doctor.avatar }} style={tw`mr-1 border-2 border-white mr-3`} />
          <View>
            <Text style={tw`text-xl font-bold text-gray-900`}>Hi, {doctor.name}!</Text>
            <Text style={tw`text-gray-600`}>Welcome back</Text>
          </View>
        </View>
        <View style={tw`relative`}>
          <IconButton icon="bell-outline" size={24} style={tw`bg-gray-100 m-0`} />
          <Badge style={tw`absolute -top-2 -right-2 bg-red-500`}>3</Badge>
        </View>
      </View>

      <ScrollView style={tw`flex-1 p-4`} contentContainerStyle={tw`pb-24`} showsVerticalScrollIndicator={false}>
        {/* Check-up Requests Section */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>Check-up Requests</Text>
          {checkupRequests.map(renderCheckupRequest)}
        </View>

        {/* AI Insights Section */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>AI Insights & Alerts</Text>
          {aiInsights.map((insight) => (
            <View key={insight.id} style={tw`bg-white rounded-lg p-4 mb-4 shadow-sm border-l-4 ${insight.status === 'Critical' ? 'border-red-500' : 'border-yellow-500'}`}>
              <Text style={tw`font-bold text-lg text-gray-900`}>{insight.patientName}</Text>
              <Text style={tw`text-gray-600`}>{`Risk: ${insight.risk}`}</Text>
              <Text style={tw`text-gray-600`}>{insight.vitals}</Text>
              <Text style={tw`font-semibold ${insight.status === 'Critical' ? 'text-red-500' : 'text-yellow-500'}`}>{insight.status}</Text>
            </View>
          ))}
        </View>

        {/* Assigned Patients Section */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>Assigned Patients</Text>
          {assignedPatients.map((patient) => (
            <View key={patient.id} style={tw`bg-white rounded-lg p-4 mb-4 shadow-sm`}>
              <View style={tw`flex-row items-center mb-2`}>
                <Image source={{ uri: `https://randomuser.me/api/portraits/women/${patient.id}.jpg` }} style={tw`w-12 h-12 rounded-full mr-4`} />
                <View>
                  <Text style={tw`font-bold text-lg text-gray-900`}>{patient.name}</Text>
                  <Text style={tw`text-gray-600`}>{`Last Check-up: ${patient.lastCheckup}`}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={tw`bg-white border-t border-gray-100`}>
        <View style={tw`flex-row justify-around py-2`}>
          {[{ icon: 'home', label: 'Home' }, { icon: 'clipboard-list', label: 'Check-ups' }, { icon: 'magnify', label: 'AI Insights' }, { icon: 'chat', label: 'Chat' }, { icon: 'account', label: 'Profile' }].map((item, index) => (
            <View key={item.icon} style={tw`items-center`}>
              <IconButton icon={item.icon} size={24} style={tw`m-0`} color={index === 0 ? '#3B82F6' : '#94A3B8'} />
              <Text style={tw`text-xs ${index === 0 ? 'text-blue-500' : 'text-gray-400'}`}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default DoctorDashboard;
