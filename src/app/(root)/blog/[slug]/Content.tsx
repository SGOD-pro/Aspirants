import React from "react";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import PageWithHeadings from "@/components/ui/OnThisPage";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
async function Content({content}:{content:string}) {
    const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: "Blog Post" })
    .use(rehypeFormat)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrettyCode, {
        theme: "dracula",
        transformers: [
            transformerCopyButton({
                visibility: "always",
                feedbackDuration: 3_000,
            }),
        ],
    })
    .use(rehypeStringify);

const htmlContent = (await processor.process(content)).toString();
	return (
		<div className="max-w-5xl m-auto">
			<div
				className="prose prose-invert w-full max-w-none"
				dangerouslySetInnerHTML={{ __html: htmlContent }}
			></div>
		</div>
	);
}

export default Content;
