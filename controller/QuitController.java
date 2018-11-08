package project.controller;

import javax.swing.JOptionPane;

import project.view.PuzzleApplication;

public class QuitController {
	public boolean confirm(PuzzleApplication app) {
		return JOptionPane.showConfirmDialog (app, "Do you wish to exit PuzzleApp?") == JOptionPane.OK_OPTION;	
	}
}