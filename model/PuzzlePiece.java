package project.model;

import java.awt.Color;
import java.util.LinkedList;

public class PuzzlePiece {
	
	int height;
	int width;
	
	//The coordinates of the top left part of the piece
	int col;
	int row;
	
	Color color;
	boolean isSelected;
	LinkedList<Coordinate> coords;
	
	public int getHeight() {
		return height;
	}

	public int getWidth() {
		return width;
	}

	public int getCol() {
		return col;
	}

	public int getRow() {
		return row;
	}

	public Color getColor() {
		return color;
	}
	
	public LinkedList<Coordinate> getCoordinates(){
		return coords;
	}
	
	public boolean piecesEqual(PuzzlePiece p) {
		return height==p.height && width==p.width && col==p.col && row==p.row;
	}
	
	public boolean willPiecesOverlapLeft(PuzzlePiece pp) {
		for(Coordinate c:pp.coords) {
			for(Coordinate q:this.coords) {
				if((q.getCol()-1 == c.getCol()) && (q.getRow()==c.getRow()))
					return true;
			}
		}
		
		return false;
	}
	
	public boolean willPiecesOverlapRight(PuzzlePiece pp) {
		for(Coordinate c:pp.coords) {
			for(Coordinate q:this.coords) {
				if((q.getCol()+1 == c.getCol()) && (q.getRow()==c.getRow()))
					return true;
			}
		}
		
		return false;
	}
	
	public boolean willPiecesOverlapUp(PuzzlePiece pp) {
		for(Coordinate c:pp.coords) {
			for(Coordinate q:this.coords) {
				if((q.getCol() == c.getCol()) && (q.getRow()-1==c.getRow()))
					return true;
			}
		}
		
		return false;
	}
	
	public boolean willPiecesOverlapDown(PuzzlePiece pp) {
		for(Coordinate c:pp.coords) {
			for(Coordinate q:this.coords) {
				if((q.getCol() == c.getCol()) && (q.getRow()+1==c.getRow()))
					return true;
			}
		}
		
		return false;
	}
	
	public boolean willGoOutOfBoundsLeft() {
		for(Coordinate c:coords) {
			if(c.getCol() == 0)
				return true;
		}
		return false;
	}
	
	public boolean willGoOutOfBoundsRight() {
		for(Coordinate c:coords) {
			if(c.getCol() == 3)
				return true;
		}
		return false;
	}
	
	public boolean willGoOutOfBoundsUp() {
		for(Coordinate c:coords) {
			if(c.getRow() == 0)
				return true;
		}
		return false;
	}
	
	public boolean willGoOutOfBoundsDown() {
		for(Coordinate c:coords) {
			if(c.getRow() == 4)
				return true;
		}
		return false;
	}

	public PuzzlePiece(int h,int w,int r,int c,Color color){
		this.height = h;
		this.width = w;
		this.col = c;
		this.row = r;
		this.color = color;
		this.isSelected=false;
		this.coords = new LinkedList<Coordinate>();
		
		for(int i=this.row;i<this.row+this.height;i++) {
			for(int j=this.col;j<this.col+this.width;j++) {
				this.coords.add(new Coordinate(i,j));
			}
		}
	}
	
	public PuzzlePiece(int h,int w,int r,int c){
		this.height = h;
		this.width = w;
		this.col = c;
		this.row = r;
		this.color = new Color(0xD2B48C);
		this.isSelected=false;
		this.coords = new LinkedList<Coordinate>();
		
		for(int i=this.row;i<this.row+this.height;i++) {
			for(int j=this.col;j<this.col+this.width;j++) {
				this.coords.add(new Coordinate(i,j));
			}
		}
	}
	
	public void selectThisPiece() {
		this.isSelected=true;
		this.color = Color.BLUE;
	}
	
	public void deselect() {
		this.isSelected=false;
		if(this.width == 2 && this.height == 2)
			this.color = Color.RED;
		else
			this.color = new Color(0xD2B48C);
	}
	
	public boolean isSelected() {
		return this.isSelected;
	}
	
	public void moveLeft() {
		this.col-=1;
		
		for(Coordinate c:coords) {
			c.moveLeft();
		}
	}
	
	public void moveRight() {
		this.col+=1;
		
		for(Coordinate c:coords) {
			c.moveRight();
		}
	}
	
	public void moveUp() {
		this.row-=1;
		
		for(Coordinate c:coords) {
			c.moveUp();
		}
	}
	
	public void moveDown() {
		this.row+=1;
		
		for(Coordinate c:coords) {
			c.moveDown();
		}
	}
	
	public boolean pieceIsInWinPos() {
		return width == 2 && height == 2 && row == 3 && col == 1;
	}
}
