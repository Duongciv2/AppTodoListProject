import { View, Text ,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from './../../Utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function footer() {
  return (
      <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <View style={styles.btn}>
              
              <Ionicons name="add" size={30} color={Colors.WHITE}  />
              
            </View>
          </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    footer: {
        flex:1,
        marginTop: 'auto',
        paddingHorizontal: 16,
        alignItems:'center',
        justifyContent:'flex-end'
    },
      /** Button */
    btn: {
        width: 40,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        paddingVertical: 5,

        backgroundColor: Colors.PRIMARY
    },
});