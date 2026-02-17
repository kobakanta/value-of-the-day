'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessContextType {
    hasPostedShared: boolean;
    setHasPostedShared: (val: boolean) => void;
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

export function AccessProvider({ children }: { children: ReactNode }) {
    const [hasPostedShared, setHasPostedShared] = useState(false);

    return (
        <AccessContext.Provider value={{ hasPostedShared, setHasPostedShared }}>
            {children}
        </AccessContext.Provider>
    );
}

export function useAccess() {
    const context = useContext(AccessContext);
    if (context === undefined) {
        throw new Error('useAccess must be used within an AccessProvider');
    }
    return context;
}
