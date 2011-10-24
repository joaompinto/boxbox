document.addEventListener("DOMContentLoaded", function() {
    
    var canvas = document.getElementById('bbdemo');;
    
    var world = BB.createWorld(canvas);
    
    var myBox = world.createEntity({
        name: 'player',
        fixedRotation: true,
        width: .5
    });
    
    var MOVEMENT_FORCE = 50;
    
    myBox.onKeydown(function(e) {
        if (e.keyCode === 32) {
            this.applyImpulse(30);
            return false;
        }
        else if (e.keyCode === 37) {
            this.setForce(MOVEMENT_FORCE, 270);
            return false;
        }
        else if (e.keyCode === 39) {
            this.setForce(MOVEMENT_FORCE, 90);
            return false;
        }
    });
    
    myBox.onKeyup(function(e) {
        if (e.keyCode === 37) {
            this.setForce(0, 0);
            return false;
        }
        else if (e.keyCode === 39) {
            this.setForce(0, 0);
            return false;
        }
    });
    
    myBox.onStartContact(function(b) {
        console.log(this.name + ' touched ' + b.name);
    });

    myBox.onFinishContact(function(b) {
        console.log(this.name + ' pulled away from ' + b.name);
    });

    myBox.onImpact(function(b, p, t) {
        if (p > 1) {
            console.log('collision with ' + b.name + ' ' + p);
        }
        if (t > 1 || t < -1) {
            console.log('friction against ' + b.name + ' ' + t);
        }
    });

    world.createEntity({
        name: 'ground',
        type: 'static',
        width: 10,
        height: .1,
        friction: 1,
        x: 10,
        y: 13.22
    });
    
    world.createEntity({
        name: 'square',
        x: 13,
        y: 8
    });
    
    world.createEntity({
        name: 'circle',
        shape: 'circle',
        x: 10.5,
        y: 8
    });
    
    var poly = world.createEntity({
        name: 'poly',
        shape: 'polygon',
        x: 7,
        y: 8
    });

    var polyMovingUp = true;
    window.setInterval(function() {
        polyMovingUp = !polyMovingUp;
        if (polyMovingUp) {
            poly.setVelocity(5, 0);
        }
        else {
            poly.setVelocity(5, 180);
        }
    }, 2000);
    
}, false);
