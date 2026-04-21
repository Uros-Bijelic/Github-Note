'use client';

import { getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';

import { CLOUDINARY_URL } from '@/constants';

interface IProfileImageProps {
  avatarImg: string;
}

const ProfileImage: React.FC<IProfileImageProps> = ({ avatarImg }) => {
  let imageUrl = avatarImg;
  if (avatarImg?.startsWith(CLOUDINARY_URL)) {
    imageUrl = getCldImageUrl({
      width: 90,
      height: 90,
      src: avatarImg,
      crop: 'fill',
    });
  }
  return (
    <Image
      src={imageUrl || '/assets/icons/image-upload-placeholder.svg'}
      width={90}
      height={90}
      alt="Avatart"
      className="shrink-0 rounded-[5px]"
    />
  );
};

export default ProfileImage;
