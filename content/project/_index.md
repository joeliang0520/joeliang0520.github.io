---
title: Projects
type: landing

sections:
  - block: Portfolio
    id: posts
    content:
      title: Project
      subtitle: ''
      # Choose how many pages you would like to display (0 = all pages)
      count: 0
      # Filter on criteria
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
      filters:
        # The folders to display content from
        folders:
          - project
        author: ""
        category: ""
        tag: ""
        publication_type: ""
        featured_only: false
        exclude_featured: false
        exclude_future: false
        exclude_past: false
      # Choose how many pages you would like to offset by
      # Useful if you wish to show the first item in the Featured widget
      offset: 0
      # Field to sort by, such as Date or Title
      sort_by: 'Date'
      sort_ascending: false
    design:
      # Choose a listing view
      view: masonry
      columns: '2'

---