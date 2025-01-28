
Desafio de projeto do Felipão: Mario Kart.JS
============================================

![Mario Kart](./docs/header.gif)

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
