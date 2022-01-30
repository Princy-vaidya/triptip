import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import { WIDTH, HEIGHT, COLORS, FONT, PLACE_TYPE } from '../../Utils/constants';
import PlaceItemCard from '../../Components/Home/placeItemCard';

export default function ListView({places, markPlace, render, type}) {
  let flatListRef = useRef()
  useEffect(() => {
    console.log("place", type);
    
    flatListRef.scrollToOffset({ animated: true, offset: 0 });
  }, [places])

  const RenderNoPlace = () => {
    return(
      <View style={styles.emptyCard}>
        <Text style={styles.emptyText}>No place found here !</Text>
      </View>
    )
  }

  return (
      <FlatList
        ref={(ref) => flatListRef = ref}
        style={styles.container}
        keyExtractor={(item) => type === PLACE_TYPE.RESTAURANT ? item.xid : item.place_id}
        data={places}
        extraData={render}
        renderItem={({item, i}) => <PlaceItemCard key={i} type={type} place={item} markPlace={(id) => markPlace(id)}/>}
        ListEmptyComponent={<RenderNoPlace />}
      />
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT- HEIGHT * 0.01,
    backgroundColor: 'transparent',
    zIndex: 1,
    paddingHorizontal: WIDTH * 0.04,
   // paddingBottom: 50
  },
  emptyCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    height: HEIGHT * 0.4,
    marginTop: HEIGHT * 0.15,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5.84,
    borderRadius: 10
  },
  emptyText: {
    fontSize: FONT.SIZE.LARGE,
    fontFamily: FONT.FAMILY.BOLD
  }
})