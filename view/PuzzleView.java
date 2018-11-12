package project.view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Image;
import java.util.Iterator;
import java.util.LinkedList;

import javax.swing.JPanel;

import project.model.Puzzle;
import project.model.PuzzlePiece;

/** 
 * Knows how to visually present the puzzle. 
 */
public class PuzzleView extends JPanel {

	/** around edges. */
	int offset = 5;
	int scale = 100;
	
	Puzzle p;
	
	public PuzzleView(Puzzle p) {
		this.p=p;
	}

	@Override
	public void paintComponent(Graphics g) {
		
		super.paintComponent(g);	
		g.setColor(Color.WHITE);
		g.fillRect(0, 0,  405, 505);
		
		for(PuzzlePiece i:this.p.getPieces()) {
			g.setColor(i.getColor());
			g.fillRect((i.getCol()*scale)+offset, (i.getRow()*scale)+offset, (i.getWidth()*scale)-offset, (i.getHeight()*scale)-offset);			
		}
		
	}
	
}
