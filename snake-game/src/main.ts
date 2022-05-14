import './style.css';
import { Board } from './board';
import { speedType, speedOptions } from './settings';

let previousTimeStamp: number = 0;
let stopGame = false;

let board: Board;
let boardSize: number = 30;
let speed: speedType = 'normal';
let speedMilliseconds: number = speedOptions[speed].initialSpeed;

const configDialog = document.querySelector('#config-dialog')!;
const sizeInput = document.querySelector<HTMLInputElement>('#config-size')!;
const speedInput = document.querySelector<HTMLSelectElement>('#config-speed')!;
const restartButton = document.querySelector('button#restart')!;
const configButton = document.querySelector('button#open-config')!;
const updateConfigButton = document.querySelector('button#update-config')!;

attachEventListeners();
restart();

function attachEventListeners() {
  updateConfigButton.addEventListener('click', updateConf);
  configButton.addEventListener('click', showConfig);
  restartButton.addEventListener('click', restart);
  configDialog.addEventListener('close', stopStart);
}

function showConfig() {
  sizeInput.valueAsNumber = boardSize;
  speedInput.value = speed;
  //@ts-ignore
  configDialog.showModal();
  stopStart();
}

function updateConf() {
  speed = <speedType>speedInput.value;
  boardSize = sizeInput.valueAsNumber;
  restart();
}

function stopStart() {
  stopGame = !stopGame;

  if (!stopGame) {
    window.requestAnimationFrame(mainLoop);
  }
}

function mainLoop(timestamp: number) {
  if (stopGame) {
    return;
  }

  const elapsed = timestamp - previousTimeStamp;

  if (elapsed < speedMilliseconds) {
    window.requestAnimationFrame(mainLoop);
    return;
  }
  previousTimeStamp = timestamp;

  const { isGameOver, hasEaten } = board.nextTurn();
  if (isGameOver) {
    const dialog = document.querySelector<HTMLDialogElement>('#restart-dialog');

    //@ts-ignore
    dialog.showModal();
    return;
  }

  window.requestAnimationFrame(mainLoop);

  if (hasEaten && speedMilliseconds > 50) {
    speedMilliseconds -= speedOptions[speed].eachStepDecrement;
  }
}

function restart() {
  speedMilliseconds = speedOptions[speed].initialSpeed;
  board = new Board(boardSize);
  window.requestAnimationFrame(mainLoop);
}
