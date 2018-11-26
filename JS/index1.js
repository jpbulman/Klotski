class PuzzlePiece{
    constructor(width,height,topLeftCoordinate,color){
        this.width=width;
        this.height=height;
        this.topLeftCoordinate=topLeftCoordinate;
        this.color=color;
        this.ogColor = color;
        this.isSelected=false;
        this.listOfCoordinates=[];

        var row = this.topLeftCoordinate.getRow();
        var col = this.topLeftCoordinate.getCol();
        for(var i=0;i<this.width;i++){
            for(var j=0;j<this.height;j++){
                var c = new Coordinate(row+i,col+j);
                this.listOfCoordinates.push(c);
            }
        }

        if(width==2 && height==1){
            console.log(this.listOfCoordinates);
        }

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

    getListOfCoordinates(){
        return this.listOfCoordinates;
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

    moveLeft(){
        return this.topLeftCoordinate.moveLeft();
    }

    moveRight(){
        return this.topLeftCoordinate.moveRight();
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

    moveLeft(){
        for(var i=0;i<this.getPieces().length;i++){

            var currPiece = this.getPieces()[i];

            if(currPiece.getIsSelected()){

                var list = currPiece.getListOfCoordinates();
                for(var j=0;j<list.length;j++){
                    var currCoord = list[j];
                    if(currCoord.goingOutOfBoundsLeft()){
                        return false;
                    }
                }

                if(currPiece.moveLeft()){
                    return true;
                }
            }

        }
    }

    moveRight(){
        for(var i=0;i<this.getPieces().length;i++){

            var currPiece = this.getPieces()[i];

            if(currPiece.getIsSelected()){

                var list = currPiece.getListOfCoordinates();
                for(var j=0;j<list.length;j++){
                    var currCoord = list[j];
                    if(currCoord.goingOutOfBoundsRight()){
                        return false;
                    }
                }

                if(currPiece.moveRight()){
                    return true;
                }
            }

        }
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

    moveLeft(){
        this.c-=1;
        return true;
    }

    moveRight(){
        if(! this.goingOutOfBoundsRight()){
            this.c+=1;
            return true;
        }
        else{
            return false;
        }
    }

    moveUp(){
        if(! this.goingOutOfBoundsUp()){
            this.r-=1;
            return true;
        }
        else{
            return false;
        }
    }

    moveDown(){
        if(! this.goingOutOfBoundsDown()){
            this.r+=1;
            return true;
        }
        else{
            return false;
        }
    }

    goingOutOfBoundsUp(){
        return this.r==0;
    }

    goingOutOfBoundsDown(){
        return this.r==4;
    }

    goingOutOfBoundsLeft(){
        return this.c==0;
    }

    goingOutOfBoundsRight(){
        return this.c==3;
    }

}

class PuzzleApplication{

    constructor(puzzle){
        this.puzzle=puzzle;
        this.spc=new SelectPieceController(this,puzzle);
        this.mpc=new MovePieceController(this,puzzle);
    }

    selectPiece(event){
        this.spc.selectPiece(event.clientX,event.clientY);
    }

    movePieceLeft(){
        this.mpc.moveLeft();
    }

    movePieceRight(){
        this.mpc.moveRight();
    }

    paint(){
        var len = this.puzzle.getPieces().length;
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);

        for(var x=0;x<len;x++){
            var currPiece = this.puzzle.getPieces()[x];

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

class MovePieceController{
    constructor(app,puzzle){
        this.app=app;
        this.puzzle=puzzle;
    }

    moveLeft(){
        if(this.puzzle.moveLeft()){
            this.app.paint();
            return true;
        }
    }

    moveRight(){
        if(this.puzzle.moveRight()){
            this.app.paint();
            return true;
        }
    }

}

var mainPuzz = new Puzzle();

var app = new PuzzleApplication(mainPuzz);
app.paint();

function selectAPiece(event) {
    app.selectPiece(event);
}

function moveLeft(){
    app.movePieceLeft();
}

function moveRight(){
    app.movePieceRight();
}

function arrowKeys(event){
    var key = event.which || event.keyCode; 

    switch(key){
        case 37: moveLeft();break;
        case 39: moveRight();break;
        default: break;
    }
}

window.addEventListener('keydown',arrowKeys,false);