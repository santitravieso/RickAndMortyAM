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

    const cancelComment= (id) =>{
        setText('');
        setCommentModal(false);
        addComment('', id)
    }

    const insertComment = (id) =>{
        setCommentModal(false);
        addComment(text, id)
    }
    const closeModal = () =>{
        setCommentModal(false);
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
        <View style={styles.commentButtons}> 
         <TouchableOpacity onPress={() => {insertComment(characterIDComment)}}> 
            <Text style={styles.butonsText} >Save</Text> 
         </TouchableOpacity>
         <TouchableOpacity onPress={() => {cancelComment(characterIDComment)}}>
            <Text style={styles.butonsText} >Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {closeModal()}}>
            <Text style={styles.butonsText} >Close</Text>
        </TouchableOpacity>
        </View> 
        </View>
        </View>

    </Modal>
    )
}

export default CommentModalInput;

