"use client";
import React, { useEffect, useState } from 'react';

interface Heading {
  text: string | null;
  id: string | null;
}

interface PageWithHeadingsProps {
  htmlContent: string;
}

const PageWithHeadings: React.FC<PageWithHeadingsProps> = ({ htmlContent }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // Parse the HTML content and extract h2 headings
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const h2Elements = tempDiv.querySelectorAll('h2');
    const h2Data = Array.from(h2Elements).map(h2 => ({
      text: h2.textContent,
      id: h2.id || `heading-${Math.random().toString(36).substr(2, 9)}`, // Fallback for id
    }));
    setHeadings(h2Data);
  }, [htmlContent]);

  return (
    <div className="on-this-page fixed top-24 md:right-10  hidden lg:block prose dark:prose-invert">
      <h2 className='text-md font-bold my-2'>On This Page</h2>
      <ul className='text-sm space-y-1'>
        {headings.map((heading, index) => (
          <li key={index}>
            <a href={`#${heading.id}`}>{heading.text}</a> {/* Fixed href syntax */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageWithHeadings;
