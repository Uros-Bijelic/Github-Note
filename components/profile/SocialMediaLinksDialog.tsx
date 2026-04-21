'use client';

import RHFInput from '../RHFInputs/RHFInput';
import CloseIcon from '../icons/CloseIcon';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { useToast } from '../ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { updateUserSocialMediaLinks } from '@/lib/actions/user-actions';
import {
  type ISocialMediaLinks,
  socialMediaLinksSchema,
} from '@/lib/zod/user-schema';

interface ISocialMediaLinksDialogProps {
  githubName?: string;
  githubLink?: string;
  linkedinName?: string;
  linkedinLink?: string;
  twitterName?: string;
  twitterLink?: string;
  instagramName?: string;
  instagramLink?: string;
  facebookName?: string;
  facebookLink?: string;
  dribbbleName?: string;
  dribbbleLink?: string;
}

const SocialMediaLinksDialog: React.FC<ISocialMediaLinksDialogProps> = ({
  githubName,
  githubLink,
  linkedinName,
  linkedinLink,
  twitterName,
  twitterLink,
  instagramName,
  instagramLink,
  facebookName,
  facebookLink,
  dribbbleName,
  dribbbleLink,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(socialMediaLinksSchema),
    defaultValues: {
      githubName: githubName || '',
      githubLink: githubLink || '',
      linkedinName: linkedinName || '',
      linkedinLink: linkedinLink || '',
      twitterName: twitterName || '',
      twitterLink: twitterLink || '',
      instagramName: instagramName || '',
      instagramLink: instagramLink || '',
      facebookName: facebookName || '',
      facebookLink: facebookLink || '',
      dribbbleName: dribbbleName || '',
      dribbbleLink: dribbbleLink || '',
    },
  });

  const onSubmit = async (data: ISocialMediaLinks) => {
    try {
      const response = await updateUserSocialMediaLinks(data);
      if (response.ok && response.status === 200) {
        toast({
          variant: 'success',
          description: 'Social media links updated successfully!',
        });
      }
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast({ variant: 'error', description: error.message });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src="/assets/icons/plus-primary-blue.svg"
            width={14}
            height={14}
            alt="Update"
          />
          Social Media links
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[690px] rounded-lg bg-black-800 sm:w-[646px]">
        <div className="mb-5 flex items-center justify-between text-white-100">
          <p className="p1-bold lg:p2-bold">Social Media Links</p>
          <DialogClose>
            <CloseIcon />
          </DialogClose>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ul className="no-scrollbar mb-6 flex h-[460px] flex-col gap-6 overflow-auto sm:h-[400px]">
              <li className="flex gap-3 md:gap-5">
                <Image
                  src="/assets/icons/social-media/icn-github.svg"
                  width={32}
                  height={32}
                  alt="Github"
                />
                <div className="flex w-full flex-col gap-2 sm:flex-row">
                  <RHFInput name="githubName" placeholder="Username" />
                  <RHFInput name="githubLink" placeholder="Github Link" />
                </div>
              </li>
              <li className="flex gap-3 md:gap-5">
                <Image
                  src="/assets/icons/social-media/icn-linkedin.svg"
                  width={32}
                  height={32}
                  alt="Linkedin"
                />
                <div className="flex w-full flex-col gap-2 sm:flex-row">
                  <RHFInput name="linkedinName" placeholder="Username" />
                  <RHFInput name="linkedinLink" placeholder="Linkedin Link" />
                </div>
              </li>
              <li className="flex gap-3 md:gap-5">
                <Image
                  src="/assets/icons/social-media/icn-twitter.svg"
                  width={32}
                  height={32}
                  alt="Twitter"
                />
                <div className="flex w-full flex-col gap-2 sm:flex-row">
                  <RHFInput name="twitterName" placeholder="Username" />
                  <RHFInput name="twitterLink" placeholder="Twitter Link" />
                </div>
              </li>
              <li className="flex gap-3 md:gap-5">
                <Image
                  src="/assets/icons/social-media/icn-instagram.svg"
                  width={32}
                  height={32}
                  alt="Instagram"
                />
                <div className="flex w-full flex-col gap-2 sm:flex-row">
                  <RHFInput name="instagramName" placeholder="Username" />
                  <RHFInput name="instagramLink" placeholder="Instagram Link" />
                </div>
              </li>
              <li className="flex gap-3 md:gap-5">
                <Image
                  src="/assets/icons/social-media/icn-facebook.svg"
                  width={32}
                  height={32}
                  alt="Facebook"
                />
                <div className="flex w-full flex-col gap-2 sm:flex-row">
                  <RHFInput name="facebookName" placeholder="Username" />
                  <RHFInput name="facebookLink" placeholder="Facebook Link" />
                </div>
              </li>
              <li className="flex gap-3 md:gap-5">
                <Image
                  src="/assets/icons/social-media/icn-dribbble.svg"
                  width={32}
                  height={32}
                  alt="Dribbble"
                />
                <div className="flex w-full flex-col gap-2 sm:flex-row">
                  <RHFInput name="dribbbleName" placeholder="Username" />
                  <RHFInput name="dribbbleLink" placeholder="Dribbble Link" />
                </div>
              </li>
            </ul>
            <Button type="submit">Update Links</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SocialMediaLinksDialog;
