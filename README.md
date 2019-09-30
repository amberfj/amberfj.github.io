# ⚠️⚠️ REPOSITORY MOVED TO DREAMHOST ⚠️⚠️
# DON'T PULL/PUSH HERE

## CHANGE ORIGIN TO DREAMHOST REPOSITORY

```
git remote remove origin
git remote add origin ssh://amberfj@ssh.amberfj.com/home/amberfj/amberfj.com/repo.git
```



## Basics

### Running Server

1. *Navigate to website directory*
2. `jekyll serve --watch`
3. *Open [http://localhost:4000](http://localhost:4000) in web browser*

If any changes are made to `_config.yml`, you may have to restart the server for changes to take effect.

### Common Git Commands

| command                    | description                                  |
| -------------------------- | -------------------------------------------- |
| `git pull`                 | pull other peoples' changes from server      |
| `git add -A`               | (1) stage all changes for commit             |
| `git commit -m "message"`  | (2) bundles changes with message, locally    |
| `git push`                 | (3) push local changes to server             |

**Order of git operations**
`git add -A` -> `git commit -m "message"` -> `git push`

## Navigation

Navigation links can be found and modified in `_data/navigation.yml`.

## Layouts

### Layouts in `_layouts` include:
- `default.html`: base layout used by other layouts.
- `home.html`: layout used exclusively by `home.md` to display items on homepage.
- `display.html`: customizable layout similar to `home` but with full-width container positioned behind navigation block.
- `page.html`: main layout for pages on the site, includes title, slideshow, and textual content.

### Layout front-matter options

| example                | description                                       |
| ---------------------- | ------------------------------------------------- |
| `layout: page`         | specifies layout for a markdown file              |
| `title: The Title`     | used in `<title>` tag and on the page layout      |
| `categories: projects` | used in url (e.g. `amberfj.com/projects/...`)     |
| `homepage: true`       | whether post should be part of _selected works_.  |

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
| `​ ​ width: 300`                 | sets width of image in slideshow          |
| `​ ​ height: 300`                | sets height of image in slideshow         |
| `​ ​ caption: text`              | sets caption of image in slideshow        |
| `​ ​ duration: 5000`             | sets duration of slide (milliseconds)     |
| ` ​ html: <div></div>`          | to embed element other than image         |

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
| `​ ​ width: 300`                 | sets width of image in display            |
| `​ ​ height: 300`                | sets height of image in display           |
| `​ ​ url: http://...`            | links image with local or external url    |

## CSS

All styles (.scss) are located in the `css` folder. Styles are separated out into their own folders and files for organizational purposes.

## Assets

All images (png, gif, etc.) should be stored in `assets/images`.

Videos would be better to host on YouTube or Vimeo.
