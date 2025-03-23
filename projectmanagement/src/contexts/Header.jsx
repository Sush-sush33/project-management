import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedContainer from './AnimatedContainer';

const Header = ({ title, subtitle, onAddNew }) => {
  return (
    <AnimatedContainer 
      className="flex flex-col md:flex-row md:items-center justify-between mb-8 px-4 md:px-0"
      animation="slide-down"
    >
      <div>
        <div className="flex items-center gap-2">
          <div className="chip">Dashboard</div>
        </div>
        <h1 className="text-3xl font-bold mt-2">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      
      {onAddNew && (
        <Button 
          onClick={onAddNew} 
          className="mt-4 md:mt-0 group button-hover-effect"
          size="sm"
        >
          <PlusCircle className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          New Project
        </Button>
      )}
    </AnimatedContainer>
  );
};

export default Header;
