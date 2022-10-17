let scene, camera, renderer, loader, mixer, clock, clips, model


function init() {
    scene = new THREE.Scene();
    loader = new THREE.GLTFLoader();
    clock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    

    /*
    // Default cube animation
    const geometry = new THREE.BoxGeometry( 2, 2, 2 );
    const material = new THREE.MeshBasicMaterial( { color: 0x59E3F9 } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    */

    
    loader.load( './pushup.gltf', function ( gltf ) {

        model = gltf.scene
        scene.add( model );

        mixer = new THREE.AnimationMixer( model );
        clips = gltf.animations

        // pushup clip
        let clip1 = THREE.AnimationClip.findByName(clips, 'rigAction')
        let action = mixer.clipAction(clip1)
        action.play()

        // squats clip
        let clip2 = THREE.AnimationClip.findByName(clips, 'rig.001Action')
        let action2 = mixer.clipAction(clip2)
        action2.play()
        
        // play all clips : *Not working*
        // gltf.animations.forEach( (clip) => {
        //     mixer.clipAction( clip ).play();
        // } );

        // model.scale.set(0.7,0.7,0.7)
        model.position.y = -1
    
    }, undefined, ( err ) => console.error( error ) );
    camera.position.z = 7;
}

function animate() {
    requestAnimationFrame( animate );

    if ( mixer ) mixer.update( clock.getDelta() );

    // model.rotation.x += 0.01;
    model.rotation.y += 0.005;
    
    renderer.render( scene, camera );
};


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', onWindowResize, false)

init();
animate();