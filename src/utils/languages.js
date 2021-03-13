import actionscript from "highlight.js/lib/languages/actionscript";
import apacheconf from "highlight.js/lib/languages/apache";
import applescript from "highlight.js/lib/languages/applescript";
import basic from "highlight.js/lib/languages/basic";
// import bash from "highlight.js/lib/languages/bash";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import coffeescript from "highlight.js/lib/languages/coffeescript";
import cmake from "highlight.js/lib/languages/cmake";
import clojure from "highlight.js/lib/languages/clojure";
import crystal from "highlight.js/lib/languages/crystal";
import css from "highlight.js/lib/languages/css";
import d from "highlight.js/lib/languages/d";
import django from "highlight.js/lib/languages/django";
import docker from "highlight.js/lib/languages/dockerfile";
import elixir from "highlight.js/lib/languages/elixir";
import elm from "highlight.js/lib/languages/elm";
import erlang from "highlight.js/lib/languages/erlang";
import fsharp from "highlight.js/lib/languages/fsharp";
import fortran from "highlight.js/lib/languages/fortran";
import go from "highlight.js/lib/languages/go";
import groovy from "highlight.js/lib/languages/groovy";
import handlebars from "highlight.js/lib/languages/handlebars";
import haskell from "highlight.js/lib/languages/haskell";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";

