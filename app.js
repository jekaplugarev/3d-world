function main() {
    const canvas = document.querySelector('#c')
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    // сцена камеры при рендере
    const fov = 75 // угол обзора
    const aspect = width / height
    const near = 0.1
    const far = 2000

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ canvas })

    new THREE.OrbitControls(camera, canvas)

    const scene = new THREE.Scene()
    const loader = new THREE.TextureLoader()
    const texture = loader.load(
        'http://localhost:63342/3d-world/4.jpeg',
        () => {
            const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
            rt.fromEquirectangularTexture(renderer, texture)
            scene.background = rt.texture
        }
    )

    function render() {
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()