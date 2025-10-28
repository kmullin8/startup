# CS 260 Notes 
hello world from vs code
hello world from github

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [Markdown Cheat Sheat](markdown_cheat_sheet.md)

## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

ssh to server: ```ssh -i key\ 1.pem ubuntu@kadenmullin.click```

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

### Elements & Tags
- Elements are represented by **tags**: `<p>Hello</p>`.
- Tags use `< >`. Closing tags use `/`: `</p>`.
- Some tags enclose text or other elements.

Basic page structure:
```html
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <main>
      <p>Hello world</p>
    </main>
  </body>
</html>
```
### Attributes Provide extra info about elements.

- id → unique identifier.

- class → groups elements.

Written inside the opening tag:

```html
<p id="hello" class="greeting">Hello world</p>
```

### links
- Created with the <a> element + href attribute:

```html
<a href="https://byu.edu">Go to the Y</a>
```

### Images

```html
<img src="image.jpg" alt="Description of image" width="300" height="200">
```

### Full Example

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <main>
      <h1>Hello world</h1>
      <p class="introduction">
        HTML welcomes you to the amazing world of
        <span class="topic">web programming</span>.
      </p>
      <p class="question">What will this mean to you?</p>
      <p class="assignment">Learn more <a href="instruction.html">here</a>.</p>
    </main>
  </body>
</html>
```

- <!DOCTYPE html> tells browser the document type.

- Styling comes from CSS, not HTML.

### Common Elements

| Element     | Meaning                            |
| ----------- | ---------------------------------- |
| `html`      | Page container                     |
| `head`      | Metadata container                 |
| `title`     | Page title                         |
| `meta`      | Metadata (charset, viewport, etc.) |
| `script`    | JavaScript                         |
| `link`      | External reference (CSS, etc.)     |
| `body`      | Page content                       |
| `header`    | Header section                     |
| `footer`    | Footer section                     |
| `nav`       | Navigation                         |
| `main`      | Main content                       |
| `section`   | Section of content                 |
| `aside`     | Sidebar content                    |
| `div`       | Block container                    |
| `span`      | Inline container                   |
| `h1`–`h9`   | Headings                           |
| `p`         | Paragraph                          |
| `b`         | Bold / emphasis                    |
| `table`     | Table                              |
| `tr`        | Table row                          |
| `th`        | Table header cell                  |
| `td`        | Table data cell                    |
| `ol` / `ul` | Ordered / unordered list           |
| `li`        | List item                          |
| `a`         | Link (anchor)                      |
| `img`       | Image                              |
| `dialog`    | Interactive dialog box             |
| `input`     | User input field                   |
| `audio`     | Audio content                      |
| `video`     | Video content                      |
| `svg`       | Vector graphics                    |
| `iframe`    | Inline frame                       |



### Comments
Use `<!-- ... -->`

```html
<!-- This is a comment -->
```


Special Characters
Reserved characters must be escaped:

| Character | Entity      |
| --------- | ----------- |
| &amp;     | `&amp;`     |
| <         | `&lt;`      |
| >         | `&gt;`      |
| "         | `&quot;`    |
| '         | `&apos;`    |
| &#128512; | `&#128512;` |



### Structure Example

```html
<body>
  <p>Body</p>
  <header>
    <p>Header - <span>Span</span></p>
    <nav>
      Navigation
      <div>Div</div>
      <div>Div</div>
    </nav>
  </header>

  <main>
    <section>
      <p>Section</p>
      <ul>
        <li>List</li>
        <li>List</li>
        <li>List</li>
      </ul>
    </section>
    <section>
      <p>Section</p>
      <table>
        <tr>
          <th>Table</th>
          <th>Table</th>
          <th>Table</th>
        </tr>
        <tr>
          <td>table</td>
          <td>table</td>
          <td>table</td>
        </tr>
      </table>
    </section>
    <aside>
      <p>Aside</p>
    </aside>
  </main>

  <footer>
    <div>Footer - <span>Span</span></div>
  </footer>
</body>
```

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```


First we need to follow the basic React setup that we discussed in the simple [Hello World React](../../webFrameworks/react/introduction/introduction.md#react-hello-world) app that we created in previous instruction. This includes:

1. Creating an NPM project, installing Vite, and installing React.
   ```sh
   npm init -y
   npm install vite@latest -D
   npm install react react-dom react-router-dom
   ```
1. Configuring Vite to proxy API requests through to the backend when debugging.
1. Creating a basic `index.html` file that loads your React application.
1. Creating your React application in `index.jsx`.
2. start the frontend by running npm run dev from a console window.
