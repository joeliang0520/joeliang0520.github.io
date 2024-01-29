---
# Leave the homepage title empty to use the site title
title: ''
date: 2022-10-24
type: landing
sections:
  - block: about.biography
    id: about
    content:
      title: Welcome
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: front_page

  - block: collection
    id: posts
    filter_default: 0
    filter_button:
      - name: All
        tag: '*'
      - name: Research
        tag: research
      - name: Project
        tag: projects
      - name: Other
        tag: NLP
    content:
      title: Recent News
      subtitle: ''
      text: ''
      # Choose how many pages you would like to display (0 = all pages)
      count: 5
      # Filter on criteria
      filters:
        folders:
          - project
      # Page order: descending (desc) or ascending (asc) date.
      order: desc
    design:
      # Choose a layout view
      view: showcase
      columns: '2'
---
