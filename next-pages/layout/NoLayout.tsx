// components/AdminLayout.tsx
import React, { useEffect, useState } from 'react';
type LayoutProps = {
    children: React.ReactNode;
};
const NoLayout: React.FC<LayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <main className="d-flex w-100" 
            style={{
                background:'linear-gradient(155deg,rgb(255, 255, 255),rgb(169, 184, 243))',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px'
            }}
        >
            {children}
        </main>
    )
}

export default NoLayout;
