'use client';

import { usePlausible } from 'next-plausible';
import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'a'> {
  eventName: string;
}

export default function PlausibleLink({ eventName, onClick, ...props }: Props) {
  const plausible = usePlausible();
  return (
    <a
      {...props}
      onClick={(e) => {
        plausible(eventName);
        onClick?.(e);
      }}
    />
  );
}
