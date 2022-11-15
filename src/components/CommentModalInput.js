import React, { useState } from 'react';
import { Text, View, Image, Modal, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
//import { TouchableOpacity } from 'react-native-web';
import styles from '../styles/FiltersModalStyles';


const CommentModalInput =({
    addComment,
    setCommentModal,
    commentModal,

} ) => {

    const[text, setText] = useState('');

    const cancelComment= () =>{
        setText('');
        setCommentModal(false);
    }

    const insertComment = () =>{
        setCommentModal(false);
        addComment(text)
        console.log(text);
    }


    return(
    <Modal transparent={true} visible={commentModal} animationType="slide">
        <View style={styles.textInputFilters}>
              <Text style={styles.filterTitle}> Comment:  </Text>
              <TextInput style={styles.filterTextInputStyle}
                placeholder= "Enter comment"
                placeholderTextColor= '#7FFF00'
                value={text}
                onChangeText={setText}
              />
          </View>
        <View> 
         <TouchableOpacity onPress={() => {insertComment()}}> 
            <Text style={styles2.butonsText} >Save Comment</Text> 
         </TouchableOpacity>
         <TouchableOpacity onPress={() => {cancelComment()}}>
            <Text style={styles2.butonsText} >Cancel</Text>
        </TouchableOpacity>
        </View> 

    </Modal>
    )
}

export default CommentModalInput;

const styles2 = StyleSheet.create({
    butons: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 2,
      paddingHorizontal: 3,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
      marginHorizontal: 3,
      marginBottom:15,
    },
    butonsText: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: '#7FFF00',
      alignContent: 'center',
    }
  });