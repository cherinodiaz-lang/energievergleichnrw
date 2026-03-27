import React, { Fragment, createElement, forwardRef, type CSSProperties, type ReactNode } from "react";

const MOTION_PROP_NAMES = new Set([
  "animate",
  "custom",
  "exit",
  "initial",
  "layout",
  "layoutId",
  "transition",
  "variants",
  "viewport",
  "whileDrag",
  "whileHover",
  "whileInView",
  "whileTap",
  "drag",
  "dragConstraints",
  "dragElastic",
  "dragMomentum",
  "dragTransition",
  "onViewportEnter",
  "onViewportLeave",
]);

function sanitizeStyle(style: CSSProperties | undefined): CSSProperties | undefined {
  if (!style) {
    return style;
  }

  const {
    x,
    y,
    z,
    rotate,
    rotateX,
    rotateY,
    rotateZ,
    scale,
    scaleX,
    scaleY,
    scaleZ,
    skewX,
    skewY,
    transformPerspective,
    ...safeStyle
  } = style as CSSProperties & Record<string, unknown>;

  void x;
  void y;
  void z;
  void rotate;
  void rotateX;
  void rotateY;
  void rotateZ;
  void scale;
  void scaleX;
  void scaleY;
  void scaleZ;
  void skewX;
  void skewY;
  void transformPerspective;

  return safeStyle;
}

function sanitizeProps<T extends Record<string, unknown>>(props: T): T {
  const sanitizedEntries = Object.entries(props).filter(([key]) => !MOTION_PROP_NAMES.has(key));
  const sanitizedProps = Object.fromEntries(sanitizedEntries) as T & {
    style?: CSSProperties;
    children?: ReactNode;
  };

  sanitizedProps.style = sanitizeStyle(sanitizedProps.style);

  return sanitizedProps;
}

type MotionComponent = React.ForwardRefExoticComponent<Record<string, unknown>>;

export const motion = new Proxy<Record<string, MotionComponent>>(
  {},
  {
    get(_target, tagName: string) {
      return forwardRef<HTMLElement, Record<string, unknown>>(function StableMotionComponent(props, ref) {
        const sanitizedProps = sanitizeProps(props);
        return createElement(tagName, { ...sanitizedProps, ref }, sanitizedProps.children);
      });
    },
  },
);

export function AnimatePresence({ children }: { children?: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}

export function MotionConfig({ children }: { children?: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}

export function useScroll() {
  return {
    scrollX: 0,
    scrollXProgress: 0,
    scrollY: 0,
    scrollYProgress: 0,
  };
}

export function useTransform<T>(_: unknown, __: unknown, output: readonly T[] | T): T {
  return Array.isArray(output) ? output[0] : output;
}
