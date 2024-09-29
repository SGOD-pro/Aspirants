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
import { visit } from "unist-util-visit";
import { Node } from "unist";
import { Element } from "hast";
const rehypeAddLinkClasses = () => {
	return (tree: Node) => {
		visit(tree, "element", (node: Element) => {
			if (node.tagName === "a" && node.properties?.href) {
				const href = node.properties.href as string;
				if (href.startsWith("/download")) {
					// Add a class for download links
					node.properties.className = ["download-link"];
				} else if (href.startsWith("http")) {
					// Add a class for external redirect links
					node.properties.className = ["redirect-link"];
				}
			}
		});
	};
};
async function Content({ content }: { content: string }) {
	const processor = unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeDocument, { title: "Blog Post" })
		.use(rehypeFormat)
		.use(rehypeSlug)
		.use(rehypeAddLinkClasses)
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
		<div className="max-w-4xl m-auto ">
			<div
				className="prose prose-invert w-full max-w-none sm:-translate-x-36"
				dangerouslySetInnerHTML={{ __html: htmlContent }}
			></div>
			<PageWithHeadings htmlContent={htmlContent} />
		</div>
	);
}

export default Content;
