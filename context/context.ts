import React, { createContext, useState } from 'react';

type contextProps = {
  isModalOpen: boolean | undefined;
  setIsModalOpen: (value: boolean) => void;
};

export const AppContext = createContext<contextProps>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});
