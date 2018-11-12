package project.model;

public class Coordinate {

	int row;
	int col;
	
	public Coordinate(int r,int c) {
		this.row=r;
		this.col=c;
	}
	
	public boolean equal(Coordinate c) {
		return this.row==c.row && this.col == c.col;
	}
	
	public void print() {
		System.out.println(row+" "+col);
	}
	
	public int getRow() {return row;}
	
	public int getCol() {return col;}
	
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
