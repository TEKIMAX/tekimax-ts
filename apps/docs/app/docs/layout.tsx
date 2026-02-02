import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { BrandLogo } from '@/components/brand-logo';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <DocsLayout
            tree={source.pageTree}
            nav={{
                title: (
                    <BrandLogo />
                )
            }}
        >
            {children}
        </DocsLayout >
    );
}
