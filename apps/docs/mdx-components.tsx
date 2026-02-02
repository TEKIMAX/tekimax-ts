import type { MDXComponents } from 'mdx/types';
import defaultComponents from 'fumadocs-ui/mdx';
import { CustomCodeBlock } from '@/components/custom-code-block';
import { Card, Cards } from 'fumadocs-ui/components/card';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...defaultComponents,
        Card,
        Cards,
        // Override the Fumadocs 'CodeBlock' component directly
        CodeBlock: ({ children, ...props }: any) => (
            <CustomCodeBlock {...props}>
                {children}
            </CustomCodeBlock>
        ),
        // Also catch standard pre tags just in case
        pre: ({ children, ...props }: any) => (
            <CustomCodeBlock {...props}>
                {children}
            </CustomCodeBlock>
        ),
        ...components,
    };
}
