import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface HealthCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'emergency';
}

const HealthCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
  variant = 'default'
}: HealthCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-success/20 bg-success-soft hover:bg-success-soft/80';
      case 'warning':
        return 'border-warning/20 bg-warning-soft hover:bg-warning-soft/80';
      case 'emergency':
        return 'border-emergency/20 bg-emergency-soft hover:bg-emergency-soft/80';
      default:
        return 'border-border hover:bg-accent/50';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'emergency':
        return 'text-emergency';
      default:
        return 'text-primary';
    }
  };

  const getTrendColor = () => {
    if (trend === 'up' && variant === 'success') return 'text-success';
    if (trend === 'up' && variant === 'emergency') return 'text-emergency';
    if (trend === 'down' && variant === 'success') return 'text-emergency';
    if (trend === 'down' && variant === 'emergency') return 'text-success';
    return 'text-muted-foreground';
  };

  return (
    <Card className={cn(
      'transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md',
      getVariantStyles(),
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn('h-4 w-4', getIconColor())} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <CardDescription className="text-xs mt-1">
            {description}
          </CardDescription>
        )}
        {trend && trendValue && (
          <p className={cn('text-xs mt-2', getTrendColor())}>
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthCard;