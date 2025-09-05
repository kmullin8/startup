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
  
### Block (no language):
```
git status
git add
git commit
```

### html:
```html
<nav class="navbar"> ... </nav>
```

### jsx:
```jsx
<div className="input-group"> ... </div>
```

### css:
```css
body {
  background: #fff;
  color: #333;
}
```

### js:
```js
function greet() {
  console.log("Hello, world!");
}
```

### python:
```python
def greet():
    print("Hello, world!")
```

### java:
```java
class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

### sql:
```sql
SELECT * FROM users WHERE active = 1;
```

### bash:
```bash
git clone https://github.com/user/repo.git
```

## Links

Markdown supports **inline links**, **section links**, and **relative links** to other files in your repo or across repos.

### Inline Links
```md
[GitHub](https://github.com)
```
- Renders as → [GitHub](https://github.com)


### Section Links
Link to a heading on the same page (case-insensitive, spaces → dashes):
```md
[Jump to Code](#code)
```
- Renders as → [Jump to Code](#code)


### Images

You can display an image in Markdown by adding `!` and wrapping the **alt text** in `[ ]`, then wrapping the **image URL or path** in `( )`.

### Syntax
```md
![Alt text](url-or-path.png)
```

### Example
```md
![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://myoctocat.com/assets/images/base-octocat.svg)
```

Renders as:  
![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://myoctocat.com/assets/images/base-octocat.svg)


### Relative Links (within repos)

Relative links are useful for referencing files inside your GitHub repo.  
The link format changes depending on **where the Markdown file lives** and **where you’re linking to**.

| Context | Relative Link Example |
|---------|------------------------|
| In a `.md` file on the **same branch** | `/assets/images/electrocat.png` |
| In a `.md` file on **another branch** | `/../main/assets/images/electrocat.png` |
| In **issues, PRs, and comments** (same repo) | `../blob/main/assets/images/electrocat.png?raw=true` |
| In a `.md` file in **another repository** | `/../../../../github/docs/blob/main/assets/images/electrocat.png` |
| In **issues, PRs, and comments of another repo** | `../../../github/docs/blob/main/assets/images/electrocat.png?raw=true` |


### Example
```md
See the [Contribution Guide](docs/CONTRIBUTING.md) for details.
![Electrocat](/assets/images/electrocat.png)
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
- 

## Footnotes
```
Here is a footnote[^1].

[^1]: Footnote text.
```


## Alerts

### Syntax & Examples

> [!NOTE]  
> Useful information that users should know, even when skimming content.

> [!TIP]  
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]  
> Key information users need to know to achieve their goal.

> [!WARNING]  
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]  
> Advises about risks or negative outcomes of certain actions.

### Markdown Example
```md
> [!NOTE]
> This is a note.

> [!TIP]
> This is a tip.

> [!IMPORTANT]
> This is important.

> [!WARNING]
> This is a warning.

> [!CAUTION]
> This is a caution.
```

## Misc
- Comment (hidden): `<!-- hidden -->`
- Escape formatting: `\*not italic\*`
