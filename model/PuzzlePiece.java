package project.model;

import java.awt.Color;

public class PuzzlePiece {
	
	int height;
	int width;
	
	//The coordinates of the top left part of the piece
	int col;
	int row;
	
	Color color;
	boolean isSelected;
	
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

	PuzzlePiece(int h,int w,int r,int c,Color color){
		this.height = h;
		this.width = w;
		this.col = c;
		this.row = r;
		this.color = color;
		this.isSelected=false;
	}
	
	PuzzlePiece(int h,int w,int r,int c){
		this.height = h;
		this.width = w;
		this.col = c;
		this.row = r;
		this.color = Color.yellow;
		this.isSelected=false;
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
			this.color = Color.yellow;
	}
	
	public boolean isSelected() {
		return this.isSelected;
	}
	
	public void moveLeft() {
		this.col-=1;
	}
	
	public void moveRight() {
		this.col+=1;
	}
	
	public void moveUp() {
		this.row-=1;
	}
	
	public void moveDown() {
		this.row+=1;
	}

}
