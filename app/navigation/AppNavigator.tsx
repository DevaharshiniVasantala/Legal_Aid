// AppNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FileGrievance from '../screens/FileGrievance';
import FindLawyer from '../screens/FindLawyer';
import HomeScreen from '../screens/HomeScreen';
import KnowYourRights from '../screens/KnowYourRights';
import LanguageSelection from '../screens/LanguageSelection';
import LoginScreen from '../screens/LoginScreen';
import UploadDocs from '../screens/UploadDocs';
import RegisterScreen from '../screens/RegisterScreen';

export type RootStackParamList = {
  LanguageSelection: undefined;
  LoginScreen: { language: string };
  RegisterScreen:{language:string};
  HomeScreen: { language: string };
  KnowYourRights: undefined;
  UploadDocs: undefined;
  FileGrievance: undefined;
  FindLawyer: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="KnowYourRights" component={KnowYourRights} />
      <Stack.Screen name="UploadDocs" component={UploadDocs} />
      <Stack.Screen name="FileGrievance" component={FileGrievance} />
      <Stack.Screen name="FindLawyer" component={FindLawyer} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
