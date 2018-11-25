class PuzzlePiece{
    constructor(width,height,topLeftCoordinate,color){
        this.width=width;
        this.height=height;
        this.topLeftCoordinate=topLeftCoordinate;
        this.color=color;
        this.ogColor = color;
        this.isSelected=false;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    getTLCoordinate(){
        return this.topLeftCoordinate;
    }

    getColor(){
        return this.color;
    }

    selectPiece(){
        this.color="#4d4dff";
        this.isSelected=true;
    }

    deselect(){
        this.color=this.ogColor;
        this.isSelected=false;
    }

    getIsSelected(){
        return this.isSelected;
    }
    
}

class Puzzle{
    constructor(){
        this.pieces = [
        (new PuzzlePiece(1,2,new Coordinate(0,0),"#DEB887")),
        (new PuzzlePiece(2,2,new Coordinate(0,1),"#e83c3c")),
        (new PuzzlePiece(1,2,new Coordinate(0,3),"#DEB887")),
        (new PuzzlePiece(1,2,new Coordinate(2,0),"#DEB887")),
        (new PuzzlePiece(1,2,new Coordinate(2,3),"#DEB887")),
        (new PuzzlePiece(1,1,new Coordinate(2,1),"#DEB887")),
        (new PuzzlePiece(1,1,new Coordinate(2,2),"#DEB887")),
        (new PuzzlePiece(1,1,new Coordinate(3,1),"#DEB887")),
        (new PuzzlePiece(1,1,new Coordinate(3,2),"#DEB887")),
        (new PuzzlePiece(2,1,new Coordinate(4,1),"#DEB887"))
        ];
    }

    addPiece(p){
        this.pieces.push(p);
    }

    getPieces(){
        return this.pieces;
    }

}

class Coordinate{
    constructor(r,c){
        this.r=r;
        this.c=c;
    }

    getRow(){
        return this.r;
    }

    getCol(){
        return this.c;
    }

}

class PuzzleApplication{

    constructor(puzzle){
        this.puzzle=puzzle;
    }

    paint(){
        var len = this.puzzle.getPieces().length;

        for(var x=0;x<len;x++){
            var currPiece = this.puzzle.getPieces()[x];
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");

            ctx.fillStyle=currPiece.getColor();

            ctx.fillRect((currPiece.getTLCoordinate().getCol()*150)+5,(currPiece.getTLCoordinate().getRow()*150)+5, (
                currPiece.getWidth()*150)-5, (currPiece.getHeight()*150)-5);
            ctx.stroke();
        }
    }

}

class SelectPieceController{

    constructor(app,puzzle){
        this.app=app;
        this.puzzle=puzzle;
    }

    selectPiece(x,y){

        for(var i=0;i<this.puzzle.getPieces().length;i++){

            var currPiece = this.puzzle.getPieces()[i];

            var coord = currPiece.getTLCoordinate();
            var tlcoordX = (coord.getCol()*150)+5;
            var tlcoordY = (coord.getRow()*150)+5;
            var brcoordX = (tlcoordX + (150*currPiece.getWidth()))-5;
            var brcoordY = (tlcoordY + (150*currPiece.getHeight()))-5;

            if(x < brcoordX && x > tlcoordX && y < brcoordY && y > tlcoordY){
                if(currPiece.getIsSelected()){
                    currPiece.deselect();
                }
                else{
                    currPiece.selectPiece();
                }
            }
            else{
                currPiece.deselect();
            }

        }

        this.app.paint();
    }

}

var mainPuzz = new Puzzle();

var main = new PuzzleApplication(mainPuzz);
main.paint();

function showCoords(event) {
    var c = new SelectPieceController(main,mainPuzz);
    c.selectPiece(event.clientX,event.clientY);
}