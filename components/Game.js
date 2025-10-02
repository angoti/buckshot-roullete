import { View, StyleSheet, Image, Text, Alert } from "react-native";
import Botao from "./Botao";
import { useState, useEffect } from "react";
import GameData from "./GameData";
import { Audio } from "expo-av";

export default function Game({ nav }) {
	const [vidaDoJogador, setVidaDoJogador] = useState(3);
	const [vidaDoInimigo, setVidaInimigo] = useState(3);
	const [turnoDoJogador, setTurnoDoJogador] = useState(true);
	const [rodadaAtual, setRodadaAtual] = useState(0);
	const [balasVivas, setBalasVivas] = useState(0);
	const [escopeta, setEscopeta] = useState([0, 0, 0, 0, 0]);
	const [mostrarExplosao, setMostrarExplosao] = useState(false);

	useEffect(() => {
		setBalasVivas(GameData.getBalasVivas());
		setEscopeta(GameData.getEscopeta());
	}, []);

	useEffect(() => {
		if (vidaDoJogador == 0) {
			nav("perdeu");
		}
	}, [vidaDoJogador, nav]);

	const emitirSomTiro = async () => {
		try {
			// Mostrar explosão
			setMostrarExplosao(true);
			const { sound } = await Audio.Sound.createAsync(require("../assets/audio/tiro.mp3"));
			await sound.playAsync();
			// Esconder explosão após 500ms
			setTimeout(() => {
				setMostrarExplosao(false);
			}, 2500);
		} catch (error) {
			console.log("Erro ao reproduzir som:", error);
			setMostrarExplosao(false);
		}
	};

	// ações do jogo
	function atirarNoInimigo() {
		console.log("tiro");
		emitirSomTiro();
		if (escopeta[rodadaAtual] === 1) {
			setVidaInimigo(vidaDoInimigo - 1);
			console.log("É uma bala viva!");
		} else {
			console.log("É uma bala de festim.");
		}
		setTurnoDoJogador(false);
		setRodadaAtual(rodadaAtual + 1);
	}

	function atirarEmSiMesmo() {
		if (escopeta[rodadaAtual] === 1) {
			setVidaDoJogador(vidaDoJogador - 1);
			console.log("É uma bala viva...");
			setTurnoDoJogador(false);
		} else {
			console.log("É uma bala de festim!");
			setTurnoDoJogador(true);
		}
		setRodadaAtual(rodadaAtual + 1);
	}

	function inimigoAtirar() {
		if (escopeta[rodadaAtual] === 1) {
			setVidaDoJogador(vidaDoJogador - 1);
			console.log("Inimigo atirou com bala viva!");
		} else {
			console.log("Inimigo atirou com bala de festim.");
		}
		setTurnoDoJogador(true);
		setRodadaAtual(rodadaAtual + 1);
	}

	function inimigoAtirarEmSiMesmo() {
		if (escopeta[rodadaAtual] === 1) {
			setVidaInimigo(vidaDoInimigo - 1);
			console.log("Inimigo atirou com bala viva!");
		} else {
			console.log("Inimigo atirou com bala de festim.");
			setTurnoDoJogador(false);
		}
		setTurnoDoJogador(true);
		setRodadaAtual(rodadaAtual + 1);
	}

	useEffect(() => {
		if (!turnoDoJogador) {
			const timer = setTimeout(() => {
				inimigoAtirar();
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [turnoDoJogador]);

	function inimigoAtacar() {
		if (escopeta[rodadaAtual] === 1) {
			setVidaDoJogador(vidaDoJogador - 1);
			console.log("Inimigo atirou com bala viva!");
		} else {
			console.log("Inimigo atirou com bala de festim.");
		}
		setTurnoDoJogador(true);
		setRodadaAtual(rodadaAtual + 1);
	}

	//Alert.alert("O primeiro a jogar será decidido no cara ou coroa.");

	return (
		<View style={styles.main}>
			<View style={styles.enemySection}>
				<View style={styles.enemyDiv}>
					<Text style={styles.msgs}>Turno: {turnoDoJogador ? "Jogador" : "Inimigo"}</Text>
					<Text style={styles.msgs}>Rodada: {rodadaAtual + 1}</Text>
				</View>
				<View style={styles.enemyDiv1}>
					<Text style={styles.msgs}>Inimigo: {vidaDoInimigo}</Text>
					<Text style={styles.msgs}>Você: {vidaDoJogador}</Text>
				</View>
			</View>
			<View style={styles.gunSection}>
				{mostrarExplosao ? (
					<Image
						source={require("../assets/explosion-12681_128.gif")}
						style={styles.explosaoImagem}
					/>
				) : (
					<Image source={require("./asset/gun1.png")} style={styles.gun} />
				)}
			</View>

			<View style={styles.btns}>
				<Botao
					label="Atirar em si mesmo"
					onPress={() => atirarEmSiMesmo()}
					disabled={!turnoDoJogador}
				/>
				<Botao
					label="Atirar no inimigo"
					onPress={() => atirarNoInimigo()}
					disabled={!turnoDoJogador}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		backgroundColor: "black",
		width: "100%",
		height: "100%",
		justifyContent: "space-around",
	},
	msgs: {
		fontSize: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
		fontFamily: "monospace",
		marginHorizontal: 10,
		marginTop: 20,
	},
	enemySection: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
		alignContent: "center",
	},
	gunSection: {
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	},
	gun: {
		width: 300,
		height: 300,
		resizeMode: "contain",
		alignSelf: "center",
	},
	btns: {},
	explosaoContainer: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: [{ translateX: -25 }, { translateY: -25 }],
	},
	explosaoImagem: {
		width: 300,
		height: 300,
		resizeMode: "contain",
	},
});
