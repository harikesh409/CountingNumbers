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
var geometry, material, loader, texture, font, text, material2;
var stick = new Array(9);
var bundle = new Array(5);
var set1 = [21,22,23,24,25,26,27,28,29,30];
var set2 = [31,32,33,34,35,36,37,38,39,40];
var set3 = [41,42,43,44,45,46,47,48,49,50];
var set1Elements = new Array(7);
var set2Elements = new Array(7);
var set3Elements = new Array(7);
var ansElements = new Array(9);
var line = [];
var ansArr = new Array(9);
var ansPosX = new Array(9);
var ansPosY = new Array(9);
// var sticker;
var flag=0;
var ones,tens,ans;
var t1,t2;
/*----------------------  Initial Stuff Start------------------*/

var helpContent;
function initialiseHelp() {
    var helpContent;
    helpContent="";
    helpContent = helpContent + "<h2>Counting 21-50 </h2>";
    helpContent = helpContent + "<h3><u>About the experiment</u></h3>";
    helpContent = helpContent + "<p>In this experiment,we are trying to show Counting of numbers from 21 to 50 using pictorial representation.</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<h4>Click on start or Learn Steps button to start the animation</h4>";
    helpContent = helpContent + "<p>Counting will start</p>";
    helpContent = helpContent + "<h4>Click on Reset button to reset animation</h4>";
    helpContent = helpContent + "<h4>Click on |>>| button to make animation rate faster than normal</h4>";
    helpContent = helpContent + "<h4>Click on |<<| button to make animation rate slower than normal</h4>";
    helpContent = helpContent + "<h4>Click on stop button to stop the animation</h4>";
    helpContent = helpContent + "<p>Counting will stop/p>";
    helpContent = helpContent + "<h3>Quiz Control</h3>";
    helpContent = helpContent + "<h4>Click the Quiz button to start the quiz</h4>";
    helpContent = helpContent + "<p>In the quiz there will be series of numbers with blanks.You need to drag and drop the correct answer in the correct position.</p>";
    helpContent = helpContent + "<p>The blank will hilight with <b>green</b> color if the option is correct and if it is wrong there will be no change.</p>";
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
    infoContent = infoContent + "<p>In the quiz section we will give a series of numbers with few missing numbers. You need to drag and drop the correct number in the sequence.</p>"
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
    // PIEscene.background=new THREE.Color( 0xbfd1e5 );
    PIEscene.background=new THREE.Color( "#fff" );
    // PIEscene.add(new THREE.AmbientLight("#7a7979"));
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
        }
        /*material = new THREE.MeshBasicMaterial({color:'#000000'});
        sticker = new THREE.Mesh(getGeometry('10',1.5),material);
        sticker.position.set(myCenterX-40,myCenterY+6,0);
        PIEaddElement(sticker);*/
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
    }
}
function getNumber(min,max)
{  
    var min = min;
    var max = max;
    var decimalPlaces = 0;

    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
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
    tens = new THREE.Mesh(getGeometry(t,1), material);
    tens.position.set(myCenterX-8,myCenterY-12,0);
    PIEaddElement(tens);        
    if(ones) {
        PIEremoveElement(ones);
    }
    t1 = new THREE.Mesh(getGeometry('TENS: ',1),material);
    t1.position.set(myCenterX-12,myCenterY-12,0);
    PIEaddElement(t1);
    material = new THREE.MeshBasicMaterial({color:'#000000'});
    t2 = new THREE.Mesh(getGeometry('ONES: ',1),material);
    t2.position.set(myCenterX-12,myCenterY-15,0);
    PIEaddElement(t2);
    ones = new THREE.Mesh(getGeometry(o,1), material);
    ones.position.set(myCenterX-8,myCenterY-15,0);
    PIEaddElement(ones);
    
}
function startanim() {
    if(!flag) {
        PIEstartAnimation();
        addStick();
        addBundle();
        console.log("started");
    }
    quizReset();
    flag = 1;
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
    PIEaddDualCommand("Learn Steps",learn);
    PIEaddDualCommand("Quiz",quiz);
    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function learn() {
    document.getElementById("start").click();
}
function quiz() {
    flag = 0;
    var j=0;
    var k=0;
    ansArr = [];
    material = new THREE.MeshBasicMaterial({color:'#000000'});
    var x = 25;
    set1 = shuffle(set1);
    set2 = shuffle(set2);
    set3 = shuffle(set3);
    var set = set1.slice(0,7);
    ansArr = set1.slice(7);
    set.sort();
    // console.log(set1);
    if(set1Elements) {
            for(var i=0;i<7;i++)
                PIEremoveElement(set1Elements[i]);
        }
    if(line) {
        for(var i=0;i<=9;i++)
            PIEremoveElement(line[i]);
    }
    if(ansArr) {
        for(var i=0;i<9;i++)
            PIEremoveElement(ansElements[i]);
    }
    ansElements = [];
    for(var i=21;i<=30;i++)
    {
        if(set.includes(i)) {
                set1Elements[j]=new THREE.Mesh(getGeometry(set[j],2),material);
                set1Elements[j].position.set(myCenterX-x,myCenterY+12,0);
                x -= 5;
                PIEaddElement(set1Elements[j]);
                j = j+1;
            } else {
                line[k] = new THREE.Mesh(getGeometry("__",2),material);
                line[k].position.set(myCenterX-x,myCenterY+12,0);
                x -= 5;
                PIEaddElement(line[k]);
                line[k].name = i;
                // line[k].material.color.setHex(0xfff111);
                ansPosX[i] = myCenterX-line[k].position.x;
                ansPosY[i] = line[k].position.y;
                k +=1;
            }
    }
    var set = set2.slice(0,7);
    // ans.push(set2.slice(7));
    ansArr = ansArr.concat(set2.slice(7));
    set.sort();
    if(set2Elements) {
        for(var i=0;i<7;i++)
            PIEremoveElement(set2Elements[i]);
    }
    x = 25;
    j=0;
    for(var i=31;i<=40;i++)
    {
        if(set.includes(i)) {
                set2Elements[j]=new THREE.Mesh(getGeometry(set[j],2),material);
                set2Elements[j].position.set(myCenterX-x,myCenterY+5,0);
                x -= 5;
                PIEaddElement(set2Elements[j]);
                j = j+1;
            } else {
                k +=1;
                line[k] = new THREE.Mesh(getGeometry("__",2),material);
                line[k].position.set(myCenterX-x,myCenterY+5,0);
                x -= 5;
                PIEaddElement(line[k]);
                line[k].name = i;
                // line[k].material.color.setHex(0xfff111);
                ansPosX[i] = myCenterX-line[k].position.x;
                ansPosY[i] = line[k].position.y;
            }
    }
    var set = set3.slice(0,7);
    ansArr = ansArr.concat(set3.slice(7));
    set.sort();
    if(set3Elements) {
        for(var i=0;i<7;i++)
            PIEremoveElement(set3Elements[i]);
    }
    x = 25;
    j=0;
    for(var i=41;i<=50;i++)
    {
        if(set.includes(i)) {
                set3Elements[j]=new THREE.Mesh(getGeometry(set[j],2),material);
                set3Elements[j].position.set(myCenterX-x,myCenterY-2,0);
                x -= 5;
                PIEaddElement(set3Elements[j]);
                j = j+1;
            } else {
                k +=1;
                line[k] = new THREE.Mesh(getGeometry("__",2),material);
                line[k].position.set(myCenterX-x,myCenterY-2,0);
                x -= 5;
                PIEaddElement(line[k]);
                line[k].name = i;
                // line[k].material.color.setHex(0xfff111);
                ansPosX[i] = myCenterX-line[k].position.x;
                ansPosY[i] = line[k].position.y;
            }
    }
    x = 35;
    if(ansArr){
        // console.log(ansArr);
        for(var i = 0;i<ansArr.length;i++) {
            ansElements[i] = new THREE.Mesh(getGeometry(ansArr[i],2),material);
            ansElements[i].position.set(myCenterX-x,myCenterY-15,0.2);
            x -= 8;
            ansElements[i].name = ansArr[i];
            PIEaddElement(ansElements[i]);
            PIEdragElement(ansElements[i]);
            PIEsetDrag(ansElements[i], dragNum);
        }
    }
    // resetExperiment();
    document.getElementById("reset").click();

}
function dragNum(element,newPos) {
    material2 = new THREE.MeshBasicMaterial({color:'#00ff00'});
    var wrong = new THREE.MeshBasicMaterial({color:'black'});
    if(ansPosX[element.name] == Math.ceil(myCenterX - newPos.x) && ansPosY[element.name] <= Math.ceil(newPos.y)) {
         var ansline = new THREE.Mesh(getGeometry("__",2),material2);
         ansline.position.set((myCenterX - ansPosX[element.name]),ansPosY[element.name],0.2);
         PIEaddElement(ansline);
    } else {
        var ansline = new THREE.Mesh(getGeometry("__",2),wrong);
         ansline.position.set(myCenterX - ansPosX[element.name],ansPosY[element.name],0.2);
         PIEaddElement(ansline);
    }
    element.position.set(newPos.x,newPos.y,newPos.z);
}
function resetSticks() {
    for(var i=0;i<9;i++)
    {
        stick[i].position.set(-37,0,0);
    }
}
function quizReset() {
    if(set1Elements) {
            for(var i=0;i<6;i++)
                PIEremoveElement(set1Elements[i]);
        }
    if(set2Elements) {
        for(var i=0;i<7;i++)
            PIEremoveElement(set2Elements[i]);
    }
    if(set3Elements) {
        for(var i=0;i<8;i++)
            PIEremoveElement(set3Elements[i]);
    }
    if(line) {
        for(var i=0;i<=9;i++)
            PIEremoveElement(line[i]);
    }
    if(ansElements) {
        for(var i=0;i<9;i++)
            PIEremoveElement(ansElements[i]);
    }
}
function stopanim() {
    PIEstopAnimation();
    for(var i=0;i<9;i++) {
        PIEremoveElement(stick[i]);
    }
    for(var i=0;i<5;i++) {
        PIEremoveElement(bundle[i]);
    }
    scalar = 0.3;
    removeResults();
}

function resetExperiment()
{
    // console.log("reset");
    PIEstopAnimation();
    scalar = 0.3;
    for(var i=0;i<9;i++) {
        PIEremoveElement(stick[i]);
    }
    for(var i=0;i<5;i++) {
        PIEremoveElement(bundle[i]);
    }
    material = new THREE.MeshBasicMaterial({color: "#fff" });
    t3 = new THREE.Mesh(getGeometry('TENS: ',1),material);
    t3.position.set(myCenterX-12,myCenterY-12,0);
    PIEaddElement(t3);
    material = new THREE.MeshBasicMaterial({color:'#fff'});
    t4 = new THREE.Mesh(getGeometry('ONES: ',1),material);
    t4.position.set(myCenterX-12,myCenterY-15,0);
    PIEaddElement(t4);
    removeResults();    
}

function removeResults() {
    PIEremoveElement(ans);
    PIEremoveElement(tens);
    PIEremoveElement(ones);
    if(t1){
        // t1.position.set(myCenterX-8,myCenterY+500,0);
        t1.material.color.setHex(0x000000);
        PIEremoveElement(t1);
        // console.log(t1);
    }
    PIEremoveElement(t2);
    // PIEremoveElement(sticker);
    PIErender();
    // console.log("remove");

}

function updateExperimentElements(t,dt) {
    boundaryT = dt / 1000.0;
    boundaryT *= 1000;
    if(flag == 1) {
        if((bundle[0].position.x <= myCenterX+15)) {
            bundle[0].position.x += scalar*2;
        }
        if((bundle[1].position.x <= bundle[0].position.x-10) && (t>1500)) {
            bundle[1].position.x += scalar*2;
        }
        if((stick[0].position.x <= myCenterX+8) && t<3500) {
            stick[0].position.x += scalar;
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
        }
        if(t>=55000 && t<=60000)
        {
            text(3,0);
            result(30);
            resetSticks();
        }
        if((stick[0].position.x <= myCenterX+8) && (t<70000 && t>74000)) {
                stick[0].position.x += scalar;
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
        }
        if(t>=120000 && t<=123000)
        {
            text(4,0);
            result(40);
            resetSticks();
        }
        if((stick[0].position.x <= myCenterX+8) && t<130000) {
                stick[0].position.x += scalar;
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