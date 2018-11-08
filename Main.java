package project;

import java.awt.EventQueue;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import project.controller.QuitController;
import project.view.PuzzleApplication;

public class Main {

	/**
	 * Launch the application.
	 */
	public static void main2(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					PuzzleApplication frame = new PuzzleApplication();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	
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
