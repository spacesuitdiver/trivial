import React from 'react';
import { View, ScrollView, TouchableHighlight, Text, Image, Dimensions, } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const CategoriesScreen = ({ categories, navigation }) => (
  <View style={{ 
    flex: 1,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    padding: 200
  }}>
    <View>
      <Text style={{
          fontSize: 60,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 40,
        }}
      >Categories</Text>
    </View>
    <View style={{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'black',
      }}
    >
      {categories.map((category, index) => (
        <TouchableHighlight
          style={{ 
            width: (deviceWidth / 3) - 20 - 200,
            height: ((deviceWidth / 3) - 20 - 200) * 0.5625,
          }} 
          key={category.id}
          onPress={() => navigation.navigate('Category', { category })}
        >
          <View
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <Image
              source={{ uri: category.thumbnail }}
              style={{
                width: (deviceWidth / 4) - 20,
                height: ((deviceWidth / 4) - 20) * 0.5625,
                backgroundColor: '#4F4F51',
              }}
            />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} 
              style={{
                position: 'absolute',
                bottom: -1,
                width: (deviceWidth / 4) - 20,
                height: (((deviceWidth / 4) - 20) * 0.5625) * 0.28,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Text style={{
                backgroundColor: 'transparent',
                color: 'white', 
                padding: 20, 
                position: 'absolute',
                fontSize: 20,
                fontWeight: '600',
              }}>
                {category.name}
              </Text>            
            </LinearGradient>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  </View>
);

const mapStateToProps = state => ({
  categories: state.category.default,
});

export default connect(mapStateToProps)(CategoriesScreen);