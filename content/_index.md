---
# Leave the homepage title empty to use the site title
title: ''
date: 2022-10-24
type: landing
sections:
  - block: about.avatar
    id: about
    content:
      title: Welcome
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: front_page

  - block: collection
    id: postsd
    content:
      title: Recent News
      count: 3
      filters:
        folders:
          - project
      order: desc
      default_button_index: 0
      buttons:
      - name: All
        tag: '*'
      - name: Project
        tag: project
      - name: Research
        tag: research
      - name: Other
        tag: Demo
    design:
      view: showcase
      flip_alt_rows: false
      columns: '1'
    
---
