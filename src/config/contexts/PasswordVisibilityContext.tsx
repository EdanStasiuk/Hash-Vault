import React, { createContext, useContext, useState, ReactNode } from "react";

interface PasswordVisibilityContextProps {
  visible: boolean;
  toggleVisibility: () => void;
  resetVisibility: () => void;
}

const PasswordVisibilityContext = createContext<
  PasswordVisibilityContextProps | undefined
>(undefined);

/**
 * PasswordVisibilityProvider Component
 *
 * Provides a context to manage the visibility state of a password input field. The context includes a boolean
 * value indicating whether the password is visible, a function to toggle this visibility, and a function to reset
 * the visibility state.
 *
 * @component
 * @prop {ReactNode} children - The child components that will have access to the password visibility context.
 *
 * @context
 * @type {PasswordVisibilityContextProps}
 * @prop {boolean} visible - Boolean flag indicating whether the password is currently visible.
 * @prop {() => void} toggleVisibility - Function to toggle the visibility state of the password.
 * @prop {() => void} resetVisibility - Function to reset the visibility state to false.
 */
export const PasswordVisibilityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const resetVisibility = () => {
    setVisible(false);
  };

  return (
    <PasswordVisibilityContext.Provider
      value={{ visible, toggleVisibility, resetVisibility }}
    >
      {children}
    </PasswordVisibilityContext.Provider>
  );
};

/**
 * usePasswordVisibility Hook
 *
 * Custom hook that provides access to the password visibility context. Must be used within a PasswordVisibilityProvider.
 *
 * @hook
 * @function usePasswordVisibility
 * @description Provides the current password visibility state and control functions.
 * @returns {PasswordVisibilityContextProps} The current password visibility state and control functions.
 * @throws {Error} If the hook is used outside of a PasswordVisibilityProvider.
 */
export const usePasswordVisibility = (): PasswordVisibilityContextProps => {
  const context = useContext(PasswordVisibilityContext);
  if (!context) {
    throw new Error(
      "usePasswordVisibility must be used within a PasswordVisibilityProvider"
    );
  }
  return context;
};
