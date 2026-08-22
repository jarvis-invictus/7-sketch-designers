"use client";

import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Generative Art Canvas Component
const GenerativeArtCanvas = ({ isHovered }) => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let lines = [];
        const numLines = 30;

        class Line {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.speed = Math.random() * 0.5 + 0.1;
                this.angle = Math.random() * Math.PI * 2;
                this.length = Math.random() * 20 + 5;
            }
            update() {
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length);
                ctx.strokeStyle = `rgba(168, 85, 247, ${Math.random() * 0.3 + 0.1})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        const init = () => {
            lines = [];
            for (let i = 0; i < numLines; i++) {
                lines.push(new Line());
            }
        };

        const animate = () => {
            if (isHovered) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                lines.forEach(line => {
                    line.update();
                    line.draw();
                });
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        
        canvas.width = 400;
        canvas.height = 400;
        init();
        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered]);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />;
};


// Gallery Card Component with 3D tilt effect
export const GalleryCard = ({ item, index, onClick }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };
    
    const cardVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8, delay: index * 0.1 } }
    };

    return (
        <motion.div
            key={item.title}
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => onClick && onClick(item.id)}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative h-[380px] w-full rounded-xl border border-[var(--hairline)] bg-white cursor-pointer"
        >
            <div 
                style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
                className="absolute inset-2 sm:inset-4 flex flex-col justify-end p-8 rounded-[14px] overflow-hidden bg-black shadow-lg"
            >
                <img 
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-60"
                />
                <GenerativeArtCanvas isHovered={isHovered} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                
                <div className="relative z-10 w-full px-1 pb-2" style={{ transform: "translateZ(20px)" }}>
                    <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: isHovered ? 0 : 15, opacity: isHovered ? 1 : 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="mb-2.5 inline-block px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold tracking-wider uppercase backdrop-blur-md"
                        style={{ backgroundColor: 'rgba(150, 105, 74, 0.9)', color: '#FFFFFF', fontFamily: 'var(--font-body)', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        {item.category}
                    </motion.div>
                    <motion.div 
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: isHovered ? 0 : 15, opacity: isHovered ? 1 : 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.05 }}
                        className="text-[15px] md:text-[16px] font-semibold text-white leading-snug line-clamp-2 drop-shadow-md pr-4"
                        style={{ wordBreak: 'break-word', fontFamily: 'var(--font-body)' }}
                    >
                        {item.title}
                    </motion.div>
                </div>
                <div className="absolute top-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1" style={{ transform: "translateZ(40px)" }}>
                    <ArrowUpRight size={28} />
                </div>
            </div>
        </motion.div>
    );
};
