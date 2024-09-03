/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Terminal,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Facebook,
} from "lucide-react";

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = ["/a1.mp3", "/a2.mp3"];

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying && audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setTotalTime(audioRef.current?.duration || 0);
      };
    }
  }, [currentTrack]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSkipBack = () => {
    setCurrentTrack(
      (prevTrack) => (prevTrack - 1 + tracks.length) % tracks.length
    );
    setCurrentTime(0);
  };

  const handleSkipForward = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % tracks.length);
    setCurrentTime(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-4 font-mono relative">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4 mb-8">
          <div className="relative w-40 h-40 mx-auto mb-4">
            <Image
              src="/kirin.png"
              alt="Profile Picture"
              layout="fill"
              className="rounded-full border-4 border-green-400 shadow-lg shadow-green-400/50"
            />
          </div>
          <h1 className="text-4xl font-bold">
            <span className="text-blue-400">const</span> developer ={" "}
            <span className="text-yellow-400">"Ary Sakirin"</span>;
          </h1>
          <p className="text-xl">
            <span className="text-purple-400">function</span>{" "}
            createAwesomeSoftware() &#123;{" "}
            <span className="text-orange-400">
              /* code magic happens here */
            </span>{" "}
            &#125;
          </p>
        </header>

        <section className="flex justify-center space-x-6 mb-8">
          {[
            {
              icon: <Facebook size={28} />,
              url: "https://www.facebook.com/profile.php?id=100046502474922",
            },
            {
              icon: <Github size={28} />,
              url: "https://github.com/Ary-Sakirin",
            },
            {
              icon: <Linkedin size={28} />,
              url: "https://kh.linkedin.com/in/ary-sakirin-b770b7210",
            },
            {
              icon: <Mail size={28} />,
              url: "mailto:arysakirin29@example.com",
            },
          ].map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              {social.icon}
            </a>
          ))}
        </section>

        <section className="space-y-4 bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="flex items-center mb-2">
            <Terminal className="mr-2" />
            <span className="text-purple-400">projects</span>
            <span className="text-white">.</span>
            <span className="text-yellow-400">map</span>
            <span className="text-white">((</span>
            <span className="text-orange-400">project</span>
            <span className="text-white">) =&gt; &#123;</span>
          </div>
          {[
            {
              name: "MOC-HUB",
              description:
                "Developing the website frontend for the Ministry of Commerce",
            },
            {
              name: "MOC-SLS-ADMIN",
              description: "Create UX/UI and develop frontend",
            },
            {
              name: "MOC-SAS",
              description:
                "Developing innovative solutions for modern problems",
            },
          ].map((project, index) => (
            <div key={index} className="pl-8 border-l-2 border-gray-700">
              <h3 className="font-semibold text-lg text-yellow-400">
                {project.name}
              </h3>
              <p className="text-sm text-gray-400">{project.description}</p>
            </div>
          ))}
          <div className="flex items-center mt-2">
            <span className="text-white">&#125;);</span>
          </div>
        </section>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSkipBack}
              className="text-gray-400 hover:text-green-400"
            >
              <SkipBack size={24} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-gray-400 hover:text-green-400"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={handleSkipForward}
              className="text-gray-400 hover:text-green-400"
            >
              <SkipForward size={24} />
            </button>
          </div>
          <div className="flex-1 mx-4">
            <div className="text-sm text-gray-400 mb-1">
              Now Playing: Coding Beats - Syntax Error
            </div>
            <div className="bg-gray-700 h-1 rounded-full">
              <div
                className="bg-green-400 h-1 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(currentTime / totalTime) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            {formatTime(currentTime)} / {formatTime(totalTime)}
          </div>
        </div>
        <audio
          ref={audioRef}
          src={tracks[currentTrack]}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }}
        />
      </footer>
    </div>
  );
}
