/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 9 PAI - Random Walk
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
let GridTest, RandomStepTest, PainterTest, Chai, expect;
if (typeof require !== 'undefined') {
  GridTest = require('../src/grid.js').Grid;
  RandomStepTest = require('../src/random-step.js').RandomStep;
  PainterTest = require('../src/painter.js').Painter;

  Chai = require('chai');
  expect = require('chai').expect; 
}
else {
  GridTest = Grid;
  RandomStepTest = RandomStep;
  PainterTest = Painter;
  
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

});

describe('Class Grid', () => {
  const GRID = new GridTest(10);

  it('Should be an inherited class from Painter', () => {
    expect(GRID instanceof PainterTest).to.be.equal(true);
  });

  it('Should have a property for the grid square length', () => {
    expect(GRID).to.have.a.property('length_');
  });

  it('Should have a property where the density is calculated', () => {
    expect(GRID).to.have.a.property('density_');
  });

  it('Should work the length getter and setter', () => {
    GRID.length = 10;
    expect(GRID.length).to.be.equal(10);
  });

  it('Should work the density getter and setter', () => {
    GRID.density = 10;
    expect(GRID.density).to.be.equal(10);
  });

  it('Should have access to its father properties', () => {
    expect(GRID.canvas_).to.be.equal(undefined);
    expect(GRID.ctx_).to.be.equal(undefined);
  });

});

describe('Class RandomStep', () => {
  const RANDOMSTEP = new RandomStepTest(10, [0, 0]);
  it('Should be an inherited class from Painter', () => {
    expect(RANDOMSTEP instanceof PainterTest).to.be.equal(true);
  });

  it('Should have a property that contains the length steps', () => {
    expect(RANDOMSTEP).to.have.a.property('length_');
  });

  it('Should have a property that contains the position', () => {
    expect(RANDOMSTEP).to.have.a.property('position_');
  });

  it('The point should be an array of two numbers', () => {
    expect(RANDOMSTEP.currentPosition).to.be.an('array');
    expect(RANDOMSTEP.currentPosition.length).to.be.equal(2);
  });

  it('The point should be outside of canvas', () => {
     RANDOMSTEP.currentPosition = [-1, -1];
     expect(RANDOMSTEP.insideOfGrid()).to.be.equal(false);
  });

  it('function should return a RandomStep format point', () => {
    expect(RANDOMSTEP.chooseDirection()).to.be.an('array');
    expect(RANDOMSTEP.chooseDirection().length).to.be.equal(2);
  });

});
