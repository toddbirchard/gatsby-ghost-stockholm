module.exports = {
  "plugins": [
    [
      "prismjs",
      {
        "languages": [
          "markup",
          "css",
          "javascript",
          "typescript",
          "shell",
          "json",
          "python",
          "java",
          "groovy",
          "html",
          "yaml",
          "toml",
          "jsx",
          "graphql",
          "sql",
          "jinja2",
          "handlebars",
          "ini",
          "less",
          "nginx",
          "go",
          "hcl",
          "vim",
          "makefile",
          "markdown"
        ],
        "plugins": ["normalize-whitespace", "custom-class"],
        "theme": "default",
        "css": false
      }
    ]
  ],
  "presets": [
    [
      "babel-preset-gatsby",
      {
        "targets": {
          "browsers": [">1%", "not dead"]
        }
      }
    ]
  ]
}
