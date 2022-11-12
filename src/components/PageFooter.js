import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const PageFooter =() => {
    return(
        <View style={{flexDirection:"row", flex: 2}}> 
            <TouchableOpacity style={styles.butons} onPress={() => rerender()}>
                <Text style={styles.butonsText}> Apply </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butons} onPress={() => {setShowModal(true); clearModalFilters()}}>
                <Text style={styles.butonsText}> More Filters </Text>
            </TouchableOpacity>
        </View>
    )
}

export default PageFooter;