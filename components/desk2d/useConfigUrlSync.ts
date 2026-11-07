"use client";

import { useEffect, useState } from "react";
import { decodeConfig, encodeConfig } from "@/lib/desk2d/config";
import { useDesk2DStore } from "@/store/useDesk2DStore";

/**
 * Loads a design from the URL on first mount, then keeps the URL in sync so it is always shareable.
 * Returns whether the URL has been read yet, so callers can avoid flashing the default design.
 */
export function useConfigUrlSync() {
  const config = useDesk2DStore((s) => s.config);
  const setConfig = useDesk2DStore((s) => s.setConfig);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fromUrl = decodeConfig(new URLSearchParams(window.location.search));
    if (fromUrl) setConfig(fromUrl);
    setLoaded(true);
  }, [setConfig]);

  useEffect(() => {
    if (!loaded) return;
    const next = `${window.location.pathname}?${encodeConfig(config)}`;
    window.history.replaceState(null, "", next);
  }, [config, loaded]);

  return loaded;
}
