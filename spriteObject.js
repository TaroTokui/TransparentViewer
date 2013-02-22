
var SpriteObject = function(){}

var mapC;

var group;
var time = 0;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

    // create sprites
    
    // スプライトを格納する変数
    group = new THREE.Object3D();
    
    // textureを読み込む
    var mapA = THREE.ImageUtils.loadTexture( "cars/fit.png", undefined, function() { createHUDSprites() } );
    
    // add 2d-sprites
    var createHUDSprites = function() {
        
        var scaleX = mapA.image.width;
        var scaleY = mapA.image.height;
        
        var materialA1 = new THREE.SpriteMaterial( { map: mapA, alignment: THREE.SpriteAlignment.topLeft, opacity: 0.99 } );
        
        var sprite = new THREE.Sprite( materialA1 );
        sprite.position.set( 200, 200, 0 );
        sprite.scale.set( scaleX, scaleY, 1 );
        group.add( sprite );
        
    }
    
    scene.add( group );
    
    for ( var c = 0; c < group.children.length; c ++ ) {
        
        var sprite = group.children[ c ];
        var material = sprite.material;
        var scale = Math.sin( time + sprite.position.x * 0.01 ) * 0.3 + 1.0;
        
        var imageWidth = 1;
        var imageHeight = 1;
        
        if ( material.map && material.map.image && material.map.image.width ) {
            
            imageWidth = material.map.image.width;
            imageHeight = material.map.image.height;
            
        }
        
        // マウスの位置に移動する
        sprite.position.set( mouseX - imageWidth/2 , mouseY - imageHeight/2, 0 );
        
    }
