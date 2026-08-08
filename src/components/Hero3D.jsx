import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Sphere } from "@react-three/drei";

function Hero3D() {
  return (
    <div className="h-screen w-full">

      <Canvas>

        <ambientLight intensity={2} />

        <directionalLight position={[2, 2, 2]} />

        <Float speed={2} rotationIntensity={2}>

          <Sphere args={[1.5, 64, 64]}>
            <meshStandardMaterial
              color="#22c55e"
              wireframe
            />
          </Sphere>

        </Float>

        <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
       />

      </Canvas>

    </div>
  );
}

export default Hero3D;