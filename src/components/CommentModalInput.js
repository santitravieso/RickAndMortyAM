import React, { useState } from 'react';
import { Text, View, Modal, TextInput, TouchableOpacity} from 'react-native';
import styles from '../styles/CommentModalInputStyles';
import { setCharacterComment } from '../store/Reducers';
import { useDispatch, useSelector } from 'react-redux';

const CommentModalInput =({
    addComment,
    setCommentModal,
    commentModal,
    characterIDComment,

} ) => {
    const {}  = useSelector(state => state.application);
    const dispatch = useDispatch();
    const[text, setText] = useState('');

    const cancelComment= (id) =>{
        setText('');
        setCommentModal(false);
        addComment('', id)
    }

    const insertComment = (id) =>{
        setCommentModal(false);
        addComment(text, id)
        dispatch(setCharacterComment(text))
        setText('');
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

