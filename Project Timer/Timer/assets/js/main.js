/*
declarando as variáveis e anexando as classes no javascript 
com document.querySelector
*/
const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');

/*
Adicionadno função para configuração da hora, criada contando em segundos
esta possui a função básica de receber os segundos criar a data e retonar com 
o comando 'return'. A lógica utilizada para apresentar um timer zerado foi inserir new Date
e retornar somente a hora com timeZone UTC ou GMT
no final foi concatenado (+) com  template strings (entre crases)
os milisegundos para dar uma aparência de Timer melhor
milisegundos / 10 - porque o valor dos milissegundos retornado pelo método getMilliseconds()
da classe Date possui três dígitos, variando de 0 a 999.
No entanto, a convenção para exibição de milissegundos em um relógio é de dois dígitos,
variando de 00 a 99. Por isso, antes de exibir os milissegundos, 
é feita a divisão por 10 para obter um valor entre 0 e 99.
mais o valor fixado em 0, slice para diminuir a quantidade de números aparecendo e
padStart para adicionar o 'zero' a esquerda em duas casas.
*/
function getTimeFromSeconds(seconds) {
  const data = new Date(seconds);
  const milisegundos = data.getMilliseconds();
  return data.toLocaleTimeString('pt-BR', {
    timeZone: 'UTC',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'    
  }) + `:${(milisegundos / 10).toFixed(0).slice(-2).padStart(2,'0')}`;  
}

/*
Adicionadno função para iniciar o timer, declara a variável com mesmo nome da função
que determina a hora 'seconds' nesse caso, abre a função declara a variável e inicia
o setInterval para determinar o intervalo com que essa função será executada (medido em
milisegundos), adicionar a variável responsável pelo relógio com innerHTML para esse ser
mostrado na tela.
*/
let seconds = 0;
let timer; //lembrando q a função acessa variávies de fora (mesmo q as variávies declaradas dentro da função isso nao seja permitido).

function startTimer() {
  timer = setInterval(function () {
    seconds++;
    relogio.innerHTML = getTimeFromSeconds(seconds);
  },);/* nesse caso não adicionei nenhum intervalo, 
         dessa forma o timer irá iniciar acontagem à partir do milésimos,
         se colocasse '1000' iria começar à partir do segundo
         */ 
}

/*
Criando evento para o botão e testando funcionamento com
addEventListener - 'click' e em seguida adicionando a função dentro 
de addEventListener para emitir um alerta de funcionamento do clique
*/
iniciar.addEventListener('click', function (event) {
  relogio.classList.remove('pausado');// A classe é removida para que o efeito do CSS não permaneça na tela
  clearInterval(timer);
  startTimer();
});
pausar.addEventListener('click', function (event) {
  relogio.classList.add('pausado'); //classe chamada do CSS para adicionar o efeito na tela
  clearInterval(timer);
});
zerar.addEventListener('click', function (event) {
  relogio.classList.remove('pausado');// A classe é removida para que o efeito do CSS não permaneça na tela
  clearInterval(timer);
  seconds = 0;
  relogio.innerHTML = '00:00:00:00'
});




