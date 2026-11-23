import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL("../" + path, import.meta.url), "utf8");

const selectedProjects = [
  ["Plex", "https://github.com/musadivarci/PlexV1"],
  ["Aegis", "https://github.com/musadivarci/aegis"],
  ["AI Nexus API", "https://github.com/musadivarci/AI-Nexus-API"],
  ["wondR", "https://github.com/musadivarci/wondr"],
  ["Workout Tracker", "https://github.com/musadivarci/workout-tracker"],
  ["Kura", "https://github.com/musadivarci/Kura"],
];

test("homepage lists all six selected public projects", async () => {
  const html = await read("index.html");
  const section = html.match(/<section id="projects">([\s\S]*?)<\/section>/)?.[1];
  assert.ok(section, "homepage project section must exist");
  for (const [name, url] of selectedProjects) {
    assert.ok(section.includes('href="' + url + '"'), "homepage is missing " + name);
  }
  assert.equal((section.match(/class="project-card"/g) ?? []).length, 6);
});

test("profile.json exposes the canonical profile URL and the same six project URLs", async () => {
  const profile = JSON.parse(await read("profile.json"));
  assert.equal(profile.professional_profile_url, "https://www.musadivarci.com.tr/professional-profile");
  assert.deepEqual(profile.selected_projects.map((project) => project.url), selectedProjects.map((project) => project[1]));
});

test("profile README draft retains the same six project links", async () => {
  const draft = await read("GITHUB_PROFILE_README.md");
  for (const [name, url] of selectedProjects) {
    assert.ok(draft.includes(url), "profile README draft is missing " + name);
  }
});

test("sitemap has a well-formed canonical homepage entry", async () => {
  const sitemap = await read("sitemap.xml");
  const match = sitemap.match(/<loc>https:\/\/www\.musadivarci\.com\.tr\/<\/loc>\s*<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/);
  assert.ok(match, "canonical homepage entry and lastmod must exist");
  assert.ok(!Number.isNaN(Date.parse(match[1])), "homepage lastmod must be a valid date");
});

test("repository README links to the canonical professional profile", async () => {
  const readme = await read("README.md");
  assert.ok(readme.includes("https://www.musadivarci.com.tr/professional-profile"));
  assert.ok(readme.includes("- robots.txt"));
});



test("IndexNow workflow logs each URL and only accepts documented success statuses", async () => {
  const workflow = await read(".github/workflows/indexnow.yml");
  const key = (await read("6b8d3f1a9c4e72f0d5a6138b7e2c904f.txt")).trim();
  assert.ok(workflow.includes("Submitting canonical URL:"));
  assert.ok(workflow.includes("200|202"));
  assert.ok(workflow.includes("No indexable page changes found; skipping IndexNow."));
  assert.ok(workflow.includes("INDEXNOW_KEY: " + key));
  assert.ok(workflow.includes('"keyLocation": f"https://www.musadivarci.com.tr/{key}.txt"'));
  assert.ok(workflow.includes("actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1"));
});


test("article author uses the canonical Person identity and sameAs links", async () => {
  const article = await read("classic-asp-modern-dotnet-gecisi.html");
  const articleGraph = JSON.parse(article.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)[1]);
  const articlePerson = articleGraph.author;
  const schema = JSON.parse(await read("schema.jsonld"));
  const canonicalPerson = schema["@graph"].find((entity) => entity["@type"] === "Person");
  assert.equal(articlePerson["@id"], canonicalPerson["@id"]);
  assert.deepEqual(articlePerson.sameAs, canonicalPerson.sameAs);
});


test("professional profile and llms.txt expose the same six projects", async () => {
  const profile = await read("professional-profile.html");
  const llms = await read("llms.txt");
  assert.ok(profile.includes('<link rel="canonical" href="https://www.musadivarci.com.tr/professional-profile">'));
  assert.ok(llms.includes("Professional profile: https://www.musadivarci.com.tr/professional-profile"));
  for (const [name, url] of selectedProjects) {
    assert.ok(profile.includes(url), "professional profile is missing " + name);
    assert.ok(llms.includes(url), "llms.txt is missing " + name);
  }
});

test("robots.txt allows crawling and points to the canonical sitemap", async () => {
  const robots = await read("robots.txt");
  assert.ok(robots.includes("User-agent: *"));
  assert.ok(robots.includes("Allow: /"));
  assert.ok(robots.includes("Sitemap: https://www.musadivarci.com.tr/sitemap.xml"));
});
