import React, { useState } from 'react';
import { Text, View, Image, Modal, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
//import { TouchableOpacity } from 'react-native-web';
import styles from '../styles/CommentModalInputStyles';


const CommentModalInput =({
    addComment,
    setCommentModal,
    commentModal,
    characterIDComment,

} ) => {

    const[text, setText] = useState('');

    const cancelComment= () =>{
        setText('');
        setCommentModal(false);
    }

    const insertComment = (id) =>{
        setCommentModal(false);
        addComment(text, id)
    }


    return(
    <Modal transparent={true} visible={commentModal} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalCard}>
        <View style={styles.textInputFilters}>
              <Text style={styles.filterTitle}>  </Text>
              <TextInput style={styles.filterTextInputStyle}
                placeholder= "Enter comment"
                placeholderTextColor= '#7FFF00'
                value={text}
                onChangeText={setText}
              />
          </View>
        <View> 
         <TouchableOpacity onPress={() => {insertComment(characterIDComment)}}> 
            <Text style={styles.butonsText} >Save Comment</Text> 
         </TouchableOpacity>
         <TouchableOpacity onPress={() => {cancelComment()}}>
            <Text style={styles.butonsText} >Cancel</Text>
        </TouchableOpacity>
        </View> 
        </View>
        </View>

    </Modal>
    )
}

export default CommentModalInput;

