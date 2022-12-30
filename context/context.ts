import React, { createContext, useState } from 'react';

type contextProps = {
  isModalOpen: boolean | undefined;
  setIsModalOpen: (value: boolean) => void;
};

export const appContext = createContext<contextProps>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});
