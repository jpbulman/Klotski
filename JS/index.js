class PuzzlePiece{
    constructor(width,height,topLeftCoordinate,color){
        this.width=width;
        this.height=height;
        this.topLeftCoordinate=topLeftCoordinate;
        this.color=color;
        this.ogColor = color;
        this.isSelected=false;
        this.listOfCoordinates=[];

        if(topLeftCoordinate){
            var row = this.topLeftCoordinate.getRow();
            var col = this.topLeftCoordinate.getCol();
    
            for(var i=row;i<row+this.height;i++) {
                for(var j=col;j<col+this.width;j++) {
                    this.listOfCoordinates.push(new Coordinate(i,j));
                }
            }
        }

    }

    makeCopyOf(piece){
        this.width = piece.getWidth()
        this.height = piece.getHeight()
        this.topLeftCoordinate = new Coordinate(0,0);
        this.topLeftCoordinate.makeCopyOf(piece.getTLCoordinate())
        this.color = piece.getColor();
        this.ogColor = (this.width==2&&this.height==2)? '#e83c3c':'#DEB887';

        var row = this.topLeftCoordinate.getRow();
        var col = this.topLeftCoordinate.getCol();

        for(var i=row;i<row+this.height;i++) {
            for(var j=col;j<col+this.width;j++) {
                this.listOfCoordinates.push(new Coordinate(i,j));
            }
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
        this.topLeftCoordinate.moveLeft();

        for(var i=0;i<this.listOfCoordinates.length;i++){
            this.listOfCoordinates[i].moveLeft();
        }
    }

    moveRight(){
        this.topLeftCoordinate.moveRight();

        for(var i=0;i<this.listOfCoordinates.length;i++){
            this.listOfCoordinates[i].moveRight();
        }
    }
    
    moveUp(){
        this.topLeftCoordinate.moveUp();

        for(var i=0;i<this.listOfCoordinates.length;i++){
            this.listOfCoordinates[i].moveUp();
        }
    }

    moveDown(){
        this.topLeftCoordinate.moveDown();

        for(var i=0;i<this.listOfCoordinates.length;i++){
            this.listOfCoordinates[i].moveDown();
        }
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

    makeCopyOf(p){
        this.pieces = []
        var pPieces = p.getPieces()
        for(var i in pPieces){
            var newp = new PuzzlePiece(null,null,null,null);
            newp.makeCopyOf(pPieces[i])
            this.pieces.push(newp)
        }
    }

    makeNearWin(){
        this.pieces = [
            (new PuzzlePiece(2,2,new Coordinate(3,1),"#e83c3c"))
        ];
    }

    reset(){
        var n = new Puzzle();
        this.pieces = n.getPieces();
    }

    addPiece(p){
        this.pieces.push(p);
    }

    getPieces(){
        return this.pieces;
    }

    getPiecesNotSelected(){
        var list = [];
        for(var x=0;x<this.pieces.length;x++){
            if(!this.pieces[x].isSelected){
                list.push(this.pieces[x]);
            }
        }
        return list;
    }

    oneFromWinning(){
        var list = this.getPieces();
        for(var i=0;i<list.length;i++){
            if(list[i].getWidth()==2&&list[i].getHeight()==2&&list[i].getTLCoordinate().getCol()==1&&list[i].getTLCoordinate().getRow()==3){
                return true;
            }
        }

        return false;
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

                for(var k=0;k<this.getPiecesNotSelected().length;k++){
                    for(var l=0;l<currPiece.getListOfCoordinates().length;l++){
                        var curr = currPiece.getListOfCoordinates()[l];
                        var other = this.getPiecesNotSelected()[k];

                        if(curr.willIntersectLeft(other.getListOfCoordinates())){
                            return false;
                        }
                    }
                }

                currPiece.moveLeft();
                return true;
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

                for(var k=0;k<this.getPiecesNotSelected().length;k++){
                    for(var l=0;l<currPiece.getListOfCoordinates().length;l++){
                        var curr = currPiece.getListOfCoordinates()[l];
                        var other = this.getPiecesNotSelected()[k];

                        if(curr.willIntersectRight(other.getListOfCoordinates())){
                            return false;
                        }
                    }
                }

                currPiece.moveRight();
                return true;
            }

        }
    }

    moveDown(){
        for(var i=0;i<this.getPieces().length;i++){

            var currPiece = this.getPieces()[i];

            if(currPiece.getIsSelected()){

                if(this.oneFromWinning()&&currPiece.getHeight()==2&&currPiece.getWidth()==2){
                    currPiece.moveDown();
                    alert("You win!");
                    this.reset()
                }

                var list = currPiece.getListOfCoordinates();
                for(var j=0;j<list.length;j++){
                    var currCoord = list[j];
                    if(currCoord.goingOutOfBoundsDown()){
                        return false;
                    }
                }

                for(var k=0;k<this.getPiecesNotSelected().length;k++){
                    for(var l=0;l<currPiece.getListOfCoordinates().length;l++){
                        var curr = currPiece.getListOfCoordinates()[l];
                        var other = this.getPiecesNotSelected()[k];

                        if(curr.willIntersectDown(other.getListOfCoordinates())){
                            return false;
                        }
                    }
                }

                currPiece.moveDown();
                return true;
            }

        }
    }

    moveUp(){
        for(var i=0;i<this.getPieces().length;i++){

            var currPiece = this.getPieces()[i];

            if(currPiece.getIsSelected()){

                var list = currPiece.getListOfCoordinates();
                for(var j=0;j<list.length;j++){
                    var currCoord = list[j];
                    if(currCoord.goingOutOfBoundsUp()){
                        return false;
                    }
                }

                for(var k=0;k<this.getPiecesNotSelected().length;k++){
                    for(var l=0;l<currPiece.getListOfCoordinates().length;l++){
                        var curr = currPiece.getListOfCoordinates()[l];
                        var other = this.getPiecesNotSelected()[k];

                        if(curr.willIntersectUp(other.getListOfCoordinates())){
                            return false;
                        }
                    }
                }

                currPiece.moveUp();
                return true;
            }

        }
    }

    deselectAll(){
        for(var i in this.pieces){
            this.pieces[i].deselect()
        }
    }

}

