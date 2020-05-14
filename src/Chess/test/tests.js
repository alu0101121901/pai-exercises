/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 10 - Projectile
 * @file tests.js
 * @author Rafael Cala
 * Correo: alu0101121901
 * @since 20/04/20
 * @version 1.0.0
 * @description Contiene diferentes tests realizados a las distintas clases y funciones
 * del programa.
 */

"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let PainterTest, MatrixTest, OutputTest, ChessModelTest, ChessViewTest, ChessControllerTest,
    StrategyManagerTest, ClassicEightTest, GeneralEightTest, BoardTest, Chai, expect;
if (typeof require !== 'undefined') {
  PainterTest = require('../src/painter.js').Painter;
  BoardTest = require('../src/board.js').Board;
  MatrixTest = require('../src/matrix.js').Matrix;
  OutputTest = require('../src/output.js').Output;
  ChessModelTest = require('../src/chess-model.js').ChessModel;
  ChessViewTest = require('../src/chess-view').ChessView;
  ChessControllerTest = require('../src/chess-controller').ChessController;
  StrategyManagerTest = require('../src/strategy-manager').StrategyManager;
  ClassicEightTest = require('../src/classic-eight-queens').ClassicEightQueens;
  GeneralEightTest = require('../src/general-eight-queens').GeneralEightQueens;

  Chai = require('chai');
  expect = require('chai').expect; 
}
else {
  BoardTest = Board;
  ChessModelTest = ChessModel;
  ChessViewTest = ChessView;
  PainterTest = Painter;
  MatrixTest = Matrix;
  OutputTest = Output;
  ChessControllerTest = ChessController;

  Chai = chai;
  expect = chai.expect;
}

describe('Class Painter', () => {
  const PAINTER1 = new PainterTest();

  it('Should have a property that contain the Canvas context', () => {
    expect(PAINTER1).to.have.a.property('ctx_');
  });

  it('Should have a property that contains the Canvas height', () => {
    expect(PAINTER1).to.have.a.property('height_');
  });  

  it('Should have a property that contains the Canvas width', () => {
    expect(PAINTER1).to.have.a.property('width_');
  });

  const Painter2 = new PainterTest (0, 0);
  it('Should assign default values if canvas is undefined', () => {
    expect(Painter2.ctx_).to.be.equal(0);
    expect(Painter2.height_).to.be.equal(undefined);
    expect(Painter2.width_).to.be.equal(undefined);
  });


});

describe('Class Board', () => {
  const BOARD = new BoardTest();

  it('Should be an inherited class from Painter', () => {
    expect(BOARD instanceof PainterTest).to.be.equal(true);
  });

  it('Should have a property for a square length on Board', () => {
    expect(BOARD).to.have.a.property('squareLength_');
  });  

  it('Should have a function to calculate the length of a square', () => {
    expect(BOARD.calculateSquareLength).to.be.a('function');
  });

  it('Without Canvas, function should assign the length of a square to undefined', () => {
    expect(BOARD.calculateSquareLength()).to.be.equal(undefined);
  });

  it('Should have a function to load the images', () => {
    expect(BOARD.loadPieces).to.be.a('function');
  });

  it('Should have a function to assign the src image to the piece label', () => {
    expect(BOARD.getPieceImage).to.be.a('function');
  });

  it('Should have a function to assign the src image to the piece label', () => {
    expect(BOARD.getPieceImage()).to.be.equal(undefined);
  });
  
});

describe('Class Matrix', () => {
  const MATRIX = new MatrixTest(4, 4);

  it('Should have a property for the matrix', () => {
    expect(MATRIX).to.have.a.property('matrix_');
  });  

  it('Should have a property for rows number', () => {
    expect(MATRIX).to.have.a.property('rows_');
  });  

  it('Should have a property for columNs number', () => {
    expect(MATRIX).to.have.a.property('columns_');
  });

  it('Should have a function to set a variable in position (i, j)', () => {
    expect(MATRIX.setPosition).to.be.a('function');
  });

  it('Should have a function to get data in position (i, j)', () => {
    MATRIX.setPosition(1, 1, 1);
    expect(MATRIX.getData(1, 1)).to.be.equal(1);
  });

  it('Should return the rows number', () => {
    expect(MATRIX.rows).to.be.equal(4);
  });

  it('Should return the columns number', () => {
    expect(MATRIX.cols).to.be.equal(4);
  });
  
});
 
