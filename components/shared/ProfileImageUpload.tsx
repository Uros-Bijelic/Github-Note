import { FormField } from '../ui/form';
import { Label } from '../ui/label';
import { useToast } from '../ui/use-toast';

import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

interface IProfileImageUploadProps {
  name: string;
}

const ProfileImageUpload: React.FC<IProfileImageUploadProps> = ({ name }) => {
  const { toast } = useToast();

  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex items-center gap-3.5">
          <Image
            src={field.value || '/assets/icons/image-upload-placeholder.svg'}
            alt="Upload Image"
            width={90}
            height={90}
            className="size-22.5 rounded object-cover"
          />
          <Label className="flex-center w-50 cursor-pointer gap-2 rounded-md bg-black-700 p-2">
            <CldUploadButton
              className="flex items-center gap-2"
              uploadPreset={
                process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME ?? ''
              }
              onSuccess={(result) => {
                if (!result?.info || typeof result?.info === 'string')
                  return toast({
                    variant: 'error',
                    description: 'Something went wrong. Image not uploaded.',
                  });

                field.onChange(result.info.secure_url);
              }}
              options={{
                multiple: false,
                cropping: true,
                croppingShowDimensions: true,
              }}
            >
              <Image
                src="/assets/images/icn-upload-cloud.svg"
                alt="Upload Image Cloud"
                width={16}
                height={16}
              />
              <span className="p3-medium">Update Profile Picture</span>
            </CldUploadButton>
          </Label>
        </div>
      )}
    />
  );
};

export default ProfileImageUpload;
