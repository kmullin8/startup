# GitHub Markdown Cheat Sheet

## Headings
```
# H1
## H2
### H3
```

## Text Styles
- **Bold** → `**text**`
- *Italic* → `*text*`
- ~~Strikethrough~~ → `~~text~~`
- **Bold + _Italic_** → `**text _text_**`
- <sub>Sub</sub> → `<sub>text</sub>`
- <sup>Super</sup> → `<sup>text</sup>`
- <ins>Underline</ins> → `<ins>text</ins>`

## Quotes
```
> Quoted text
```

## Code
- Inline → `` `git status` ``
- Block (no language):

    ```
    git status
    git add
    git commit
    ```
- With language highlighting:
```html
<nav class="navbar"> ... </nav>
```
```jsx
<div className="input-group"> ... </div>
```
```css
body {
  background: #fff;
  color: #333;
}
```
```js
function greet() {
  console.log("Hello, world!");
}
```
```python
def greet():
    print("Hello, world!")
```
```java
class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```
```sql
SELECT * FROM users WHERE active = 1;
```
```bash
git clone https://github.com/user/repo.git
```
```

## Links
- Inline: `[GitHub](https://github.com)`
- Section: `[Link](#section-heading)`
- Relative: `[Guide](docs/CONTRIBUTING.md)`

## Images
```
![Alt text](url-or-path.png)
```

## Lists
- Unordered: `- item` / `* item` / `+ item`
- Ordered:
```
1. First
2. Second
```
- Nested:
```
1. Item
   - Sub-item
```

## Task Lists
```
- [x] Done
- [ ] To do
```

## Mentions & References
- Person/team: `@username`
- Issue/PR: `#123`

## Emojis
`:smile: :+1:` → 😄 👍

## Footnotes
```
Here is a footnote[^1].

[^1]: Footnote text.
```

## Line Breaks
- Two spaces `␣␣` at end of line  
- Or backslash `\`

## Alerts
```
> [!NOTE] Info
> [!TIP] Advice
> [!IMPORTANT] Key info
> [!WARNING] Urgent
> [!CAUTION] Risk
```

## Misc
- Comment (hidden): `<!-- hidden -->`
- Escape formatting: `\*not italic\*`
