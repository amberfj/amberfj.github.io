---
layout: page
title: Texts
permalink: /texts/
---

<table>
    <!-- HTML in markdown because (a) fits with page layout (b) to be able to add paragraphs above or below list of texts -->
    {% for post in site.posts %}
        <tr>
            <td><a href="{{ site.baseurl }}{{ post.url }}">
                <img class="thumbnail" src="/../assets/img/{{ post.image }}" height="40px">
            </a></td>
            <td><a href="{{ site.baseurl }}{{ post.url }}">
                {{ post.title }}
            </a></td>
        </tr>
    {% endfor %}
</table>
