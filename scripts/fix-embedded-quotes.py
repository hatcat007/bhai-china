#!/usr/bin/env python3
"""Find and fix embedded straight quotes in TS string literals by replacing inner " with 「」."""
import re

path = "/home/z/my-project/src/lib/data/blog-posts.ts"
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

fixed_lines = []
fixed_count = 0

for i, line in enumerate(lines):
    # Only consider lines that look like { type: "...", text: "..." }
    if 'text: "' in line or 'author: "' in line:
        quote_positions = [j for j, c in enumerate(line) if c == '"' and (j == 0 or line[j-1] != '\\')]
        if len(quote_positions) >= 4:
            field_match = re.search(r'(text|author): "', line)
            if field_match:
                start = field_match.end() - 1
                end = None
                for q in reversed(quote_positions):
                    if q == start:
                        continue
                    rest = line[q+1:].lstrip()
                    if rest.startswith(',') or rest.startswith('}') or rest.startswith('),'):
                        end = q
                        break
                if end is None:
                    fixed_lines.append(line)
                    continue
                value = line[start+1:end]
                new_value = ""
                open_quote = True
                for c in value:
                    if c == '"':
                        new_value += '「' if open_quote else '」'
                        open_quote = not open_quote
                    else:
                        new_value += c
                new_line = line[:start+1] + new_value + line[end:]
                fixed_lines.append(new_line)
                fixed_count += 1
                continue
    fixed_lines.append(line)

with open(path, "w", encoding="utf-8") as f:
    f.writelines(fixed_lines)

print(f"Fixed {fixed_count} lines with embedded quotes")