class Coordinate{
    constructor(r,c){
        this.r=r;
        this.c=c;
    }

    makeCopyOf(coord){
        this.r = coord.getRow();
        this.c = coord.getCol()
    }

    getRow(){
        return this.r;
    }

    getCol(){
        return this.c;
    }

    moveLeft(){
        this.c-=1;
    }

    moveRight(){
        this.c+=1;
    }

    moveDown(){
        this.r+=1;
    }

    moveUp(){
        this.r-=1;
    }

    goingOutOfBoundsLeft(){
        return this.c==0;
    }

    goingOutOfBoundsRight(){
        return this.c==3;
    }

    goingOutOfBoundsUp(){
        return this.r==0;
    }

    goingOutOfBoundsDown(){
        return this.r==4;
    }

    willIntersectLeft(listOfCoordinates){
        for(var i=0;i<listOfCoordinates.length;i++){
            var curr = listOfCoordinates[i];

            if(curr.getCol()==this.c-1&&curr.getRow()==this.r){
                return true;
            }
        }
        
        return false
    }

    willIntersectRight(listOfCoordinates){
        for(var i=0;i<listOfCoordinates.length;i++){
            var curr = listOfCoordinates[i];

            if(curr.getCol()==this.c+1&&curr.getRow()==this.r){
                return true;
            }
        }
   
        return false
    }

    willIntersectUp(listOfCoordinates){
        for(var i=0;i<listOfCoordinates.length;i++){
            var curr = listOfCoordinates[i];

            if(curr.getCol()==this.c&&curr.getRow()==this.r-1){
                return true;
            }
        }
   
        return false
    }

    willIntersectDown(listOfCoordinates){
        for(var i=0;i<listOfCoordinates.length;i++){
            var curr = listOfCoordinates[i];

            if(curr.getCol()==this.c&&curr.getRow()==this.r+1){
                return true;
            }
        }
   
        return false
    }

}

class PuzzleApplication{

    constructor(puzzle){
        this.puzzle=puzzle;
        this.spc=new SelectPieceController(this,puzzle);
        this.mpc=new MovePieceController(this,puzzle);
        this.rpc = new ResetPuzzleController(this,puzzle);
        
        //A stack that holds Puzzle objects, a timeline of the game. Pop to undo, push on when a move is requested
        this.undoMoveController = [];
    }

    makeWinState(){
        this.puzzle.makeNearWin();
    }

    /**
     * Changes the move counter by delta
     * @param {int} delta - A number to change the move counter by
     * @returns {void} - Nothing
     */
    deltaMC(delta){
        var mc = document.getElementById("moveCount")
        mc.setAttribute("data-mc",parseInt(mc.getAttribute("data-mc"))+delta)
        mc.innerHTML = "Move count: "+mc.getAttribute("data-mc")
    }

    resetMoveCounter(){
        var mc = document.getElementById("moveCount")
        mc.setAttribute("data-mc",0)
        mc.innerHTML = "Move count: "+mc.getAttribute("data-mc")
    }

    selectPiece(event){
        this.spc.selectPiece(event.clientX,event.clientY);
    }

    selectPieceIndex(i){
        this.spc.selectPieceIndex(i);
    }

    saveCurrentState(){
        //Section is for undoing and redoing
        //Make a new puzzle
        var x = new Puzzle();
        //Set it to the current state to essentially just make a copy
        x.makeCopyOf(this.puzzle)
        //Add it to the stack of states we currently have
        this.undoMoveController.push(x);
    }

    movePieceLeft(){
        this.saveCurrentState()

        if(this.mpc.moveLeft()){
            return true;
        }
        else{
            //If it is an invalid move, don't store the state
            this.undoMoveController.pop()
            return false;
        }
    }

