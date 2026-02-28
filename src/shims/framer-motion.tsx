import React from "react";

type AnyProps = Record<string, unknown>;

const filterDomProps = (props: AnyProps) => {
  const out: AnyProps = {};
  for (const [key, value] of Object.entries(props ?? {})) {
    if (
      key === "initial" ||
      key === "animate" ||
      key === "exit" ||
      key === "transition" ||
      key === "variants" ||
      key === "whileHover" ||
      key === "whileTap" ||
      key === "whileInView" ||
      key === "viewport" ||
      key === "layout" ||
      key === "layoutId" ||
      key === "drag" ||
      key === "dragConstraints" ||
      key === "dragElastic" ||
      key === "dragMomentum" ||
      key === "dragTransition" ||
      key === "onAnimationStart" ||
      key === "onAnimationComplete" ||
      key === "onUpdate" ||
      key === "onDrag" ||
      key === "onDragStart" ||
      key === "onDragEnd" ||
      key === "onDragTransitionEnd" ||
      key === "onDirectionLock" ||
      key === "onViewportEnter" ||
      key === "onViewportLeave" ||
      key === "onLayoutAnimationComplete" ||
      key === "style" ||
      key === "className" ||
      key === "children" ||
      key.startsWith("on")
    ) {
      continue;
    }
    out[key] = value;
  }
  return out;
};

const createMotionComponent = <T extends keyof JSX.IntrinsicElements>(
  tag: T
) => {
  return React.forwardRef<HTMLElement, AnyProps>(function MotionShim(
    props,
    ref
  ) {
    const { children, className, style, ...rest } = props as AnyProps;
    return React.createElement(
      tag,
      {
        ...(filterDomProps(rest) as AnyProps),
        ref,
        className,
        style,
      },
      children
    );
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

export const LazyMotion: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <>{children}</>;

export const domAnimation = {};
export const domMax = {};
