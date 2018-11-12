package project.controller;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import project.model.Puzzle;
import project.view.PuzzleApplication;

public class MoveController implements KeyListener {
	
	PuzzleApplication app;
	Puzzle puzzle;
	
	public MoveController(Puzzle puzzle,PuzzleApplication app){
		this.puzzle=puzzle;
		this.app=app;
	}
	
	public void moveLeft() {
		if(puzzle.moveLeft())
			app.moveCountPlusPlus();
		app.getPuzzleView().repaint();
	}
	
	public void moveRight() {
		if(puzzle.moveRight())
			app.moveCountPlusPlus();
		app.getPuzzleView().repaint();
	}
	
	public void moveUp() {
		if(puzzle.moveUp())
			app.moveCountPlusPlus();
		app.getPuzzleView().repaint();
	}
	
	public void moveDown() {
		if(puzzle.moveDown())
			app.moveCountPlusPlus();
		app.getPuzzleView().repaint();
	}

	@Override
	public void keyPressed(KeyEvent ke) {
		int code = ke.getKeyCode();
		System.out.println(code);
	}

	@Override
	public void keyReleased(KeyEvent ke) {
		int code = ke.getKeyCode();
		System.out.println(code);
	}

	@Override
	public void keyTyped(KeyEvent ke) {
		int code = ke.getKeyCode();
		System.out.println(code);
	}

}
