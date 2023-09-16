// import { Socket } from "socket.io-client";
import { Socket } from "socket.io-client";
// import { GameTable } from "../";
import { useState } from "react";
import { GameTable } from "../Sections/types";

const PaddleWidth = 10;
const PaddleHeight = 60;
const BallRadius = 5;
let PaddleSpeed = 5;
let BallSpeed = 5;

enum Direction {
  Up = -1,
  Down = 1,
}

enum GameState {
  Menu,
  Playing,
  GameOver,
}

class Paddle {
  x!: number;
  y!: number;
  width!: number;
  height!: number;
  dy!: number;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor(
    x: number,
    y: number,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
    this.x = x;
    this.y = y;
    this.width = PaddleWidth;
    this.height = PaddleHeight;
    this.dy = 0;
    this.context = context;
    this.canvas = canvas;
  }

  move(direction: Direction) {
    this.dy = PaddleSpeed * direction;
    // (this.dy);
  }

  stop() {
    this.dy = 0;
  }

  update() {
    this.y += this.dy;

    if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.height > this.canvas.height) {
      this.y = this.canvas.height - this.height;
    }
  }

  // ComputerUpdate(ball: Ball) {
  //   const paddleCenter = this.y + this.height / 2;

  //   const ballCenter = ball.y;

  //   if (paddleCenter < ballCenter) {
  //     this.move(Direction.Down);
  //   } else if (paddleCenter > ballCenter) {
  //     this.move(Direction.Up);
  //   } else {
  //     this.stop();
  //   }

  //   this.y += this.dy;

  //   if (this.y < 0) {
  //     this.y = 0;
  //   } else if (this.y + this.height > this.canvas.height) {
  //     this.y = this.canvas.height - this.height;
  //   }
  // }

  draw() {
    this.context.fillStyle = "#ffffff";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default class PongGame {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private paddle1: Paddle;
  private paddle2: Paddle;
  private player1Score: number;
  private player2Score: number;
  private gameState: GameState;
  private gameTable: GameTable | undefined;
  private socket: Socket;
  private playerId: number;
  private largeScreenMediaQuery: MediaQueryList;
  // private isMouseInsideCanvas: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    socket: Socket,
    gameTable: GameTable | undefined,
    playerId: number,
    largeScreenMediaQuery: MediaQueryList
  ) {
    this.largeScreenMediaQuery = largeScreenMediaQuery;
    this.playerId = playerId;
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.paddle1 = new Paddle(
      10,
      canvas.height / 2 - PaddleHeight / 2,
      this.context,
      this.canvas
    );
    this.paddle2 = new Paddle(
      canvas.width - PaddleWidth - 10,
      canvas.height / 2 - PaddleHeight / 2,
      this.context,
      this.canvas
    );
    this.player1Score = 0;
    this.player2Score = 0;
    this.gameState = GameState.Playing;
    this.gameTable = gameTable;
    this.socket = socket;

    this.socket.on("paddlePositionUpdate", (updateData) => {});

    this.socket.on("paddlePositionStop", (updateData) => {
      if (updateData.playerId === this.playerId) {
        this.paddle1.stop();
      } else {
        this.paddle2.stop();
      }
    });

    socket.on("BallPositionUpdated", (data) => {
      let x: number = data.ball.x;
      if (this.gameTable?.player1?.id !== this.playerId) {
        x = this.canvas.width - x; // Reverse the X-coordinate
      }
      this.drawBall(x, data.ball.y);

      this.context.strokeStyle = "#ffffff";
      this.context.beginPath();
      this.context.moveTo(this.canvas.width / 2, 0);
      this.context.lineTo(this.canvas.width / 2, this.canvas.height);
      this.context.stroke();

      if (data.playerId === this.playerId) {
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(
          680,
          data.secondPaddle.y,
          data.PaddleWidth,
          data.PaddleHeight
        );
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(10, data.y, data.PaddleWidth, data.PaddleHeight);
      } else {
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(
          10,
          data.secondPaddle.y,
          data.PaddleWidth,
          data.PaddleHeight
        );
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(680, data.y, data.PaddleWidth, data.PaddleHeight);
      }
    });

    if (this.largeScreenMediaQuery.matches) {
      document.addEventListener("keydown", (event) => {
        const playerID =
          this.playerId === this.gameTable?.player1?.id
            ? this.gameTable?.player1?.id
            : this.gameTable?.player2?.id;
        if (event.code === "ArrowUp") {
          this.socket.emit("paddlePositionUpdate", {
            playerId: playerID,
            paddlePosition: Direction.Up,
            roomName: gameTable?.roomName,
          });
        } else if (event.code === "ArrowDown") {
          this.socket.emit("paddlePositionUpdate", {
            playerId: playerID,
            paddlePosition: Direction.Down,
            roomName: gameTable?.roomName,
          });
        }
      });
    } else {
      document.addEventListener("keydown", (event) => {
        const playerID =
          this.playerId === this.gameTable?.player1?.id
            ? this.gameTable?.player1?.id
            : this.gameTable?.player2?.id;
        if (event.code === "ArrowLeft") {
          this.socket.emit("paddlePositionUpdate", {
            playerId: playerID,
            paddlePosition: Direction.Up,
            roomName: gameTable?.roomName,
          });
        } else if (event.code === "ArrowRight") {
          this.socket.emit("paddlePositionUpdate", {
            playerId: playerID,
            paddlePosition: Direction.Down,
            roomName: gameTable?.roomName,
          });
        }
      });
    }

    // document.addEventListener("keydown", (event) => {
    //   if (event.code === "Enter" && this.gameState === GameState.Menu) {
    //     this.startGame();
    //   } else if (
    //     event.code === "Enter" &&
    //     this.gameState === GameState.GameOver
    //   ) {
    //     this.restartGame();
    //   }
    // });

    document.addEventListener("keyup", (event) => {
      const playerID =
        this.playerId === this.gameTable?.player1?.id
          ? this.gameTable?.player1?.id
          : this.gameTable?.player2?.id;
      if (event.code === "ArrowUp" || event.code === "ArrowDown") {
        this.socket.emit("paddlePositionStop", {
          playerId: playerID,
        });
      }
    });

    const gameLoop = () => {
      this.update();
      this.render();
      requestAnimationFrame(gameLoop);
    };

    // gameLoop();
  }

  private startGame(): void {
    this.gameState = GameState.Playing;
    this.player1Score = 0;
    this.player2Score = 0;
    // this.resetPosition();
  }

  private restartGame(): void {
    this.gameState = GameState.Playing;
    this.player1Score = 0;
    this.player2Score = 0;
    // this.resetPosition();
  }

  render(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // if (this.gameState === GameState.Menu) {
    //   this.renderMenu();
    // } else if (this.gameState === GameState.Playing) {
    this.renderGame();
  }

  // private renderMenu(): void {
  //   this.context.fillStyle = "#ffffff";
  //   this.context.font = "30px Arial";
  //   this.context.fillText(
  //     "Press Enter to Start",
  //     this.canvas.width / 2 - 140,
  //     this.canvas.height / 2
  //   );
  // }

  // private renderGameOver(): void {
  //   this.context.fillStyle = "#ffffff";
  //   this.context.font = "30px Arial";
  //   this.context.fillText(
  //     "Game Over",
  //     this.canvas.width / 2 - 80,
  //     this.canvas.height / 2 - 20
  //   );
  //   this.context.fillText(
  //     "Press Enter to Restart",
  //     this.canvas.width / 2 - 140,
  //     this.canvas.height / 2 + 20
  //   );
  // }

  drawBall(x: number, y: number) {
    // (x, y);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.paddle1.draw();
    // this.paddle2.draw();
    this.context.beginPath();
    this.context.arc(x, y, 7, 0, Math.PI * 2);
    this.context.fillStyle = "white";
    this.context.fill();
    this.context.closePath();
  }

  private renderGame() {
    // this.paddle1.draw();
    // this.paddle2.draw();
    // this.context.fillStyle = "#ffffff";
    // this.context.fillRect(150, 150, 10, 100);
    // this.ball.draw();
    // this.drawBall(100, 100);
    //   this.context.fillStyle = "#ffffff";
    //   this.context.font = "20px Arial";
    //   this.context.fillText(`${this.player1Score}`, this.canvas.width * 0.25, 30);
    //   this.context.fillText(`${this.player2Score}`, this.canvas.width * 0.75, 30);
  }

  update(): void {
    if (this.gameState === GameState.GameOver) {
      return;
    }

    if (this.gameState !== GameState.Playing) {
      return;
    }

    // this.socket.on("paddlePositionUpdate", (updateData) => {
    // });
    // this.paddle1.update();
    // this.paddle2.update();

    // if (this.gameTable.player1.id === this.playerId) {
    //   this.ball.update(this.paddle1, this.paddle2);
    // }

    // const ballPosition = {
    //   x: this.ball.x,
    //   y: this.ball.y,
    //   playerId: this.playerId,
    // };
    // this.socket.emit("ballPositionUpdate", ballPosition);

    // if (this.ball.x <= 8) {
    //   this.player2Score++;
    //   this.resetPosition();
    // } else if (this.ball.x >= this.canvas.width - 8) {
    //   this.player1Score++;
    //   this.resetPosition();
    // }

    if (this.player1Score == 5 || this.player2Score == 5) {
      this.gameState = GameState.GameOver;
    }
  }

  // resetPosition(): void {
  //   this.ball.x = this.canvas.width / 2;
  //   this.ball.y = this.canvas.height / 2;

  //   this.ball.dx = -this.ball.dx;
  //   this.ball.dy = -this.ball.dy;
  // }
}
