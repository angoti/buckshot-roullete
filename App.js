import { useState } from 'react';
import { Platform, Alert, BackHandler, View } from 'react-native';
import { styles } from './components/estilos';
import Inicio from './components/Inicio';
import Game from './components/Game';
import Loading from './components/Loading';
import Perdeu from './components/Perdeu';
import Ganhou from './components/Ganhou';

export default function App() {
  const [tela, setTela] = useState('inicio');

  const goTo = (nomeTela) => {
    console.log(2);
    setTela(nomeTela);
  };
  const sair = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      Alert.alert('Sair', 'Esta opção não está disponivel para iOS', [
        { text: 'OK' },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      {console.log(3, tela)}
      {tela === 'inicio' && <Inicio nav={goTo} sair={sair} />}
      {console.log(3.1, tela)}
      {tela === 'jogo' && <Game nav={goTo} />}
      {console.log(3.2, tela)}
      {tela === 'loading' && <Loading nav={goTo} />}
      {console.log(3.3, tela)}
      {tela === 'perdeu' && <Perdeu nav={goTo} />}
      {console.log(3.4, tela)}
      {tela === 'ganhou' && <Ganhou nav={goTo} />}
      {console.log(3.5, tela)}

    </View>
  );
}
