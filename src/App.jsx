import React, { useState, useEffect, useRef } from 'react';

const HanumanJi = () => {
  // Position state (x, y coordinates)
  const [position, setPosition] = useState({ x: 100, y: 100 });
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  // Offset between mouse and element top-left when drag starts
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  // Ref to the container element
  const containerRef = useRef(null);

  // Handle mouse down on the Hanuman image
  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
  };

  // Handle mouse move globally while dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      const maxX = window.innerWidth - (containerRef.current?.offsetWidth || 150);
      const maxY = window.innerHeight - (containerRef.current?.offsetHeight || 220);

      setPosition({
        x: Math.min(Math.max(newX, 0), maxX),
        y: Math.min(Math.max(newY, 0), maxY),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;

    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
  };

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const touch = e.touches[0];
      const newX = touch.clientX - dragOffset.x;
      const newY = touch.clientY - dragOffset.y;

      const maxX = window.innerWidth - (containerRef.current?.offsetWidth || 150);
      const maxY = window.innerHeight - (containerRef.current?.offsetHeight || 220);

      setPosition({
        x: Math.min(Math.max(newX, 0), maxX),
        y: Math.min(Math.max(newY, 0), maxY),
      });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset]);

  // Inline styles
  const containerStyle = {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: 1000,
    touchAction: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px',
    borderRadius: '12px',
    background: isDragging
      ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.25), rgba(255, 140, 0, 0.15))'
      : 'transparent',
    boxShadow: isDragging
      ? '0 8px 24px rgba(255, 140, 0, 0.4)'
      : 'none',
    transition: isDragging
      ? 'none'
      : 'background 0.3s ease, box-shadow 0.3s ease',
    filter: isDragging ? 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.7))' : 'none',
  };

  const imageWrapperStyle = {
    transform: isDragging ? 'scale(1.08)' : 'scale(1)',
    transition: isDragging ? 'transform 0.1s ease' : 'transform 0.3s ease',
    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
  };

  const labelStyle = {
    margin: '4px 0 0 0',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#8B0000',
    background: 'linear-gradient(90deg, #FFD700, #FFA500)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '0.5px',
    textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
    opacity: isDragging ? 1 : 0.85,
    transition: 'opacity 0.3s ease',
    whiteSpace: 'nowrap',
  };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div style={imageWrapperStyle}>
        {/* SVG representation of Hanuman Ji */}
        <svg
          width="150"
          height="200"
          viewBox="0 0 150 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background aura / glow */}
          <circle cx="75" cy="100" r="70" fill="#FFD700" opacity="0.2" />

          {/* Body */}
          <ellipse cx="75" cy="140" rx="40" ry="50" fill="#FF8C00" />

          {/* Head */}
          <circle cx="75" cy="80" r="35" fill="#FF8C00" />

          {/* Face */}
          <ellipse cx="75" cy="85" rx="25" ry="22" fill="#FFA500" />

          {/* Eyes */}
          <circle cx="65" cy="78" r="5" fill="#000000" />
          <circle cx="85" cy="78" r="5" fill="#000000" />
          <circle cx="65" cy="78" r="2" fill="#FFFFFF" />
          <circle cx="85" cy="78" r="2" fill="#FFFFFF" />

          {/* Tilak on forehead */}
          <rect x="70" y="55" width="10" height="15" fill="#FF0000" rx="2" />

          {/* Crown / mukut */}
          <path d="M50 60 L75 30 L100 60 Z" fill="#FFD700" />
          <circle cx="75" cy="35" r="5" fill="#FF0000" />

          {/* Ears */}
          <ellipse cx="40" cy="80" rx="8" ry="15" fill="#FF8C00" />
          <ellipse cx="110" cy="80" rx="8" ry="15" fill="#FF8C00" />

          {/* Arms */}
          <rect x="25" y="120" width="15" height="40" fill="#FF8C00" rx="7" />
          <rect x="110" y="120" width="15" height="40" fill="#FF8C00" rx="7" />

          {/* Gada (mace) in right hand */}
          <rect x="115" y="80" width="8" height="60" fill="#8B4513" />
          <circle cx="119" cy="75" r="12" fill="#FFD700" />

          {/* Legs */}
          <rect x="50" y="180" width="15" height="20" fill="#FF8C00" rx="5" />
          <rect x="85" y="180" width="15" height="20" fill="#FF8C00" rx="5" />

          {/* Tail */}
          <path
            d="M35 150 Q10 120 25 90 Q35 70 20 60"
            stroke="#FF8C00"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />

          {/* Om symbol on chest */}
          <text
            x="75"
            y="130"
            fontSize="20"
            textAnchor="middle"
            fill="#8B0000"
            fontWeight="bold"
          >
            ॐ
          </text>
        </svg>
      </div>
      <p style={labelStyle}>Jai Hanuman!</p>
    </div>
  );
};

export default HanumanJi;