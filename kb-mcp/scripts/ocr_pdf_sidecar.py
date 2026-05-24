#!/usr/bin/env python3
"""OCR an image-only PDF into a form-feed-delimited UTF-8 sidecar text file."""
from __future__ import annotations

import argparse
import subprocess
import sys
import tempfile
from pathlib import Path

import fitz


def ocr_page(page: fitz.Page, dpi: int, lang: str) -> str:
    pix = page.get_pixmap(dpi=dpi, colorspace=fitz.csGRAY, alpha=False)
    with tempfile.NamedTemporaryFile(suffix=".png") as image:
        image.write(pix.tobytes("png"))
        image.flush()
        result = subprocess.run(
            ["tesseract", image.name, "stdout", "-l", lang, "--psm", "1"],
            check=False,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or f"tesseract failed with code {result.returncode}")
    return result.stdout.strip()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--dpi", type=int, default=180)
    parser.add_argument("--lang", default="eng")
    parser.add_argument("--start", type=int, default=1, help="1-based start page")
    parser.add_argument("--limit", type=int, default=0, help="maximum pages; 0 means all")
    args = parser.parse_args()

    if not args.pdf.exists():
        parser.error(f"PDF not found: {args.pdf}")

    doc = fitz.open(args.pdf)
    total = len(doc)
    start = max(1, args.start)
    stop = total if args.limit <= 0 else min(total, start + args.limit - 1)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    part = args.output.with_suffix(args.output.suffix + ".part")

    with part.open("w", encoding="utf-8") as out:
        for page_number in range(start, stop + 1):
            page = doc[page_number - 1]
            text = ocr_page(page, args.dpi, args.lang)
            out.write(text)
            if page_number < stop:
                out.write("\n\f\n")
            out.flush()
            print(f"OCR {page_number}/{total}: {len(text)} chars", file=sys.stderr)

    part.replace(args.output)
    print(f"Wrote {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
