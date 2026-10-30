# CLAUDE.md

Guidance for working on this repository. The site is the personal page of 김서윤 (Kim Seoyoon), published at https://freckles1025.github.io.

## What this site is

A single static page. It shows who she is now: since September 2026 her main work is the Yeongdeungpo wig shop 김앤장가발 and its brand 정수리언니. Earlier work (TV헤어 interviews from June 2023, the September 2025 book) stays in Works.

Public names for the business are only 김앤장가발 and 정수리언니. Do not introduce any other company name.

Do not invent biography, metrics, or project status. If a URL is unknown, leave the existing TODO in the Works section (`#todo-homepage`) until she supplies it.

## Stack

HTML, CSS, and a few lines of JavaScript. No build step, no framework, no CDN fonts or animation libraries.

Preview:

```bash
python3 -m http.server 8000
```

Open `index.html` through that server so fonts and images load the same way they will on GitHub Pages.

## Files

- `index.html` — the page
- `style.css` — all styling, including `@font-face` and `prefers-reduced-motion`
- `script.js` — mobile menu only (close on link, Escape, and outside click). The page is readable with this file blocked.
- `img/` — portrait, book cover, mark, favicon, grain, Open Graph image
- `fonts/` — subset Pretendard (400, 600, 700)
- `scripts/subset-fonts.py` — rebuilds those font files after copy changes
- `docs/before-after/` — screenshots from the October 2026 refresh

## Sections

| id | Role |
| --- | --- |
| `#home` | Name, current line, short bio, FRECKLES line, portrait |
| `#now` | 김앤장가발 / 정수리언니: branding, TikTok lives, short and long video, and the shop AI work |
| `#works` | TV헤어 interviews, the book, 정수리언니 homepage. Each row is a `<details>` element |
| `#values` | Teach Forward, plus the two public goals |
| `#ai` | Agents she designed, and the rule that she approves anything that goes out |
| `#contact` | hyggelife25@gmail.com and Instagram @seoyoon.pd. She is open to lecture invitations |

## Design

Editorial and quiet, matched to the black-and-white portrait. The palette lives in `:root`:

- Paper `--bg` `#F0EDE8`, cream `--cream` `#F5F2EC`, surface `--surface` `#E8E4DD`
- Ink `--ink` `#111111`, secondary ink `--ink-2` `#2A2826`
- Accent `--accent` `#D63B7A` for rules, dots, and large marks
- `--accent-ink` `#8E1B4E` for small pink text (the pure accent is below 4.5:1 on paper)
- `--text-soft` `#5C564E` for secondary text. `--muted` `#7A756E` is the original swatch and is too light for small type

Type is Pretendard only. Weights in use are 400, 600, and 700.

The portrait is the hero image. Her gaze points to the right of the frame, so on wide screens the photo sits on the left and the words on the right. On small screens the words come first, in normal flow, with no animation required to see them.

## Motion and accessibility

Nothing starts at `opacity: 0`. If JavaScript does not run, every section is still visible and the works rows still open, because they are native `<details>`.

`prefers-reduced-motion: reduce` turns off smooth scrolling and any duration-based animation.

Works summaries are real `<summary>` elements: keyboard (Enter and Space), touch, and screen readers get the expanded state. Narrow screens open a `<details>` menu without script. From 860px up, a separate `<nav>` is shown and that menu is hidden. A closed `<details>` stays out of the tab order, so the wide-screen links are not nested inside it.

Keep visible text at least `#5C564E` on paper and `#D9D3C8` on ink. Focus uses a 2px accent outline.

## Images

The studio portrait and the book cover are shipped as AVIF and WebP `srcset`s, with a JPEG fallback. Each file is kept under about 300KB. `img/og.jpg` is the 1200×630 social image and is referenced with an absolute URL.

`img/mark.webp` is the small freckles drawing used beside the wordmark. The old multi-megabyte PNG and JPEG originals are not part of the page.

## Fonts

`scripts/subset-fonts.py` reads `index.html` and `style.css`, downloads Pretendard, and subsets it. Run it after changing copy:

```bash
python3 scripts/subset-fonts.py
```

Missing syllables fall back to Apple SD Gothic Neo, Noto Sans KR, or Malgun Gothic when those are installed. Linux without a Korean font will show blanks for any character left out of the subset.

## Copy

Write in warm, plain Korean. No hype (최초, 압도, 시너지, and similar). Keep these lines as they are:

- 남들이 지우라 한 것들이 곧 나의 색이 되었다.
- Freckles are not flaws, they're identity.
- Teach Forward, including 가르치는 일이 곧 가장 단단한 성장입니다.

Contact email: hyggelife25@gmail.com, next to Instagram.

## Known TODO

The 정수리언니 homepage URL was not public when this page was refreshed. The third Works row links to `#todo-homepage` and is labeled `TODO · 공개 주소`. Replace that `href` with the real URL when she has it. Do not mark the page as “in preparation” unless she says so.
