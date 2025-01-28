
Desafio de projeto do Felipão: Mario Kart.JS
============================================

![Mario Kart](./docs/header.gif)

**Alterações da Lumen no final do arquivo**

**Objetivo:**

Mario Kart é uma série de jogos de corrida desenvolvida e publicada pela Nintendo. Nosso desafio será criar uma lógica de um jogo de vídeo game para simular corridas de Mario Kart, levando em consideração as regras e mecânicas abaixo.

Players
-------

|Mario  | Peach | Yoshi | 
|--|--|--|
| ![Mario Kart](./docs/mario.gif) | ![Mario Kart](./docs/peach.gif)  | ![Mario Kart](./docs/yoshi.gif) |
| Velocidade: 4 | Velocidade: 3 | Velocidade: 2 |
| Manobrabilidade: 3 | Manobrabilidade: 4 | Manobrabilidade: 4 |
| Poder: 3 |Poder: 2  | Poder: 3 |


| Bowser | Luigi | Donkey Kong |
|--|--|--|
| ![Mario Kart](./docs/bowser.gif) | ![Mario Kart](./docs/luigi.gif) | ![Mario Kart](./docs/dk.gif) |
| Velocidade: 5 | Velocidade: 3  | Velocidade: 2  |
| Manobrabilidade: 2 | Manobrabilidade: 4 | Manobrabilidade: 2  | 
| Poder: 5 | Poder: 4 | Poder: 5 | 


### 🕹️ Regras & mecânicas:

**Jogadores:**  O Computador deve receber dois personagens para disputar a corrida em um objeto cada **Pistas:**

*    Os personagens irão correr em uma pista aleatória de 5 rodadas
*    A cada rodada, será sorteado um bloco da pista que pode ser uma reta, curva ou confronto
*    Caso o bloco da pista seja uma RETA, o jogador deve jogar um dado de 6 lados e somar o atributo VELOCIDADE, quem vencer ganha um ponto
*    Caso o bloco da pista seja uma CURVA, o jogador deve jogar um dado de 6 lados e somar o atributo MANOBRABILIDADE, quem vencer ganha um ponto
*    Caso o bloco da pista seja um CONFRONTO, o jogador deve jogar um dado de 6 lados e somar o atributo PODER, quem perder, perde um ponto
*    Nenhum jogador pode ter pontuação negativa (valores abaixo de 0)

**Condição de vitória:**  Ao final, vence quem acumulou mais pontos

### Alterações da Lumen

1. Foram incluídos os dados de todos os 6 jogadores seguindo o mesmo formato do Felipe.
2. Foi criada a possibilidade de selecionar os jogadores a partir da linha de comando. Os nomes permitem variações, acentos ou apelidos. Ex. Donkey Kong pode ser DK, Gorila ou apenas Kong. Maiúsculas e acentos são indiferentes.
3. Caso um ou ambos os jogadores não sejam selecionados, o sistema escolhe um aleatoriamente.
4. A game engine foi simplificada, removendo o código repetido entre os 3 tipos de corrida
5. Foram ajustadas as mensagens no console, principalmente para os confrontos, apresentando um texto mais claro e consistente, con ênfase nas razões por que não foram descontados certos pontos.
6. Foram incluídas as funcionalidades extras de bomba (que tira dois pontos do perdedor) e turbo (que aumenta um ponto ao vencedor.) Por arbitragem desta desenvolvedora, ambos com 10% de chance de ocorrer.
7. Conversão de funções assíncronas desnecessárias para síncronas (rollDice, normalize, getRandomBlock, logRollResult e declareWinner) - Na prática, creio que todas as funções poderiam ser síncronas. //TODO: testar essa teoria.
8. Separação da lógica de confronto em uma função específica (handleConfrontation)
9. Melhora das funções utilitárias (menores e mais reutilizáveis)
10. Separação da lógica de cada rodada em uma função própria (playRound) [Sim, sou péssima em nomes de funções]
11. Utilização arrow functions onde apropriado (ainda não entendi direito, mas tá funcionando)
12. Simplificação de condicionais usando operadores ternários onde apropriado
