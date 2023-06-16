import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react-native';
import awsExports from './src/aws-exports';
import Home from './src/Home';
import Profile from './src/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';

const Stack = createStackNavigator();
Amplify.configure(awsExports);

function App() {
  useEffect(() => {
    // 앱 컴포넌트가 마운트되었을 때 알림 권한 확인
    checkNotificationPermissions();

    // 컴포넌트가 언마운트되었을 때 알림 권한 확인을 중지합니다.
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const checkNotificationPermissions = async () => {
    try {
      const permissions = await Notifications.getPermissionsAsync();

      if (!permissions.granted) {
        // 알림 권한이 허용되지 않은 경우에만 권한을 요청합니다.
        const newPermissions = await Notifications.requestPermissionsAsync();
        
        if (newPermissions.granted) {
          console.log('알림 권한이 허용되었습니다.');
        } else {
          console.log('알림 권한이 거부되었습니다.');
        }
      } else {
        // 1분마다 푸시 알림 스케줄링
        schedulePushNotifications();
      }
    } catch (error) {
      console.log('알림 권한 확인 오류:', error);
    }
  };

  const schedulePushNotifications = async () => {
    try {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });

      // 1분마다 푸시 알림 스케줄링
      Notifications.scheduleNotificationAsync({
        content: {
          title: '1분 경과',
          body: '1분이 지났습니다.',
        },
        trigger: {
          seconds: 60, // 1분을 초 단위로 설정
          repeats: true, // 반복 여부 설정
        },
      });
    } catch (error) {
      console.log('푸시 알림 스케줄링 오류:', error);
    }
  };

  return (
    <Authenticator.Provider>
      <Authenticator>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
