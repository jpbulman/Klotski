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
		
		for(PuzzlePiece p:pieces) {
			placePieceOnBoard(p);
		}
	}
	
	public void reset() {
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
		
		for(PuzzlePiece p:pieces) {
			placePieceOnBoard(p);
		}
	}
	
	public LinkedList<PuzzlePiece> getPieces() {return pieces;}
	
	private void clearPieceOnBoard(PuzzlePiece p) {
		for(Coordinate c:p.getCoordinates()) {
			board[c.getRow()][c.getCol()] = 0;
		}
	}
	
	private void placePieceOnBoard(PuzzlePiece p) {
		for(Coordinate c:p.getCoordinates()) {
			board[c.getRow()][c.getCol()] = 1;
		}
	}
	
	public boolean moveLeft(){
		for(PuzzlePiece i:pieces) {
			if(i.isSelected) {
				for(PuzzlePiece a:pieces) {
					if(a.piecesEqual(i)) {continue;}
					else if(i.willPiecesOverlapLeft(a) || i.willGoOutOfBoundsLeft()) {
						return false;
					}
				}
				clearPieceOnBoard(i);
				i.moveLeft();
				placePieceOnBoard(i);
				return true;
			}
		}
		return false;
	}
	
	public boolean moveRight() {
		for(PuzzlePiece i:pieces) {
			if(i.isSelected) {
				for(PuzzlePiece a:pieces) {
					if(a.piecesEqual(i)) {continue;}
					else if(i.willPiecesOverlapRight(a) || i.willGoOutOfBoundsRight()) {
						return false;
					}
				}
				clearPieceOnBoard(i);
				i.moveRight();
				placePieceOnBoard(i);
				return true;
			}
		}
		return false;
	}
	
	public boolean moveUp() {
		for(PuzzlePiece i:pieces) {
			if(i.isSelected) {
				for(PuzzlePiece a:pieces) {
					if(a.piecesEqual(i)) {continue;}
					else if(i.willPiecesOverlapUp(a) || i.willGoOutOfBoundsUp()) {
						return false;
					}
				}
				clearPieceOnBoard(i);
				i.moveUp();
				placePieceOnBoard(i);
				return true;
			}
		}
		return false;
	}
	
	public boolean moveDown() {
		for(PuzzlePiece i:pieces) {
			if(i.isSelected) {
				for(PuzzlePiece a:pieces) {
					if(a.piecesEqual(i)) {continue;}
					else if(i.willPiecesOverlapDown(a) || i.willGoOutOfBoundsDown()) {
						return false;
					}
				}
				clearPieceOnBoard(i);
				i.moveDown();
				placePieceOnBoard(i);
				return true;
			}
		}
		return false;
	}
	
	private void printBoard() {
		for(int i=0;i<5;i++) {
			for(int j=0;j<4;j++) {
				System.out.print(board[i][j]);
			}
			System.out.println();
		}
		System.out.println();
	}

}
