import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Modal} from 'react-native';
import GooglePlacesAutocomplete from 'react-native-google-places-autocomplete'
import {FONT, COLORS, HEIGHT, WIDTH} from '../../Utils/constants'
import SearchModal from './searchModal';


export default function SearchBox(props) {
  const {chooseLocation} = props
  const [showSearchModal, setModal] = useState(false)
  const [searchVal, setSearch] = useState('')
  let inputRef = useRef()

  const openModal = () => {
    setModal(true)
   // setTimeout(() => {
      inputRef.blur()
   // }, 1000) 
  }

  const onSearch = (data) => {
    chooseLocation(data)
    setModal(false)
   
  }

  return (
   <>
    <SearchModal show={showSearchModal} close={() => setModal(false)} onSearch={(data) => onSearch(data)} />
    <View style={styles.inputContainer}>
      <TextInput 
        ref={ref => inputRef = ref}
       // value={searchVal}
        placeholder="Search for Destinations"
        placeholderTextColor={COLORS.GRAY}
        style={styles.searchInput}
        //onKeyPress={alert(2)}
        onFocus={openModal}
      />
      <Image resizeMode="contain" source={require('../../Assets/Home/search.png')} style={styles.icon} />
    </View>
   </>
  );
}

const styles = StyleSheet.create({


  iconContainer: {
    position: 'absolute',
    //padding: HEIGHT * 0.03,
   // backgroundColor: COLORS.WHITE,
    borderRadius: 100,
    right: 10,
   // top: 20
  },
  icon: {
    width: WIDTH * 0.065,
    height: HEIGHT * 0.027,
    marginTop: HEIGHT * 0.015,
    position: 'absolute',
    right: 15
  },
  inputContainer: {
    width: WIDTH * 0.90,
    marginHorizontal: '5%',
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  searchInput: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.MEDIUM,
    padding: HEIGHT * 0.015
  },
});