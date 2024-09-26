// THREE.JS STUFF  //
////////////////////
var objects = [];

//Scene
var scene = new THREE.Scene();

//Camera
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 8;


//Renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#101112");
renderer.setSize(window.innerWidth,innerHeight);

var container = document.getElementById('render');
var controlArea = document.getElementById('vignette');
container.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,innerHeight);
    camera.aspect = window.innerWidth / innerHeight;

    camera.updateProjectionMatrix();
})

//Orbit Controls
controls = new THREE.OrbitControls(camera, renderer.domELement);
 // to disable zoom
 controls.enableZoom = false;

//Raycaster
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

//Creating a sphere
    //Shape variable
    var geometry = new THREE.SphereGeometry(3, 20, 10);
    //Material variable
    var material = new THREE.MeshNormalMaterial({
    wireframe: true
    });

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


        //Call the Render method on the renderer
        var render = function() {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
            mesh.rotation.y += 0.01
            mesh.rotation.x = -1.571
        }

        var hoveredObjects = {};

        function onMouseMove(event) {
            event.preventDefault();

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(scene.children, true);

                // collect array of uuids of currently hovered objects
                var hoveredObjectUuids = intersects.map(el => el.object.uuid);
            
            for (let i = 0; i < intersects.length; i++) {
            var hoveredObj = intersects[i].object;
            if (hoveredObjects[hoveredObj.uuid]) {
                continue; // this object was hovered and still hovered
            }

            this.tl = new TimelineMax();
            this.tl.to(intersects[i].object.scale, 1, {
                x: 1.8,
                ease: Expo.easeOut,
                y: 1.8,
                ease: Expo.easeOut,
                z: 1.8,
                ease: Expo.easeOut
            });

            // collect hovered object
            hoveredObjects[hoveredObj.uuid] = hoveredObj;
            }
            
            for (let uuid of Object.keys(hoveredObjects)) {
                let idx = hoveredObjectUuids.indexOf(uuid);
            if (idx === -1) {
                // object with given uuid was unhovered
                let unhoveredObj = hoveredObjects[uuid];
                delete hoveredObjects[uuid];

                this.tl = new TimelineMax();
                this.tl.to(unhoveredObj.scale, 2, {
                x: 1,
                ease: Expo.easeOut,
                y: 1,
                ease: Expo.easeOut,
                z: 1,
                ease: Expo.easeOut
                });

            }
            }
        }

        //Event Listener
        window.addEventListener('mousemove', onMouseMove);
        render();

