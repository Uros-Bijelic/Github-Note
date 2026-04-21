'use client';

import CodeExampleTabs from '../shared/CodeExampleTabs';
import { useToast } from '../ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import RHFChecklist from '@/components/RHFInputs/RHFChecklist';
import RHFCreatableSelect, {
  ISelectOptions,
} from '@/components/RHFInputs/RHFCreatableSelect';
import RHFInput from '@/components/RHFInputs/RHFInput';
import RHFLearningResources from '@/components/RHFInputs/RHFLearningResources';
import RHFSelect, {
  SelectOptionWithIcon,
} from '@/components/RHFInputs/RHFSelect';
import RHFTextEditor from '@/components/RHFInputs/RHFTextEditor';
import RHFTextarea from '@/components/RHFInputs/RHFTextarea';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SelectSeparator } from '@/components/ui/select';
import { POST_TYPES } from '@/constants';
import { createPost, updatePost } from '@/lib/actions/post-actions';
import { postSchema, type IPostSchema } from '@/lib/zod/post-schema';
import type { IPost } from '@/types/post';
import { EPostType } from '@/types/post-types';

interface ICreateOrUpdatePostProps {
  tags: ISelectOptions[];
  post?: IPost;
}

const CreateOrUpdatePost: React.FC<ICreateOrUpdatePostProps> = ({
  tags,
  post,
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const isEditPage = !!post;

  const modifiedTags =
    post?.tags?.map(({ title }) => ({
      label: title,
      value: title,
    })) || [];

  const form = useForm<IPostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      type: post?.type || EPostType.COMPONENT,
      tags: modifiedTags || [],
      description: post?.description || '',
      codeExample: post?.codeExample || '',
      checklist: post?.checklist || [],
      content: post?.content || '',
      learningResources: post?.learningResources || [],
    },
  });

  const { handleSubmit, getValues } = form;

  const onSubmit = async (data: IPostSchema) => {
    try {
      if (isEditPage) {
        const response = await updatePost(post?._id, data);

        if (response.status === 200) {
          router.push(response.redirectRoute!);
          toast({
            variant: 'success',
            title: 'Post updated successfully!',
          });
        } else if (response.status === 404) {
          toast({
            variant: 'error',
            title: response.message,
          });
        } else if (response.status === 403) {
          toast({
            variant: 'error',
            title: response.message,
          });
        }
      } else {
        const response = await createPost(data);
        if (response?.ok === true && response?.status === 201) {
          toast({
            variant: 'success',
            title: 'Post created successfully',
          });
          router.push(response.redirectRoute);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error creating or update', error);
        toast({
          variant: 'error',
          title: `Something went wrong. Couldn't ${isEditPage ? 'update' : 'create'} post!`,
        });
      }
    }
  };

  const postType = getValues('type');

  const checklistNoContentMessage =
    postType === EPostType.KNOWLEDGE
      ? 'Start adding what you have learned...'
      : 'Add steps to follow...';

  const checklistPlaceholder =
    postType === EPostType.KNOWLEDGE
      ? 'Enter what you learned'
      : 'Enter new step';

  const checklistTitle =
    postType === EPostType.KNOWLEDGE ? 'What you learned' : 'Steps to follow';

  return (
    <section className="my-7.5 px-7.5">
      <h1 className="h1-bold mb-7.5  lg:mb-8">
        {isEditPage ? 'Edit' : 'Create'} Post
      </h1>
      <p className="mb-6 text-sm uppercase text-white-500">Basic information</p>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <RHFInput
            name="title"
            placeholder="Enter your title of your post"
            label="Title"
          />
          <RHFSelect name="type" label="Create Type">
            {POST_TYPES.map(({ imgUrl, label, value }, index) => (
              <Fragment key={value}>
                <SelectOptionWithIcon
                  key={value}
                  value={value}
                  imgUrl={imgUrl}
                  label={label}
                />
                {index !== POST_TYPES.length - 1 && <SelectSeparator />}
              </Fragment>
            ))}
          </RHFSelect>
          <RHFCreatableSelect
            name="tags"
            label="Tags"
            placeholder="Search tags"
            options={tags}
            value={modifiedTags}
          />
          <RHFTextarea
            name="description"
            label="Description"
            placeholder="Enter a short description"
          />
          {postType !== EPostType.COMPONENT ? (
            <RHFChecklist
              noContentMessage={checklistNoContentMessage}
              title={checklistTitle}
              placeholder={checklistPlaceholder}
            />
          ) : (
            <CodeExampleTabs />
          )}
          <RHFTextEditor name="content" />
          <RHFLearningResources />
          <Button type="submit">{isEditPage ? 'Edit' : 'Create'} Post</Button>
        </form>
      </Form>
    </section>
  );
};

export default CreateOrUpdatePost;
