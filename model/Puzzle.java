package project.model;

import java.awt.Color;
import java.util.Iterator;
import java.util.LinkedList;

public class Puzzle {
	
	LinkedList<PuzzlePiece> pieces;
	int[][] board;
	
	public Puzzle() {
		pieces = new LinkedList<PuzzlePiece>();
		pieces.add(new PuzzlePiece(2,2,0,1,Color.RED));
		pieces.add(new PuzzlePiece(1,1,0,0));
		pieces.add(new PuzzlePiece(1,1,0,3));
		pieces.add(new PuzzlePiece(2,1,1,0));
		pieces.add(new PuzzlePiece(2,1,1,3));
		pieces.add(new PuzzlePiece(2,1,2,1));
		pieces.add(new PuzzlePiece(1,1,3,0));
		pieces.add(new PuzzlePiece(1,1,3,3));
		pieces.add(new PuzzlePiece(1,2,4,0));
		pieces.add(new PuzzlePiece(1,2,4,2));
		board = new int[5][4];
		
		for(PuzzlePiece i:pieces) {
			for(int k=0;k<i.getWidth();k++) {
				for(int j=0;j<i.getHeight();j++) {
					board[i.getRow()+j][i.getCol()+k]=1;
				}
			}
		}
		
	}
	
	public LinkedList<PuzzlePiece> getPieces() {return pieces;}
	
	public boolean moveLeft() {
		for(PuzzlePiece i:pieces) {
			if(i.isSelected) {
				int y = i.getRow();
				int x = i.getCol();
				
				if(x==0) {
					return false;
				}
				else {
					if(board[y][x-1]!=1) {
						if(i.getHeight() == 1) {
							i.moveLeft();
							return true;
						}
						else if(i.height==2 && board[y+1][x-1]!=1) {
							i.moveLeft();
							return true;
						}
						else {
							return false;
						}
					}
					else {
						return false;
					}
				}
			}
		}
		return false;
	}

}
