"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import FloatingHearts from "./components/FloatingHearts";

export default function Home() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successImage, setSuccessImage] = useState("/aashi.jpg");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const PHRASES = [
    "Every day feels like Valentine’s Day when I’m with you. I’m so lucky to have you in my life.",
    "You’re my favorite person, my favorite place, and my favorite part of every single day.",
    "I didn’t know what I was missing until I found you. Happy Valentine’s Day to my everything.",
    "Just a reminder that you are loved more than you know. I'm so glad you're mine.",
    "Here’s to this Valentine’s Day and all the ones we have yet to share. I love you",
    "I can’t wait to keep making memories with you (not like the phone incident grrr hihi)",
    "I’ve loved you since day one, and I’ll love you for all the days to come. \nI love you Aaaaaassshiiii",
    "I'm sooooooo lucky to have you",
    "I can't imagine a single Valentine's Day, or any day, without you by my side.\nI love you Aaaaassshii"
  ];

  const IMAGES = [
    "/pic1.jpg",
    "/pic2.jpg",
    "/pic3.jpg",
    "/pic4.jpg",
    "/pic5.jpg",
    "/pic6.jpg",
    "/pic7.jpg"
  ];

  const handleNoHover = () => {
    const maxX = window.innerWidth - 100; // Buffer for button width
    const maxY = window.innerHeight - 50;  // Buffer for button height
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    // Ensure padding from edges (50px)
    const padding = 50;
    const clampedX = Math.max(padding, Math.min(x, maxX - padding));
    const clampedY = Math.max(padding, Math.min(y, maxY - padding));

    setNoPosition({ x: clampedX, y: clampedY });
    setHasMoved(true);
    setYesScale((prev) => prev + 1);
  };

  const handleYesClick = () => {
    // Select a random phrase
    const randomPhrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    setSuccessMessage(randomPhrase);

    // Select a random image
    const randomImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    setSuccessImage(randomImage);

    setIsSuccess(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffffff']
    });
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const resetGame = () => {
    setIsSuccess(false);
    setYesScale(1);
    setHasMoved(false);
    setNoPosition({ x: 0, y: 0 });
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <FloatingHearts />
      <audio ref={audioRef} src="https://www.myinstants.com/media/sounds/careless-whisper-sax-iphone.mp3" />

      <AnimatePresence>
        {!isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="z-10 flex flex-col items-center gap-8 md:gap-12 text-center pt-16 md:pt-20"
          >
            <h1 className="font-dancing-script text-4xl md:text-7xl text-purple-700 drop-shadow-sm pointer-events-none select-none mb-6 md:mb-8 px-4">
              Will you be my valentine, Aashi?
            </h1>

            <div className="relative flex items-center justify-center gap-4 md:gap-8">
              <motion.button
                onClick={handleYesClick}
                layout
                style={{ scale: yesScale }}
                className="rounded-xl bg-[#ff4d6d] hover:bg-[#ff3355] text-white font-bold py-2 px-6 text-xl md:py-3 md:px-8 md:text-2xl shadow-md transition-colors duration-200"
              >
                Yes 💖
              </motion.button>

              <motion.button
                onMouseEnter={handleNoHover}
                // Also trigger on click for touch devices
                onClick={handleNoHover}
                style={{
                  position: hasMoved ? "fixed" : "relative",
                  left: hasMoved ? noPosition.x : "auto",
                  top: hasMoved ? noPosition.y : "auto",
                  zIndex: 100,
                }}
                className="rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2 px-6 text-lg md:py-3 md:px-8 md:text-xl shadow-md transition-colors duration-200 whitespace-nowrap"
                animate={hasMoved ? { left: noPosition.x, top: noPosition.y } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                No 🥀
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={resetGame}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="z-50 relative p-6 md:p-8 rounded-3xl bg-white/40 backdrop-blur-xl shadow-2xl border border-white/50 max-w-lg w-10/12 md:w-full mx-4 text-center font-sans"
            >
              {/* Close button removed */}

              <h2 className="font-dancing-script text-3xl md:text-6xl text-purple-700 mb-4 md:mb-6">
                Yayyyy You said Yes omgggg.
              </h2>

              <p className="text-base md:text-xl text-purple-800 mb-6 md:mb-8 leading-relaxed font-sans px-2 whitespace-pre-line">
                {successMessage}
              </p>

              <div className="w-full aspect-auto bg-transparent rounded-2xl mb-4 md:mb-6 overflow-hidden flex items-center justify-center">
                <img
                  src={successImage}
                  alt="Us"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
