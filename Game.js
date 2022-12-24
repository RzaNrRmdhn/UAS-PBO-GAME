let hero, mapps, lvl;
let screen = 0;

function setup(){
    hero = new Hero(200,300,30,30);
    mapps = new Map(600, 600);
    lvl = new Level(1, 0, 50);
    lvl.setLevel(1);
    mapps.init();
}

function draw(){
    if(screen == 0){
        background(220);
        fill(255);
    }
    else if(screen == 1){
        background(220);
        fill('#000');
        text(`Level: ${lvl.currentLevel}`, 50, 20);
        text(`Life: ${hero.life}`, 50, 40);
        text(`Score: ${hero.getScore()}`, 50, 60);
        hero.show();
        hero.move();

        for(let blt of hero.bullet){
            blt.show();
        }

        for(let mon of mapps.monsters){
            mon.show();

            if(dist(mon.x, mon.y, hero.x, hero.y) < 20){ // Mengecek apakah Posisi Hero dan Monster < dari 20
                mapps.monsters.splice(mapps.monsters.indexOf(mon), 1); // Menghapus Monster
            
                if(mon.color === 1){ // jika warna = 1
                    hero.increaseScore(); // Menambah Score

                    if(hero.getScore() % 5 == 0){
                        lvl.increaseLevel();
                    }
                }
                else{
                    hero.calculateLife(1);
                }
            }
        }

        if(hero.life <= 0){
            screen = 2
        }
    }
}

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

class Level{
    constructor(currentLevel, latestLevel, maxLevel){
        this.currentLevel = currentLevel;
        this.latestLevel = latestLevel;
        this.maxLevel = maxLevel;
    }

    setLevel(level){
        this.currentLevel = level;
    }

    getCurrentLevel(){
        return this.maxLevel;
    }

    increaseLevel(){
        this.currentLevel++;
    }
}

class Hero extends Entity{
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.life = 3;
        this.score = 0;
    }

    show(){
        fill('#F0A')
        ellipse(this.x, this.y, this.width, this.height);
        noFill();
    }

    move(){
        if (keyIsDown(87)) { // 87 == W
            hero.moveUp();
        }
        if (keyIsDown(83)) { // 83 == s
            hero.moveDown();
        }
        if (keyIsDown(65)) { // 65 == A
            hero.moveLeft();
        }
        if (keyIsDown(68)) { // 68 == D
            hero.moveRight();
        }
    }

    increaseScore(){
        this.score++;
    }

    getScore(){
        return this.score;
    }

    calculateLife(health){
        this.life -= health;
    }

    saveScore(){

    }
}

class Monster extends Entity{
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.life = 0;
        this.color = 0;
        this.effect = 0;
        this.type = random(0,2);
    }

    show(){ // Memunculkan Monster dengan bentuk lingkaran dan 2 tipe warna berbeda
        stroke(0);
        if(this.type > 1){
          fill('#ff0000'); // Kode Warna Merah
          rect(this.x, this.y, this.width, this.height);
          noFill()
         
        }else{
            this.color = 1;
            fill(random(0,255), random(0,255), random(0,255));
            rect(this.x, this.y, this.width, this.height);
            noFill()
        }
      }

    moveRandom(){

    }

    saveScore(){

    }

}
