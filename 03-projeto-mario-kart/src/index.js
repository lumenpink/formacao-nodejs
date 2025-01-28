const { argv } = require('node:process');

// Lista de jogadores com suas características
const players = [
  { NOME: "Mario", VELOCIDADE: 4, MANOBRABILIDADE: 3, PODER: 3, PONTOS: 0, APELIDOS: ["supermario", "mariobros", "bigode", "mario", "marinho"] },
  { NOME: "Peach", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 2, PONTOS: 0, APELIDOS: ["princesapeach", "peach", "peaches", "pessego", "peachy", "princesa"] },
  { NOME: "Yoshi", VELOCIDADE: 2, MANOBRABILIDADE: 4, PODER: 3, PONTOS: 0, APELIDOS: ["yoshi", "yoshiro", "yosh", "yoshisaur", "yoshiro", "dino", "lagarto", "dinossauro"] },
  { NOME: "Bowser", VELOCIDADE: 5, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0, APELIDOS: ["bowser", "koopa", "tartaruga", "dragao", "rei", "king", "koopaking"] },
  { NOME: "Luigi", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 4, PONTOS: 0, APELIDOS: ["luigi", "greenmario", "bigodeverde", "irmao", "brother", "luigibros", "ceokiller"] },
  { NOME: "Donkey Kong", VELOCIDADE: 2, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0, APELIDOS: ["donkeykong", "dk", "macaco", "gorila", "kong"] }
];

// Tipos de blocos
const BLOCKS = {
  RETA: { description: "reta", property: "VELOCIDADE" },
  CURVA: { description: "curva", property: "MANOBRABILIDADE" },
  CONFRONTO: { description: "confronto", property: "PODER" }
};

// Funções utilitárias

// Remove acentos e espaços de uma string e passa para minúsculas
const normalize = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s/g, '');

// Funções do jogo

// Função para rolar um dado de 6 lados
const rollDice = () => Math.floor(Math.random() * 6) + 1;
// Função para escolher um bloco aleatório
const getRandomBlock = () => Object.keys(BLOCKS)[Math.floor(Math.random() * 3)];
// Função que retorna true ou false com base em uma probabilidade
const hasChance = (probability) => Math.random() < probability;

// Encontra jogador pelo apelido
const findPlayerByNick = (name) => {
  const player = players.find(p => p.APELIDOS.includes(name));
  return player || null;
};

// Escolhe jogadores (aleatório se não encontrado)
const choosePlayers = async () => {
  const selectPlayer = async (index) => {
    if (!argv[index]) return null;
    const player = await findPlayerByNick(await normalize(argv[index]));
    if (!player) {
      console.log(`Jogador ${index - 1} não encontrado ou inválido. Escolhendo aleatoriamente...`);
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      console.log(`${randomPlayer.NOME} escolhido!`);
      return randomPlayer;
    }
    return player;
  };

  return {
    player1: await selectPlayer(2),
    player2: await selectPlayer(3)
  };
};

const logRollResult = (characterName, block, diceResult, attribute) => {
  console.log(
    `${characterName} 🎲 rolou um dado de ${BLOCKS[block].description} ${diceResult} + ${attribute} = ${diceResult + attribute}`
  );
};

const handleConfrontation = (winner, loser, bomb, turbo) => {
  let lostPoints = 0;
  const shouldLosePoints = bomb ? 2 : 1;

  if (bomb && loser.PONTOS > 1) {
    lostPoints = 2;
  } else if (loser.PONTOS > 0) {
    lostPoints = 1;
  }

  if (turbo) {
    winner.PONTOS++;
  }
  loser.PONTOS -= lostPoints;

  const bombText = bomb ? "💣 BUUUM! Uma bomba estourou.\n" : "";
  const turboText = turbo ? " com turbo ⏩ e ganhou um ponto extra!" : "! ";
  const pointText = shouldLosePoints === lostPoints
    ? `${loser.NOME} perdeu ${lostPoints} ponto${lostPoints > 1 ? 's' : ''}`
    : `\n${loser.NOME} deveria perder ${shouldLosePoints} ponto${shouldLosePoints === 1 ? 's' : ''}, porém como tinha poucos perdeu ${lostPoints} ponto${lostPoints === 1 ? 's' : ''}`;

  console.log(`${bombText}${winner.NOME} venceu o confronto${turboText}${pointText}`);
};

const playRound = async (character1, character2, round) => {
  console.log(`🏁 Rodada ${round}`);
  const block = getRandomBlock();
  console.log(`Bloco: ${block}`);

  const diceResult1 = await rollDice();
  const diceResult2 = await rollDice();
  const totalSkill1 = diceResult1 + character1[BLOCKS[block].property];
  const totalSkill2 = diceResult2 + character2[BLOCKS[block].property];

  const bomb = hasChance(0.1);
  const turbo = hasChance(0.1);

  if (block === "CONFRONTO") {
    console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
  }

  logRollResult(character1.NOME, block, diceResult1, character1[BLOCKS[block].property]);
  logRollResult(character2.NOME, block, diceResult2, character2[BLOCKS[block].property]);

  if (block === "CONFRONTO") {
    if (totalSkill1 === totalSkill2) {
      console.log("Confronto empatado! Nenhum ponto foi perdido");
    } else {
      handleConfrontation(
        totalSkill1 > totalSkill2 ? character1 : character2,
        totalSkill1 > totalSkill2 ? character2 : character1,
        bomb,
        turbo
      );
    }
  } else {
    if (totalSkill1 > totalSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalSkill2 > totalSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }
  }

  console.log(`Pontuação atual: ${character1.NOME} ${character1.PONTOS} X ${character2.PONTOS} ${character2.NOME}`);
  console.log("-----------------------------");
};

const declareWinner = (character1, character2) => {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  } else {
    console.log("\nA corrida terminou em empate");
  }
};

const playRaceEngine = async (character1, character2) => {
  for (let round = 1; round <= 5; round++) {
    await playRound(character1, character2, round);
  }
};

(async function main() {
  const { player1, player2 } = await choosePlayers();
  console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

  await playRaceEngine(player1, player2);
  declareWinner(player1, player2);
})();