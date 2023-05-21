import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  Platform
} from 'react-native';
import '@azure/core-asynciterator-polyfill';
import { DataStore } from '@aws-amplify/datastore';
import { MEMBER } from './models';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

function SignOutButton() {
    const { signOut } = useAuthenticator();
    return <Pressable onPress={signOut} style={styles.headerLogout}>
                <Text style={styles.buttonText}>로그아웃</Text>
           </Pressable>
  }

const Header = () => (
    <>
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>My Member List</Text>
    <SignOutButton />
  </View>
  
  </>
);



const AddMEMBERModal = ({ modalVisible, setModalVisible }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [feature, setFeature] = useState('');

  async function addMEMBER() {
    await DataStore.save(
        new MEMBER({
           name,
           address,
           sex,
           age,
           feature,
        })
    );
    setModalVisible(false);
    setName('');
    setAddress('');
    setSex('');
    setAge('');
    setFeature('');
  }

  function closeModal() {
    setModalVisible(false);
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={closeModal}
      transparent
      visible={modalVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <Pressable onPress={closeModal} style={styles.modalDismissButton}>
            <Text style={styles.modalDismissText}>X</Text>
          </Pressable>
          <TextInput
            onChangeText={setName}
            placeholder="이름"
            style={styles.modalInput}
          />
          <TextInput
            onChangeText={setAddress}
            placeholder="주소"
            style={styles.modalInput}
          />
          <TextInput
            onChangeText={setSex}
            placeholder="성별"
            style={styles.modalInput}
          />
          <TextInput
            onChangeText={setAge}
            placeholder="나이"
            style={styles.modalInput}
          />
          <TextInput
            onChangeText={setFeature}
            placeholder="특이사항"
            style={styles.modalInput}
          />
          <Pressable onPress={addMEMBER} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Save MEMBER</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const MEMBERList = () => {
  const [MEMBERs, setMEMBERs] = useState([]);

  useEffect(() => {

    const subscription = DataStore.observeQuery(MEMBER).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;
      setMEMBERs(items);
    });

    //unsubscribe to data updates when component is destroyed so that we don’t introduce a memory leak.
    return function cleanup() {
      subscription.unsubscribe();
    }

  }, []);

  async function deleteMEMBER(MEMBER) {
    try {
      await DataStore.delete(MEMBER);
    } catch (e) {
      console.log(`Delete failed: ${e}`);
    }
  }

  const MEMBERItem = ({ item }) => (
    <Pressable
      onLongPress={() => {
        deleteMEMBER(item);
      }}
      onPress={() => {
        //////////////////////////////// ROUTING
      }}
      style={styles.MEMBERContainer}
    >
      <Text>
        <Text style={styles.MEMBERHeading}>{item.name}</Text>
        {`\n${item.feature}`}
      </Text>
    </Pressable>
  );

  return (
    <FlatList
      data={MEMBERs}
      keyExtractor={({ id }) => id}
      renderItem={MEMBERItem}
    />
  );
};

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Header />
      <MEMBERList />
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={[styles.buttonContainer, styles.floatingButton]}
      >
        <Text style={styles.buttonText}>+ Add MEMBER</Text>
      </Pressable>
      <AddMEMBERModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}; 

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#4696ec',
    paddingTop: Platform.OS === 'ios' ? 44 : null,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 16,
    textAlign: 'center',
  },
  headerLogout: {
    alignItems:'center'
  },
  MEMBERContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 2,
    elevation: 4,
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 8,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  MEMBERHeading: {
    fontSize: 20,
    fontWeight: '600',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    padding: 16,
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#4696ec',
    borderRadius: 99,
    paddingHorizontal: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 44,
    elevation: 6,
    shadowOffset: {
      height: 4,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalInnerContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    padding: 16,
  },
  modalInput: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  modalDismissButton: {
    marginLeft: 'auto',
  },
  modalDismissText: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default Home;