export const languages = {
  actionscript: {
    aliases: ["actionscript 3", "actionscript3", "as3"],
    name: "ActionScript",
    extensions: [".as"],
    mapping: actionscript,
  },
  apacheconf: {
    aliases: ["aconf", "apache"],
    name: "Apache Configuration",
    extensions: [".apacheconf", ".vhost"],
    filenames: [".htaccess", "apache2.conf", "httpd.conf"],
    mapping: apacheconf,
  },
  applescript: {
    aliases: ["osascript"],
    name: "AppleScript",
    extensions: [".applescript", ".scpt"],
    mapping: applescript,
  },
  basic: {
    aliases: ["vba", "vb6", "visual-basic"],
    name: "BASIC",
    extensions: [".bas", ".vba"],
    mapping: basic,
  },
  c: {
    name: "C",
    extensions: [".c", ".cats", ".h", ".idc"],
    mapping: c,
  },
  csharp: {
    aliases: ["cs", "dotnet"],
    name: "C#",
    extensions: [".cs", ".csx"],
    mapping: csharp,
  },
  cpp: {
    aliases: ["cplusplus"],
    name: "C++",
    extensions: [
      ".cpp",
      ".c++",
      ".cc",
      ".cp",
      ".cxx",
      ".h",
      ".h++",
      ".hpp",
      ".hxx",
    ],
    mapping: cpp,
  },
  coffeescript: {
    aliases: ["coffee", "coffee-script"],
    name: "CoffeeScript",
    extensions: [".coffee"],
    mapping: coffeescript,
  },
  cmake: {
    name: "CMake",
    extensions: [".cmake", ".cmake.in"],
    filenames: ["CMakeLists.txt"],
    mapping: cmake,
  },
  clojure: {
    name: "Clojure",
    extensions: [
      ".clj",
      ".cl2",
      ".cljc",
      ".cljs",
      ".cljs.hl",
      ".cljscm",
      ".cljx",
    ],
    filenames: ["riemann.config"],
    mapping: clojure,
  },
  crystal: {
    name: "Crystal",
    extensions: [".cr"],
    mapping: crystal,
  },
  css: {
    name: "CSS",
    extensions: [".css"],
    mapping: css,
  },
  d: {
    name: "D",
    extensions: [".d", ".di"],
    mapping: d,
  },
  django: {
    aliases: ["jinja", "jinja2"],
    name: "Django/Jinja2",
    extensions: [".jinja", ".jinja2"],
    mapping: django,
  },
  docker: {
    aliases: ["dockerfile"],
    name: "Docker",
    extensions: [".dockerfile"],
    filenames: ["Dockerfile"],
    mapping: docker,
  },
  elixir: {
    name: "Elixir",
    extensions: [".ex", ".exs"],
    mapping: elixir,
  },
  elm: {
    name: "Elm",
    extensions: [".elm"],
    mapping: elm,
  },
  erlang: {
    name: "Erlang",
    extensions: [".erl", ".es", ".escript", ".hrl", ".xrl", ".yrl"],
    filenames: ["Emakefile", "rebar.config", "rebar.config.lock", "rebar.lock"],
    mapping: erlang,
  },
  fsharp: {
    name: "F#",
    extensions: [".fs", ".fsi", ".fsx"],
    mapping: fsharp,
  },
  fortran: {
    name: "Fortran",
    extensions: [".f90", ".f", ".f03", ".f08", ".f77", ".f95", ".for", ".fpp"],
    mapping: fortran,
  },
  go: {
    aliases: ["golang"],
    name: "Go",
    extensions: [".go"],
    mapping: go,
  },
  groovy: {
    name: "Groovy",
    extensions: [".groovy", ".grt", ".gtpl", ".gvy"],
    filenames: ["Jenkinsfile"],
    mapping: groovy,
  },
  handlebars: {
    aliases: ["hbs", "htmlbars"],
    name: "Handlebars",
    extensions: [".handlebars", ".hbs"],
    mapping: handlebars,
  },
  haskell: {
    aliases: ["hs"],
    name: "Haskell",
    extensions: [".hs", ".hs-boot", ".hsc"],
    mapping: haskell,
  },
  html: {
    aliases: ["xhtml"],
    name: "HTML",
    extensions: [".html", ".htm", ".html.hl", ".xht", ".xhtml"],
    mapping: xml,
  },
  java: {
    name: "Java",
    extensions: [".java"],
    mapping: java,
  },
  javascript: {
    aliases: ["js", "node"],
    name: "JavaScript",
    extensions: [".js", ".cjs", ".es", ".es6"],
    filenames: ["Jakefile"],
    mapping: javascript,
  },
  json: {
    name: "JSON",
    extensions: [".json"],
    mapping: json,
  },
  //   jsx: {
  //     name: "React JSX",
  //     extensions: [".jsx"],
  //   },
  //   julia: {
  //     name: "Julia",
  //     extensions: [".jl"],
  //   },
  //   kotlin: {
  //     name: "Kotlin",
  //     extensions: [".kt", ".ktm", ".kts"],
  //   },
  //   less: {
  //     name: "Less",
  //     extensions: [".less"],
  //   },
  //   lisp: {
  //     aliases: ["emacs", "elisp", "emacs-lisp"],
  //     name: "Lisp",
  //     extensions: [".lisp", ".lsp", ".emacs", ".el"],
  //   },
  //   lua: {
  //     name: "Lua",
  //     extensions: [".lua", ".fcgi", ".nse"],
  //     filenames: [".luacheckrc"],
  //   },
  //   makefile: {
  //     aliases: ["make"],
  //     name: "Makefile",
  //     extensions: [".make"],
  //     filenames: ["Makefile"],
  //   },
  //   markdown: {
  //     aliases: ["md", "pandoc"],
  //     name: "Markdown",
  //     extensions: [".md", ".markdown", ".mdx"],
  //   },
  //   matlab: {
  //     aliases: ["octave"],
  //     name: "Matlab",
  //     extensions: [".m", ".matlab"],
  //   },
  //   nginx: {
  //     name: "Nginx Configuration",
  //     filenames: ["nginx.conf"],
  //   },
  //   objectivec: {
  //     aliases: ["objc", "obj-c"],
  //     name: "Objective-C",
  //     extensions: [".m", ".h"],
  //   },
  //   ocaml: {
  //     name: "OCaml",
  //     extensions: [".ml"],
  //   },
  //   perl: {
  //     aliases: ["cperl"],
  //     name: "Perl",
  //     extensions: [".pl", ".ph"],
  //     filenames: ["cpanfile", "Rexfile"],
  //   },
  //   php: {
  //     name: "PHP",
  //     extensions: [".php"],
  //   },
  //   powershell: {
  //     name: "PowerShell",
  //     extensions: [".ps1", ".psd1", ".psm1"],
  //   },
  //   protobuf: {
  //     name: "Protocol Buffers",
  //     extensions: [".proto"],
  //   },
  //   pug: {
  //     aliases: ["jade"],
  //     name: "Pug",
  //     extensions: [".jade", ".pug"],
  //   },
  //   python: {
  //     aliases: ["py"],
  //     name: "Python",
  //     extensions: [".py"],
  //   },
  //   r: {
  //     aliases: ["rscript"],
  //     name: "R",
  //     extensions: [".r", ".rd", ".rsx"],
  //   },
  //   ruby: {
  //     aliases: ["rb", "jruby", "rake"],
  //     name: "Ruby",
  //     extensions: [".rb", ".ruby", ".mspec", ".rake", ".spec", ".gemspec"],
  //     filenames: [
  //       ".irbrc",
  //       ".pryrc",
  //       "Brewfile",
  //       "Buildfile",
  //       "Gemfile",
  //       "Gemfile.lock",
  //       "Mavenfile",
  //       "Puppetfile",
  //       "Rakefile",
  //       "Snapfile",
  //       "Vagrantfile",
  //     ],
  //   },
  //   rust: {
  //     name: "Rust",
  //     extensions: [".rs", ".rs.in"],
  //   },
  //   sass: {
  //     name: "Sass",
  //     extensions: [".sass"],
  //   },
  //   scss: {
  //     name: "Scss",
  //     extensions: [".scss"],
  //   },
  //   scala: {
  //     name: "Scala",
  //     extensions: [".scala", ".kojo", ".sbt", ".sc"],
  //   },
  //   shell: {
  //     aliases: ["sh", "bash", "shell-script", "zsh"],
  //     name: "Bash",
  //     extensions: [".sh", ".bash", ".zsh"],
  //     mapping: bash,
  //   },
  //   sql: {
  //     name: "SQL",
  //     extensions: [".sql", ".cql", ".ddl", ".mysql"],
  //   },
  //   svelte: {
  //     name: "Svelte",
  //     highlight: "html",
  //     extensions: [".svelte"],
  //   },
  //   swift: {
  //     name: "Swift",
  //     extensions: [".swift"],
  //   },
  //   text: {
  //     name: "Plain Text",
  //     extensions: [".txt"],
  //   },
  //   textile: {
  //     name: "Textile",
  //     extensions: [".textile"],
  //   },
  //   toml: {
  //     name: "TOML",
  //     extensions: [".toml"],
  //   },
  //   tsx: {
  //     name: "React TSX",
  //     extensions: [".tsx"],
  //   },
  //   typescript: {
  //     aliases: ["ts"],
  //     name: "TypeScript",
  //     extensions: [".ts"],
  //   },
  //   vue: {
  //     name: "Vue",
  //     highlight: "html",
  //     extensions: [".vue"],
  //   },
  //   wasm: {
  //     aliases: ["wast", "webassembly"],
  //     name: "WebAssembly",
  //     extensions: [".wast", ".wat"],
  //   },
  //   xml: {
  //     aliases: ["rss", "xsd", "wsdl"],
  //     name: "XML",
  //     extensions: [".xml", ".ant"],
  //     filenames: [
  //       ".classpath",
  //       ".cproject",
  //       ".project",
  //       "App.config",
  //       "NuGet.config",
  //       "Settings.StyleCop",
  //       "Web.Debug.config",
  //       "Web.Release.config",
  //       "Web.config",
  //       "packages.config",
  //     ],
  //     mapping: "xml",
  //   },
  //   yaml: {
  //     aliases: ["yml"],
  //     name: "YAML",
  //     extensions: [".yml", ".yaml"],
  //     filenames: [
  //       ".clang-format",
  //       ".clang-tidy",
  //       ".gemrc",
  //       "glide.lock",
  //       "yarn.lock",
  //     ],
  //   },
};