    movePieceRight(){
        this.saveCurrentState()
        
        if(this.mpc.moveRight()){
            return true
        }
        else{
            this.undoMoveController.pop()
            return false
        }
    }

    movePieceDown(){
        this.saveCurrentState()
        
        if(this.mpc.moveDown()){
            return true
        }
        else{
            this.undoMoveController.pop()
            return false;
        }
    }

    movePieceUp(){
        this.saveCurrentState()
        
        if(this.mpc.moveUp()){
            return true
        }
        else{
            this.undoMoveController.pop()
            return false;
        }
    }

    resetPuzzle(){
        //Reset the previous moves to nothing
        this.undoMoveController = []
        return this.rpc.reset();
    }

    changePuzzle(p){
        this.puzzle=p;
        this.paint();
    }

    undoMove(){
        if(this.undoMoveController.length!=0){
            this.puzzle = this.undoMoveController.pop();
            this.puzzle.deselectAll()
            this.spc=new SelectPieceController(this,this.puzzle);
            this.mpc=new MovePieceController(this,this.puzzle);
            this.rpc = new ResetPuzzleController(this,this.puzzle);
            this.deltaMC(-1)
            this.paint()
        }
    }

    paint(){
        var offset = 5;

        var len = this.puzzle.getPieces().length;
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);

        for(var x=0;x<len;x++){
            var currPiece = this.puzzle.getPieces()[x];

            ctx.fillStyle=currPiece.getColor();

            ctx.fillRect((currPiece.getTLCoordinate().getCol()*150)+offset,(currPiece.getTLCoordinate().getRow()*150)+offset, (
                currPiece.getWidth()*150)-offset, (currPiece.getHeight()*150)-offset);
            ctx.stroke();
        }

        ctx.fillStyle = "#D3D3D3"
        ctx.fillRect(155,canvas.height-5,295,5)
        ctx.stroke()
    }

}

class SelectPieceController{

    constructor(app,puzzle){
        this.app=app;
        this.puzzle=puzzle;
    }

    selectPiece(x,y){

        var offset = 5;

        for(var i=0;i<this.puzzle.getPieces().length;i++){

            var currPiece = this.puzzle.getPieces()[i];

            var coord = currPiece.getTLCoordinate();
            var tlcoordX = (coord.getCol()*150)+5;
            var tlcoordY = (coord.getRow()*150)+5;
            var brcoordX = (tlcoordX + (150*currPiece.getWidth()))-offset;
            var brcoordY = (tlcoordY + (150*currPiece.getHeight()))-offset;

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

    selectPieceIndex(index){

        for(var i=0;i<this.puzzle.getPieces().length;i++){
            if(this.puzzle.getPieces()[i].getIsSelected()){
                this.puzzle.getPieces()[i].deselect();
            }
        }

        this.puzzle.getPieces()[index].selectPiece();
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

    moveUp(){
        if(this.puzzle.moveUp()){
            this.app.paint();
            return true;
        }
    }

    moveDown(){
        if(this.puzzle.moveDown()){
            this.app.paint();
            return true;
        }
    }

}

class ResetPuzzleController{
    constructor(app,puzzle){
        this.app=app;
        this.puzzle=puzzle;
    }

    reset(){
        this.puzzle.reset();
        this.app.paint();
    }
}

var mainPuzz = new Puzzle();

var app = new PuzzleApplication(mainPuzz);
app.paint();

function selectAPiece(event) {
    app.selectPiece(event);
}

function moveLeft(){
    var m = app.movePieceLeft()
    if(m){
        app.deltaMC(1)
        return m;
    }
    else{
        return m;
    }
}

function moveRight(){
    var m = app.movePieceRight()
    if(m){
        app.deltaMC(1)
        return m;
    }
    else{
        return m;
    }
}

function moveUp(){
    var m = app.movePieceUp()
    if(m){
        app.deltaMC(1)
        return m;
    }
    else{
        return m;
    }
}

function moveDown(){
    var m = app.movePieceDown()
    if(m){
        app.deltaMC(1)
        return m;
    }
    else{
        return m;
    }
}

function undo(){
    app.undoMove()
}

function resetPuzzle(){
    app.resetPuzzle();
    app.resetMoveCounter()
}

function arrowKeys(event){
    var key = event.which || event.keyCode;

    switch(key){
        case 38: moveUp();break;
        case 37: moveLeft();break;
        case 40: moveDown();break;
        case 39: moveRight();break;
        case 119: moveUp();break;
        case 97: moveLeft();break;
        case 115: moveDown();break;
        case 100: moveRight();break;
        default: break;
    }
}

function rando(){

    // while(!mainPuzz.oneFromWinning()){

        var randIndex = Math.floor((Math.random()*mainPuzz.getPieces().length))

        app.selectPieceIndex(randIndex);

        var randMove = Math.floor((Math.random * 4))

        switch(randMove){
            case 0: moveLeft();break;
            case 1: moveRight();break;
            case 2: moveUp();break;
            case 3: moveDown();break;
        }

    // }

}