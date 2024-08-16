import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ServerGate from "./../core/server/ServerGate"; 

const { width, height } = Dimensions.get("window");

const IndexScreen = () => {
  const [newsItems, setNewsItems] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverGate = ServerGate.instance;
        const response = await serverGate.getFromServer({
          url: "home/index", 
        });
        if (response.statusCode === 200) {
          // تأكد من أن البيانات موجودة في البنية المتوقعة
          if (
            response.data &&
            response.data.data &&
            response.data.data.section
          ) {
            setNewsItems(response.data.data.section); // ضبط البيانات حسب بنية الاستجابة
            console.log("Section Data:", response.data.data.section); // طباعة البيانات في وحدة التحكم
          } else {
            console.error("Data section not found in response:", response.data);
            setNewsItems([]); // تعيين مصفوفة فارغة في حال عدم وجود البيانات
          }
        } else {
          console.error("Failed to fetch data:", response.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <ScrollView
           horizontal={true}
           pagingEnabled={true}
           showsHorizontalScrollIndicator={false}
           onScroll={(event) => {
             const x = event.nativeEvent.contentOffset.x;
             const index = Math.floor(x / width);
             if (index !== activeIndex) {
               setActiveIndex(index);
             }
          }}
          scrollEventThrottle={16}
        >
          {newsItems && newsItems.length > 0 ? (
           newsItems.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title_en}</Text>
              </View>
            </View>
          ))
          ) : (
            <Text>No data available</Text> 
          )}
        </ScrollView>
        {/* Pagination Dots */}
        <View style={styles.dotContainer}>
          {newsItems.map((_, index) => (
            <TouchableOpacity key={index} onPress={() => setActiveIndex(index)}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: index === activeIndex ? "#cacaca" : "#fff",
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.newsContainer}>
        <Text style={styles.header}>احدث الاخبار</Text>
        {Array.isArray(newsItems) &&
          newsItems.map((item, index) => (
           
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.newsImage} />
              <Text style={styles.newsTitle}>{item.title_en}</Text>
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
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    width: width,
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width,
    height: '60%',
    resizeMode: 'cover',
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
    borderBottomLeftRadius: 25,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
  },
});


export default IndexScreen;
