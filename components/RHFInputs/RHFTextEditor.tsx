'use client';

import { Editor } from '@tinymce/tinymce-react';
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

interface ITextEditorProps {
  name: string;
  label?: string;
  description?: string;
}

const RHFTextEditor: React.FC<ITextEditorProps> = ({
  name,
  description,
  label,
}) => {
  const { control } = useFormContext();

  return (
    <div>
      <p className="text-sm uppercase text-white-500">Content</p>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Editor
                onEditorChange={field.onChange}
                value={field.value}
                apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
                init={{
                  height: 216,
                  menubar: false,
                  statusbar: false,
                  plugins: ['lists', 'link', 'image', 'codesample'],
                  toolbar:
                    'bold italic blockquote link image numlist bullist codesample',
                  content_style:
                    'body { font-size:14px; color: #ADB3CC; overflow:hidden; }',
                }}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RHFTextEditor;
