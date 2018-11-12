package project.controller;

import java.awt.Graphics;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import project.model.Puzzle;
import project.model.PuzzlePiece;
import project.view.PuzzleApplication;

public class SelectPieceController extends MouseAdapter {

	Puzzle p;
	PuzzleApplication app;
	
	public SelectPieceController(Puzzle p,PuzzleApplication app) {
		this.p=p;
		this.app=app;
	}
	
	public void mousePressed(MouseEvent me) {
		for(PuzzlePiece i:p.getPieces()) {
			int tlX = (i.getCol()*100)+5;
			int tlY = (i.getRow()*100)+5;
			int brX = (tlX+(i.getWidth()*100)-5);
			int brY = (tlY+(i.getHeight()*100)-5);
			
			if(tlX < me.getX() && me.getX() < brX && tlY < me.getY() && me.getY() < brY) {
				i.selectThisPiece();
			}
			else {
				i.deselect();
			}
			
		}
		app.getPuzzleView().repaint();
	}
	
}
