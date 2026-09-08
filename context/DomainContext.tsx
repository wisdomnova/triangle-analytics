"use client";

import React, { createContext, useContext, useState } from "react";

export interface DomainItem {
  id: string;
  name: string;
  domain: string;
  siteId: string;
  status: "Active" | "Pending" | "Unverified";
  visitors: string;
  pageViews: string;
  bounceRate: string;
  createdAt: string;
}

interface DomainContextType {
  domains: DomainItem[];
  currentDomain: DomainItem;
  setCurrentDomainId: (id: string) => void;
  addDomain: (domainData: { name: string; domain: string }) => void;
  removeDomain: (id: string) => void;
  verifyDomain: (id: string) => void;
}

const initialDomains: DomainItem[] = [
  {
    id: "dom-1",
    name: "Production Application",
    domain: "app.triangle.io",
    siteId: "tri_992140",
    status: "Active",
    visitors: "12,480",
    pageViews: "48,290",
    bounceRate: "28%",
    createdAt: "Jun 14, 2026",
  },
  {
    id: "dom-2",
    name: "Developer API Gateway",
    domain: "api.triangle.io",
    siteId: "tri_418023",
    status: "Active",
    visitors: "5,820",
    pageViews: "24,800",
    bounceRate: "19%",
    createdAt: "Jul 02, 2026",
  },
  {
    id: "dom-3",
    name: "Engineering & Tech Blog",
    domain: "blog.triangle.dev",
    siteId: "tri_871109",
    status: "Active",
    visitors: "2,140",
    pageViews: "8,950",
    bounceRate: "34%",
    createdAt: "Jul 19, 2026",
  },
  {
    id: "dom-4",
    name: "Addons & Storefront",
    domain: "store.triangle.co",
    siteId: "tri_301984",
    status: "Pending",
    visitors: "410",
    pageViews: "1,220",
    bounceRate: "42%",
    createdAt: "Aug 28, 2026",
  },
];

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export function DomainProvider({ children }: { children: React.ReactNode }) {
  const [domains, setDomains] = useState<DomainItem[]>(initialDomains);
  const [currentDomainId, setCurrentDomainId] = useState<string>("dom-1");

  const currentDomain =
    domains.find((d) => d.id === currentDomainId) || domains[0] || initialDomains[0];

  const addDomain = ({ name, domain }: { name: string; domain: string }) => {
    const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const randomSiteId = `tri_${Math.floor(100000 + Math.random() * 900000)}`;
    const newDomain: DomainItem = {
      id: `dom-${Date.now()}`,
      name: name.trim() || cleanDomain,
      domain: cleanDomain,
      siteId: randomSiteId,
      status: "Active",
      visitors: "0",
      pageViews: "0",
      bounceRate: "0%",
      createdAt: "Just now",
    };
    setDomains((prev) => [newDomain, ...prev]);
    setCurrentDomainId(newDomain.id);
  };

  const removeDomain = (id: string) => {
    setDomains((prev) => {
      const remaining = prev.filter((d) => d.id !== id);
      if (currentDomainId === id && remaining.length > 0) {
        setCurrentDomainId(remaining[0].id);
      }
      return remaining;
    });
  };

  const verifyDomain = (id: string) => {
    setDomains((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Active" } : d))
    );
  };

  return (
    <DomainContext.Provider
      value={{
        domains,
        currentDomain,
        setCurrentDomainId,
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
