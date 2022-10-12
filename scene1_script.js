let scene, camera, renderer, cube;

function init(){
scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(75,
    window.innerWidth/window.innerHeight, 
    0.1, 
    1000 
);

renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
const green = 0x00ff00;
const blue = 0x0000ff;
const grey = "#E3DDDC";
const red = "#ff0000"
const geometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
// const material = new THREE.MeshBasicMaterial( {color: red} );
const texture = new THREE.TextureLoader().load('textures/texture_4.jpg');
const material = new THREE.MeshBasicMaterial({map:texture})
cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

}

function animate(){
    requestAnimationFrame(animate);
    cube.rotation.x += 0.019;
    cube.rotation.y += 0.019;
    cube.rotation.z += 0.019;
    renderer.render(scene, camera);
}

function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();