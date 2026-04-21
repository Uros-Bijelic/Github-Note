import SocialMediaLinksDialog from '../profile/SocialMediaLinksDialog';

import Image from 'next/image';
import Link from 'next/link';

interface ISocialMediaLinksProps {
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

const SocialMediaLinks: React.FC<ISocialMediaLinksProps> = ({
  githubLink,
  githubName,
  linkedinLink,
  linkedinName,
  twitterLink,
  twitterName,
  instagramLink,
  instagramName,
  facebookLink,
  facebookName,
  dribbbleLink,
  dribbbleName,
}) => {
  return (
    <div className="flex flex-col gap-7.5">
      <SocialMediaLinksDialog
        githubLink={githubLink}
        githubName={githubName}
        linkedinLink={linkedinLink}
        linkedinName={linkedinName}
        twitterLink={twitterLink}
        twitterName={twitterName}
        instagramLink={instagramLink}
        instagramName={instagramName}
        facebookLink={facebookLink}
        facebookName={facebookName}
        dribbbleLink={dribbbleLink}
        dribbbleName={dribbbleName}
      />

      {(githubLink ||
        linkedinLink ||
        twitterLink ||
        instagramLink ||
        facebookLink ||
        dribbbleLink) && (
        <>
          <p className="p2-bold">Social Media Links</p>
          <ul className="flex flex-col gap-4">
            {githubLink && (
              <li>
                <Link
                  href={githubLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="p2-regular flex gap-1.5 transition-transform hover:translate-x-1"
                >
                  <Image
                    src="/assets/icons/social-media/icn-github.svg"
                    width={16}
                    height={16}
                    alt="Github"
                  />
                  {githubName}
                </Link>
              </li>
            )}
            {linkedinLink && (
              <li>
                <Link
                  href={linkedinLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="p2-regular flex gap-1.5 transition-transform hover:translate-x-1"
                >
                  <Image
                    src="/assets/icons/social-media/icn-linkedin.svg"
                    width={16}
                    height={16}
                    alt="Linkedin"
                  />
                  {linkedinName}
                </Link>
              </li>
            )}
            {twitterLink && (
              <li>
                <Link
                  href={twitterLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="p2-regular flex gap-1.5 transition-transform hover:translate-x-1"
                >
                  <Image
                    src="/assets/icons/social-media/icn-twitter.svg"
                    width={16}
                    height={16}
                    alt="Twitter"
                  />
                  {twitterName}
                </Link>
              </li>
            )}
            {instagramLink && (
              <li>
                <Link
                  href={instagramLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="p2-regular flex gap-1.5 transition-transform hover:translate-x-1"
                >
                  <Image
                    src="/assets/icons/social-media/icn-instagram.svg"
                    width={16}
                    height={16}
                    alt="Instagram"
                  />
                  {instagramName}
                </Link>
              </li>
            )}
            {facebookLink && (
              <li>
                <Link
                  href={facebookLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="p2-regular flex gap-1.5 transition-transform hover:translate-x-1"
                >
                  <Image
                    src="/assets/icons/social-media/icn-facebook.svg"
                    width={16}
                    height={16}
                    alt="Facebook"
                  />
                  {facebookName}
                </Link>
              </li>
            )}
            {dribbbleLink && (
              <li>
                <Link
                  href={dribbbleLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="p2-regular flex gap-1.5 transition-transform hover:translate-x-1"
                >
                  <Image
                    src="/assets/icons/social-media/icn-dribbble.svg"
                    width={16}
                    height={16}
                    alt="Dribbble"
                  />
                  {dribbbleName}
                </Link>
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default SocialMediaLinks;
