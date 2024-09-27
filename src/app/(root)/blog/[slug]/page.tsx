import ProtectedRoute from "@/hooks/ProtectedRoute";
import React from "react";
import { existsSync, readFileSync } from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { reporter } from "vfile-reporter";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import PageWithHeadings from "@/components/ui/OnThisPage";
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
function BlogView({ params }: { params: { slug: string } }) {
	return (
		// <ProtectedRoute allowedRoles={["admin", "normal"]}>
			<div>{params.slug}</div>
		// </ProtectedRoute>
	);
} 

export default BlogView;
