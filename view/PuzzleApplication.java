package project.view;

import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

import project.controller.MoveController;
import project.controller.SelectPieceController;
import project.model.Puzzle;

import javax.swing.GroupLayout;
import javax.swing.GroupLayout.Alignment;
import java.awt.Dimension;
import java.awt.Color;
import javax.swing.JButton;
import javax.swing.LayoutStyle.ComponentPlacement;
import javax.swing.JLabel;

public class PuzzleApplication extends JFrame {

	private JPanel contentPane;
	
	PuzzleView pv;
	
	int moveCount;
	JLabel moveLabel;
	
	public PuzzleView getPuzzleView() {return this.pv;}

	public void moveCountPlusPlus() {
		moveCount++;
		moveLabel.setText(String.valueOf(moveCount));
	}

	/**
	 * Create the frame.
	 */
	public PuzzleApplication() {
		
		moveCount = 0;
		
		Puzzle mainPuzzle = new Puzzle();
		
		setTitle("PuzzleApplication");
		setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
		setBounds(100, 100, 600, 600);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		
		PuzzleView panel = new PuzzleView(mainPuzzle);
		this.pv=panel;
		panel.setBackground(Color.GRAY);
		panel.setSize(new Dimension(400, 500));
		
		SelectPieceController spc = new SelectPieceController(mainPuzzle,PuzzleApplication.this);
		panel.addMouseListener(spc);
		
		MoveController mc = new MoveController(mainPuzzle,PuzzleApplication.this);
		
		JButton btnReset = new JButton("Reset");
		
		JButton button = new JButton("^");
		button.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				mc.moveUp();
			}
	    }); 
		
		JButton button_1 = new JButton("<");
		button_1.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				mc.moveLeft();
			}
	    }); 
		
		JButton button_2 = new JButton(">");
		button_2.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				mc.moveRight();
			}
	    }); 
		
		JButton btnV = new JButton("V");
		btnV.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				mc.moveDown();
			}
	    }); 
		
		JLabel lblMoves = new JLabel("Moves:");
	
		moveLabel = new JLabel(String.valueOf(moveCount));
		
		GroupLayout gl_contentPane = new GroupLayout(contentPane);
		gl_contentPane.setHorizontalGroup(
			gl_contentPane.createParallelGroup(Alignment.LEADING)
				.addGroup(gl_contentPane.createSequentialGroup()
					.addContainerGap()
					.addComponent(panel, GroupLayout.PREFERRED_SIZE, 429, GroupLayout.PREFERRED_SIZE)
					.addGroup(gl_contentPane.createParallelGroup(Alignment.LEADING)
						.addGroup(gl_contentPane.createSequentialGroup()
							.addPreferredGap(ComponentPlacement.RELATED)
							.addGroup(gl_contentPane.createParallelGroup(Alignment.LEADING)
								.addGroup(gl_contentPane.createSequentialGroup()
									.addComponent(button_1)
									.addGap(33)
									.addComponent(button_2))
								.addGroup(gl_contentPane.createSequentialGroup()
									.addComponent(lblMoves)
									.addGap(18)
									.addComponent(moveLabel))
								.addGroup(gl_contentPane.createSequentialGroup()
									.addGap(18)
									.addComponent(btnReset))))
						.addGroup(gl_contentPane.createSequentialGroup()
							.addGap(51)
							.addComponent(btnV))
						.addGroup(gl_contentPane.createSequentialGroup()
							.addGap(52)
							.addComponent(button)))
					.addContainerGap(16, Short.MAX_VALUE))
		);
		gl_contentPane.setVerticalGroup(
			gl_contentPane.createParallelGroup(Alignment.TRAILING)
				.addGroup(gl_contentPane.createSequentialGroup()
					.addContainerGap()
					.addGroup(gl_contentPane.createParallelGroup(Alignment.TRAILING)
						.addComponent(panel, Alignment.LEADING, GroupLayout.DEFAULT_SIZE, 538, Short.MAX_VALUE)
						.addGroup(gl_contentPane.createSequentialGroup()
							.addGroup(gl_contentPane.createParallelGroup(Alignment.BASELINE)
								.addComponent(lblMoves)
								.addComponent(moveLabel))
							.addGap(195)
							.addComponent(button)
							.addPreferredGap(ComponentPlacement.RELATED)
							.addGroup(gl_contentPane.createParallelGroup(Alignment.LEADING)
								.addComponent(button_2)
								.addComponent(button_1))
							.addPreferredGap(ComponentPlacement.RELATED)
							.addComponent(btnV)
							.addPreferredGap(ComponentPlacement.RELATED, 216, Short.MAX_VALUE)
							.addComponent(btnReset)))
					.addContainerGap())
		);
		contentPane.setLayout(gl_contentPane);
	}
}
