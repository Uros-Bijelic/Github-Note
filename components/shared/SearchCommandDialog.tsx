'use client';

import { Button } from '../ui/button';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { getAllPosts } from '@/lib/actions/post-actions';
import type { IPost } from '@/types/post';
import { EPostType } from '@/types/post-types';

const generateItemImage = (type: EPostType) => {
  const BASE_IMG_PATH = '/assets/icons/';

  if (type === EPostType.COMPONENT) {
    return BASE_IMG_PATH + 'icn-computer.svg';
  } else if (type === EPostType.KNOWLEDGE) {
    return BASE_IMG_PATH + 'icn-message-circle.svg';
  } else {
    return BASE_IMG_PATH + 'icn-list-number.svg';
  }
};

const SearchCommandDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prevOpen) => !prevOpen);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await getAllPosts({
        itemsPerPage: 5,
        searchQuery: debouncedQuery,
      });

      if (response?.ok && response?.status === 200) {
        setPosts(response.posts);
      }
    };

    fetchAllPosts();
  }, [isOpen, debouncedQuery]);

  return (
    <div className="relative">
      <Button
        className="flex-between h-9 w-full rounded bg-black-700 px-2.5 text-white-300 hover:bg-black-700"
        onClick={() => setIsOpen((open) => !open)}
      >
        <div className="flex-center gap-2">
          <Image
            src="/assets/icons/search.svg"
            width={16}
            height={16}
            alt="Search"
          />
          <p className="p4-medium">Search...</p>
        </div>
        <kbd className="flex-center pointer-events-none select-none gap-1 text-[16px]">
          <CommandShortcut className="mt-0.5 text-[18px]">⌘</CommandShortcut>K
        </kbd>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandGroup forceMount>
            <Link
              href="/explore"
              onClick={() => setIsOpen(false)}
              className="flex cursor-pointer gap-3"
            >
              <CommandItem>
                <Image
                  src="/assets/images/Frame.svg"
                  width={16}
                  height={16}
                  alt="search text"
                />
                Explore all posts
              </CommandItem>
            </Link>
            {posts.length > 0
              ? posts.map(({ _id, title, type }) => (
                  <Link
                    key={_id}
                    href={'/post/' + _id}
                    onClick={() => setIsOpen(false)}
                    className="flex cursor-pointer gap-3"
                  >
                    <CommandItem key={_id} onClick={() => setIsOpen(false)}>
                      <Image
                        src={generateItemImage(type)}
                        width={16}
                        height={16}
                        alt={title}
                      />
                      <p className="line-clamp-1">{title}</p>
                    </CommandItem>
                  </Link>
                ))
              : null}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchCommandDialog;
