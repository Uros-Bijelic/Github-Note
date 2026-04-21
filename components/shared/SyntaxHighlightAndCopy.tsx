'use client';

import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

import Image from 'next/image';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface ISyntaxHighlightAndCopyProps {
  code: string;
}

const SyntaxHighlightAndCopy: React.FC<ISyntaxHighlightAndCopyProps> = ({
  code,
}) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied to clipboard',
        variant: 'success',
      });
    } catch (error) {
      console.log('Copy to clipboard failed!', error);
      toast({
        title: 'Failed to copy to clipboard',
        variant: 'error',
      });
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={() => copyToClipboard(code)}
        className="absolute right-3.5 top-3.5 size-4 bg-transparent p-0 transition-transform hover:scale-125 hover:bg-transparent"
      >
        <Image
          src="/assets/icons/icn-copy.svg"
          width={16}
          height={16}
          alt="Copy"
        />
      </Button>
      <SyntaxHighlighter
        customStyle={{
          backgroundColor: '#131625',
          borderRadius: '6px',
          padding: '10px',
        }}
        language="typescript"
        style={atomOneDarkReasonable}
        showLineNumbers
        wrapLongLines
        wrapLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default SyntaxHighlightAndCopy;
