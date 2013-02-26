//////////////////////////////////////////////////////////////////
// スプライトを管理するクラス
// 初期設定、値の更新、get関数による値の取得が行える
// created by Taro Tokui 2013/02/26
//////////////////////////////////////////////////////////////////

var SpriteObject = function(){
    
    var windowHalfX;
    var windowHalfY;
    
    // 回転サイズ、1を超えると画面からはみ出るよ
    var orbitScaleX;
    var orbitScaleY;
    // 画像が回転する軌道の長軸と短軸の長さ
    var orbitX; // 画面より少し小さく
    var orbitY;
    // 画像中心と回転中心のずれ
    var offsetX;
    var offsetY;
    // 画像の最小サイズ
    var minImageSize;
    
    // 現在の回転角を保持する
    var theta;
  
    // 画像情報を保持
    var sprite;
    var material;
    
    // スプライトを格納する変数
    var group;

};

SpriteObject.prototype.setup = function(){
    // グループの初期化
    group = new THREE.Object3D();
    
    // パラメータを初期化
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    // 回転サイズ、1を超えると画面からはみ出るよ
    orbitScaleX = 0.9;
    orbitScaleY = 0.9;
    
    // 画像が回転する軌道の長軸と短軸の長さ
    orbitX = windowHalfX * orbitScaleX; // 画面より少し小さく
    orbitY = windowHalfY * orbitScaleY;
    
    // 画像中心と回転中心のずれ
    offsetX = (windowHalfX - orbitX);
    offsetY = (windowHalfY - orbitY);
    
    // 画像の最小サイズ
    minImageSize = 0.1;
    
    // 初期位置
    theta = 0;
    
};

SpriteObject.prototype.addImage = function(filename){
    
    // 画像の数だけスプライトを作成する
    
    // textureを読み込む
    var imageMap = THREE.ImageUtils.loadTexture( filename );
    material = new THREE.SpriteMaterial( { map: imageMap, alignment: THREE.SpriteAlignment.center, opacity: 0.99 } );
    sprite = new THREE.Sprite( material );
    
    group.add( sprite );
};

SpriteObject.prototype.getSprites = function(){
    return group;
};

SpriteObject.prototype.update = function(angle){
    
    // 全てのオブジェクトの情報を更新する
    for ( var c = 0; c < group.children.length; c ++ ) {
        var tmpSprite = group.children[ c ];
        var tmpMaterial = tmpSprite.material;
        
        var imageWidth = 1;
        var imageHeight = 1;
        
        if ( tmpMaterial.map && tmpMaterial.map.image && tmpMaterial.map.image.width ) {
            
            imageWidth = tmpMaterial.map.image.width;
            imageHeight = tmpMaterial.map.image.height;
            
        }
        
        var getAngle = function(a){
            
            if(a > 360) {
                a -= 360;
            }else if(a < 0) {
                a += 360;
            }
            return a;
        }
        
        theta += angle;
        
        theta = getAngle(theta);
        
        var tmpTheta = theta + c * 360/group.children.length;
        
        tmpTheta = getAngle(tmpTheta);
        
        // 角度によって位置とサイズを変える
        var scale;
        var tmpX, tmpY;
        var rad;
        rad = tmpTheta * Math.PI / 180;
        // 位置計算
        tmpX = orbitX * ( Math.sin(rad) + 1.0 ) + offsetX;
        tmpY = orbitY * ( Math.cos(rad) + 1.0 ) + offsetY;
        // サイズ計算
        if( 90 < tmpTheta && tmpTheta < 270 ){
            scale = minImageSize;
        }else{
            scale = Math.abs( (1.0-minImageSize) * Math.cos(rad) + minImageSize );
        }
        // 位置とサイズをセット
        tmpSprite.scale.set( scale * imageWidth, scale * imageHeight, 1.0 );
        tmpSprite.position.set( tmpX, tmpY, 0 );
    }
};
