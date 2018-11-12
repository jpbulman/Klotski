package project;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import project.controller.QuitController;
import project.view.PuzzleApplication;
import project.view.PuzzleView;

public class Main {
	
	public static void main(String[] args) {
		final PuzzleApplication app = new PuzzleApplication();
		
		app.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				if (new QuitController().confirm(app)) {
					app.dispose();
				}
			}      
		});
		
		app.setVisible(true);
	}
	
	
}
