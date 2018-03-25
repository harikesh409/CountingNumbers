/*Made by: Harikesh Pallantla, Lendi*/

var mySceneTLX;        
var mySceneTLY;        
var mySceneBRX;        
var mySceneBRY;        
var mySceneW;          
var mySceneH;          
var myCenterX;         
var myCenterY;  
var current = 1;
var stopset = 1;
var wallThickness;
var raycaster;
var geometry, material, loader, texture, font, text;
var stick = new Array(9);
var bundle = new Array(5);
var bundleNum = new Array(5);
var stickNum = new Array(9);
var flag=0;
var ones,tens,ans,t1,t2;
/*----------------------  Initial Stuff Start------------------*/

var helpContent;
function initialiseHelp() {
    var helpContent;
    helpContent="";
    helpContent = helpContent + "<h2>Counting 21-50 </h2>";
    helpContent = helpContent + "<h3><u>About the experiment</u></h3>";
    helpContent = helpContent + "<p>In this experiment,we are trying to show Counting of numbers from 21 to 50 using pictorial representation.</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<h4>Click on start button to start the animation</h4>";
    helpContent = helpContent + "<p>Counting will start</p>";
    helpContent = helpContent + "<h4>Click on Reset button to reset animation</h4>";
    helpContent = helpContent + "<h4>Click on |>>| button to make animation rate faster than normal</h4>";
    helpContent = helpContent + "<h4>Click on |<<| button to make animation rate slower than normal</h4>";
    helpContent = helpContent + "<h4>Click on start button and then drag anywhere to view a 360 degree view and scroll to zoom</h4>";
    helpContent = helpContent + "<h4>Click on stop button to stop the animation</h4>";
    helpContent = helpContent + "<p>Counting will stop/p>";
    helpContent = helpContent + "<h3>Interaction</h3>";
    helpContent = helpContent + "<p> User can use mouse controls to look around as it's a 3D model .</p>";
    helpContent = helpContent + "<h3> Happy Experimenting !!!! </h3>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo() {
    infoContent =  "";
    infoContent = infoContent + "<h2>Counting 21-50 </h2>";
    infoContent = infoContent + "<h3><u>About the experiment</u></h3>";
    infoContent = infoContent + "<p>In this experiment,we are trying to show Counting of numbers from 21 to 50 using pictorial representation.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

function initialiseScene() {
    mySceneTLX = -20.0;
    mySceneTLY = 20.0;
    mySceneBRX = 20.0;
    mySceneBRY = -20.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
    wallThickness = 0.20;

    raycaster = new THREE.Raycaster();
    document.getElementById("start").addEventListener("click", startanim);
    document.getElementById("stop").addEventListener("click",stopanim);
    document.getElementById(">>").addEventListener("click",speedUp);
    document.getElementById("<<").addEventListener("click",speedDown);
    PIEscene.background=new THREE.Color( 0xbfd1e5 );
    PIEscene.add(new THREE.AmbientLight(0x606060));
}

function loadFont() {
    loader = new THREE.FontLoader();
    loader.load("fonts/optimer.json", function(response){
        font = response;  
    });
}
/*----------------------  Initial Stuff Ends ------------------*/
var scalar = 0.3;
function speedUp() {
    if (scalar <= 1.2){
        scalar = scalar*2;
    }
}
function speedDown() {
    if (scalar>0.075) {
        scalar = scalar/2;
    }
}
function addBundle(){
        var geometry = new THREE.PlaneGeometry(10,7,0);
        var imgUtils = THREE.ImageUtils.loadTexture('imgs/bundle.png',{},function(){PIErender();});
        var meshMaterial = new THREE.MeshBasicMaterial(
        { 
            transparent: true, 
            map: imgUtils,
            side: THREE.DoubleSide
        });
        for(var i=0; i<5; i++) {
            bundle[i] = new THREE.Mesh(geometry, meshMaterial);
            bundle[i].position.set(myCenterX-35,myCenterY+13,0);
            bundle[i].rotateZ(Math.PI/4);
            PIEaddElement(bundle[i]);
            material = new THREE.MeshBasicMaterial({color:'#FF3E0D'});
            bundleNum[i] = new THREE.Mesh(getGeometry(i+1,2), material);
            bundleNum[i].position.set(myCenterX-40,myCenterY+6,0);
            PIEaddElement(bundleNum[i]);
            bundleNum[i].visible = false;
        }        
}
function addStick() {
    var geometry = new THREE.PlaneGeometry(10,2,0);
    var imgUtils = new THREE.ImageUtils.loadTexture( 'imgs/stick.png' );
    var meshMaterial = new THREE.MeshStandardMaterial( { transparent:true,map: imgUtils, side: THREE.DoubleSide } );
    for(var i=0;i<9;i++) {
        stick[i] = new THREE.Mesh(geometry, meshMaterial);
        stick[i].position.set(-37,0,0);
        stick[i].rotateZ(Math.PI/4);
        stick[i].material.opacity = 1;
        PIEaddElement(stick[i]);
        material = new THREE.MeshBasicMaterial({color:'#000000'});
        stickNum[i] = new THREE.Mesh(getGeometry(i+1,2), material);
        stickNum[i].position.set(myCenterX-41,myCenterY-6,0);
        PIEaddElement(stickNum[i]);
        stickNum[i].visible = false;
    }
}
function startanim() {
    flag = 1;
    addStick();
    addBundle();
}
function result(res) {
    if(ans) {
        PIEremoveElement(ans);
    }
    material = new THREE.MeshBasicMaterial({color:'#14098c'});
    ans = new THREE.Mesh(getGeometry(res,3), material);
    ans.position.set(myCenterX,myCenterY-14.5,0);
    PIEaddElement(ans);
}
function text(t,o) {
    if(tens) {
        PIEremoveElement(tens);
    }
    material = new THREE.MeshBasicMaterial({color:'#FF3E0D'});
    t1 = new THREE.Mesh(getGeometry('TENS: ',1),material);
    t1.position.set(myCenterX-12,myCenterY-12,0);
    PIEaddElement(t1);
    tens = new THREE.Mesh(getGeometry(t,1), material);
    tens.position.set(myCenterX-8,myCenterY-12,0);
    PIEaddElement(tens);        
    if(ones) {
        PIEremoveElement(ones);
    }
    material = new THREE.MeshBasicMaterial({color:'#000000'});
    t2 = new THREE.Mesh(getGeometry('ONES: ',1),material);
    t2.position.set(myCenterX-12,myCenterY-15,0);
    PIEaddElement(t2);
    ones = new THREE.Mesh(getGeometry(o,1), material);
    ones.position.set(myCenterX-8,myCenterY-15,0);
    PIEaddElement(ones);
    
}
function add10(x,y) {
    material = new THREE.MeshBasicMaterial({color:'#FF3E0D'});
    num = new THREE.Mesh(getGeometry(10,2), material);
    num.position.set(myCenterX+x,myCenterY+y,0);
    PIEaddElement(num);
}
function getGeometry(num,size) {
    geometry = new THREE.TextGeometry(num,{
        font: font,
        size: size,
        height  : 0.01,
        curveSegments : 3
    });
    return geometry;
}

function loadExperimentElements() {    
    PIEsetExperimentTitle("Couting 21 to 50");
    PIEsetDeveloperName("Harikesh Pallantla");
    initialiseInfo();
    initialiseHelp();
    initialiseScene();
    loadFont();
    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
}

function resetSticks() {
    for(var i=0;i<9;i++)
    {
        stick[i].position.set(-37,0,0);
        stickNum[i].position.set(myCenterX-41,myCenterY-6,0);
        stickNum[i].visible = false;
    }
}

function stopanim() {
    for(var i=0;i<9;i++) {
        PIEremoveElement(stick[i]);
        PIEremoveElement(stickNum[i]);
    }
    for(var i=0;i<5;i++) {
        PIEremoveElement(bundle[i]);
        PIEremoveElement(bundleNum[i]);
    }
    scalar = 0.3;
    removeResults();
}

function resetExperiment()
{
    // console.log("reset");
    scalar = 0.3;
    for(var i=0;i<9;i++) {
        PIEremoveElement(stick[i]);
        PIEremoveElement(stickNum[i]);
    }
    for(var i=0;i<5;i++) {
        PIEremoveElement(bundle[i]);
        PIEremoveElement(bundleNum[i]);
    }
    removeResults();
}

function removeResults() {
    PIEremoveElement(ans);
    PIEremoveElement(tens);
    PIEremoveElement(ones);
    PIEremoveElement(t1);
    PIEremoveElement(t2);
    PIErender();
    console.log("remove");

}

function updateExperimentElements(t,dt) {
    boundaryT = dt / 1000.0;
    boundaryT *= 1000;
    if(flag == 1) {
        if((bundle[0].position.x <= myCenterX+15)) {
            bundle[0].position.x += scalar*2;
            bundleNum[0].position.x += scalar*2;
            bundleNum[0].visible = true;
        }
        if((bundle[1].position.x <= bundle[0].position.x-10) && (t>1500)) {
            bundle[1].position.x += scalar*2;
            bundleNum[1].position.x += scalar*2;
            bundleNum[1].visible = true;
        }
        if((stick[0].position.x <= myCenterX+8) && t<3500) {
            stick[0].position.x += scalar;
            stickNum[0].position.x += scalar;
            stickNum[0].visible = true;
        }
        if(t>=3500 && t<6000) {
            text(2,1);
            result(21);
        }
        if(t>=6000 && t<=54000) {
            time = 6000;
            for(var i=1;i<9;i++)
            {
                if((stick[i].position.x <= stick[i-1].position.x-4) && (t>=(time))) {
                    stick[i].position.x += scalar;
                    stickNum[i].position.x += scalar;
                    stickNum[i].visible = true;
                }
                if(t>=(time+3500) && t<=(time+6000)) {
                    text(2,i+1);
                    result(2*10+i+1);
                }
                time+=6000;
                // console.log(time);
            }
        }
        if((bundle[2].position.x <= bundle[1].position.x-10) && (t>54000))
        {
            bundle[2].position.x += scalar*2;
            bundleNum[2].position.x += scalar*2;
            bundleNum[2].visible = true;
        }
        if(t>=55000 && t<=60000)
        {
            text(3,0);
            result(30);
            resetSticks();
        }
        if((stick[0].position.x <= myCenterX+8) && (t<70000 && t>74000)) {
                stick[0].position.x += scalar;
                stickNum[0].position.x += scalar;
                stickNum[0].visible = true;
            }
        if(t>=67000 && t<70000) {
            text(3,1);
            result(31);
        }
        if(t>=70000 && t<120500) {
                time = 70000;
                for(var i=1;i<9;i++)
                {
                    if((stick[i].position.x <= stick[i-1].position.x-4) && (t>=(time))) {
                        stick[i].position.x += scalar;
                        stickNum[i].position.x += scalar;
                        stickNum[i].visible = true;
                    }
                    if(t>=(time+3500) && t<=(time+6000)) {
                        text(3,i+1);
                        result(3*10+i+1);
                    }
                    time+=6000;
                    // console.log(time);
                }
        }
        if((bundle[3].position.x <= bundle[2].position.x-10) && (t>120000))
        {
            bundle[3].position.x += scalar*2;
            bundleNum[3].position.x += scalar*2;
            bundleNum[3].visible = true;
        }
        if(t>=120000 && t<=123000)
        {
            text(4,0);
            result(40);
            resetSticks();
        }
        if((stick[0].position.x <= myCenterX+8) && t<130000) {
                stick[0].position.x += scalar;
                stickNum[0].position.x += scalar;
                stickNum[0].visible = true;
            }
        if(t>=127000 && t<129000) {
            text(4,1);
            result(41);
        }
        if(t>=131000 && t<=178500) {
                time = 131000;
                for(var i=1;i<9;i++)
                {
                    if((stick[i].position.x <= stick[i-1].position.x-4) && (t>=(time))) {
                        stick[i].position.x += scalar; 
                        stickNum[i].position.x += scalar;
                        stickNum[i].visible = true;
                    }
                    if(t>=(time+3500) && t<=(time+6000)) {
                        text(4,i+1);
                        result(4*10+i+1);
                    }
                    time+=6000;
                    // console.log(time);
                }
        }
        if((bundle[4].position.x <= bundle[3].position.x-10) && (t>178000))
        {
            bundle[4].position.x += scalar*2;
            bundleNum[4].position.x += scalar*2;
            bundleNum[4].visible = true;
        }
        if(t>=178000 && t<=180000)
        {
            text(5,0);
            result(50);
            resetSticks();
        }
    }
    if (boundaryT < dt) { 
        PIEadjustAnimationTime(dt - boundaryT); 
    }
}
