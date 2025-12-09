interface HamburgerIconProps {
  isOpen?: boolean;
  className?: string;
}

export default function HamburgerIcon({ isOpen = false, className = '' }: HamburgerIconProps) {
  return (
    <span className={`inline-block w-6 h-6 ${isOpen ? 'opened' : ''} ${className}`}>
      <div
        className="block h-[2px] w-full mb-[0.4rem] bg-white transition-all duration-200 ease-in"
        style={isOpen ? { transform: 'translateY(8px) rotate(45deg)' } : {}}
      />
      <div
        className="block h-[2px] w-full mb-[0.4rem] bg-white transition-all duration-200 ease-in origin-right"
        style={isOpen ? { transform: 'scale(0)' } : {}}
      />
      <div
        className="block h-[2px] w-full bg-white transition-all duration-200 ease-in"
        style={isOpen ? { transform: 'translateY(-8px) rotate(-45deg)' } : {}}
      />
    </span>
  );
}
