import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const heroRef = useRef(null);
  const journeyRef = useRef(null);
  const principlesRef = useRef(null);
  const teamRef = useRef(null);

  const teamMembers = [
    {
      name: "Jane Doe",
      role: "Founder & CEO",
      description:
        "With over 20 years of experience in civil engineering, Jane leads our company with visionary leadership.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
      name: "John Smith",
      role: "Head of Operations",
      description:
        "John ensures that every project is executed flawlessly from start to finish, on time and on budget.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
      name: "Emily White",
      role: "Lead Agronomist",
      description:
        "Emily's expertise in turf science ensures our natural grass fields are second to none.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
      name: "Michael Brown",
      role: "Sales Director",
      description:
        "Michael builds strong relationships with our clients, understanding their needs and delivering solutions.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
    },
  ];

  const timelineEvents = [
    {
      year: "2010",
      title: "The Kick-off",
      description:
        "FieldPro was founded with a mission to revolutionize sports surfaces.",
    },
    {
      year: "2015",
      title: "First Major League Project",
      description:
        "Completed our first professional stadium, setting new standards for quality.",
    },
    {
      year: "2020",
      title: "Innovating Turf Technology",
      description:
        "Introduced our proprietary hybrid turf system, combining the best of natural and artificial grass.",
    },
    {
      year: "Today",
      title: "Global Leader",
      description:
        "Recognized as a global leader, with projects spanning continents.",
    },
  ];

  useEffect(() => {
    // Hero Section Animation
    gsap.fromTo(
      heroRef.current.children,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
      }
    );

    // Journey Section Animation
    gsap.fromTo(
      ".journey-content",
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: journeyRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".timeline-item",
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: journeyRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Principles Section Animation
    gsap.fromTo(
      ".principles-header",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: principlesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".principle-card",
      {
        y: 80,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: principlesRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Team Section Animation
    gsap.fromTo(
      ".team-header",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".team-member",
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center py-20 bg-[#080d07]">
        <div ref={heroRef} className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Building the Future of Football
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed">
            Your trusted partner in creating world-class football grounds from
            the ground up.
          </p>
        </div>
      </section>

      {/* Our Journey Section */}
      <section ref={journeyRef} className="py-20 px-6 bg-[#1a2e15]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:!flex-row items-start justify-between gap-12">
            {/* Left Content */}
            <div className="journey-content">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Our Journey
              </h2>
              <p className="text-neutral-300 text-lg leading-relaxed">
                From a passionate startup to a leading name in sports
                infrastructure, our journey is one of innovation, dedication,
                and love for the beautiful game. We've spent years perfecting
                the art and science of football ground construction, delivering
                excellence every step of the way.
              </p>
            </div>

            {/* Right Timeline */}
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className="timeline-item flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-4 h-4 bg-lime-400 rounded-full mt-2"></div>
                    {index < timelineEvents.length - 1 && (
                      <div className="w-0.5 h-16 bg-lime-400/30 ml-1.5 mt-2"></div>
                    )}
                  </div>
                  <div>
                    <p className="text-lime-400 font-bold text-lg mb-1">
                      {event.year} - {event.title}
                    </p>
                    <p className="text-neutral-300 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Principles Section */}
      <section ref={principlesRef} className="py-20 px-6 bg-[#0e1a12]">
        <div className="max-w-7xl mx-auto">
          <div className="principles-header text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Our Core Principles
            </h2>
            <p className="text-neutral-300 text-lg max-w-3xl mx-auto">
              Our mission, vision, and values are the bedrock of our company.
              They guide our actions and define our commitment to our clients
              and the sport.
            </p>
          </div>

          <div className="grid grid-cols-1 md:!grid-cols-3 gap-8">
            {/* Mission Card */}
            <div className="principle-card bg-[#1a2e15] p-8 rounded-lg border border-lime-400/20">
              <h3 className="text-lime-400 text-2xl font-bold mb-4">Mission</h3>
              <p className="text-neutral-300 leading-relaxed">
                To provide high-quality, durable, and safe football grounds that
                inspire athletes to perform at their best and communities to
                come together.
              </p>
            </div>

            {/* Vision Card */}
            <div className="principle-card bg-[#1a2e15] p-8 rounded-lg border border-lime-400/20">
              <h3 className="text-lime-400 text-2xl font-bold mb-4">Vision</h3>
              <p className="text-neutral-300 leading-relaxed">
                To be the world's most trusted and innovative provider of sports
                surfaces, enhancing the experience of football for everyone,
                everywhere.
              </p>
            </div>

            {/* Values Card */}
            <div className="principle-card bg-[#1a2e15] p-8 rounded-lg border border-lime-400/20">
              <h3 className="text-lime-400 text-2xl font-bold mb-4">Values</h3>
              <p className="text-neutral-300 leading-relaxed">
                Quality, Integrity, Innovation, and Passion. These pillars are
                at the heart of everything we do, ensuring we deliver excellence
                on time, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section ref={teamRef} className="py-20 px-6 bg-[#1a2e15]">
        <div className="max-w-7xl mx-auto">
          <div className="team-header text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Meet Our Team
            </h2>
            <p className="text-neutral-300 text-lg max-w-3xl mx-auto">
              The driving force behind FieldPro is our team of dedicated
              professionals. With a shared passion for football and a commitment
              to excellence, we bring expertise and experience to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:!grid-cols-4 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member text-center">
                <div className="relative mb-6">
                  <div className="w-40 h-40 mx-auto rounded-full border-4 border-lime-400 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-lime-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
