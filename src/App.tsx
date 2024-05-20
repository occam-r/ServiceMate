import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/login';
import {ThemeProvider} from './theme/ThemeContext';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Admin from './screens/admin';
import Technician from './screens/technician';
import AddUser from './screens/admin/users/addUser';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
      setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {user ? (
              <Stack.Group>
                {user.providerData[0]?.providerId === 'password' ? (
                  <Stack.Group>
                    <Stack.Screen
                      name="Admin"
                      component={Admin}
                      options={{headerShown: false}}
                    />
                    <Stack.Screen
                      name="AddUser"
                      component={AddUser}
                      options={{title: 'Add User'}}
                    />
                  </Stack.Group>
                ) : (
                  <Stack.Group>
                    <Stack.Screen
                      name="Technician"
                      component={Technician}
                      options={{headerShown: false}}
                    />
                  </Stack.Group>
                )}
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{headerShown: false}}
                />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
