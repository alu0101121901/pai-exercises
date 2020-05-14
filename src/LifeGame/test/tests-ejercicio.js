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
let PainterTest, CircleTest, GraphicObjectTest, Chai, expect;
if (typeof require !== 'undefined') {
  PainterTest = require('../src/painter.js').Painter;
  GraphicObjectTest = require('../src/ejercicio/graphic-object').GraphicObject;
  CircleTest = require('../src/ejercicio/circle').Circle;


  Chai = require('chai');
  expect = require('chai').expect; 
}
else {
  GraphicObjectTest = GraphicObject;
  PainterTest = Painter;
  CircleTest = Circle;

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

describe('Class Circle', () => {
  const CIRCLE = new CircleTest();

  it('Should be an inherited class from Painter', () => {
    expect(CIRCLE instanceof PainterTest).to.be.equal(true);
  }); 
  
  it('Should have a function to draw circle', () => {
    expect(CIRCLE.draw).to.be.a("function");
  });
  
});

describe('Class GraphicObject', () => {
  const GRAPHIC = new GraphicObjectTest();

  it('Should be an inherited class from Painter', () => {
    expect(GRAPHIC instanceof PainterTest).to.be.equal(true);
  }); 
  
  it('Should have a function to initialize the point', () => {
    expect(GRAPHIC.initialize).to.be.a("function");
  });

  it('Should have a function to move the point', () => {
    expect(GRAPHIC.move).to.be.a("function");
  });

  it('Should have a function to clear the canvas', () => {
    expect(GRAPHIC.clearPreviousPosition).to.be.a("function");
  });
  
});

