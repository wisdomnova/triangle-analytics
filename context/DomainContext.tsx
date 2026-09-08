"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api, SiteItem } from "@/lib/api";

export type DomainItem = SiteItem;

interface DomainContextType {
  domains: DomainItem[];
  currentDomain: DomainItem | null;
  setCurrentDomainId: (id: string) => void;
  isLoading: boolean;
  refreshDomains: () => Promise<void>;
  addDomain: (domainData: { name: string; domain: string }) => Promise<DomainItem>;
  removeDomain: (siteId: string) => Promise<void>;
  verifyDomain: (siteId: string) => Promise<void>;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export function DomainProvider({ children }: { children: React.ReactNode }) {
  const [domains, setDomains] = useState<DomainItem[]>([]);
  const [currentDomainId, setCurrentDomainId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshDomains = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.dash.getSites();
      const fetchedDomains = res.sites || [];
      setDomains(fetchedDomains);

      setCurrentDomainId((prevId) => {
        if (prevId && fetchedDomains.some((d) => d.id === prevId || d.siteId === prevId)) {
          return prevId;
        }
        return fetchedDomains.length > 0 ? fetchedDomains[0].siteId : null;
      });
    } catch {
      // Fallback empty domains
      setDomains([]);
      setCurrentDomainId(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshDomains();
  }, [refreshDomains]);

  const currentDomain =
    domains.find((d) => d.siteId === currentDomainId || d.id === currentDomainId) ||
    (domains.length > 0 ? domains[0] : null);

  const addDomain = async ({ name, domain }: { name: string; domain: string }) => {
    const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const newSite = await api.dash.createSite(name.trim() || cleanDomain, cleanDomain);
    await refreshDomains();
    if (newSite?.siteId) {
      setCurrentDomainId(newSite.siteId);
    }
    return newSite;
  };

  const removeDomain = async (siteId: string) => {
    await api.dash.deleteSite(siteId);
    await refreshDomains();
  };

  const verifyDomain = async (siteId: string) => {
    await api.dash.verifySite(siteId);
    await refreshDomains();
  };

  return (
    <DomainContext.Provider
      value={{
        domains,
        currentDomain,
        setCurrentDomainId: (id: string) => setCurrentDomainId(id),
        isLoading,
        refreshDomains,
        addDomain,
        removeDomain,
        verifyDomain,
      }}
    >
      {children}
    </DomainContext.Provider>
  );
}

export function useDomain() {
  const context = useContext(DomainContext);
  if (!context) {
    throw new Error("useDomain must be used within a DomainProvider");
  }
  return context;
}
