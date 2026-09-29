import {
  Gift,
  HandHeart,
  Heart,
  Layers,
  MessageCircle,
  Package,
  PenTool,
  Shirt,
  Sparkles,
  Wine,
  type LucideProps,
} from "lucide-react";

const icons = {
  gift: Gift,
  "hand-heart": HandHeart,
  heart: Heart,
  layers: Layers,
  "message-circle": MessageCircle,
  package: Package,
  "pen-tool": PenTool,
  shirt: Shirt,
  sparkles: Sparkles,
  wine: Wine,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = icons[name as IconName] ?? Gift;
  return <Component aria-hidden="true" {...props} />;
}
