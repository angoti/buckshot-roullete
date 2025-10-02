import { View, Image,Text, StyleSheet } from 'react-native';
import Botao from './Botao';

const Ganhou = ({ nav }) => (
  <View style={styles.msg}>
    <Image source={require('./asset/cat-laughing.png')} />
    <Text></Text> 
    <Botao label="Reiniciar" onPress={() => nav('inicio')} />
  </View>
);

const styles = StyleSheet.create({
  msg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
});

export default Ganhou;
