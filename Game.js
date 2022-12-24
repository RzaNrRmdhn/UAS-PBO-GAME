class Entity{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.bullet = [];
    }

    attack(){
        let blt = new Bullet(hero.x, hero.y);
        this.bullet.push(blt)
    }
    
    moveRight(){ // Bergerak Kekanan. x ditambah
        if(this.x < 600){    
          this.x += 2;
        }
    }
    
    moveLeft(){ // Bergerak Kekanan. x dikurang
        if(this.x > 0){
          this.x -= 2;
        }
    }
    
    moveDown(){ // Bergerak Kekanan. y ditambah
        if(this.y < 600){
          this.y += 2;
        }
    }

    moveUp(){ // Bergerak Kekanan. xy dikurang
        if(this.y > 0){
          this.y -= 2;
        }
    }
}

class Map{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.monsters = [];
    }
    
    init(){
        createCanvas(this.width, this.height);
        for(let i = 0; i < 10; i++){
            var posY = random(this.width, 10);
            var posX = random(0, this.height);
            var mon = new Monster(posX, posY, 10, 10);
            this.monsters.push(mon)
        }
    }

    move(){

    }
}

class Bullet{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    show(){
        noStroke();
        fill('#F0A');
        ellipse(this.x, this.y, 5, 10);
        this.y -= 5;
    }
}
