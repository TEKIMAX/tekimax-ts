import type { MDXComponents } from 'mdx/types';
import defaultComponents from 'fumadocs-ui/mdx';
import { CustomCodeBlock } from '@/components/custom-code-block';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...defaultComponents,
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
