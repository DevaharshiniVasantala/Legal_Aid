import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AppInfo from '../screens/AppInfo';
import DigitalLocker from '../screens/DigitalLocker';
import FileGrievance from '../screens/FileGrievance';
import FindLawyer from '../screens/FindLawyer';
import HomeScreen from '../screens/HomeScreen';
import KnowYourRights from '../screens/KnowYourRights';
import LanguageSelection from '../screens/LanguageSelection';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TrackGrievance from '../screens/TrackGrievance';
import UploadDocs from '../screens/UploadDocs';

export type RootStackParamList = {
  AppInfo: undefined;
  LanguageSelection: undefined;
  LoginScreen: { language: string };
  RegisterScreen: { language: string };
  HomeScreen: { language: string };
  KnowYourRights: undefined;
  UploadDocs: undefined;
  FileGrievance: undefined;
  FindLawyer: undefined;
  TrackGrievance: { language: string };
  DigitalLocker: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AppInfo" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppInfo" component={AppInfo} />
      <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="KnowYourRights" component={KnowYourRights} />
      <Stack.Screen name="UploadDocs" component={UploadDocs} />
      <Stack.Screen name="DigitalLocker" component={DigitalLocker} />
      <Stack.Screen name="FileGrievance" component={FileGrievance} />
      <Stack.Screen name="FindLawyer" component={FindLawyer} />
      <Stack.Screen name="TrackGrievance" component={TrackGrievance} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
