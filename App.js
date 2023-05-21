import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react-native';
import awsExports from './src/aws-exports';
import Home from './src/Home';
Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <Home />
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;