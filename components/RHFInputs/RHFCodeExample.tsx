'use client';

import { Editor, type IAllProps } from '@tinymce/tinymce-react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import './RHFTextEditor.css';

interface IRHFCodeExampleProps extends IAllProps {
  name: string;
  label?: string;
  description?: string;
}

const RHFCodeExample: React.FC<IRHFCodeExampleProps> = ({
  name,
  description,
  label,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Editor
              onEditorChange={field.onChange}
              apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
              init={{
                min_height: 216,
                menubar: false,
                statusbar: false,
                plugins: ['codesample', 'code'],
                toolbar: 'codesample code',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                codesample_global_prismjs: true,
                codesample_languages: [
                  { text: 'HTML/XML', value: 'markup' },
                  { text: 'JavaScript', value: 'javascript' },
                  { text: 'CSS', value: 'css' },
                  { text: 'PHP', value: 'php' },
                  { text: 'Ruby', value: 'ruby' },
                  { text: 'Python', value: 'python' },
                  { text: 'Java', value: 'java' },
                  { text: 'C', value: 'c' },
                  { text: 'C#', value: 'csharp' },
                  { text: 'C++', value: 'cpp' },
                ],
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFCodeExample;
