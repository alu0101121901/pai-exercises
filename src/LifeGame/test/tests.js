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
const GREEN_ = 'rgb(191, 255, 0)';

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let PainterTest, MatrixTest, LifeModelTest, LifeViewTest, LifeControllerTest, BoardTest, Chai, expect;
if (typeof require !== 'undefined') {
  PainterTest = require('../src/painter.js').Painter;
  BoardTest = require('../src/board.js').Board;
  MatrixTest = require('../src/matrix.js').Matrix;
  LifeModelTest = require('../src/life-model.js').LifeModel;
  LifeViewTest = require('../src/life-view').LifeView;
  LifeControllerTest = require('../src/life-controller').LifeController;

  Chai = require('chai');
  expect = require('chai').expect; 
}
else {
  BoardTest = Board;
  LifeModelTest = LifeModel;
  LifeViewTest = LifeView;
  PainterTest = Painter;
  MatrixTest = Matrix;
  LifeControllerTest = LifeController;

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
  const BOARD = new BoardTest(0, 0, 4);

  it('Should be an inherited class from Painter', () => {
    expect(BOARD instanceof PainterTest).to.be.equal(true);
  });

  it('Should have a property for a square length on Board', () => {
    expect(BOARD).to.have.a.property('squareLength_');
  }); 
  
  it('Should have a function to draw the cell box', () => {
    expect(BOARD.putOnBoard).to.be.a("function");
  });

  it('Should have a function to clear the board', () => {
    expect(BOARD.clear).to.be.a("function");
  });

  it('Should have a function to draw the board', () => {
    expect(BOARD.draw).to.be.a("function");
  });

  it('Should have a function to assign the cell state color', () => {
    expect(BOARD.chooseColor).to.be.a("function");
  });

  it('When cell is dead, color cell state should be black', () => {
    expect(BOARD.chooseColor(0)).to.be.equal("black");
  });

  it('When cell is alive, color cell state should be lighten green', () => {
    expect(BOARD.chooseColor(1)).to.be.equal(GREEN_);
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



describe('Class LifeModel', () => {
  const LifeMODEL = new LifeModelTest(0, 0, 4, 4);

  it('Should have a property for the Life view', () => {
    expect(LifeMODEL).to.have.a.property('lifeView_');
  });  

  it('Should have a property for the Life controller', () => {
    expect(LifeMODEL).to.have.a.property('lifeController_');
  });  

  it('Should be a function to initialize the board on canvas', () => {
    expect(LifeMODEL.initializeBoard).to.be.a('function');
  });

  it('Should be a function to start life game', () => {
    expect(LifeMODEL.startLifeGame).to.be.a('function');
  });

  it('Should be a function to get a life cycle', () => {
    expect(LifeMODEL.makeALifeCycle).to.be.a('function');
  });

});

describe('Class LifeView', () => {
  const LifeVIEW = new LifeViewTest();

  it('Should have a property for the Life board', () => {
    expect(LifeVIEW).to.have.a.property('lifeBoard_');
  });  

  it('Should be a function to draw the board on canvas', () => {
    expect(LifeVIEW.drawBoard).to.be.a('function');
  });

  it('Should be a function to clear the board on canvas', () => {
    expect(LifeVIEW.clearBoard).to.be.a('function');
  });

  it('Should be a function to update a board Life configuration from Life model', () => {
    expect(LifeVIEW.updateBoard).to.be.a('function');
  });

});

describe('Class LifeController', () => {
  
  const LifeCONTROLLER = new LifeControllerTest(4, 4);
  
  it('Should have a property for the cells container', () => {
    expect(LifeCONTROLLER).to.have.a.property('stateMatrix_');
  });  
  
  it('Should have a property for the cells neighbors container', () => {
    expect(LifeCONTROLLER).to.have.a.property('adjacentCounter_');
  });  
  
  it('Should be a function to initialize the cells container', () => {
    expect(LifeCONTROLLER.initialize).to.be.a('function');
  });
  
  it('Initialize function should put to 0 all the cells', () => {
    let allZero = true;
    LifeCONTROLLER.initialize();
    for (let i = 0; i < LifeCONTROLLER.matrix.rows; i++)
      for(let j = 0; j < LifeCONTROLLER.matrix.cols; j++)
        if (LifeCONTROLLER.matrix.getData(i, j) !== 0)
          allZero = false;
         
    expect(allZero).to.be.equal(true);
  });
  console.log("e");

  it('Should be the same number of 1s in the cell container that the argument passed (2)', () => {
    let counterOfOnes = 0;
    LifeCONTROLLER.playLife(15);
    for (let i = 0; i < LifeCONTROLLER.matrix.rows; i++)
      for(let j = 0; j < LifeCONTROLLER.matrix.cols; j++)
        if (LifeCONTROLLER.matrix.getData(i, j) === 1)
          counterOfOnes++;
         
    expect(counterOfOnes).to.be.equal(15);
  });
  
  it('In a matrix with 2 alive adjacent cells, for an alive cell box, the adjacent counter cells should be 1', () => {
    LifeCONTROLLER.initialize();
    LifeCONTROLLER.matrix.setPosition(0,0,1);
    LifeCONTROLLER.matrix.setPosition(1,1,1); 
    expect(LifeCONTROLLER.countAdjacent(0, 0)).to.be.equal(1);
  });

  it('In a matrix with 2 alive adjacent cells, for an alive cell box, the adjacent counter cells should be 1', () => {
    LifeCONTROLLER.initialize();
    LifeCONTROLLER.cycle(); 
    let allZero = true;
    for (let i = 0; i < LifeCONTROLLER.matrix.rows; i++)
      for(let j = 0; j < LifeCONTROLLER.matrix.cols; j++)
        if (LifeCONTROLLER.matrix.getData(i, j) !== 0)
          allZero = false;
    expect(allZero).to.be.equal(true);
  });

  
});

