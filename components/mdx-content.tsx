import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { Mermaid } from "./mermaid";
export async function MdxContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source: source.replace(
      /```mermaid\n([\s\S]*?)```/g,
      (_, chart: string) =>
        `<Mermaid encodedChart="${encodeURIComponent(chart.trim())}" />`,
    ),
    components: { Mermaid },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
        ],
      },
    },
  });
  return <div className="prose">{content}</div>;
}
