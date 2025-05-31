import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { title } from "process";
const POSTS_DIR = path.join(process.cwd(), "source/_post");
import { marked } from "marked";
import { time } from "console";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 截取 Markdown 正文前 N 个中文字符，并渲染为 HTML
 * @param {string} content - Markdown 内容
 * @param {number} limit - 字符数量（默认 50）
 * @returns {string} - 截取后的 HTML
 */
function extractPreviewHtml(content, limit = 150) {
  const plainText = content
    .replace(/```[\s\S]*?```/g, "") // 去掉代码块
    .replace(/`[^`]+`/g, "") // 去掉行内代码
    .replace(
      /!$begin:math:display$.*?$end:math:display$$begin:math:text$.*?$end:math:text$/g,
      ""
    ) // 去掉图片
    .replace(
      /$begin:math:display$.*?$end:math:display$$begin:math:text$.*?$end:math:text$/g,
      ""
    ) // 去掉链接
    .replace(/[#>*_\-~]/g, "") // 去掉 Markdown 特殊符号
    .replace(/\n+/g, ""); // 去掉换行

  const preview = plainText.slice(0, limit); // 截前 N 字
  // return marked.parse(preview);
  return marked.parseInline(preview);
}
async function getPost(slug) {
  const filepath = path.join(POSTS_DIR, `${slug}.md`);
  const raw = await fs.readFile(filepath, "utf-8");
  const parsed = matter(raw)
  const { title, date, tags, categories } = parsed.data;
  // console.log(matter(raw).data)
  const content = extractPreviewHtml(parsed.content);
  // const content = parsed.content.slice(150);
  return {
    title,
    date,
    content,
    slug,
    raw
  };
}
export async function readNote(path, encoding = "utf-8") {
  const data = await fs.readFile(path, encoding);
  return data;
}
export async function getAllPosts() {
  let posts = [];
  const files = await fs.readdir(POSTS_DIR);
  const slugs = files
    .filter((i) => i.endsWith(".md"))
    .map((i) => path.basename(i, ".md"));
  for (let slug of slugs) {
    posts.push(await getPost(slug));
  }
  return posts
}

export async function getNote(slug){
  const filepath = path.join(__dirname, "../source/_post", `${slug}.md`);
  const raw = await fs.readFile(filepath, 'utf-8')
  const note = matter(raw)
  return note
}