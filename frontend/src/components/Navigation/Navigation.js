import { Home, Heart, User } from 'lucide-react';
import './Navigation.css';

export function Navigation() {
  return (
    <nav className="nav-bar">
      <a href="#home" className="nav-link">
        <Home size={24} />
        <span>Начало</span>
      </a>
      <a href="#saved" className="nav-link">
        <Heart size={24} />
        <span>Любими</span>
      </a>
      <a href="#profile" className="nav-link">
        <User size={24} />
        <span>Профил</span>
      </a>
    </nav>
  );
}