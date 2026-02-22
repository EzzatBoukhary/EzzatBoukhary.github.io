/**
 * TechIcon — Official brand icons via the Devicon CDN.
 * Falls back to a small text chip for items without a matching icon.
 */

import type { CSSProperties } from 'react';

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

// Icons that are dark/black and need inversion on dark backgrounds
const NEEDS_INVERT = new Set(['threejs', 'express']);

const MAP: Record<string, string> = {
  'TypeScript':      'typescript/typescript-original',
  'JavaScript':      'javascript/javascript-original',
  'Kotlin':          'kotlin/kotlin-original',
  'Java':            'java/java-original',
  'Python':          'python/python-original',
  'C#':              'csharp/csharp-original',
  'C++':             'cplusplus/cplusplus-original',
  'Swift':           'swift/swift-original',
  'Dart':            'dart/dart-original',
  'SQL':             'postgresql/postgresql-original',
  'React':           'react/react-original',
  'Vue':             'vuejs/vuejs-original',
  'SvelteKit':       'svelte/svelte-original',
  'Node.js':         'nodejs/nodejs-original',
  'Express':         'express/express-original',
  'Flutter':         'flutter/flutter-original',
  'Three.js':        'threejs/threejs-original',
  'TensorFlow':      'tensorflow/tensorflow-original',
  'AWS':             'amazonwebservices/amazonwebservices-plain-wordmark',
  'Firebase':        'firebase/firebase-original',
  'MySQL':           'mysql/mysql-original',
  'MongoDB':         'mongodb/mongodb-original',
  'Docker':          'docker/docker-original',
  'Linux':           'linux/linux-original',
  'Prisma':          'prisma/prisma-original',
  'GitHub Actions':  'githubactions/githubactions-original',
  'React Native':    'react/react-original',
};

interface TechIconProps {
  name: string;
  style?: CSSProperties;
  className?: string;
}

export function TechIcon({ name, style, className }: TechIconProps) {
  const slug = MAP[name];
  if (!slug) {
    // No icon available — render nothing (e.g. Engineering Style items)
    return null;
  }

  const iconKey = slug.split('/')[0];
  const needsInvert = NEEDS_INVERT.has(iconKey);

  return (
    <img
      src={`${CDN}/${slug}.svg`}
      alt={name}
      aria-label={name}
      loading="eager"
      style={{
        width: '1.25em',
        height: '1.25em',
        display: 'inline-block',
        verticalAlign: 'middle',
        filter: needsInvert ? 'brightness(0) invert(1)' : undefined,
        ...style,
      }}
      className={className}
    />
  );
}
