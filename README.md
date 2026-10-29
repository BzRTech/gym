# Checkpoint App — protótipo

Protótipo do app da **Checkpoint – Centro de Treinamento Físico**: agendamento de aulas de **CrossFit** e **Hyrox** + check-in social no estilo GymRats (feed com fotos, grupos, desafio e ranking).

Cada aula tem uma modalidade (CrossFit ou Hyrox) e um foco: WOD, WOD express, LPO, Ginástica, Iniciantes, Open Box, WOD em dupla, Corrida + estações, Estações, Endurance e Simulado Hyrox.

É HTML/CSS/JS puro, sem build e sem backend. Os dados são fictícios ([js/data.js](js/data.js)) e o que você faz fica salvo no `localStorage` do navegador.

## Como rodar

```bash
python -m http.server 5173
```

Abra http://localhost:5173. No computador o app aparece dentro de uma moldura de celular; no celular ocupa a tela toda.

Ou com Node (o mesmo servidor usado no deploy):

```bash
npm start
```

## Deploy no Render

**Opção recomendada: Static Site** (grátis e não hiberna)

| Campo | Valor |
| --- | --- |
| Branch | `main` |
| Root Directory | (vazio) |
| Build Command | (vazio) |
| Publish Directory | `.` |

**Opção Web Service** (usa o `server.js`, sem dependências)

| Campo | Valor |
| --- | --- |
| Language | Node |
| Branch | `main` |
| Root Directory | (vazio) |
| Build Command | `yarn` (ou `npm install`) |
| Start Command | `npm start` |

O servidor lê a porta da variável `PORT`, que o Render define sozinho. No plano grátis o Web Service hiberna depois de um tempo sem acesso e o primeiro carregamento leva alguns segundos.

## O que tem

- **Início**: sequência de dias treinados, pontos, semana atual, próxima aula reservada e feed de check-ins dos grupos (reações 🔥💪👏 e comentários).
- **Agenda**: próximos 7 dias, filtro CrossFit/Hyrox, foco e vagas por aula, reservar/cancelar, lista de espera para aulas lotadas.
- **Check-in** (botão central): foto do treino, CrossFit ou Hyrox, duração, legenda, vínculo com a aula agendada de hoje (+5 pts) e escolha dos grupos onde publicar.
- **Ranking**: desafio "Projeto Verão" (60 dias), ranking por pontos, check-ins ou minutos, pódio, quanto falta para passar o próximo, criar grupo ou entrar com código de convite.
- **Perfil**: estatísticas, calendário do mês, conquistas e botão para reiniciar os dados do protótipo.

## Pontuação

| Ação | Pontos |
| --- | --- |
| Check-in de treino | +10 |
| Check-in vinculado a aula agendada | +5 |

## Estrutura

```
index.html       casca do app
css/styles.css   identidade visual (azul-roxo noturno + laranja/vermelho, Exo 2 itálico)
js/data.js       usuários, grade de aulas, grupos e feed fictícios
js/app.js        telas, estado e interações
server.js        servidor estático para rodar como Web Service
```

## Pendências para virar produto

- Trocar o símbolo desenhado em SVG (`logoMark` em `js/app.js`) pelo arquivo oficial da marca.
- Backend com login, grade de aulas real, controle de vagas e armazenamento das fotos.
- Notificações (lembrete de aula, vaga liberada na lista de espera, reações).
