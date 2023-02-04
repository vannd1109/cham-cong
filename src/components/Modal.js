/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, StyleSheet, Button, View, Modal } from 'react-native';


export default function MyModal({children, modalVisible, setModalVisible, titleModal, onLogout}) {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>{titleModal}</Text>
            </View>
            {/* <View style={styles.modalBody}>
              <Text>Bạn có thực sự muốn đóng ứng dụng không?</Text>
            </View>
            <View style={styles.modalBtn}>
              <Button
                title="Hủy"
                color="#cf3030"
                onPress={() => setModalVisible(false)}
              />
              <Button
                title="Thoát"
                color="#8ab609"
                onPress={() => onLogout()}
              />
            </View> */}
            {children}
          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
    modal: {
      backgroundColor: '#f1f1f18c',
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      position: 'absolute',
      zIndex: 10,
      backgroundColor: '#fff',
      shadowColor: '#f4511e',
      shadowOffset: 1,
      borderColor: '#f4511e',
      borderWidth: 1,
      width: '60%',
      minHeight: 150,
      borderRadius: 14,
      overflow: 'hidden',
    },
    modalBody: {
      padding: 10,
    },
    modalBtn: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      gap: 8,
      justifyContent: 'flex-end',
    },
    modalHeader: {
      backgroundColor: '#f4511e',
      padding: 8,
    },
    modalHeaderText: {
      color: '#fff',
    },
  });
