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
let PainterTest, CircleTest, GraphicObjectTest, BouncingBallTest, BallContainerTest, Chai, expect;
if (typeof require !== 'undefined') {
  PainterTest = require('../src/Bouncing-Balls/painter.js').Painter;
  CircleTest = require('../src/Bouncing-Balls/circle.js').Circle;
  GraphicObjectTest = require('../src/Bouncing-Balls/graphic-object.js').GraphicObject;
  BouncingBallTest = require('../src/Bouncing-Balls/bouncing-ball.js').BouncingBall;
  BallContainerTest = require('../src/Bouncing-Balls/bouncing-balls-container.js').BouncingBallsContainer;

  Chai = require('chai');
  expect = require('chai').expect; 
}
else {
  CircleTest = Circle;
  PainterTest = Painter;
  GraphicObjectTest = GraphicObject;
  BouncingBallTest = BouncingBall;
  BallContainerTest = BouncingBallsContainer;


  Chai = chai;
  expect = chai.expect;
}

describe('Class Painter', () => {
  const PAINTER1 = new PainterTest();

  it('Should have a property that contain the Canvas context', () => {
    expect(PAINTER1).to.have.a.property('ctx_');
  });

  
  it('Should have a property that contain the Canvas', () => {
    expect(PAINTER1).to.have.a.property('canvas_');
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

describe('Class BouncingBallsContainer', () => {
  const BALLS = new BallContainerTest(10, 10);

  it('Should be an inherited class from Painter', () => {
    expect(BALLS instanceof PainterTest).to.be.equal(true);
  });

  it('Should have a property that save the bouncing balls', () => {
    expect(BALLS).to.have.a.property('bouncingBalls_');
  }); 

  it('Should have a function that add n initial balls to the container', () => {
    BALLS.addBouncingBalls(10);
    expect(BALLS.balls.length).to.have.equal(10);
  }); 
  
  it('Should have a function to add a ball to the container', () => {
    BALLS.addBouncingBall();
    expect(BALLS.balls.length).to.be.equal(11);
  });

  it('Should have a function to clear the board', () => {
    expect(BALLS.clear).to.be.a("function");
  });

  it('Should have a function to get a random number in a range', () => {
    expect(BALLS.random(10, 10)).to.be.equal(10);
  });
  
});

describe('Class BouncingBall', () => {
  const BALL = new BouncingBallTest(0, 0, 5, 5, 1, 1, 0);

  it('Should be an inherited class from Graphic Object', () => {
    expect(BALL instanceof GraphicObjectTest).to.be.equal(true);
  });

  it('Should have a property for the velocityX', () => {
    expect(BALL).to.have.a.property('velocityX_');
  }); 

  it('Should have a property for the velocityY', () => {
    expect(BALL).to.have.a.property('velocityY_');
  }); 

  it('Should have a property for the velocityY', () => {
    BALL.move();
    expect(BALL.currentCoordinates.x).to.be.equal(6);
  }); 
 
  it('Should have a property for the velocityY', () => {
    BALL.move();
    expect(BALL.currentCoordinates.y).to.be.equal(11);
  }); 
  
});

