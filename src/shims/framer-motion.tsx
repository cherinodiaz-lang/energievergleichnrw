import React from "react";

type AnyProps = Record<string, unknown>;

type MotionLikeKeys =
  | "initial"
  | "animate"
  | "exit"
  | "transition"
  | "variants"
  | "whileHover"
  | "whileTap"
  | "whileInView"
  | "viewport"
  | "layout"
  | "layoutId"
  | "drag"
  | "dragConstraints"
  | "dragElastic"
  | "dragMomentum"
  | "dragTransition"
  | "onAnimationStart"
  | "onAnimationComplete"
  | "onUpdate"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragTransitionEnd"
  | "onDirectionLock"
  | "onViewportEnter"
  | "onViewportLeave"
  | "onLayoutAnimationComplete";

const MOTION_PROPS = new Set<string>([
  "initial",
  "animate",
  "exit",
  "transition",
  "variants",
  "whileHover",
  "whileTap",
  "whileInView",
  "viewport",
  "layout",
  "layoutId",
  "drag",
  "dragConstraints",
  "dragElastic",
  "dragMomentum",
  "dragTransition",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDrag",
  "onDragStart",
  "onDragEnd",
  "onDragTransitionEnd",
  "onDirectionLock",
  "onViewportEnter",
  "onViewportLeave",
  "onLayoutAnimationComplete",
]);

const filterDomProps = (props: AnyProps) => {
  const out: AnyProps = {};
  for (const [key, value] of Object.entries(props ?? {})) {
    if (MOTION_PROPS.has(key)) continue;
    out[key] = value;
  }
  return out;
};

const createMotionComponent = <T extends keyof JSX.IntrinsicElements>(tag: T) => {
  return React.forwardRef<any, AnyProps>(function MotionShim(props, ref) {
    const { children, ...rest } = props as AnyProps;
    return React.createElement(tag, { ...(filterDomProps(rest) as AnyProps), ref }, children);
  });
};

const motionProxy = new Proxy(
  {},
  {
    get: (_target, prop: string) => createMotionComponent(prop as any),
  }
) as unknown as Record<string, React.ForwardRefExoticComponent<any>>;

export const motion = motionProxy;

export const AnimatePresence: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <>{children}</>;

export const useReducedMotion = () => false;

export type MotionProps = Record<string, unknown>;
export type HTMLMotionProps<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T] &
    Partial<Record<MotionLikeKeys, unknown>> &
    Record<string, unknown>;

export const LazyMotion: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <>{children}</>;

export const domAnimation = {};
export const domMax = {};
