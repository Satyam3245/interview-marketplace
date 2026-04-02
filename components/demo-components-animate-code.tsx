'use client';

import {
  Code,
  CodeBlock,
  CodeHeader,
} from '@/components/animate-ui/components/animate/code';
// import ReactIcon from '@/components/icons/react-icon';

interface CodeDemoProps {
  duration: number;
  delay: number;
  writing: boolean;
  cursor: boolean;
}

export const CodeDemo = ({
  duration,
  delay,
  writing,
  cursor,
}: CodeDemoProps) => {
  return (
    <Code
      key={`${duration}-${delay}-${writing}-${cursor}`}
      className="w-full sm:w-110 h-120 border-none"
      code={`import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('HTTP error! status: response.status');
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]); // Re-run effect if URL or options change

  return { data, loading, error };
};

export default useFetch;'`}
    >
      <CodeHeader copyButton>
        use.fetch.tsx
      </CodeHeader>

      <CodeBlock
        cursor={cursor}
        lang="tsx"
        writing={writing}
        duration={duration}
        delay={delay}
      />
    </Code>
  );
};