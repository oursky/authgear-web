'use client';

import { usePlausible } from 'next-plausible';
import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {
  eventName: string;
}

export default function PlausibleButton({ eventName, onClick, ...props }: Props) {
  const plausible = usePlausible();
  return (
    <button
      {...props}
      onClick={(e) => {
        plausible(eventName);
        onClick?.(e);
      }}
    />
  );
}
