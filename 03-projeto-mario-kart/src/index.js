// Requer o módulo 'process' para acessar os argumentos passados na linha de comando
const { Console } = require('node:console');
const { argv } = require('node:process');

// Lista de jogadores
const players = [
  {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
    APELIDOS: ["supermario", "mariobros", "bigode", "mario", "marinho"],
  },
  {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
    APELIDOS: ["princesapeach", "peach", "peaches", "pessego", "peachy", "princesa"],
  },
  {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
    APELIDOS: ["yoshi", "yoshiro", "yosh", "yoshisaur", "yoshiro", "dino", "lagarto", "dinossauro"],
  },
  {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
    APELIDOS: ["bowser", "koopa", "tartaruga", "dragao", "rei", "king", "koopaking"],
  },
  {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
    APELIDOS: ["luigi", "greenmario", "bigodeverde", "irmao", "brother", "luigibros", "ceokiller"],
  }, {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
    APELIDOS: ["donkeykong", "dk", "macaco", "gorila", "kong"],
  }
];


const matches = {
  CURVA: {
    DESCRIPTION: "curva",
    PROPERTY: "MANOBRABILIDADE"
  },
  RETA: {
    DESCRIPTION: "reta",
    PROPERTY: "VELOCIDADE"
  },
  CONFRONTO: {
    DESCRIPTION: "confronto",
    PROPERTY: "PODER"
  }
}


// Função para normalizar, remover acentos e espaços de uma string
async function normalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s/g, '');
}

// Função para encontrar um jogador pelo apelido
// Levei uns 10 minutos para descobrir que o erro estava no return, 
// que estava retornando um array, e não um objeto como esperado
// O erro foi corrigido na própria função que agora retorna apenas 
// o primeiro (esperado que seja o único) objeto
async function findPlayerByNick(name) {
  result = players.filter(function (v, i) {
    return v.APELIDOS.find(
      (player) => player === name
    );
  })
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
};

// Variáveis para armazenar os jogadores escolhidos
let player1 = null;
let player2 = null;

// Função para escolher os jogadores
// A função acessa os argumentos passados na linha de comando e 
// busca os jogadores na propriedade apelidos nos objetos da lista de jogadores
// Antes de buscar, a função normaliza os argumentos para remover acentos 
// e espaços e converter para minúsculas
async function choosePlayers() {
  if (argv[2] !== undefined) {
    player1 = await findPlayerByNick(await normalize(argv[2]));
  }
  if (argv[3] !== undefined) {
    player2 = await findPlayerByNick(await normalize(argv[3]));

  }
  // Caso os nomes passados não tenham sido encontrados, os jogadores serão escolhidos aleatoriamente
  if (!player1) {
    console.log("Jogador 1 não encontrado ou inválido. Escolhendo aleatoriamente...");
    player1 = players[Math.floor(Math.random() * players.length)];
    console.log(`${player1.NOME} escolhido!`);
  }
  if (!player2) {
    console.log("Jogador 2 não encontrado ou inválido. Escolhendo aleatoriamente...");
    player2 = players[Math.floor(Math.random() * players.length)];
    console.log(`${player2.NOME} escolhido!`);
  }
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute
    }`
  );
}


async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    let bomb = Math.random() < 0.1; // 10% de chance de bomba
    let turbo = Math.random() < 0.1; // 10% de chance de turbo

    totalTestSkill1 = diceResult1 + character1[matches[block].PROPERTY];
    totalTestSkill2 = diceResult2 + character2[matches[block].PROPERTY];

    if (block === "CONFRONTO") {
      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
    }
    await logRollResult(
      character1.NOME,
      matches[block].DESCRIPTION,
      diceResult1,
      character1[matches[block].PROPERTY]
    );

    await logRollResult(
      character2.NOME,
      matches[block].DESCRIPTION,
      diceResult2,
      character2[matches[block].PROPERTY]
    );

    if (block === "CONFRONTO") {
      let lostPoints = 0;
      let shouldLosePoints = bomb ? 2 : 1;
      let shouldLosePointsPlural = bomb ? "s" : "";
      let plural = "";
      let winner = "";
      let text = "";
      let loser = "";
      let turboText = turbo ? " com turbo ⏩ e ganhou um ponto extra!" : "! ";
      let bombText = bomb ? "💣 BUUUM! Uma bomba estourou.\n" : "";
      if (totalTestSkill2 > totalTestSkill1 && totalTestSkill1 !== totalTestSkill2) {
        winner = character2.NOME;
        loser = character1.NOME;
        if (bomb && character1.PONTOS > 1) {
          lostPoints = 2;
          plural = "s";
        } else if (character1.PONTOS > 0) {
          lostPoints = 1;
          plural = "";
        }
        if (turbo) {
          character2.PONTOS++;
        }
        character1.PONTOS -= lostPoints;
      } else {
        winner = character1.NOME;
        loser = character2.NOME;
        if (bomb && character2.PONTOS > 1) {
          lostPoints = 2;
          plural = "s";
        } else if (character2.PONTOS > 0) {
          lostPoints = 1;
          plural = "";
        }
        if (turbo) {
          character1.PONTOS++;
        }
        character2.PONTOS -= lostPoints;
      }
      if (totalTestSkill1 === totalTestSkill2) {
        console.log("Confronto empatado! Nenhum ponto foi perdido");
      } else {
        if (shouldLosePoints === lostPoints) {
          text = `${loser} perdeu ${lostPoints} ponto${plural}`;
        } else {
          text = `\n${loser} deveria perder ${shouldLosePoints} ponto${shouldLosePointsPlural},`
          text += ` porém como tinha poucos perdeu ${lostPoints} ponto${plural}`;
        }
        console.log(
          `${bombText}${winner} venceu o confronto${turboText}${text}`
        );
      }
    }
    else {
      // verificando o vencedor
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${character1.NOME} marcou um ponto!`);
        character1.PONTOS++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${character2.NOME} marcou um ponto!`);
        character2.PONTOS++;
      }
    }
    console.log(`Pontuação atual: ${character1.NOME} ${character1.PONTOS} X ${character2.PONTOS} ${character2.NOME}`);
    console.log("-----------------------------");
  }
}


async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  else console.log("\nA corrida terminou em empate");
}

(async function main() {
  await choosePlayers();
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
