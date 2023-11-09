package display;

import java.awt.*;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;
import javax.swing.*;

import Charactor.*;
import Element.Element;
import event.Event;

public class Game extends JPanel implements KeyListener{

	private static final long serialVersionUID = 1L;
	
	private static int speed = 50,dogSize = 60 ,waveHeight = 50;
	private static int base=400,xStart = 1000;
	private long point = 0,lastPress=0;
	private BufferedImage img;
	
	private Dog dog = new Dog(100,base-50);
	static Display display;
//	------------------Wave SIze ----------------------------
	private Wave[] waveSet = makeWave(4);
//--------------------Cloud--------------------------------
	private Environment[] envSet = makeEnv(2,Environment.CLOUD);
	private Environment building = new Environment(xStart-100,base-150,this,Environment.BUILDING,4);
	
	public Game(){
		this.setBounds(0,0,1000,600);
		this.addKeyListener(this);
		this.setLayout(null);
		this.setFocusable(true);
	}
	
	@Override
	public void paint(Graphics g) {
			try {
				super.paint(g);
				// Graphics g2 = (Graphics) g;
				this.drawBackground(g);
				//---POINT----
				g.setFont(Element.getFont(30));
				g.setColor(Color.white);
				g.drawString("Point : "+point,750,40);
				//--- dog --
				g.setColor(Color.RED);
				drawDogHealth(g);
				g.drawImage(dog.getImage(),dog.x,dog.y,dogSize,dogSize, null);
				//----Wave----
				for(Wave item : waveSet) {
					drawWave(item,g);
				}
				this.point+=1;
			} catch (Exception e) {
				e.printStackTrace();
			}
	}

	private void drawBackground(Graphics g) throws IOException {
			g.drawImage(ImageIO.read(new File("img\\sky.png")),0,0,2000,1000, null);
			// g.drawImage(building.getImage(),building.x,building.y,500,200,null);
			g.drawImage(ImageIO.read(new File("img\\dir.png")),0,base+10,2000,220, null);
			// for(Environment item:envSet) {
			// 	g.drawImage(item.getImage(),item.x,item.y,250,160, null);
			// }
	}
	
	private void drawDogHealth(Graphics g) {
		try {
			g.drawImage(ImageIO.read(new File("img\\heart.png")),10,20, 20,20,null);
			// g.setStroke(new BasicStroke(18.0f));
			// g.setStroke
			g.setColor(new Color(241, 98, 69));
			// g.drawLine(60, 30,60+dog.health,30);	
			// g.drawRect(60, 30, 60+dog.health, 30);
			g.fill3DRect(50, 15, 60+dog.health, 30, getFocusTraversalKeysEnabled());
			g.setColor(Color.white);
			// g.setStroke(new BasicStroke(6.0f));
			g.drawRect(50,15, 240,30);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private Wave[] makeWave(int size) {
		Wave[] waveSet = new Wave[size];
		int far = 500;
		for(int i=0;i<size;i++) {
			waveSet[i] = new Wave(xStart+far,base,speed,this);
			far+=500;
		}
		return waveSet;
	}
	
	private Environment[] makeEnv(int size,int eType){
		Environment[] envSet = new Environment[size];
		int far = 0;
		for(int i=0;i<size;i++) {
			envSet[i] = new Environment(xStart+far,20,this,eType,10);
			far+=600;
		}
		return envSet;
	}
	
	private void drawWave(Wave wave,Graphics g) {
			g.drawImage(wave.getImage(),wave.x ,(wave.y-waveHeight),40,waveHeight+10,null);
			if(Event.checkHit(dog,wave,dogSize,waveHeight)){
					g.setColor(new Color(241, 98, 69));
					g.fillRect(0, 0,1000,1000);			
					dog.health-=20;
					if(dog.health<=0) {
						display.endGame(this.point);
						dog.health = new Dog().health;
						this.point = 0;	
					}
			}
	}
	
	@Override
	public void keyPressed(KeyEvent e) {
		if(System.currentTimeMillis() - lastPress > 600) {
			if(e.getKeyCode()==32||e.getKeyCode()==38) {
					dog.jump(this);
					lastPress = System.currentTimeMillis();
			}
		}
	}

	@Override
	public void keyTyped(KeyEvent e) {
		//---
	}

	@Override
	public void keyReleased(KeyEvent e) {
		//---
	}
	
	public static void main(String[] arg) {
		 display = new Display();
	}
}
