import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, TambahNote, DetailNote, EditNote} from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="TambahNote" component={TambahNote} options={{ title: 'Tambah Note' }} />
      <Stack.Screen name="DetailNote" component={DetailNote} options={{ title: 'Detail Note' }} />
      <Stack.Screen name="EditNote" component={EditNote} options={{ title: 'Edit Note' }} />
    </Stack.Navigator>
  );
};

export default Router;
