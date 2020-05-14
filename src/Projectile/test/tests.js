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
let GraphTest, ProjectileGraphTest, PainterTest, ProjectileTest, isValidInputFunctionTest, OutputTest, Chai, expect;
if (typeof require !== 'undefined') {
  GraphTest = require('../src/graph.js').Graph;
  ProjectileGraphTest = require('../src/projectile-graph.js').ProjectileGraph;
  ProjectileTest = require('../src/throw-projectile.js').Projectile;
  PainterTest = require('../src/painter.js').Painter;
  OutputTest = require('../src/output.js').Output;
  isValidInputFunctionTest = require('../src/projectile.js').isValidInput;

  Chai = require('chai');
  expect = require('chai').expect; 
}
else {
  GraphTest = Graph;
  ProjectileGraphTest = ProjectileGraph;
  ProjectileTest = Projectile;
  PainterTest = Painter;
  OutputTest = Output;

  isValidInputFunctionTest = isValidInput;

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

describe('Class Graph', () => {
  const GRAPH = new GraphTest();

  it('Should be an inherited class from Painter', () => {
    expect(GRAPH instanceof PainterTest).to.be.equal(true);
  });

  it('Should have a property for the graph origin point', () => {
    expect(GRAPH).to.have.a.property('originPoint_');
  });  

  it('Should have access to its father Canvas and Context properties if they are undefined', () => {
    expect(GRAPH.ctx_).to.be.equal(undefined);
    expect(GRAPH.height_).to.be.equal(1);
    expect(GRAPH.width_).to.be.equal(1);
  });
  
  const GRAPH2 = new GraphTest (1, 1);
  it('originPoint_ coords should be NaN if Canvas is not undefined but is not the correct type object', () => {
    expect(GRAPH2.ctx_).to.be.equal(1);
    expect(GRAPH2.originPoint_.coordX).to.be.NaN;
    expect(GRAPH2.originPoint_.coordY).to.be.NaN;
  });

  it('Should have a function to draw the graph', () => {
    expect(GRAPH.draw).to.be.a('function');
  });

  it('Should have a function to draw the graph', () => {
    expect(GRAPH.drawAxes).to.be.a('function');
  });

});

describe('Class Output', () => {
  const Projectile1 = new ProjectileTest(50, 50);
  const OUTPUT = new OutputTest(0, 0, Projectile1);

  it('Should be an inherited class from Painter', () => {
    expect(OUTPUT instanceof PainterTest).to.be.equal(true);
  });

  it('Should have a property for the Projectile to write its output', () => {
    expect(OUTPUT).to.have.a.property('projectile_');
  });  

  it('Projectile should be an object class type', () => {
    expect(OUTPUT.projectile_).to.be.a('object');
  });

});

describe('Class ProjectileGraph', () => {
  const ProjectileGraph_ = new ProjectileGraphTest();

  it('Should be an inherited class from Graph', () => {
    expect(ProjectileGraph_ instanceof GraphTest).to.be.equal(true);
  });

  it('Should have a property for the scale value of the graph', () => {
    expect(ProjectileGraph_).to.have.a.property('scaleValue_');
  });  

  it('Should be a function to draw the number distance in the graph', () => {
    expect(ProjectileGraph_.drawGridNumbersWithScale).to.be.a('function');
  });

  it('Should be a function to scale value of the graph', () => {
    expect(ProjectileGraph_.calculateScale).to.be.a('function');
  });

});

describe('Class Projectile', () => {
  const PROJECTILE = new ProjectileTest(100, 45);

  it('Should have a property for the velocity', () => {
    expect(PROJECTILE).to.have.a.property('velocity_');
  });  

  it('Should have a property for the velocity x', () => {
    expect(PROJECTILE).to.have.a.property('velocityX_');
  }); 
  
  it('Should have a property for the velocity y', () => {
    expect(PROJECTILE).to.have.a.property('velocityY_');
  }); 

  it('Should have a property for the angle', () => {
    expect(PROJECTILE).to.have.a.property('angle_');
  });

  it('Time raising hould return 7.21 seconds', () => {
    let time = Math.floor(PROJECTILE.timeRaising() * 100) / 100;
    expect(time).to.be.equal(7.21);
  });

  it('Time max should return 14.43 seconds', () => {
    let time2 = Math.floor(PROJECTILE.totalTime() * 100) / 100;
    expect(time2).to.be.equal(14.43);
  });

  it('Max height should return 255.1 meters', () => {
    let height = Math.floor(PROJECTILE.maxHeight() * 100) / 100;
    expect(height).to.be.equal(255.1);
  });

  it('Max distance should return 1020.4 meters', () => {
    let distance = Math.floor(PROJECTILE.maxDistance() * 100) / 100;
    expect(distance).to.be.equal(1020.4);
  });

  it('In timeRaising() seconds, y should value maxHeight() meters', () => {
    let pos = PROJECTILE.calculatePositionInTime(PROJECTILE.timeRaising());
    expect(Math.floor(pos.coordY * 100) / 100).to.be.equal(Math.floor(PROJECTILE.maxHeight() * 100) / 100);
  });
});

describe('function isValidInput', () => {
  it('should return false', () => {
    let boolean = isValidInputFunctionTest("eeee", 1);
    expect(boolean).to.be.equal(false);
  });

  it('should return true', () => {
    let boolean = isValidInputFunctionTest(100, 45);
    expect(boolean).to.be.equal(true);
  });

  it('should return false', () => {
    let boolean = isValidInputFunctionTest(100, 100);
    expect(boolean).to.be.equal(false);
  });
});




/* describe('Class Grid', () => {
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

}); */
