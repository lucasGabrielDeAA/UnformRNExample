import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Submit from './pages/Submit';
import CreatePost from './pages/CreatePost';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Submit">
      <Stack.Screen name="Submit" component={Submit} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
}
