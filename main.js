import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//varieVariabili&Finestre
  var scale = 2;
  var dist = 1;
  var swich = false; // true == plane
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var circleRotationAngleX = 0;
  var circleRotationAngleY = 0;
  /* var circleRotationAngleZ = 0; */

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++



//Controls
  //scalaDimensioni-------------
function scaleChange() {
    var newScale = document.getElementById('scaleInput').value;
    var tempScale = parseFloat(newScale);

    if (!isNaN(tempScale)) {

      scale = tempScale;
      if(swich == true){
        updateRenderPlane();
      }
      else{
        updateRenderSphere();
      }
    } else {
      alert('The value entered is invalid. Please enter a valid scale number.');
    }
  }
document.getElementById('scaleChange').addEventListener('click', scaleChange);
  //-------------------------------------------------------

  //Swich-----------------------
    document.getElementById('Swich').addEventListener('change', function () {
      swich = this.checked;

    if (swich == true) {
      scene.remove(sphere);
      //PlaneAdd
      var geometry = new THREE.PlaneGeometry(1 * scale, 1 * scale);
      var material = new THREE.MeshBasicMaterial({ color: 0x00FFFF, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
      plane = new THREE.Mesh(geometry, material);
      /*prova con prodotti di matrici e vettori
      Crei i vettori che deviniscono i vertici del piano v1,v2,v3,v4 e li trasformi con una matrice R che determiniamo poi
      Ho visto BufferGeometry lo ha built in con i metodi applyMatrix4 e applyQuaternion*/
      plane.position.z = dist;
      plane.rotation.x = circle.rotation.x;
      plane.rotation.y = circle.rotation.y;
      scene.add(plane);
    } else {
      scene.remove(plane);
      //SphereAdd
      var sphereGeometry = new THREE.SphereGeometry(1 * scale, 1000, 1000);
      var materialSphere = new THREE.MeshBasicMaterial({ color: 0x00FFFF, transparent: true, opacity: 0.5 });
      sphere = new THREE.Mesh(sphereGeometry, materialSphere);
      scene.add(sphere);
    }
  });
  //-------------------------------------------------------

  //DistPiano------------------
  function changePlaneDistance() {
    var newPlaneDistance = document.getElementById('planeDistance').value;
    var NuovaPlaneDistance = parseFloat(newPlaneDistance);

    if (!isNaN(NuovaPlaneDistance)) {

      dist = NuovaPlaneDistance;
      if(swich==true){
        updateRenderPlane();
      }
      
    } else {
      alert('Il valore inserito non è valido. Si prega di inserire un numero valido per la scala.');
    }
  }
document.getElementById('changePlaneDistance').addEventListener('click', changePlaneDistance);
  //-------------------------------------------------------

  //CameraReset------------------
  function CameraReset() {
    camera.position.set(0, 0, 5 * scale); // Set the camera to its initial position
    camera.lookAt(0, 0, 0); // Look at the origin (0, 0, 0)
  }
  document.getElementById('CameraReset').addEventListener('click', CameraReset);
  //-------------------------------------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++

//viewUpdate
  //circleUpdate-----------------
  function circleUpdate(){
    var newRotationX = document.getElementById('CircleRotateX').value;
    circleRotationAngleX = parseFloat(newRotationX);
    circle.rotation.x = THREE.MathUtils.degToRad(circleRotationAngleX);

    var newRotationY = document.getElementById('CircleRotateY').value;
    circleRotationAngleY = parseFloat(newRotationY);
    circle.rotation.y = THREE.MathUtils.degToRad(circleRotationAngleY);

    plane.rotation.x = circle.rotation.x;
    plane.rotation.y = circle.rotation.y;

    /* var newRotationZ = document.getElementById('CircleRotateZ').value;
    circleRotationAngleZ = parseFloat(newRotationZ);
    circle.rotation.z = THREE.MathUtils.degToRad(circleRotationAngleZ); */
  }
  document.getElementById('CircleRotateX').addEventListener('click', circleUpdate);
  document.getElementById('CircleRotateY').addEventListener('click', circleUpdate);
  /* document.getElementById('CircleRotateZ').addEventListener('click', circleUpdate); */
  //-------------------------------------------------------

  //planeUpdate-----------------
  function updateRenderPlane() {
    // Aggiorna la geometria del piano con la nuova scala
    var newGeometry = new THREE.PlaneGeometry(1 * scale, 1 * scale);
    plane.geometry.dispose(); // Libera la geometria precedente
    plane.geometry = newGeometry;
    plane.position.z = dist;//va cambiato anche questo per ruotare il piano

    // Ricostruisci la geometria del cerchio
    circleRadius = 1;
    circleSegments = 10000;
    circleGeometry = new THREE.BufferGeometry();
    vertices = [];
    /*usando BufferGeometry può essere interessante creare un unico cerchio da poi trasformare con una matrice
    ci sono le funzioni built in applyMatrix4 e applyQuaternion*/
    for (let i = 0; i <= circleSegments; i++) {
      theta = (i / circleSegments) * Math.PI * 2;
      x = scale * circleRadius * Math.cos(theta);
      y = scale * circleRadius * Math.sin(theta);
      vertices.push(x, y, 0);
    }

    circleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    circle.geometry.dispose(); // Libera la geometria precedente
    circle.geometry = circleGeometry;

    updateAxes();

    renderer.render(scene);
  }
  //-------------------------------------------------------

  //sphereUpdate----------------
  function updateRenderSphere() {

    // Aggiorna la geometria del piano con la nuova scala
    var newGeometry = new THREE.SphereGeometry(1 * scale, 1000, 1000);
    sphere.geometry.dispose(); // Libera la geometria precedente
    sphere.geometry = newGeometry;

    // Ricostruisci la geometria del cerchio
    circleRadius = 1;
    circleSegments = 10000;
    circleGeometry = new THREE.BufferGeometry();
    vertices = [];

    for (let i = 0; i <= circleSegments; i++) {
      theta = (i / circleSegments) * Math.PI * 2;
      x = scale * circleRadius * Math.cos(theta);
      y = scale * circleRadius * Math.sin(theta);
      vertices.push(x, y, 0);
    }

    circleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    circle.geometry.dispose(); // Libera la geometria precedente
    circle.geometry = circleGeometry;

    updateAxes();

    renderer.render(scene);
  }
  //-------------------------------------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++



//Costruction
  //Axes------------------------
  function updateAxes() {
    axesContainer.clear();

    var xAxisMaterial = new THREE.LineBasicMaterial({ color: 0x0000CC }); // Blu per l'asse X

    var xAxisPositive = new THREE.AxesHelper(2 * scale);
    xAxisPositive.material = xAxisMaterial;
    axesContainer.add(xAxisPositive);

    var yAxisPositive = new THREE.AxesHelper(2 * scale);
    yAxisPositive.rotation.y = -Math.PI / 2;
    axesContainer.add(yAxisPositive);

    var xAxisNegative = new THREE.AxesHelper(-2 * scale);
    xAxisNegative.material = xAxisMaterial;
    axesContainer.add(xAxisNegative);

    var yAxisNegative = new THREE.AxesHelper(-2 * scale);
    yAxisNegative.rotation.y = -Math.PI / 2;
    axesContainer.add(yAxisNegative);
  }
  //-------------------------------------------------------

  //Circle---------------------
  var circleRadius = 1 * scale;
  var circleSegments = 10000;
  var circleGeometry = new THREE.BufferGeometry();
  var vertices = [];

  for (let i = 0; i <= circleSegments; i++) {
    var theta = (i / circleSegments) * Math.PI * 2;
    var x = circleRadius * Math.cos(theta);
    var y = circleRadius * Math.sin(theta);
    vertices.push(x, y, 0);
  }

  circleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  var circleMaterial = new THREE.LineBasicMaterial({ color: 0xFF0000 });
  var circle = new THREE.Line(circleGeometry, circleMaterial);
  scene.add(circle);
  //-------------------------------------------------------

  //Assi------------------------
  var axesContainer = new THREE.Object3D();
  scene.add(axesContainer);
  updateAxes();
  //-------------------------------------------------------

  //swich
    if(swich == true){
      //Piano--------------------------------------------------
      var geometry = new THREE.PlaneGeometry(1 * scale, 1 * scale);
      var material = new THREE.MeshBasicMaterial({ color: 0x00FFFF, transparent: true, opacity: 0.5, side: THREE.DoubleSide });

      var plane = new THREE.Mesh(geometry, material);
      plane.position.z = dist;
      scene.add(plane);
      //-------------------------------------------------------
    }
    else{
      //Sfera--------------------------------------------------
      var sphereGeometry = new THREE.SphereGeometry(1 * scale, 1000, 1000);
      var materialSphere = new THREE.MeshBasicMaterial({ color: 0x00FFFF, transparent: true, opacity: 0.5 });
      var sphere = new THREE.Mesh(sphereGeometry, materialSphere);
      scene.add(sphere);
      //-------------------------------------------------------
    }
    //-------------------------------------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++



//controlli
  //cameraControlli-------------
  camera.position.z = 5 * scale;
  const controls = new OrbitControls(camera, renderer.domElement);
  // Aggiungi l'effetto di smorzamento per un movimento più fluido
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  //-------------------------------------------------------

  //Animazione------------------
  function animate() {
    requestAnimationFrame(animate);

    // Aggiorna i controlli
    controls.update();

    renderer.render(scene, camera);
  }
  animate();
  //-------------------------------------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
