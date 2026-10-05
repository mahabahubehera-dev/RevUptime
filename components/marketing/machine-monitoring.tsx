'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  History,
  Pause,
  Play,
  Thermometer,
  Waves,
} from 'lucide-react';

const measurements = [
  {
    icon: Waves,
    title: '3-Axis Vibration',
    description: 'Measure vibration behaviour across X, Y and Z axes to identify developing changes in machine condition.',
  },
  {
    icon: Thermometer,
    title: 'Machine Temperature',
    description: 'Track temperature alongside vibration to add operating context and identify abnormal thermal behaviour.',
  },
  {
    icon: History,
    title: 'Continuous Condition Data',
    description: 'Build a historical condition profile for every monitored machine so RevUptime can understand what is normal and what is changing.',
  },
];

const monitoringSlides = [
  {
    src: '/images/revuptime-condition-sensor.png',
    alt: 'RevUptime-branded condition sensor shown mounted near the bearing of an industrial motor',
    badge: 'REVUPTIME CONDITION SENSOR',
    title: 'Monitor condition at the machine.',
    description: 'A sensor mounted near the bearing observes vibration and temperature while the machine operates.',
    bearingNote: 'Mounted close to the machine bearing / vibration source',
    imageFit: 'cover',
  },
  {
    src: '/images/revuptime-installed-sensor.png',
    alt: 'RevUptime-branded vibration sensor shown installed on the bearing housing of an industrial electric motor',
    badge: 'REVUPTIME MOTOR SENSOR',
    title: 'Installed close to the source.',
    description: 'An example installation shows the sensor fitted on a motor bearing housing for machine-condition monitoring.',
    bearingNote: 'Sensor fixed at the motor bearing housing',
    imageFit: 'cover',
  },
  {
    src: '/images/revuptime-sensor-metrics.png',
    alt: 'Illustration showing vibration, movement, frequency and temperature measurements from a condition sensor',
    badge: 'ILLUSTRATIVE SENSOR OUTPUTS',
    title: 'Turn machine behaviour into measurable data.',
    description: 'Vibration, motion, frequency and temperature provide condition context for maintenance review.',
    bearingNote: undefined,
    imageFit: 'contain',
  },
] as const;

export function MachineMonitoringSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isObserving, setIsObserving] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setIsPaused(true);
      setIsVisible(true);
      return;
    }

    setIsObserving(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || isHovered) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setActiveSlide((current) => (current + 1) % monitoringSlides.length);
      }
    }, 5500);
    return () => window.clearInterval(timer);
  }, [isPaused, isHovered]);

  function showPreviousSlide() {
    setActiveSlide((current) => (current + monitoringSlides.length - 1) % monitoringSlides.length);
  }

  function showNextSlide() {
    setActiveSlide((current) => (current + 1) % monitoringSlides.length);
  }

  return (
    <section
      ref={sectionRef}
      className={`section light-section machine-monitoring-section${isObserving ? ' is-observing' : ''}${isVisible ? ' is-visible' : ''}`}
      aria-labelledby="machine-monitoring-title"
    >
      <div className="container">
        <div className="machine-monitoring-intro">
          <span className="section-eyebrow">REAL-WORLD MACHINE MONITORING</span>
          <h2 id="machine-monitoring-title">From Machine Vibration to Actionable Intelligence</h2>
          <p>RevUptime starts at the machine. Industrial condition sensors capture vibration and temperature data directly from critical rotating equipment and continuously send that information to the RevUptime platform for analysis.</p>
        </div>

        <div className="machine-monitoring-layout">
          <figure className="machine-monitoring-visual">
            <div
              className="machine-carousel"
              role="region"
              aria-roledescription="carousel"
              aria-label="Condition sensor and measurements"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className={`machine-monitoring-photo${monitoringSlides[activeSlide].imageFit === 'contain' ? ' is-metrics-slide' : ''}`}>
                {monitoringSlides.map((slide, index) => (
                  <div
                    className={`machine-carousel-slide${index === activeSlide ? ' is-active' : ''}${slide.imageFit === 'contain' ? ' is-metrics-slide' : ''}`}
                    key={slide.src}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${monitoringSlides.length}`}
                    aria-hidden={index !== activeSlide}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 55vw"
                    />
                    <span className="sensor-photo-label"><Activity size={15}/> {slide.badge}</span>
                    {slide.bearingNote && (
                      <>
                        <span className="bearing-callout"><i aria-hidden="true"/> {slide.bearingNote}</span>
                        <span className="sensor-location-dot" aria-hidden="true"/>
                      </>
                    )}
                    <div className="machine-slide-purpose">
                      <strong>{slide.title}</strong>
                      <span>{slide.description}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="machine-carousel-controls" aria-label="Image slideshow controls">
                <button type="button" onClick={showPreviousSlide} aria-label="Show previous image">
                  <ChevronLeft size={19}/>
                </button>
                <div className="machine-carousel-dots" aria-label="Choose an image">
                  {monitoringSlides.map((slide, index) => (
                    <button
                      type="button"
                      key={slide.src}
                      className={index === activeSlide ? 'is-active' : ''}
                      aria-label={`Show image ${index + 1}: ${slide.title}`}
                      aria-pressed={index === activeSlide}
                      onClick={() => setActiveSlide(index)}
                    />
                  ))}
                </div>
                <span className="machine-carousel-count">{String(activeSlide + 1).padStart(2, '0')} / {String(monitoringSlides.length).padStart(2, '0')}</span>
                <button type="button" onClick={showNextSlide} aria-label="Show next image">
                  <ChevronRight size={19}/>
                </button>
                <button
                  type="button"
                  className="machine-carousel-play"
                  onClick={() => setIsPaused((paused) => !paused)}
                  aria-label={isPaused ? 'Play image slideshow' : 'Pause image slideshow'}
                  aria-pressed={isPaused}
                >
                  {isPaused ? <Play size={15}/> : <Pause size={15}/>}
                </button>
              </div>
            </div>
            <figcaption>{monitoringSlides[activeSlide].description} Illustrative imagery; final sensor placement depends on the equipment and site.</figcaption>
          </figure>

          <div className="machine-monitoring-copy">
            <h3>Your existing machines become connected machines.</h3>
            <p>RevUptime condition sensors are installed directly on motors, pumps, fans, gearboxes and other rotating equipment. The sensor captures how the machine behaves during normal operation and helps identify meaningful changes before they develop into serious failures.</p>

            <div className="machine-measurements">
              {measurements.map(({ icon: Icon, title, description }) => (
                <article className="machine-measurement-card" key={title}>
                  <span className="machine-measurement-icon"><Icon size={21}/></span>
                  <div><h4>{title}</h4><p>{description}</p></div>
                </article>
              ))}
            </div>

            <Link className="button secondary machine-monitoring-cta" href="#copilot">
              See How RevUptime Works <ArrowRight size={16}/>
            </Link>
          </div>
        </div>

        <p className="machine-monitoring-footnote"><Check size={16}/> From the machine floor to the maintenance team — RevUptime turns physical machine behaviour into clear condition insights.</p>
      </div>
    </section>
  );
}
