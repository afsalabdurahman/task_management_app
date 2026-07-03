import  { useNavigate } from 'react-router-dom';
import SoftAurora from "../components/reusable/ba";
export const LandingPage=()=> {
  const navigate = useNavigate();
const signUp = () => {
  navigate('/signup');
}



  return (
    <div className="min-h-screen">
       
      {/* Hero */}
   <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2070&auto=format&fit=crop"
          alt="Office"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Aurora */}
        <div className="absolute inset-0 opacity-70">
          <SoftAurora
            speed={0.6}
            scale={1.5}
            brightness={1}
            color1="#ffffff"
            color2="#8b5cf6"
            noiseFrequency={2.5}
            noiseAmplitude={1}
            bandHeight={0.5}
            bandSpread={1}
            octaveDecay={0.1}
            layerOffset={0}
            colorSpeed={1}
            enableMouseInteraction={true}
            mouseInfluence={0.25}
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl font-bold text-slate-900">
              T
            </div>

            <h1 className="text-2xl font-bold text-white">
              TaskFlow
            </h1>
          </div>

          <button
            onClick={signUp}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-105"
          >
            Get Started
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[85vh] items-center px-6 lg:px-20">
          <div className="max-w-3xl">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
              🚀 Smart Task Management
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-white lg:text-7xl">
              Manage Tasks
              <br />
              Collaborate Faster
              <br />
              Achieve More
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Organize projects, track progress, and boost
              productivity with a modern task management
              platform designed for teams and individuals.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={signUp}
                className="rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:scale-105"
              >
                Start Free
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Features */}
      <section className="bg-slate-50 px-6 py-20 lg:px-20">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold">
            Everything You Need
          </h2>

          <p className="mt-4 text-slate-500">
            Powerful tools to manage tasks efficiently.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">
              Task Tracking
            </h3>
            <p className="mt-3 text-slate-500">
              Create, update and manage tasks easily.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">
              Real-Time Updates
            </h3>
            <p className="mt-3 text-slate-500">
              Instant task synchronization using Socket.IO.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">
              Analytics
            </h3>
            <p className="mt-3 text-slate-500">
              Visualize progress with charts and reports.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">
              Secure Access
            </h3>
            <p className="mt-3 text-slate-500">
              JWT authentication and protected routes.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 px-6 py-20 text-white lg:px-20">
        <div className="grid gap-10 text-center md:grid-cols-4">
          <div>
            <h3 className="text-5xl font-bold">10K+</h3>
            <p className="mt-2 text-slate-400">
              Tasks Managed
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">5K+</h3>
            <p className="mt-2 text-slate-400">
              Active Users
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">98%</h3>
            <p className="mt-2 text-slate-400">
              Satisfaction
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">24/7</h3>
            <p className="mt-2 text-slate-400">
              Availability
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-24 text-center">
        <h2 className="text-5xl font-bold">
          Ready to Boost Productivity?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-slate-500">
          Join thousands of users managing tasks more
          efficiently every day.
        </p>

        <button onClick={()=>signUp()} className="mt-8 rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white">
          Get Started Today
        </button>
      </section>
    </div>
  );
}