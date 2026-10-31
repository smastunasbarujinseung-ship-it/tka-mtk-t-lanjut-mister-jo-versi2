import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  display?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({
  math,
  display = false,
  className = '',
}) => {
  const html = useMemo(() => {
    if (!math) return '';
    try {
      return katex.renderToString(math.trim(), {
        displayMode: display,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return `<span class="font-mono text-blue-800">${math}</span>`;
    }
  }, [math, display]);

  return (
    <span
      className={`${display ? 'block my-3 text-center overflow-x-auto max-w-full py-1' : 'inline-block align-middle'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

/**
 * MathText renders text containing inline LaTeX $...$ or block LaTeX $$...$$
 * Preserves newlines and renders paragraphs cleanly.
 */
export const MathText: React.FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => {
  if (!text) return null;

  // Split lines by newline
  const lines = text.split('\n');

  return (
    <span className={`inline-block w-full ${className}`}>
      {lines.map((line, lineIdx) => (
        <React.Fragment key={lineIdx}>
          <LineRenderer line={line} />
          {lineIdx < lines.length - 1 && <br className="my-1" />}
        </React.Fragment>
      ))}
    </span>
  );
};

const LineRenderer: React.FC<{ line: string }> = ({ line }) => {
  const parts = useMemo(() => {
    if (!line) return [];
    // Match $$...$$ first, then $...$
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g;
    const splitArr = line.split(regex);

    return splitArr.map((part, index) => {
      if (!part) return null;

      if (part.startsWith('$$') && part.endsWith('$$') && part.length >= 4) {
        const mathContent = part.slice(2, -2).trim();
        return (
          <MathView
            key={index}
            math={mathContent}
            display={true}
          />
        );
      } else if (part.startsWith('$') && part.endsWith('$') && part.length >= 2) {
        const mathContent = part.slice(1, -1).trim();
        return (
          <MathView
            key={index}
            math={mathContent}
            display={false}
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  }, [line]);

  return <span>{parts}</span>;
};
