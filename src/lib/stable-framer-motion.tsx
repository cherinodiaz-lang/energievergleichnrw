/**
 * stable-framer-motion.tsx
 *
 * SSR-safe wrappers around framer-motion primitives.
 * Strips motion-specific props before forwarding to DOM elements so that
 * Astro static builds and server-side renders don't receive unknown DOM
 * attributes or type errors from the React createElement call.
 */

import { createElement, forwardRef, type ReactNode } from 'react';
import type { ElementType, ForwardedRef } from 'react';

// ---------------------------------------------------------------------------
// Prop filtering
// ---------------------------------------------------------------------------

/**
 * The set of prop keys that framer-motion adds to components but that must
 * not be forwarded to a native DOM element.
 */
const MOTION_PROP_KEYS = new Set([
  'animate',
  'initial',
  'exit',
  'transition',
  'variants',
  'whileHover',
  'whileTap',
  'whileFocus',
  'whileDrag',
  'whileInView',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'dragPropagation',
  'dragSnapToOrigin',
  'dragTransition',
  'onDragStart',
  'onDragEnd',
  'onDrag',
  'onDirectionLock',
  'onDragTransitionEnd',
  'layout',
  'layoutId',
  'layoutDependency',
  'layoutScroll',
  'layoutRoot',
  'onLayoutAnimationStart',
  'onLayoutAnimationComplete',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onViewportEnter',
  'onViewportLeave',
  'viewport',
  'transformTemplate',
  'custom',
  'inherit',
  'ignoreStrict',
  '_dragX',
  '_dragY',
]);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SanitizedProps = Record<string, unknown> & { children?: unknown };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Return a copy of `props` with all motion-specific keys removed. */
function sanitizeProps(props: Record<string, unknown>): SanitizedProps {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (!MOTION_PROP_KEYS.has(key)) {
      result[key] = props[key];
    }
  }
  return result as SanitizedProps;
}

// ---------------------------------------------------------------------------
// createStableMotionComponent
// ---------------------------------------------------------------------------

/**
 * Wraps a native HTML element (or any React component) so that framer-motion
 * props are stripped before reaching `createElement`, preventing unknown-DOM-
 * attribute warnings and TypeScript errors in static/SSR builds.
 */
function createStableMotionComponent<T extends ElementType>(tag: T) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const StableComponent = forwardRef<unknown, Record<string, any>>(
    (props, ref: ForwardedRef<unknown>) => {
      const sanitizedProps = sanitizeProps(props);
      const key = tag as ElementType;
      return createElement(key, { ...sanitizedProps, ref }, sanitizedProps.children as ReactNode);
    }
  );
  StableComponent.displayName = `StableMotion(${typeof tag === 'string' ? tag : 'Component'})`;
  return StableComponent;
}

// ---------------------------------------------------------------------------
// Stable motion namespace
// ---------------------------------------------------------------------------

export const motion = {
  div: createStableMotionComponent('div'),
  span: createStableMotionComponent('span'),
  section: createStableMotionComponent('section'),
  article: createStableMotionComponent('article'),
  header: createStableMotionComponent('header'),
  footer: createStableMotionComponent('footer'),
  main: createStableMotionComponent('main'),
  nav: createStableMotionComponent('nav'),
  aside: createStableMotionComponent('aside'),
  ul: createStableMotionComponent('ul'),
  ol: createStableMotionComponent('ol'),
  li: createStableMotionComponent('li'),
  p: createStableMotionComponent('p'),
  h1: createStableMotionComponent('h1'),
  h2: createStableMotionComponent('h2'),
  h3: createStableMotionComponent('h3'),
  h4: createStableMotionComponent('h4'),
  h5: createStableMotionComponent('h5'),
  h6: createStableMotionComponent('h6'),
  a: createStableMotionComponent('a'),
  button: createStableMotionComponent('button'),
  img: createStableMotionComponent('img'),
  form: createStableMotionComponent('form'),
  input: createStableMotionComponent('input'),
  textarea: createStableMotionComponent('textarea'),
};

// ---------------------------------------------------------------------------
// useTransform — SSR-safe stub
// ---------------------------------------------------------------------------

/**
 * SSR-safe stub for framer-motion's `useTransform`.
 * During static builds there are no MotionValues, so we simply return the
 * first element of the output array (or the scalar output directly).
 */
export function useTransform<T>(_: unknown, __: unknown, output: readonly T[] | T): T {
  const result = Array.isArray(output) ? output[0] : output;
  return result as T;
}

// ---------------------------------------------------------------------------
// AnimatePresence — pass-through stub for SSR
// ---------------------------------------------------------------------------

export function AnimatePresence({ children }: { children?: ReactNode }): ReactNode {
  return children ?? null;
}
