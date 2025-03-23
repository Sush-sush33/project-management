import React from 'react';
import { format, isAfter, parseISO } from 'date-fns';
import { Calendar, Clock, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AnimatedContainer from './AnimatedContainer';
import { cn } from '@/lib/utils';

const ProjectCard = ({ project, onEdit, onDelete, index }) => {
  // Check if deadline has passed
  const isDeadlinePassed = isAfter(new Date(), parseISO(project.deadline));
  
  return (
    <AnimatedContainer
      className="h-full"
      animation="slide-up"
      delay={index * 100}
    >
      <Card className={cn(
        "h-full overflow-hidden transition-all duration-300 hover:shadow-md",
        "border border-border hover:border-primary/20"
      )}>
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span 
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                  isDeadlinePassed 
                    ? "bg-destructive/10 text-destructive" 
                    : "bg-primary/10 text-primary"
                )}
              >
                <Clock className="mr-1 h-3 w-3" />
                {isDeadlinePassed ? 'Overdue' : 'Active'}
              </span>
            </div>
            
            <h3 className="font-semibold text-lg leading-tight">{project.name}</h3>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="icon-button">
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(project)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(project.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        
        <CardContent>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {project.description}
          </p>
        </CardContent>
        
        <CardFooter className="pt-2 flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>
              {format(parseISO(project.deadline), 'MMM d, yyyy')}
            </span>
          </div>
          
          <div className="text-xs">
            Created {format(parseISO(project.createdAt), 'MMM d, yyyy')}
          </div>
        </CardFooter>
      </Card>
    </AnimatedContainer>
  );
};

export default ProjectCard;