describe('Class Output', () => {
  const OUTPUT = new OutputTest();

  it('Should be an inherited class from Painter', () => {
    expect(OUTPUT instanceof PainterTest).to.be.equal(true);
  });


});


describe('Class ChessModel', () => {
  const CHESSMODEL = new ChessModelTest();

  it('Should have a property for the chess view', () => {
    expect(CHESSMODEL).to.have.a.property('chessView_');
  });  

  it('Should have a property for the chess controller', () => {
    expect(CHESSMODEL).to.have.a.property('chessController_');
  });  

  it('Should be a function to initialize the board on canvas', () => {
    expect(CHESSMODEL.initializeBoard).to.be.a('function');
  });

  it('Should be a function to solve 8 queens problem', () => {
    expect(CHESSMODEL.solveEightQueens).to.be.a('function');
  });

  it('Should be a function to get nth 8 queens solution', () => {
    expect(CHESSMODEL.getAnEightQueensSolution).to.be.a('function');
  });

  it('Should be a function to get the starting chess configuration', () => {
    expect(CHESSMODEL.startChessPieces).to.be.a('function');
  });

});

describe('Class ChessView', () => {
  const CHESSVIEW = new ChessViewTest();

  it('Should have a property for the chess board', () => {
    expect(CHESSVIEW).to.have.a.property('chessBoard_');
  });  

  it('Should have a property for the chess output', () => {
    expect(CHESSVIEW).to.have.a.property('chessOutput_');
  });  

  it('Should be a function to draw the board on canvas', () => {
    expect(CHESSVIEW.drawBoard).to.be.a('function');
  });

  it('Should be a function to clear the board on canvas', () => {
    expect(CHESSVIEW.clearBoard).to.be.a('function');
  });

  it('Should be a function to update a board chess configuration from chess model', () => {
    expect(CHESSVIEW.updateBoard).to.be.a('function');
  });

  it('Should be a function to write algebraic notation on Output canvas', () => {
    expect(CHESSVIEW.getAlgebraicEightQueensConfiguration).to.be.a('function');
  });

});

describe('Class ChessController', () => {
  const CHESSCONTROLLER = new ChessControllerTest();

  it('Should have a property for the Eight Queens solutions container', () => {
    expect(CHESSCONTROLLER).to.have.a.property('eightQueensSolutions_');
  });  

  it('Should have a property for the Eight Queens option', () => {
    expect(CHESSCONTROLLER).to.have.a.property('eightQueensManager_');
  });  

  it('Should be a function to solve Eight Queens problem', () => {
    expect(CHESSCONTROLLER.solveEightQueens).to.be.a('function');
  });

  it('Should be a function to get the classic Eight Queens solutions', () => {
    CHESSCONTROLLER.solveEightQueens(0);
    expect(CHESSCONTROLLER.eightQueensSols.length).to.be.equal(92);
  });

  it('Should be a function to get the general Eight Queens solutions', () => {
    CHESSCONTROLLER.solveEightQueens(1);
    expect(CHESSCONTROLLER.eightQueensSols.length).to.be.equal(8);
  });


  it('Should be a function to get the nth solution of Eight Queens problem', () => {
    expect(typeof CHESSCONTROLLER.getASolutionFromEightQueens(0)).to.be.equal("object");
  });

  it('Should be a function to get the starting configuration of a chess game', () => {
    expect(typeof CHESSCONTROLLER.playChess()).to.be.equal("object");
  });

});

