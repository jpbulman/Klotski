package project.controller;

import javax.swing.JOptionPane;

import project.view.PuzzleApplication;

public class ResetConfirmController {
	public boolean confirm(PuzzleApplication app) {
		return JOptionPane.showConfirmDialog (app, "Do you really want to reset?") == JOptionPane.OK_OPTION;	
	}
}
