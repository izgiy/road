/**
 * Created by parents on 30.4.16.
 */
 (function($) {

    $(document).ready(function() {
  
      function keydown(event) {
  
        if (player.pressed.indexOf(event.which) === -1) {
          switch (event.which) {
            case 37: // left
              player.vec_add(player.velocity, {
                x: -1,
                y: 0
              });
              break;
  
            case 38: // top
              player.vec_add(player.velocity, {
                x: 0,
                y: -1
              });
              break;
  
            case 39: // right
              player.vec_add(player.velocity, {
                x: 1,
                y: 0
              });
              break;
  
            case 40: // bottom
              player.vec_add(player.velocity, {
                x: 0,
                y: 1
              });
              break;
          }
  
          player.pressed.push(event.which);
        }
      }
  
      function keyup(event) {
        var index;
        if ((index = player.pressed.indexOf(event.which)) >= 0) {
          player.pressed.splice(index, 1);
          switch (event.which) {
            case 37: // left
              player.vec_sub(player.velocity, {
                x: -1,
                y: 0
              });
              break;
  
            case 38: // top
              player.vec_sub(player.velocity, {
                x: 0,
                y: -1
              });
              break;
  
            case 39: // right
              player.vec_sub(player.velocity, {
                x: 1,
                y: 0
              });
              break;
  
            case 40: // bottom
              player.vec_sub(player.velocity, {
                x: 0,
                y: 1
              });
              break;
          }
        }
      }
      window.addEventListener("keydown", keydown, false);
      window.addEventListener("keyup", keyup, false);
      var player = {
        selector: $('#player'),
        position: {
          x: 110,
          y: 110
        },
        target: {
          x: 0,
          y: 0
        },
        click: {
          x: 0,
          y: 0
        },
        normal: {
          x: 0,
          y: 0
        },
        way: {
          x: 0,
          y: 0
        },
        speed: 3,
        collapse: 5,
        pressed: [],
        velocity: {
          x: 0,
          y: 0
        },
        vec_add: function(a, b) {
          a.x += b.x;
          a.y += b.y;
        },
        vec_sub: function(a, b) {
          a.x -= b.x;
          a.y -= b.y;
        }
  
      };
  
      player.move = function(pos) {
        if (pos != undefined) {
          this.position.x = pos.x;
          this.position.y = pos.y;
        }
        this.selector.css("left", (this.position.x - 5) + 'px');
        this.selector.css("top", (this.position.y - 5) + 'px');
      };
      player.normalMove = function() {
        this.countWay();
        this.position.x = this.position.x + (this.normal.x * this.speed);
        this.position.y = this.position.y + (this.normal.y * this.speed);
        this.move();
      };
      player.keyMove = function() {
        if(this.velocity.x || this.velocity.y != 0){
        var normal = {x:0,y:0};
        normal.x = this.speed * this.velocity.x / Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2));
        normal.y = this.speed * this.velocity.y / Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2));
        this.vec_add(this.position, normal);
        this.move();
        }
      };
      player.setNormal = function(e) {
        this.click.x = e.clientX;
        this.click.y = e.clientY;
        this.target.x = this.click.x - this.position.x;
        this.target.y = this.click.y - this.position.y;
        this.normal.x = this.target.x / Math.sqrt(Math.pow(this.target.x, 2) + Math.pow(this.target.y, 2));
        this.normal.y = this.target.y / Math.sqrt(Math.pow(this.target.x, 2) + Math.pow(this.target.y, 2));
        this.countWay();
      };
      player.untilgo = function() {
        return this.way.x > this.collapse || this.way.y > this.collapse;
      };
  
      player.countWay = function() {
        //тут можно вычислять расстояние
        // Math.sqrt(this.position.x - this.click.x)+Math.sqrt(this.position.y - this.click.y)
        this.way.x = Math.abs(this.position.x - this.click.x);
        this.way.y = Math.abs(this.position.y - this.click.y);
      };
  
      player.move();
      var timer;
      var fps = 60;
  
      function step() {
        setTimeout(function() {
          requestAnimationFrame(step);
          if (player.untilgo()) {
            player.normalMove();
          }
          player.keyMove();
          
        }, 1000 / fps);
      }
      step();
      $(document).click(function(e) {
        player.setNormal(e);
      });
  
    });
  
  })
  (jQuery);
