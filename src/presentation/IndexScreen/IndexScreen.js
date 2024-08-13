import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
const {width, height} = Dimensions.get('window');

// export default IndexScreen;
export default IndexScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const newsItems = [
    {
      id: 1,
      title: "انباء عن انطلاق البطوله الدوليه والتي سيشارك ......",
      image: 'https://brave-hopper-618122.netlify.app/assets/images/unnamed.jpg',
    },
    {
      id: 2,
      title: "انباء عن انطلاق البطوله الدوليه والتي سيشارك ......",
      image: 'https://brave-hopper-618122.netlify.app/assets/images/unnamed.jpg',
    },
  ];
 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const x = event.nativeEvent.contentOffset.x;
            const index = Math.floor(x / (width - 60));
            if (index !== activeIndex) {
              setActiveIndex(index);
            }
          }}
          scrollEventThrottle={16}
        >
          {newsItems.map((newsItems, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image source={{uri: newsItems.image}} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{newsItems.title}</Text>
                {/* <Text style={styles.content}>{newsItems.content}</Text> */}
              </View>
            </View>
          ))}
        </ScrollView>
        {/* Pagination Dots */}
        <View style={styles.dotContainer}>
          {newsItems.map((_, index) => (
            <TouchableOpacity key={index} onPress={() => setActiveIndex(index)}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: index === activeIndex ? '#cacaca' : '#fff' },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.newsContainer}>
        <Text style={styles.header}>احدث الاخبار</Text>
        {newsItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <Text style={styles.newsTitle}>{item.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    width: width ,
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 30,
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
    // borderRadius: 10,
  },
  textContainer: {
    width: '90%',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    textAlign: 'center',
  },
  newsContainer: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  newsTitle: {
    padding: 16,
    fontSize: 18,
    textAlign: 'right',
    color: '#333',
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    width: 140,
    bottom: 12.5,
    paddingVertical: 11,
    paddingHorizontal: 18,
    backgroundColor: '#6e262c',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius:25,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
  },
});
