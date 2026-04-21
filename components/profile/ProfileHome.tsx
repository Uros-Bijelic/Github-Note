import ChecklistItem from '../shared/ChecklistItem';
import PostsHeatMap from '../shared/PostsHeatMap';
import { Checkbox } from '../ui/checkbox';

import type { HeatMapValue } from '@uiw/react-heat-map';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { AVAILABLE_TECH_STACK_ICONS } from '@/constants';
import type { IUser } from '@/types/user';

// ----------------------------------------------------------------

interface IProfileHomeProps {
  user: IUser;
  heatMapData: HeatMapValue[];
}

const ProfileHome: React.FC<IProfileHomeProps> = ({ user, heatMapData }) => {
  return (
    <section className="py-10">
      <div className="flex-between mb-8 flex-wrap gap-2.5 px-5 lg:px-7.5">
        <div className="flex items-center gap-5">
          <Image
            src={user.avatarImg || '/assets/icons/image-upload-placeholder.svg'}
            width={90}
            height={90}
            alt="Avatart"
            className="size-22.5 shrink-0 rounded-[5px] object-cover"
          />
          <div className="flex flex-col gap-2.5">
            <h2 className="h2-bold">{user.fullName}</h2>
            <ul className="flex flex-wrap gap-4.5">
              <li className="flex cursor-pointer gap-1 text-primary-500">
                <Image
                  src="assets/icons/icn-link.svg"
                  width={14}
                  height={14}
                  alt="Link"
                />
                {user.email}
              </li>
              <li className="flex gap-1 text-white-300">
                <Image
                  src="assets/icons/icn-calendar.svg"
                  width={14}
                  height={14}
                  alt="Link"
                />
                Joined {format(user.createdAt, 'MMM yyyy')}
              </li>
            </ul>
          </div>
        </div>
        <Link
          href="/profile/edit"
          className="flex min-w-min gap-2 rounded bg-black-700 px-3.5 py-3 text-primary-500"
        >
          <Image
            src="/assets/icons/icn-edit.svg"
            width={14}
            height={14}
            alt="Edit"
          />
          Edit Profile
        </Link>
      </div>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-3.5 px-5 lg:px-7.5">
          <p className="p1-bold text-white-100">Contribution Grid</p>
          <PostsHeatMap value={heatMapData} />
        </div>
        <div className="page-section">
          <p className="p1-bold">Learning Goals</p>
          <ul className="flex flex-col gap-2">
            {user.learningGoals
              ? user.learningGoals.map(({ _id, isChecked, goal }) => (
                  <li
                    key={_id}
                    className="p2-regular flex items-center gap-2.5"
                  >
                    <Checkbox checked={isChecked} /> {goal}
                  </li>
                ))
              : null}
          </ul>
        </div>
        <div className="page-section">
          <ul className="flex flex-wrap gap-3.5">
            {user.techStack.map((icon) => {
              const shortIconName = icon.includes('.')
                ? icon.split('.')[0].toLowerCase()
                : icon.toLowerCase();
              if (AVAILABLE_TECH_STACK_ICONS.includes(shortIconName)) {
                return (
                  <div key={icon} className="relative size-8">
                    <Image
                      src={`/assets/icons/tech-stack/${shortIconName}.svg`}
                      fill
                      alt={icon}
                    />
                  </div>
                );
              }
              return (
                <p key={icon} className="p3-regular">
                  {icon}
                </p>
              );
            })}
          </ul>
        </div>
        <div className="page-section">
          <p className="p1-bold">Knowledge level</p>
          <ul className="flex flex-col gap-2">
            {user.knowledgeLevel
              ? user.knowledgeLevel.map((item) => (
                  <ChecklistItem key={item} title={item} isBlueIcon />
                ))
              : null}
          </ul>
        </div>
        <div className="page-section">
          <p className="p1-bold">Schedule & availability</p>
          <ul className="flex flex-col gap-2">
            <li className="flex gap-1.5">
              <Image
                src="/assets/icons/icn-user-check.svg"
                width={18}
                height={18}
                alt="Available"
              />
              {user.isAvailable
                ? 'Available for a new project'
                : 'Not available for a new project'}
            </li>
            {(user.startDate || user.endDate) && (
              <li className="flex gap-1.5">
                <Image
                  src="/assets/icons/icn-clock.svg"
                  width={18}
                  height={18}
                  alt="Clock"
                />
                Available{' '}
                {user.startDate &&
                  `from ${format(user.startDate, 'MMM dd, yyyy')}`}{' '}
                {user.endDate && `to ${format(user.endDate, 'MMM dd, yyyy')}`}
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProfileHome;
