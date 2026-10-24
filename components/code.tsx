import { codeToHtml } from "shiki";
import { CopyCode } from "./reader-controls";
export async function Code({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const html = await codeToHtml(code, { lang: language, theme: "github-dark" });
  return (
    <figure className="code-block">
      <figcaption>
        <span>
          説明用サンプル <small>{language}</small>
        </span>
        <CopyCode code={code} />
      </figcaption>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
