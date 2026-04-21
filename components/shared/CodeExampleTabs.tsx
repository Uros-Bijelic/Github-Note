import RHFTextarea from '../RHFInputs/RHFTextarea';

import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CodeExampleTabs: React.FC = () => {
  const { getValues, trigger } = useFormContext();

  const code = getValues('codeExample');

  return (
    <Tabs defaultValue="code">
      <TabsList>
        <TabsTrigger value="code" className="gap-2">
          <Image
            src="/assets/icons/icn-code.svg"
            alt="Code"
            width={16}
            height={16}
          />
          Code
        </TabsTrigger>
        <TabsTrigger
          value="preview"
          className="gap-2"
          onClick={() => trigger('codeExample')}
        >
          <Image
            src="/assets/icons/icn-eye.svg"
            alt="Eye"
            width={16}
            height={16}
          />
          Preview
        </TabsTrigger>
      </TabsList>
      <TabsContent value="code">
        <RHFTextarea name="codeExample" />
      </TabsContent>
      <TabsContent value="preview">
        <SyntaxHighlighter
          language="javascript"
          style={atomOneDarkReasonable}
          wrapLongLines
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </TabsContent>
    </Tabs>
  );
};

export default CodeExampleTabs;
