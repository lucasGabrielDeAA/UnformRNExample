import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './pages/Home';
import Submit from './pages/Submit';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import Chat from './pages/Chat';

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
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}
