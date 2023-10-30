import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//varieVariabili&Finestre
  var scale = 2;
  var dist = 1;
  var swich = false; // true == plane
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++



//Controls
  //scalaDimensioni-------------
  function cambiaScala() {
    var newScala = document.getElementById('scalaInput').value;
    var nuovaScala = parseFloat(newScala);

    if (!isNaN(nuovaScala)) {

      scale = nuovaScala;
      if(swich == true){
        updateRenderPlane();
      }
      else{
        updateRenderSphere();
      }
    } else {
      alert('Il valore inserito non è valido. Si prega di inserire un numero valido per la scala.');
    }
  }
  document.getElementById('cambiaScala').addEventListener('click', cambiaScala);
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
      plane.position.z = dist;
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
  function cambiaDistanzaPiano() {
    var newDistanzaPiano = document.getElementById('distanzaPiano').value;
    var NuovaDistanzaPiano = parseFloat(newDistanzaPiano);

    if (!isNaN(NuovaDistanzaPiano)) {

      dist = NuovaDistanzaPiano;
      if(swich==true){
        updateRenderPlane();
      }
      
    } else {
      alert('Il valore inserito non è valido. Si prega di inserire un numero valido per la scala.');
    }
  }
  document.getElementById('cambiaDistanzaPiano').addEventListener('click', cambiaDistanzaPiano);
  //-------------------------------------------------------

  //viewUpdate
    //planeUpdate-----------------
    function updateRenderPlane() {
      // Aggiorna la geometria del piano con la nuova scala
      var newGeometry = new THREE.PlaneGeometry(1 * scale, 1 * scale);
      plane.geometry.dispose(); // Libera la geometria precedente
      plane.geometry = newGeometry;
      plane.position.z = dist;

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