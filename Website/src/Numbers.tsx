import { useState, useEffect, useRef } from 'react';
import './Numbers.css';

interface CounterProps {
  target: number;
  suffix?: string;
  isVisible: boolean;
}

function Counter ({ target, suffix = '', isVisible }:CounterProps)  {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16); 

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 8);

    return () => clearInterval(timer);
  }, [target, isVisible]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

interface StatData {
  number: number;
  label: string;
  suffix?: string;
}

function AnimatedStatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const stats: StatData[] = [
    { number: 1800, label: 'Staff' },
    { number: 250, label: 'Projects Completed', suffix: '+' },
    { number: 25, label: 'Years Of Experience' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);


  return (
    <>
            <div ref={containerRef} style={{marginTop:"40px"}}>
        <div className="grid">
            {stats.map((stat, index) => (
            <div key={index} className="statBox">
                <div className="number">
                <span className="theNumber">
                    <Counter target={stat.number} suffix={stat.suffix} isVisible={isVisible} />
                </span>
                </div>
                <div className="label">{stat.label}</div>
            </div>
            ))}
        </div>
        </div>
    </>
  );
};

export default AnimatedStatsCounter;
