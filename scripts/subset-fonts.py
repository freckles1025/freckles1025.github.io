#!/usr/bin/env python3
"""Subset Pretendard to the characters used in index.html.

Writes fonts/pretendard-400.woff2, pretendard-600.woff2, and pretendard-700.woff2.
Re-run after copy edits so new syllables are not missing on systems without a Korean font.
"""

import os
import pathlib
import re
import shutil
import subprocess
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
BASE = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff2/"
WEIGHTS = {
    "400": "Pretendard-Regular.woff2",
    "600": "Pretendard-SemiBold.woff2",
    "700": "Pretendard-Bold.woff2",
}


def characters():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "style.css").read_text(encoding="utf-8")
    text = re.sub(r"<script[\s\S]*?</script>", " ", html, flags=re.I)
    text = re.sub(r"<style[\s\S]*?</style>", " ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    extra = " ©—·…『』「」“”‘’–•"
    chars = set(text + css + extra)
    chars.update(chr(code) for code in range(32, 127))
    return "".join(sorted(chars))


def pyftsubset():
    local = pathlib.Path.home() / ".local" / "bin" / "pyftsubset"
    if local.exists():
        return str(local)
    found = shutil.which("pyftsubset")
    if found:
        return found
    raise SystemExit("pyftsubset is missing. pip install fonttools brotli")


def main():
    out_dir = ROOT / "fonts"
    cache = pathlib.Path("/tmp/fonts")
    out_dir.mkdir(exist_ok=True)
    cache.mkdir(exist_ok=True)
    char_file = out_dir / "_chars.txt"
    char_file.write_text(characters(), encoding="utf-8")
    tool = pyftsubset()
    try:
        for weight, name in WEIGHTS.items():
            src = cache / name
            if not src.exists():
                urllib.request.urlretrieve(BASE + name, src)
            dest = out_dir / f"pretendard-{weight}.woff2"
            subprocess.check_call(
                [
                    tool,
                    str(src),
                    f"--text-file={char_file}",
                    f"--output-file={dest}",
                    "--flavor=woff2",
                    "--layout-features=*",
                    "--desubroutinize",
                ]
            )
            print(f"{dest.name} {dest.stat().st_size}")
    finally:
        char_file.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
