import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react-native';
import awsExports from './src/aws-exports';
import Home from './src/Home';
import Profile from './src/Profile';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Home"
              component={Home}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Authenticator>
    </Authenticator.Provider>

  );
}

export default App;