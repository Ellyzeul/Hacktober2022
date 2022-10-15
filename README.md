# Hacktober2022
Respositório para commits duante a Hacktober22
___

## Como funciona a aplicação?
A aplicação consiste em um canvas, onde os contribuidores podem especificar alguma forma geométrica para desenharem na tela. Será que juntos conseguimos fazer algum desenho?

Ao passar com o mouse por cima do ponto de origem de alguma forma, o nome do contribuidor daquele ponto aparecerá no topo à direita.
Clicando no ponto, irá congelar o canvas, permitindo ir até o nome do contribuidor e clicar para ver seu perfil.

## Como desenhar?
Os dados da aplicação estão contidos no arquivo `points.json`. Para inserir uma forma geométrica adicionar no arquivo um novo JSON com as coordenadas e o usuário do GitHub do contribuidor.

## Quais formas tem e como descrever elas no JSON?
Como já diriam desenvolvedores mais experientes: a melhor documentação é o próprio código. Então sinta-se à vontade para verificar o arquivo `points.json` caso se sinta capaz de aprender apenas o lendo mas, aqui segue uma descrição de como fazer:

<table>
  <thead>
    <tr>
      <th>Formas implementadas</th>
      <th>Descrição JSON</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Linha</td>
      <td><pre>{
  "form": "line",
  "x0": 2,
  "y0": 2,
  "x1": 10,
  "y1": 10,
  "contributor": "Ellyzeul"
}</pre></td>
    </tr>
    <tr>
      <td>Quadrilátero</td>
      <td><pre>{
  "form": "quadrilateral",
  "x0": 100,
  "y0": 100,
  "x1": 100,
  "y1": 150,
  "x2": 200,
  "y2": 200,
  "x3": 150,
  "y3": 100,
  "contributor": "yingyangtongxue"
}</pre></td>
    </tr>
    <tr>
      <td>Circulo</td>
      <td><pre>{
  "form": "circle",
  "xc": 500,
  "yc": 200,
  "radius": 100,
  "contributor": "leandrohl"
}</pre></td>
    </tr>
  </tbody>
</table>

## Padrões de commit
Os padrões para commit nesse repositório seguem as convenções comuns, como encontradas no site [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) ou em português podem ser encontradas em sites como o [freecodecamp](https://www.freecodecamp.org/portuguese/news/como-escrever-boas-mensagens-de-commit-um-guia-pratico-do-git/).

Em suma:

 - feat: uma nova feature (recurso) que você está adicionando a uma aplicação específica.
 - fix: a resolução de um bug.
 - style: recurso e atualizações relacionadas à estilização.
 - refactor: refatoração de uma seção específica da base de código.
 - test: tudo o que for relacionado a testes.
 - docs: tudo o que for relacionado à documentação.
 - chore: manutenção regular do código. (Você também pode usar emojis para representar os tipos de commit).

Ex.: `feat: adição de nova linha ao canvas`

## Formas de contribuir
A principal forma de contribuir é justamente adicionando formas ao canvas, porém há mais métodos e eles estão descritos na seção de [issues](https://github.com/Ellyzeul/Hacktober2022/issues)
