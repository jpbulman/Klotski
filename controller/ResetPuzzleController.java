package project.controller;

import project.model.Puzzle;
import project.view.PuzzleApplication;

public class ResetPuzzleController {

	PuzzleApplication app;
	Puzzle puzzle;
	
	public ResetPuzzleController(Puzzle puzzle,PuzzleApplication app) {
		this.app=app;
		this.puzzle=puzzle;
	}
	
	public void resetPuzzle() {
		app.moveCountReset();
		puzzle.reset();
		app.getPuzzleView().repaint();
	}
	
}
