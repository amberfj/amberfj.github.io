# amberfj.github.io brief documentation

Navigation links can be found and modified in `_data/navigation.yml`.

**Layouts in `_layouts` include:**
- `default.html`: base layout used by other layouts.
- `home.html`: layout used exclusively by `home.md` to display items on homepage.
- `display.html`: customizable layout similar to `home` but with full-width container positioned behind navigation block.
- `page.html`: main layout for pages on the site, includes title, slideshow, and textual content.

## Layout front-matter options

| example                | description                                       |
| ---------------------- | ------------------------------------------------- |
| `layout: page`         | specifies layout for a markdown file              |
| `title: The Title`     | used in `<title>` tag and on the page layout      |
| `categories: projects` | used in url (e.g. `amberfj.com/projects/...`)     |

#### `page.html`

| example                        | description                               |
| ------------------------------ | ----------------------------------------- |
| `image: folder/image.png`      | image shown on front page                 |
| `year: 2018`                   | shown in brackets after title             |
| `background: folder/image.png` | sets full-screen background image         |
| `width: 300`                   | sets width of front page image            |
| `height: 300`                  | sets width of front page image            |
| `slideshow:`                   | adds slideshow                            |
| `- image: folder/image.png`    | adds image to slideshow                   |
| <pre>`  width: 300`</pre>      | sets width of image in slideshow          |
| <pre>`  height: 300`</pre>     | sets height of image in slideshow         |
| <pre>`  caption: text`</pre>   | sets caption of image in slideshow        |
| <pre>`  duration: 5000`</pre>  | sets duration of slide (milliseconds)     |

#### `display.html`

| example                        | description                               |
| ------------------------------ | ----------------------------------------- |
| `image: folder/image.png`      | image shown on front page                 |
| `year: 2018`                   | shown in brackets after title             |
| `background: folder/image.png` | sets full-screen background image         |
| `width: 300`                   | sets width of front page image            |
| `height: 300`                  | sets width of front page image            |
| `items:`                       | specifies images shown in display         |
| `- image: folder/image.png`    | adds image to display                     |
| <pre>`  width: 300`</pre>      | sets width of image in display            |
| <pre>`  height: 300`</pre>     | sets height of image in display           |
| <pre>`  url: http://...`</pre> | links image with local or external url    |

## CSS

All styles (.scss) are located in the `css` folder. Styles are separated out into their own folders and files for organizational purposes.

## Assets

All images (png, gif, etc.) should be stored in `assets/img`.

Videos would be better to host on YouTube or Vimeo.
