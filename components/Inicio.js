import { View, Text } from 'react-native';
import Botao from './Botao';
import { styles } from './estilos';

const inicio = ({ nav, sair }) => (
  <View style={styles.main}>
    <View style={styles.main1}>
      <Text style={styles.titulo}>Buckshot Roulette</Text>
      <Text style={styles.titulo}>Mobile</Text>
    </View>

    <View style={styles.main2}>
      <Botao
        label="Jogar"
        onPress={() => {
          console.log(1);
          nav('loading');
        }}
      />
      <Botao label="Sair" onPress={sair} />
    </View>
  </View>
);

export default inicio;
