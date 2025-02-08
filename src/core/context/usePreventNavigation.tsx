"use client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface NavigationPreventionOptions {
  isDirty: boolean;
  onConfirmNavigation?: () => void;
}
const usePreventNavigation = ({
  isDirty,
  onConfirmNavigation,
}: NavigationPreventionOptions) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState<string | null>(null);
  const [navigationType, setNavigationType] = useState<
    "link" | "back" | "forward" | null
  >(null);

  // Prevent accidental page unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    // Handle browser back/forward buttons
    const handlePopState = () => {
      // if (isDirty) {
      //   e.preventDefault();
      //   e.returnValue = true;
      //   setNe
      //   setIsNavigating(true);
      //   // Prevent default navigation
      //   history.pushState({}, "", pathname);
      // }
      console.log("click");
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDirty, pathname]);

  // Attempt navigation with dirty check
  const attemptNavigation = useCallback(
    (target: string, type: "link" = "link") => {
      if (isDirty) {
        setNavigationTarget(target);
        setNavigationType(type);
        setIsNavigating(true);
      } else {
        router.push(target);
      }
    },
    [isDirty, router]
  );

  // Confirm navigation
  const confirmNavigation = useCallback(() => {
    // Reset dirty state if needed
    onConfirmNavigation?.();

    // Perform navigation based on type
    if (navigationType === "back") {
      history.back();
    } else if (navigationType === "forward") {
      history.forward();
    } else if (navigationTarget) {
      router.push(navigationTarget);
    }

    // Reset navigation state
    setIsNavigating(false);
    setNavigationTarget(null);
    setNavigationType(null);
  }, [navigationTarget, navigationType, router, onConfirmNavigation]);

  // Cancel navigation
  const cancelNavigation = useCallback(() => {
    setIsNavigating(false);
    setNavigationTarget(null);
    setNavigationType(null);
  }, []);

  return {
    attemptNavigation,
    isNavigating,
    navigationType,
    confirmNavigation,
    cancelNavigation,
  };
};

export default usePreventNavigation;
