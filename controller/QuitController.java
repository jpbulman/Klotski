package project.controller;

import javax.swing.JOptionPane;

import project.view.PuzzleApplication;

public class QuitController {
	public boolean confirm(PuzzleApplication app) {
		return JOptionPane.showConfirmDialog (app, "Do you want to exit PuzzleApp?") == JOptionPane.OK_OPTION;	
	}
}