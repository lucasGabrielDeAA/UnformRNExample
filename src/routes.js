import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './pages/Home';
import Submit from './pages/Submit';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Submit" component={Submit} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
