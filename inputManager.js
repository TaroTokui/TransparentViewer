//////////////////////////////////////////////////////////////////
// 入力を処理するクラス
// 初期設定、値の更新、get関数による値の取得が行える
// created by Taro Tokui 2013/02/26
//////////////////////////////////////////////////////////////////

// 入力を処理するクラス
var InputManager = function(){
    // TUIO用の変数
    var preX=0, preY=0;
    var mode = 0;   // 0:off, 1:on, 2:update
    
};

InputManager.prototype.setup = function(){// キーボードイベントを追加
    // キーボードイベントを追加
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    
    // マウス入力イベント追加
    // マウスクリックイベント。マウスクリックイベントははカーソルがcanvas上にあるときのみ発生するようにする。
    document.onmousedown = handleMouseDown;
    // マウスクリック解除イベント
    document.onmouseup = handleMouseUp;
    // マウスドラックイベント
    document.onmousemove = handleMouseMove;
};

InputManager.prototype.getTuioData = function(){
    return tuio;
};

InputManager.prototype.getMoveX = function(){
    var len = tuio.cursors.length;
    var diff = 0;
    if( len == 1 ){
        if( mode == 1 ){
            var x = tuio.cursors[0].x * window.innerWidth;
            diff = (x - preX)/30;
            preX = x;
        }else if( mode == 0 ){
            mode = 1;
            var x = tuio.cursors[0].x * window.innerWidth;
            preX = x;
        }
    }else if( len == 0){
        mode = 0;
    }
    return diff;
};

//////////////////////////////////////////////////////////////////
// ここから入力処理
//////////////////////////////////////////////////////////////////

// マウスイベント用クラス
var MOUSEEVENT = function( down, lastX, lastY )
{
    this.down  = down;      // true:マウスクリックした、false:マウスクリックしていない
    this.lastX = lastX;     // マウスの現在のX座標
    this.lastY = lastY;     // マウスの現在のY座標
}

// マウス入力オブジェクト
var MouseBuffer = new MOUSEEVENT( false, 0, 0 );

var currentlyPressedKeys = Object();

// キーボードの入力の処理
function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
    
    if (String.fromCharCode(event.keyCode) == "F") {
        if( document.body.webkitRequestFullScreen ) {
            document.body.style.width = window.screen.width + "px";
            document.body.style.height = window.screen.height + "px";
            document.body.webkitRequestFullScreen();
        }
        if( document.body.mozRequestFullScreen ) {
            document.body.mozRequestFullScreen();
        }
    }
}

function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
}

// マウスをクリック
function handleMouseDown( event )
{
    MouseBuffer.down = true;
    MouseBuffer.lastX = event.clientX;
    MouseBuffer.lastY = event.clientY;
    mouseX = event.clientX;
    mouseY = event.clientY;
}

// マウスクリック解除
function handleMouseUp( event )
{
    MouseBuffer.down = false;
}

// マウスドラック
function handleMouseMove( event )
{
    // マウスクリックしてないときは何もしない
    if( !MouseBuffer.down )
        return;
    
    // マウスカーソルの座標
    var newX = event.clientX;
    var newY = event.clientY;
    
    // マウスカーソルの移動量
    var deltaX = newX - MouseBuffer.lastX;
    var deltaY = newY - MouseBuffer.lastY;
    
    // マウスの移動距離を計算
    var len = Math.sqrt( deltaX * deltaX + deltaY * deltaY );
    
    // マウスの現在の座標を退避
    MouseBuffer.lastX = newX
    MouseBuffer.lastY = newY;
    
    mouseX = event.clientX;
    mouseY = event.clientY;
}
